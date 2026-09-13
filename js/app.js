// ============================================================
// STATE
// ============================================================
const state = {
  role: '',
  catInterest: {},   // catId -> val
  itemDir:     {},   // 'catId|item' -> dir val
  itemRate:    {},   // 'catId|item' -> 1-5
  itemLimit:   {}    // 'catId|item' -> true if marked a hard limit
};

function itemKey(catId, item) {
  return catId + '|' + item;
}

// ============================================================
// NAVIGATION
// ============================================================
const STEPS = ['role', 'categories', 'pass1', 'pass2', 'review', 'results'];
const STEP_LABELS = {
  role: 'Role', categories: 'Categories',
  pass1: 'Direction', pass2: 'Rating',
  review: 'Last Look', results: 'Results'
};

function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  buildProgressBar(id);
}

function buildProgressBar(screenId) {
  const el = document.getElementById('prog-' + screenId);
  if (!el) return;
  const ci = STEPS.indexOf(screenId);
  el.innerHTML = '';
  STEPS.forEach((s, i) => {
    const d = document.createElement('div');
    d.className = 'p-dot' + (i === ci ? ' on' : i < ci ? ' done' : '');
    el.appendChild(d);
  });
  const lbl = document.createElement('span');
  lbl.className = 'p-label';
  lbl.textContent = STEP_LABELS[screenId] || '';
  el.appendChild(lbl);
}

// ============================================================
// CONSENT
// ============================================================
function consentYes() {
  buildRoleScreen();
  goTo('role');
}
function consentNo() {
  document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:Georgia,serif;color:#8a6a48;font-style:italic;font-size:1.2rem;">This tool is for adults 18 and older.</div>';
}

// ============================================================
// ROLE
// ============================================================
function buildRoleScreen() {
  const list = document.getElementById('role-list');
  list.innerHTML = '';
  ROLES.forEach(role => {
    const row = document.createElement('div');
    row.className = 'role-row' + (state.role === role ? ' on' : '');
    row.dataset.role = role;
    row.onclick = () => pickRole(role);
    row.innerHTML = `<div class="r-dot"></div><div class="r-name">${tipSpan(role)}</div>`;
    list.appendChild(row);
  });
}

function pickRole(role) {
  state.role = role;
  document.querySelectorAll('.role-row').forEach(el => {
    el.classList.toggle('on', el.dataset.role === role);
  });
}

function fromRole() {
  if (!state.role) { alert('Please select a role to continue.'); return; }
  buildCatScreen();
  goTo('categories');
}

// ============================================================
// CATEGORIES
// ============================================================
function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const CATEGORY_PREVIEW_COUNT = 3;   // item names shown per category row before "+N more"

function buildCatPreview(cat) {
  const shown = cat.items.slice(0, CATEGORY_PREVIEW_COUNT);
  const more = cat.items.length - shown.length;
  const names = shown.map(escHtml).join(' &middot; ');
  return names + (more > 0 ? ` <span class="more">+${more} more</span>` : '');
}

let catListBound = false;
function buildCatScreen() {
  const list = document.getElementById('cat-list');
  list.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const row = document.createElement('div');
    const hasInt = state.catInterest[cat.id] && state.catInterest[cat.id] !== INTEREST_NONE;
    row.className = 'cat-row' + (hasInt ? ' has-interest' : '');
    row.innerHTML = `
      <div class="cat-main">
        <div class="cat-icon">${catIcon(cat.id)}</div>
        <div class="cat-info">
          <div class="cat-name">${tipSpan(cat.name)}</div>
          <div class="cat-preview" title="Includes: ${escAttr(cat.items.join(', '))}">${buildCatPreview(cat)}</div>
        </div>
      </div>
      <div class="int-pills" data-cat="${cat.id}">
        ${INTEREST_LEVELS.map(lvl =>
          `<button class="i-pill${state.catInterest[cat.id] === lvl.val ? ' on' : ''}"
            data-cat="${cat.id}" data-val="${lvl.val}">${lvl.label}</button>`
        ).join('')}
      </div>`;
    list.appendChild(row);
  });

  if (catListBound) return;
  catListBound = true;
  list.addEventListener('click', e => {
    const btn = e.target.closest('.i-pill');
    if (!btn) return;
    const catId = btn.dataset.cat;
    const val = btn.dataset.val;
    state.catInterest[catId] = val;
    document.querySelectorAll(`.i-pill[data-cat="${catId}"]`).forEach(b => {
      b.classList.toggle('on', b.dataset.val === val);
    });
    const row = btn.closest('.cat-row');
    if (row) row.classList.toggle('has-interest', val !== INTEREST_NONE);
  });
}

function fromCategories() {
  const active = CATEGORIES.filter(c => state.catInterest[c.id] && state.catInterest[c.id] !== INTEREST_NONE);
  if (active.length === 0) {
    alert('Please select at least one category with some interest to continue.');
    return;
  }
  buildPass1();
  goTo('pass1');
}

// ============================================================
// PASS 1
// ============================================================
function collectActiveCats() {
  return CATEGORIES.filter(c => state.catInterest[c.id] && state.catInterest[c.id] !== INTEREST_NONE);
}

let pass1Bound = false;
function buildPass1() {
  const body = document.getElementById('pass1-body');
  body.innerHTML = '';
  collectActiveCats().forEach(cat => {
    const sec = document.createElement('div');
    sec.className = 'pass-section';
    sec.innerHTML = `<div class="ps-title"><span class="sec-icon">${catIcon(cat.id)}</span>${tipSpan(cat.name)}</div>`;
    cat.items.forEach(item => {
      const key = itemKey(cat.id, item);
      const row = document.createElement('div');
      row.className = 'item-row';
      row.innerHTML = `
        <div class="item-name">${tipSpan(item)}</div>
        <div class="dir-pills" data-key="${escAttr(key)}">
          ${DIRECTIONS.map(d =>
            `<button class="d-pill${state.itemDir[key] === d.val ? ' on' : ''}"
              data-key="${escAttr(key)}" data-dir="${d.val}">${d.label}</button>`
          ).join('')}
        </div>`;
      sec.appendChild(row);
    });
    body.appendChild(sec);
  });

  if (pass1Bound) return;
  pass1Bound = true;
  body.addEventListener('click', e => {
    const btn = e.target.closest('.d-pill');
    if (!btn) return;
    const key = btn.dataset.key;
    const dir = btn.dataset.dir;
    state.itemDir[key] = dir;
    document.querySelectorAll(`.d-pill[data-key="${escAttr(key)}"]`).forEach(b => {
      b.classList.toggle('on', b.dataset.dir === dir);
    });
  });
}

function fromPass1() {
  const picked = Object.values(state.itemDir).filter(v => v && v !== DIRECTION_NO);
  if (picked.length === 0) {
    alert('Please select at least one item before continuing.');
    return;
  }
  buildPass2();
  goTo('pass2');
}

// ============================================================
// PASS 2
// ============================================================
const RATING_MAX   = 5;             // ratings run 1..RATING_MAX
const RATING_SCALE = [1,2,3,4,5];   // one button / meter segment per step, in order

let pass2Bound = false;
function buildPass2() {
  const body = document.getElementById('pass2-body');
  body.innerHTML = '';
  let any = false;

  // all categories, not just active: review-screen additions may
  // come from categories that were skipped on the interest step
  CATEGORIES.forEach(cat => {
    const selItems = cat.items.filter(item => {
      const d = state.itemDir[itemKey(cat.id, item)];
      return d && d !== DIRECTION_NO;
    });
    if (selItems.length === 0) return;
    any = true;

    const sec = document.createElement('div');
    sec.className = 'pass-section';
    sec.innerHTML = `<div class="ps-title"><span class="sec-icon">${catIcon(cat.id)}</span>${tipSpan(cat.name)}</div>`;

    selItems.forEach(item => {
      const key = itemKey(cat.id, item);
      const cur = state.itemRate[key] || 0;
      const row = document.createElement('div');
      row.className = 'item-row';
      row.innerHTML = `
        <div class="item-name">${tipSpan(item)}</div>
        <div class="rate-dots" data-key="${escAttr(key)}">
          ${RATING_SCALE.map(n =>
            `<button class="r-btn${n <= cur ? ' on' : ''}"
              data-key="${escAttr(key)}" data-n="${n}">${n}</button>`
          ).join('')}
        </div>`;
      sec.appendChild(row);
    });
    body.appendChild(sec);
  });

  if (!any) {
    body.innerHTML = '<div class="empty-msg">No items to rate. Go back and make some selections.</div>';
  }

  if (pass2Bound) return;
  pass2Bound = true;
  body.addEventListener('click', e => {
    const btn = e.target.closest('.r-btn');
    if (!btn) return;
    const key = btn.dataset.key;
    const n = parseInt(btn.dataset.n);
    state.itemRate[key] = n;
    btn.closest('.rate-dots').querySelectorAll('.r-btn').forEach((b, i) => {
      b.classList.toggle('on', i < n);
    });
  });
}

function fromPass2() {
  buildReview();
  goTo('review');
}

// ============================================================
// REVIEW -- "ARE YOU SURE?" (everything NOT selected)
// ============================================================
const REVIEW_DIRECTIONS = DIRECTIONS.filter(d => d.val !== DIRECTION_NO);

let reviewBound = false;
function buildReview() {
  const body = document.getElementById('review-body');
  body.innerHTML = '';
  let total = 0;

  CATEGORIES.forEach(cat => {
    const missed = cat.items.filter(item => {
      const d = state.itemDir[itemKey(cat.id, item)];
      return !d || d === DIRECTION_NO;
    });
    if (missed.length === 0) return;
    total += missed.length;

    const sec = document.createElement('div');
    sec.className = 'rev-section';
    sec.innerHTML = `<div class="ps-title"><span class="sec-icon">${catIcon(cat.id)}</span>${tipSpan(cat.name)}</div>`;

    const chips = document.createElement('div');
    chips.className = 'rev-chips';
    missed.forEach(item => {
      const key = itemKey(cat.id, item);
      const isLimit = !!state.itemLimit[key];
      const chip = document.createElement('div');
      chip.className = 'rev-chip' + (isLimit ? ' limit' : '');
      chip.dataset.key = key;
      chip.innerHTML = `
        <div class="rev-chip-head">
          <button type="button" class="rev-chip-name">${tipSpan(item)}</button>
          <button type="button" class="limit-btn${isLimit ? ' on' : ''}" title="Mark as an absolute no">Hard Limit</button>
        </div>
        <div class="rev-controls">
          <div class="rev-mini">
            <span class="rev-mini-lbl">Dir</span>
            ${REVIEW_DIRECTIONS.map(d =>
              `<button type="button" class="d-pill mini" data-dir="${d.val}">${d.label}</button>`
            ).join('')}
          </div>
          <div class="rev-mini">
            <span class="rev-mini-lbl">Rate</span>
            ${RATING_SCALE.map(n =>
              `<button type="button" class="r-btn mini" data-n="${n}">${n}</button>`
            ).join('')}
          </div>
        </div>`;
      chips.appendChild(chip);
    });
    sec.appendChild(chips);
    body.appendChild(sec);
  });

  if (total === 0) {
    body.innerHTML = '<div class="rev-clean">Nothing left unselected &mdash; you covered it all.</div>';
  }

  if (reviewBound) return;
  reviewBound = true;
  body.addEventListener('click', e => {
    const chip = e.target.closest('.rev-chip');
    if (!chip) return;
    const key = chip.dataset.key;

    const limitBtn = e.target.closest('.limit-btn');
    if (limitBtn) {
      const turningOn = !chip.classList.contains('limit');
      if (turningOn) {
        // hard limit is mutually exclusive with adding as an interest
        delete state.itemDir[key];
        delete state.itemRate[key];
        state.itemLimit[key] = true;
        chip.classList.add('limit');
        chip.classList.remove('added');
        chip.querySelectorAll('.d-pill.mini, .r-btn.mini').forEach(b => b.classList.remove('on'));
      } else {
        delete state.itemLimit[key];
        chip.classList.remove('limit');
      }
      limitBtn.classList.toggle('on', turningOn);
      return;
    }

    const dirBtn = e.target.closest('.d-pill.mini');
    if (dirBtn) {
      state.itemDir[key] = dirBtn.dataset.dir;
      chip.querySelectorAll('.d-pill.mini').forEach(b => {
        b.classList.toggle('on', b.dataset.dir === dirBtn.dataset.dir);
      });
      return;
    }

    const rateBtn = e.target.closest('.r-btn.mini');
    if (rateBtn) {
      const n = parseInt(rateBtn.dataset.n);
      state.itemRate[key] = n;
      chip.querySelectorAll('.r-btn.mini').forEach((b, i) => {
        b.classList.toggle('on', i < n);
      });
      return;
    }

    if (e.target.closest('.rev-chip-name')) {
      if (chip.classList.contains('added')) {
        // un-add
        delete state.itemDir[key];
        delete state.itemRate[key];
        chip.classList.remove('added');
        chip.querySelectorAll('.d-pill.mini, .r-btn.mini').forEach(b => b.classList.remove('on'));
      } else {
        // adding as an interest overrides any hard-limit mark
        delete state.itemLimit[key];
        chip.classList.remove('limit');
        const limitToggle = chip.querySelector('.limit-btn');
        if (limitToggle) limitToggle.classList.remove('on');
        // quick-add, defaulting to Both
        state.itemDir[key] = DIRECTION_BOTH;
        chip.classList.add('added');
        chip.querySelectorAll('.d-pill.mini').forEach(b => {
          b.classList.toggle('on', b.dataset.dir === DIRECTION_BOTH);
        });
      }
    }
  });
}

function backToPass2() {
  buildPass2(); // rebuild so anything added on review shows up for rating
  goTo('pass2');
}

function fromReview() {
  buildResults();
  goTo('results');
}

// ============================================================
// RESULTS
// ============================================================
// Collects across ALL categories (not just active ones) so items
// grabbed on the review screen from skipped categories still count.
function collectResults() {
  const out = [];
  CATEGORIES.forEach(cat => {
    const items = cat.items
      .filter(item => {
        const d = state.itemDir[itemKey(cat.id, item)];
        return d && d !== DIRECTION_NO;
      })
      .map(item => {
        const key = itemKey(cat.id, item);
        return { name: item, dir: state.itemDir[key], rate: state.itemRate[key] || 0 };
      })
      .sort((a, b) => b.rate - a.rate);

    if (items.length > 0) out.push({ id: cat.id, name: cat.name, items });
  });
  return out;
}

// Items marked "Hard Limit" on the review ("Are You Sure?") screen.
function collectLimits() {
  const out = [];
  CATEGORIES.forEach(cat => {
    const items = cat.items.filter(item => state.itemLimit[itemKey(cat.id, item)]);
    if (items.length > 0) out.push({ id: cat.id, name: cat.name, items });
  });
  return out;
}

function buildResults() {
  document.getElementById('res-role').textContent = state.role || 'Not specified';
  const body = document.getElementById('res-body');
  body.innerHTML = '';

  const data = collectResults();
  const limits = collectLimits();
  const limitCount = limits.reduce((a, c) => a + c.items.length, 0);
  const allItems = data.flatMap(sec => sec.items);
  const fives = allItems.filter(i => i.rate === RATING_MAX).length;
  const topCat = data.slice().sort((a, b) => b.items.length - a.items.length)[0];

  if (allItems.length > 0) {
    const sum = document.createElement('div');
    sum.className = 'sum-grid';
    sum.innerHTML = `
      <div class="sum-tile">
        <div class="sum-num">${allItems.length}</div>
        <div class="sum-lbl">Kinks Selected</div>
      </div>
      <div class="sum-tile">
        <div class="sum-num">${fives}</div>
        <div class="sum-lbl">Rated 5 / 5</div>
      </div>
      <div class="sum-tile">
        <div class="sum-num">${catIcon(topCat.id)}</div>
        <div class="sum-lbl">Top Category<br>${escHtml(topCat.name)}</div>
      </div>
      ${limitCount > 0 ? `<div class="sum-tile limit-tile">
        <div class="sum-num limit-num">${limitCount}</div>
        <div class="sum-lbl">Hard Limits</div>
      </div>` : ''}`;
    body.appendChild(sum);
  } else if (limitCount === 0) {
    body.innerHTML = '<div class="empty-msg">No selections yet. Go back and pick a few things that interest you.</div>';
    return;
  }

  if (limitCount > 0) {
    const limSec = document.createElement('div');
    limSec.className = 'res-section limits-section';
    limSec.innerHTML = `<div class="res-sec-title res-limits-title"><span class="sec-icon">⛔</span>Limits</div>`;
    limits.forEach(cat => {
      cat.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'res-item';
        row.innerHTML = `
          <div class="res-item-name">${tipSpan(item)}</div>
          <div class="res-meta"><span class="res-limit-tag">${escHtml(cat.name)}</span></div>`;
        limSec.appendChild(row);
      });
    });
    body.appendChild(limSec);
  }

  data.forEach(secData => {
    const sec = document.createElement('div');
    sec.className = 'res-section';
    sec.innerHTML = `<div class="res-sec-title"><span class="sec-icon">${catIcon(secData.id)}</span>${tipSpan(secData.name)}</div>`;

    secData.items.forEach(item => {
      const dirLabel = DIRECTIONS.find(d => d.val === item.dir)?.label || item.dir;
      const meter = item.rate > 0
        ? `<span class="res-bar">${RATING_SCALE.map(n =>
            `<span class="res-seg${n <= item.rate ? ' fill' : ''}"></span>`).join('')}
           </span><span class="res-rate-num">${item.rate}/5</span>`
        : '<span class="res-unrated">not rated</span>';
      const row = document.createElement('div');
      row.className = 'res-item';
      row.innerHTML = `
        <div class="res-item-name">${tipSpan(item.name)}</div>
        <div class="res-meta">
          <span class="res-dir">${dirLabel}</span>
          ${meter}
        </div>`;
      sec.appendChild(row);
    });
    body.appendChild(sec);
  });
}

// ============================================================
// COPY
// ============================================================
const BUTTON_CONFIRM_MS = 2600;   // how long "Copied!" / "Downloaded!" stays on the button

function copyResults() {
  const hardLimits = document.getElementById('hard-limits').value.trim();
  const extraNotes = document.getElementById('extra-notes').value.trim();
  const lines = [];

  lines.push('=== MY KINK COMPASS ===');
  lines.push('Role: ' + (state.role || 'Not specified'));
  lines.push('');

  collectResults().forEach(cat => {
    lines.push('--- ' + cat.name.toUpperCase() + ' ---');
    cat.items.forEach(item => {
      const dirLabel = DIRECTIONS.find(d => d.val === item.dir)?.label || item.dir;
      const stars = item.rate > 0
        ? '*'.repeat(item.rate) + '.'.repeat(RATING_MAX - item.rate)
        : 'unrated';
      lines.push(`  ${item.name} [${dirLabel}] ${stars}`);
    });
    lines.push('');
  });

  const limits = collectLimits();
  if (limits.length > 0 || hardLimits) {
    lines.push('--- LIMITS ---');
    limits.forEach(cat => {
      cat.items.forEach(item => {
        lines.push(`  ${item} [${cat.name}]`);
      });
    });
    if (hardLimits) {
      if (limits.length > 0) lines.push('');
      lines.push(hardLimits);
    }
    lines.push('');
  }
  if (extraNotes) {
    lines.push('--- NOTES ---');
    lines.push(extraNotes);
    lines.push('');
  }

  const text = lines.join('\n');
  const btn = document.getElementById('copy-btn');

  const doConfirm = () => {
    btn.textContent = 'Copied!';
    btn.classList.add('done');
    setTimeout(() => {
      btn.textContent = 'Copy My Results';
      btn.classList.remove('done');
    }, BUTTON_CONFIRM_MS);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(doConfirm).catch(() => fallbackCopy(text, doConfirm));
  } else {
    fallbackCopy(text, doConfirm);
  }
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); cb(); } catch(e) {}
  document.body.removeChild(ta);
}

// ============================================================
// IMAGE EXPORT -- renders all answers + scales to a PNG graphic
// ============================================================
const exportPalette = {
  bg:      '#0e0805',
  card:    '#1c110a',
  border:  'rgba(195,130,50,0.28)',
  accent:  '#c07830',
  accent2: '#e0a850',
  accent3: '#f5d090',
  text:    '#f0dfc5',
  muted:   '#8a6a48',
  dim:     '#5a3e25',
  segOff:  'rgba(195,120,40,0.16)',
  // row rules, pill outlines, the limits-section red family, and the page glow
  rowRule:         'rgba(195,120,40,0.07)',
  pillStroke:      'rgba(195,120,40,0.4)',
  limitRowRule:    'rgba(200,70,70,0.08)',
  limitPillStroke: 'rgba(200,70,70,0.4)',
  limitPillText:   '#d08080',
  limitHead:       '#e0a0a0',
  limitRule:       'rgba(200,70,70,0.35)',
  glow:            'rgba(170,90,20,0.12)',
  glowFade:        'rgba(170,90,20,0)'
};

const BLOB_REVOKE_MS  = 4000;   // free each PNG's object URL once its download has started
const DOWNLOAD_GAP_MS = 300;    // pause between multi-page downloads

function exRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function exWrapText(ctx, text, maxW) {
  const lines = [];
  text.split('\n').forEach(raw => {
    const words = raw.split(/\s+/).filter(Boolean);
    if (words.length === 0) { lines.push(''); return; }
    let line = '';
    words.forEach(word => {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    lines.push(line);
  });
  return lines;
}

function exFitText(ctx, text, maxW) {
  if (ctx.measureText(text).width <= maxW) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(t + '…').width > maxW) {
    t = t.slice(0, -1);
  }
  return t + '…';
}

async function exportImage() {
  const btn = document.getElementById('export-btn');
  btn.textContent = 'Rendering…';
  try { await document.fonts.ready; } catch (e) { /* fonts optional */ }

  const data = collectResults();
  const limits = collectLimits();
  const limitCount = limits.reduce((a, c) => a + c.items.length, 0);
  const hardLimits = document.getElementById('hard-limits').value.trim();
  const extraNotes = document.getElementById('extra-notes').value.trim();

  // Mobile-friendly "story card" pages instead of one long strip: each
  // page is sized to be fully readable on a phone screen without zooming.
  const W = 1080, CARD_H = 1440, PAD = 64, SCALE = 2;
  const HEADER_H = 132, FOOTER_H = 64;
  const ROW_H = 46, SEC_HEAD = 66, SEC_GAP = 26;
  const SEG_W = 24, SEG_GAP = 5, SEG_STRIDE = 29;      // rating meter segment; stride = SEG_W + SEG_GAP
  const NOTES_TEXT_INSET = 28, NOTES_WRAP_INSET = 56;  // notes block: text x-inset, and both sides of it for wrapping
  const NOTES_HEAD_H = 50, NOTES_LINE_H = 26, NOTES_BLOCK_GAP = 24;
  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans = "'Jost', system-ui, sans-serif";
  const FONT_BODY = '300 17px ' + sans;   // item names and notes text
  const FONT_PILL = '500 11px ' + sans;   // direction / category pill labels
  const contentMaxH = CARD_H - HEADER_H - FOOTER_H;
  const meterW = RATING_MAX * SEG_W + 4 * SEG_GAP;   // 5 segments + gaps
  const meterX = W - PAD - meterW;         // right-aligned meter
  const dirX = meterX - 24;                // direction pill sits left of meter

  const measureCanvas = document.createElement('canvas');
  const mctx = measureCanvas.getContext('2d');
  mctx.font = FONT_BODY;
  const limitLines = hardLimits ? exWrapText(mctx, hardLimits, W - PAD * 2 - NOTES_WRAP_INSET) : [];
  const noteLines = extraNotes ? exWrapText(mctx, extraNotes, W - PAD * 2 - NOTES_WRAP_INSET) : [];

  // ---- draw helpers (operate relative to a block's own yTop) ----
  function drawItemRow(ctx, item, y) {
    const rowMid = y + ROW_H / 2;
    ctx.strokeStyle = exportPalette.rowRule;
    ctx.beginPath();
    ctx.moveTo(PAD, y + ROW_H);
    ctx.lineTo(W - PAD, y + ROW_H);
    ctx.stroke();

    const dirLabel = (DIRECTIONS.find(d => d.val === item.dir)?.label || item.dir).toUpperCase();
    ctx.font = FONT_PILL;
    const dw = ctx.measureText(dirLabel).width + 24;
    exRoundRect(ctx, dirX - dw, rowMid - 12, dw, 24, 12);
    ctx.strokeStyle = exportPalette.pillStroke;
    ctx.stroke();
    ctx.fillStyle = exportPalette.accent;
    ctx.textAlign = 'center';
    ctx.fillText(dirLabel, dirX - dw / 2, rowMid + 4);

    ctx.textAlign = 'left';
    ctx.font = FONT_BODY;
    ctx.fillStyle = exportPalette.text;
    ctx.fillText(exFitText(ctx, item.name, dirX - dw - PAD - 20), PAD, rowMid + 6);

    for (let n = 1; n <= RATING_MAX; n++) {
      const sx = meterX + (n - 1) * SEG_STRIDE;
      exRoundRect(ctx, sx, rowMid - 5, SEG_W, 10, 5);
      if (item.rate >= n) {
        const g = ctx.createLinearGradient(sx, 0, sx + SEG_W, 0);
        g.addColorStop(0, exportPalette.accent);
        g.addColorStop(1, exportPalette.accent2);
        ctx.fillStyle = g;
        ctx.fill();
      } else {
        ctx.fillStyle = exportPalette.segOff;
        ctx.fill();
      }
    }
    ctx.font = '300 10px ' + sans;
    ctx.fillStyle = item.rate > 0 ? exportPalette.muted : exportPalette.dim;
    ctx.textAlign = 'right';
    ctx.fillText(item.rate > 0 ? item.rate + ' / 5' : 'unrated', W - PAD, rowMid + 18);
    ctx.textAlign = 'left';
  }

  function drawLimitRow(ctx, cat, item, y) {
    const rowMid = y + ROW_H / 2;
    ctx.strokeStyle = exportPalette.limitRowRule;
    ctx.beginPath();
    ctx.moveTo(PAD, y + ROW_H);
    ctx.lineTo(W - PAD, y + ROW_H);
    ctx.stroke();

    const catLabel = cat.name.toUpperCase();
    ctx.font = FONT_PILL;
    const cw = ctx.measureText(catLabel).width + 24;
    exRoundRect(ctx, W - PAD - cw, rowMid - 12, cw, 24, 12);
    ctx.strokeStyle = exportPalette.limitPillStroke;
    ctx.stroke();
    ctx.fillStyle = exportPalette.limitPillText;
    ctx.textAlign = 'center';
    ctx.fillText(catLabel, W - PAD - cw / 2, rowMid + 4);

    ctx.textAlign = 'left';
    ctx.font = FONT_BODY;
    ctx.fillStyle = exportPalette.text;
    ctx.fillText(exFitText(ctx, item, W - PAD - cw - PAD - 20), PAD, rowMid + 6);
  }

  function drawNotesBlock(ctx, title, lines, y, bh) {
    ctx.textAlign = 'left';
    ctx.fillStyle = exportPalette.card;
    exRoundRect(ctx, PAD, y, W - PAD * 2, bh, 3);
    ctx.fill();
    ctx.strokeStyle = exportPalette.border;
    ctx.stroke();
    ctx.font = '500 12px ' + sans;
    ctx.fillStyle = exportPalette.muted;
    ctx.fillText(title.toUpperCase(), PAD + NOTES_TEXT_INSET, y + 32);
    ctx.font = FONT_BODY;
    ctx.fillStyle = exportPalette.text;
    lines.forEach((ln, i) => ctx.fillText(ln, PAD + NOTES_TEXT_INSET, y + 60 + i * NOTES_LINE_H));
  }

  // ---- build a flat list of blocks to lay out across cards ----
  // A section header is fused with its first row so a header never ends
  // up alone at the bottom of a card with its items pushed to the next.
  const blocks = [];
  data.forEach(sec => {
    const [first, ...rest] = sec.items;
    blocks.push({
      h: SEC_HEAD + ROW_H,
      draw(ctx, y) {
        ctx.textAlign = 'left';
        ctx.font = '26px ' + serif;
        ctx.fillStyle = exportPalette.accent2;
        ctx.fillText(catIcon(sec.id) + '  ' + sec.name, PAD, y + 26);
        ctx.strokeStyle = exportPalette.border;
        ctx.beginPath();
        ctx.moveTo(PAD, y + 40);
        ctx.lineTo(W - PAD, y + 40);
        ctx.stroke();
        drawItemRow(ctx, first, y + SEC_HEAD);
      }
    });
    rest.forEach(item => {
      blocks.push({ h: ROW_H, draw(ctx, y) { drawItemRow(ctx, item, y); } });
    });
    blocks.push({ h: SEC_GAP, spacer: true, draw() {} });
  });

  if (limitCount > 0) {
    const flat = limits.flatMap(cat => cat.items.map(item => ({ cat, item })));
    const [first, ...rest] = flat;
    blocks.push({
      h: SEC_HEAD + ROW_H,
      draw(ctx, y) {
        ctx.textAlign = 'left';
        ctx.font = '26px ' + serif;
        ctx.fillStyle = exportPalette.limitHead;
        ctx.fillText('⛔  Limits', PAD, y + 26);
        ctx.strokeStyle = exportPalette.limitRule;
        ctx.beginPath();
        ctx.moveTo(PAD, y + 40);
        ctx.lineTo(W - PAD, y + 40);
        ctx.stroke();
        drawLimitRow(ctx, first.cat, first.item, y + SEC_HEAD);
      }
    });
    rest.forEach(({ cat, item }) => {
      blocks.push({ h: ROW_H, draw(ctx, y) { drawLimitRow(ctx, cat, item, y); } });
    });
    blocks.push({ h: SEC_GAP, spacer: true, draw() {} });
  }

  const addNotesBlock = (title, lines) => {
    if (!lines.length) return;
    const bh = NOTES_HEAD_H + lines.length * NOTES_LINE_H;
    blocks.push({ h: bh + NOTES_BLOCK_GAP, draw(ctx, y) { drawNotesBlock(ctx, title, lines, y, bh); } });
  };
  addNotesBlock('Additional Hard Limits', limitLines);
  addNotesBlock('Notes', noteLines);

  // ---- paginate blocks into fixed-height cards ----
  const pages = [];
  let i = 0;
  while (i < blocks.length) {
    while (i < blocks.length && blocks[i].spacer) i++; // don't open a page with a spacer
    if (i >= blocks.length) break;
    const page = [];
    let used = 0;
    while (i < blocks.length) {
      const b = blocks[i];
      if (used + b.h > contentMaxH && page.length > 0) break;
      page.push({ block: b, y: used });
      used += b.h;
      i++;
    }
    pages.push(page);
  }
  if (pages.length === 0) pages.push([]);

  const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  // ---- render + download each card ----
  for (let p = 0; p < pages.length; p++) {
    btn.textContent = pages.length > 1 ? `Rendering… (${p + 1}/${pages.length})` : 'Rendering…';

    const canvas = document.createElement('canvas');
    canvas.width = W * SCALE;
    canvas.height = CARD_H * SCALE;
    const ctx = canvas.getContext('2d');
    ctx.scale(SCALE, SCALE);
    ctx.textBaseline = 'alphabetic';

    // background
    ctx.fillStyle = exportPalette.bg;
    ctx.fillRect(0, 0, W, CARD_H);
    const glow = ctx.createRadialGradient(W * 0.2, 200, 0, W * 0.2, 200, 700);
    glow.addColorStop(0, exportPalette.glow);
    glow.addColorStop(1, exportPalette.glowFade);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, CARD_H);

    // header (repeated on every card so each one stands alone)
    ctx.textAlign = 'center';
    ctx.fillStyle = exportPalette.accent3;
    ctx.font = '300 40px ' + serif;
    ctx.fillText('Kink Compass', W / 2, 56);
    ctx.fillStyle = exportPalette.muted;
    ctx.font = 'italic 300 18px ' + serif;
    ctx.fillText(state.role || 'Not specified', W / 2, 84);
    if (pages.length > 1) {
      ctx.textAlign = 'right';
      ctx.font = '500 13px ' + sans;
      ctx.fillStyle = exportPalette.dim;
      ctx.fillText(`${p + 1} / ${pages.length}`, W - PAD, 56);
    }
    ctx.strokeStyle = exportPalette.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, HEADER_H - 20);
    ctx.lineTo(W - PAD, HEADER_H - 20);
    ctx.stroke();

    // content
    pages[p].forEach(({ block, y }) => block.draw(ctx, HEADER_H + y));

    // footer
    ctx.textAlign = 'center';
    ctx.font = 'italic 300 14px ' + serif;
    ctx.fillStyle = exportPalette.dim;
    ctx.fillText('Created with Kink Compass • ' + dateStr, W / 2, CARD_H - 28);

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const dateSlug = new Date().toISOString().slice(0, 10);
    a.download = pages.length > 1
      ? `kink-compass-${dateSlug}-${p + 1}of${pages.length}.png`
      : `kink-compass-${dateSlug}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), BLOB_REVOKE_MS);
    if (p < pages.length - 1) await new Promise(resolve => setTimeout(resolve, DOWNLOAD_GAP_MS));
  }

  btn.textContent = 'Downloaded!';
  btn.classList.add('done');
  setTimeout(() => {
    btn.textContent = 'Download as Image';
    btn.classList.remove('done');
  }, 2600);
}

// ============================================================
// UTIL
// ============================================================
function escAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function tipSpan(text) {
  const desc = TOOLTIPS[text];
  const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return desc
    ? `<abbr class="has-tip" title="${escAttr(desc)}">${safe}</abbr>`
    : safe;
}

// ============================================================
// MOBILE TOOLTIPS -- native `title` only shows on desktop hover,
// so touch devices get a long-press popup instead. A quick tap
// still falls through to whatever the element normally does
// (select a role, quick-add on the review screen, etc.) so this
// never hijacks the existing tap-to-choose interactions.
// ============================================================
const TIP_HOLD_MS = 380;
let tipTimer = null;
let tipSuppressClick = false;
let tipPopupEl = null;
let tipActiveEl = null;

function ensureTipPopup() {
  if (!tipPopupEl) {
    tipPopupEl = document.createElement('div');
    tipPopupEl.id = 'tip-popup';
    tipPopupEl.setAttribute('role', 'tooltip');
    document.body.appendChild(tipPopupEl);
  }
  return tipPopupEl;
}

function positionTipPopup(el) {
  const pop = tipPopupEl;
  const r = el.getBoundingClientRect();
  const margin = 12;
  const pw = pop.offsetWidth;
  const ph = pop.offsetHeight;
  let left = r.left + r.width / 2 - pw / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - pw - margin));
  let top = r.bottom + 10;
  if (top + ph > window.innerHeight - margin) {
    top = Math.max(margin, r.top - ph - 10);
  }
  pop.style.left = left + 'px';
  pop.style.top = top + 'px';
}

function showTipPopup(el) {
  const desc = el.getAttribute('title');
  if (!desc) return;
  const pop = ensureTipPopup();
  pop.textContent = desc;
  tipActiveEl = el;
  positionTipPopup(el);
  pop.classList.add('show');
}

function hideTipPopup() {
  if (tipPopupEl) tipPopupEl.classList.remove('show');
  tipActiveEl = null;
}

document.addEventListener('pointerdown', e => {
  if (tipActiveEl && !e.target.closest('#tip-popup')) hideTipPopup();
  const el = e.target.closest && e.target.closest('.has-tip');
  if (!el) return;
  tipSuppressClick = false;
  clearTimeout(tipTimer);
  tipTimer = setTimeout(() => {
    showTipPopup(el);
    tipSuppressClick = true;
  }, TIP_HOLD_MS);
});
document.addEventListener('pointerup', () => clearTimeout(tipTimer));
document.addEventListener('pointercancel', () => clearTimeout(tipTimer));

// swallow the click that follows a long-press so it doesn't also
// trigger the element's normal select/quick-add behavior
document.addEventListener('click', e => {
  if (tipSuppressClick) {
    e.preventDefault();
    e.stopPropagation();
    tipSuppressClick = false;
  }
}, true);

window.addEventListener('scroll', hideTipPopup, true);
window.addEventListener('resize', hideTipPopup);

// ============================================================
// INIT
// ============================================================
(function init() {
  buildRoleScreen();
  buildCatScreen();
})();

