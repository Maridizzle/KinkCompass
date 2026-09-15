# Kink Compass

A private, single-page self-assessment tool for exploring kink roles, interests, and
limits. It walks you through a short wizard — consent → role → categories → direction →
rating → review → results — and lets you export a summary as text or an image.

## Run it

No build step, no dependencies to install. Either:

- Open `index.html` directly in a browser, or
- Serve the folder statically, e.g. `python3 -m http.server` and visit the printed URL.

## Privacy

Everything runs in your browser and stays there. State is held **in memory only** — there
is no `localStorage`, no accounts, no analytics, and nothing is sent to a server. Closing
or reloading the tab clears everything. (The single exception is a web-font request to
Google Fonts for styling.)

## Project layout

```
index.html        # markup + wiring; loads the assets below
css/
  styles.css      # all styles
js/
  data.js         # content/data: roles, categories, activities, tooltip text
  app.js          # application logic: state, navigation, screens, exports
```

The two scripts are plain classic scripts loaded in order (`data.js` before `app.js`) —
no bundler or module system.

## Tech

Vanilla HTML, CSS, and JavaScript. One external dependency: Google Fonts.

## Status

This repository was first reorganized from a single 2,300-line HTML file into the layout
above, a behavior-preserving split with no logic changed. A follow-up readability pass has
since been completed in three stages, each behavior-preserving and verified against a
recorded golden output: named constants for magic numbers and sentinel strings, clearer
names for cryptic globals and off-family functions, and signposting (file headers, doc
comments, and section banners).

Two larger items are noted but not yet done: a few functions still run past the ~40-line
size guideline, and there is repeated markup across the build functions and the button
styles. Breaking those up is a real refactor rather than a readability pass, so it was left
for a later, separate change.
