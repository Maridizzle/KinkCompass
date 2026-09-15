// ============================================================
// data.js  —  static content the wizard reads: roles, interest
//             levels, directions, categories + their items,
//             category icons, and tooltip descriptions
// Exposes: ROLES, INTEREST_NONE, DIRECTION_NO, DIRECTION_BOTH,
//   INTEREST_LEVELS, DIRECTIONS, CATEGORIES, CAT_ICONS, catIcon,
//   TOOLTIPS
// Loads before: app.js
// ============================================================

// ============================================================
// DATA
// ============================================================
const ROLES = [
  'Dominant (Dom)',
  'Mostly Dominant',
  '50/50 Switch',
  'Mostly Submissive',
  'Submissive (Sub)',
  'Exploring / Not Sure'
];

// Sentinel values that app.js compares against directly.
const INTEREST_NONE  = 'none';   // category interest: skip it entirely
const DIRECTION_NO   = 'no';     // item direction: not selected
const DIRECTION_BOTH = 'both';   // item direction: default for quick-add on the review screen

const INTEREST_LEVELS = [
  { val: INTEREST_NONE, label: 'None' },
  { val: 'little',  label: 'A Little' },
  { val: 'kind_of', label: 'Kind Of' },
  { val: 'very',    label: 'Very Interested' }
];

const DIRECTIONS = [
  { val: 'give',    label: 'Give' },
  { val: 'receive', label: 'Receive' },
  { val: DIRECTION_BOTH, label: 'Both' },
  { val: DIRECTION_NO,   label: 'No' }
];

const CATEGORIES = [
  { id: 'romance', name: 'Romance & Affection', items: [
    'Candlelit dinners', 'Slow dancing', 'Love notes or letters',
    'Surprise dates', 'Cuddling on the couch', 'Holding hands in public',
    'Forehead / cheek kisses', 'Morning affection', 'Giving or receiving flowers',
    'Pillow talk', 'Bubble baths together', 'Slow, lingering goodbyes'
  ]},
  { id: 'vanilla', name: 'Vanilla & Everyday Intimacy', items: [
    'Slow, unhurried sex', 'Making out / extended kissing', 'Spooning',
    'Showering together', 'Sensual massage (non-kink)', 'Trying new positions',
    'Skinny dipping', 'Lazy mornings in bed', 'Cooking a meal together',
    'Reading or relaxing in bed together', 'Falling asleep in each other\'s arms',
    'Gentle teasing / playful affection'
  ]},
  { id: 'bondage', name: 'Bondage & Restraint', items: [
    'Rope bondage', 'Handcuffs / cuffs', 'Spreader bars',
    'Hogtie', 'Suspension bondage', 'Chest / body harness',
    'Predicament bondage', 'Gags (ball, bit, cloth)', 'Muzzles'
  ]},
  { id: 'impact', name: 'Impact Play', items: [
    'Spanking', 'Flogging', 'Caning', 'Paddling',
    'Strapping / belting', 'Slapping (face / thighs)',
    'Thigh slapping', 'Genital impact', 'Nipple torture'
  ]},
  { id: 'sensory', name: 'Sensory Play', items: [
    'Wax play', 'Ice play', 'Feather / light touch teasing',
    'Scratching', 'Temperature play',
    'Texture play (fur, leather, etc.)', 'Sensory overload'
  ]},
  { id: 'power', name: 'Power Exchange / D/s', items: [
    'Verbal orders / commands', 'Daily rules and tasks',
    'Orgasm control / permission to cum', 'Speech restrictions or silence rules',
    'Position and posture training', 'Ritual greetings and goodbyes',
    'Eye contact rules', 'Protocol enforcement',
    'Bedtime / wake-up routines', 'Clothing control',
    'Permission for basic actions', 'Collaring rituals',
    'Ownership marks', '24/7 dynamic elements',
    'Total Power Exchange fantasy', 'Slave training positions'
  ]},
  { id: 'roleplay', name: 'Roleplay & Fantasy', items: [
    'CNC (consensual non-consent)', 'Kidnapping / capture fantasy',
    'Stranger / pickup scenario', 'Authority figure roleplay',
    'Uniform / costume play', 'Historical / period roleplay',
    'Monster / creature fantasy', 'Scripted scenes'
  ]},
  { id: 'humiliation', name: 'Humiliation / Degradation', items: [
    'Verbal humiliation / degradation', 'Name calling',
    'Being ignored / objectified', 'Human furniture', 'Crawling',
    'Forced nudity', 'Degrading tasks', 'Property writing on body',
    'Corner time or kneeling', 'Writing lines', 'Verbal scolding'
  ]},
  { id: 'exhib', name: 'Exhibitionism / Voyeurism', items: [
    'Public teasing', 'Remote control toys in public',
    'Mirror play', 'Being watched during play',
    'Watching others', 'Private recording', 'Semi-public exposure'
  ]},
  { id: 'orgasm', name: 'Orgasm Control', items: [
    'Orgasm denial', 'Edging', 'Forced orgasms', 'Ruined orgasms',
    'Chastity devices', 'Tease and denial',
    'Permission to cum required', 'Counted / rationed orgasms'
  ]},
  { id: 'dep', name: 'Sensory Deprivation', items: [
    'Blindfolds', 'Earplugs / noise canceling',
    'Hoods', 'Full sensory deprivation', 'Isolation play'
  ]},
  { id: 'pet', name: 'Pet Play', items: [
    'Puppy play', 'Kitten play', 'Pony play',
    'Pet names and crawling', 'Leash and collar in play',
    'Being caged', 'Feeding from bowl', 'Pet gear / accessories'
  ]},
  { id: 'medical', name: 'Medical Play', items: [
    'Exam / doctor roleplay', 'Needle play', 'Enemas',
    'Medical restraints', 'Clinical inspection', 'Speculum play'
  ]},
  { id: 'water', name: 'Watersports', items: [
    'Golden showers', 'Marking / territory play',
    'Desperation play', 'Wetting'
  ]},
  { id: 'cum', name: 'Cum Play', items: [
    'Cum on body', 'Cum on face', 'Swallowing',
    'Cum as reward or punishment', 'Creampie', 'Multiple loads'
  ]},
  { id: 'wax_fire', name: 'Wax / Fire / Electro', items: [
    'Candle wax dripping', 'Fire cupping', 'Fire play',
    'E-stim / electrostimulation', 'TENS unit', 'Violet wand'
  ]},
  { id: 'breath', name: 'Breath Play', items: [
    'Light breath restriction', 'Hand over mouth',
    'Throat holding / choking', 'Smothering'
  ]},
  { id: 'ageplay', name: 'Age Play / DDLG', items: [
    'DDLG / CGL dynamic', 'Little space', 'Caregiver role',
    'Age regression elements', 'Comfort items in play',
    'Discipline as caregiver', 'Bedtime routines as dynamic'
  ]},
  { id: 'general', name: 'General Kinks', items: [
    'Dirty talk', 'Hair pulling', 'Biting / marking',
    'Toys (vibrators, plugs, etc.)', 'Anal play', 'Oral worship',
    'Free use', 'Domestic service',
    'Body worship (feet, ass, etc.)', 'Aftercare rituals'
  ]}
];

const CAT_ICONS = {
  romance:     '🌹',
  vanilla:     '💗',
  bondage:     '🪢',
  impact:      '💥',
  sensory:     '🪶',
  power:       '👑',
  roleplay:    '🎭',
  humiliation: '🙇',
  exhib:       '👁️',
  orgasm:      '⏳',
  dep:         '🕶️',
  pet:         '🐾',
  medical:     '🩺',
  water:       '💧',
  cum:         '💦',
  wax_fire:    '🔥',
  breath:      '🌬️',
  ageplay:     '🧸',
  general:     '✨'
};

function catIcon(id) { return CAT_ICONS[id] || '✦'; }

// ============================================================
// TOOLTIP DESCRIPTIONS
// ============================================================
const TOOLTIPS = {
  // BONDAGE (self-evident items)
  'Rope bondage': 'Use of rope to bind a partner\'s limbs or body. Material (cotton, jute, nylon) affects feel and friction. Technique determines pressure distribution; all ties should be checked regularly for circulation and nerve impact.',
  'Handcuffs / cuffs': 'Rigid or hinged metal (or leather/padded) restraints that lock around the wrists or ankles. Metal cuffs can cause nerve compression if pressure is applied; padded leather cuffs distribute force more evenly.',

  // IMPACT (self-evident items)
  'Spanking': 'Striking the buttocks with an open hand. The most common entry point to impact play; intensity is controlled by swing force, hand cupping, and target area (upper vs. lower gluteal).',
  'Paddling': 'Striking with a flat, rigid implement—typically wood or leather—producing a broad, concentrated impact. Surface area and rigidity make paddles more intense per strike than a hand.',
  'Slapping (face / thighs)': 'Open-hand strikes to the face or inner/outer thighs. Face slapping carries risk of eardrum damage and requires controlled force and proper angle; thigh slapping targets a large muscle mass with fewer critical structures.',
  'Thigh slapping': 'Directed open-hand or implement strikes to the inner or outer thigh muscles. A large, padded target with good blood supply; bruising is common at moderate-to-high intensity.',

  // SENSORY (self-evident items)
  'Wax play': 'Dripping or applying molten wax to the skin for heat sensation. Paraffin candles burn hotter than soy or massage-specific candles. Pour height controls cooling time before contact.',
  'Ice play': 'Application of ice cubes or cold objects to the skin as temperature-contrast sensation play. Often combined with warm wax for alternating stimuli.',
  'Feather / light touch teasing': 'Use of feathers, soft brushes, or fingertip contact to deliver very light tactile stimulation. Activates light-touch nerve receptors (Meissner\'s corpuscles) and can feel pleasurable or intensely ticklish depending on context.',
  'Scratching': 'Dragging fingernails or purpose-made tools across skin to produce stimulation ranging from light sensation to marked skin. Breaks the skin at high pressure; risk of infection if skin integrity is compromised.',

  // POWER EXCHANGE (self-evident items)
  'Verbal orders / commands': 'Direct spoken instructions given by a dominant that the submissive is expected to follow immediately. A foundational element of D/s that establishes authority through language rather than physical means.',

  // HUMILIATION (self-evident items)
  'Verbal humiliation / degradation': 'Use of language—insults, belittling statements, derogatory terms—to create a psychological experience of shame or lowness in a consenting recipient.',
  'Name calling': 'Use of specific terms of address—demeaning, objectifying, or possessive—as part of a humiliation or power-exchange dynamic. Names used are agreed upon in advance.',
  'Crawling': 'Moving on hands and knees rather than upright, used to reinforce submission, pet-play dynamics, or objectification. May be combined with leash or collar use.',
  'Verbal scolding': 'Spoken reprimand delivered by a dominant to a submissive in a disciplinary context—criticizing behavior, issuing corrections, or expressing displeasure—as part of a structured power dynamic.',

  // EXHIBITIONISM (self-evident items)
  'Public teasing': 'Discreet stimulation or provocation of a partner in a public setting, maintaining an outwardly normal appearance while the partner experiences private arousal.',
  'Watching others': 'Erotic interest in observing other consenting people engaged in intimate activity—voyeurism. All observed parties must be aware of and consented to the observation.',
  'Private recording': 'Creating audio or video recordings of intimate activity for private use. Requires explicit informed consent from all participants; storage, sharing, and deletion should be negotiated in advance.',

  // ORGASM CONTROL (self-evident items)
  'Orgasm denial': 'Complete prevention of orgasm, enforced through strict rules, physical restraint, or chastity devices. Distinguished from edging in that the goal is total withholding rather than repeated near-climax stimulation.',
  'Forced orgasms': 'Stimulation continued past the point where the recipient has reached orgasm or is experiencing overstimulation, often requiring restraint to prevent escape. Explores the boundary between pleasure and overwhelm.',
  'Permission to cum required': 'A rule within an orgasm-control dynamic requiring the submissive to verbally request permission before climaxing. Reinforces the dominant\'s authority over the submissive\'s body during intimacy.',

  // SENSORY DEPRIVATION (self-evident items)
  'Blindfolds': 'Coverings placed over the eyes to eliminate or reduce vision. Shifts focus to remaining senses (hearing, touch, smell) and creates psychological vulnerability through uncertainty about what will happen next.',
  'Earplugs / noise canceling': 'Devices worn in or over the ears to reduce or eliminate auditory input. Combined with blindfolding, creates a high degree of sensory isolation.',

  // MEDICAL (self-evident items)
  'Exam / doctor roleplay': 'A scene structured around a clinical examination—physical assessment, measurement, internal checks—using the doctor/patient power dynamic as the erotic or psychological framework.',

  // CUM PLAY (self-evident items)
  'Cum on body': 'External ejaculation onto a partner\'s body surface, often used for marking, visual, or degradation purposes within a power-exchange context.',
  'Cum on face': 'External ejaculation directed onto a partner\'s face, a practice frequently associated with dominance, degradation, or possession dynamics.',
  'Swallowing': 'Ingestion of ejaculate following oral sex. Standard safer-sex considerations apply; certain STIs (HIV, gonorrhea, others) can be transmitted via ejaculate.',
  'Cum as reward or punishment': 'Use of ejaculate—its presence, absence, placement, or ingestion—as an outcome tied to the submissive\'s behavior, compliance, or performance within a dynamic.',
  'Creampie': 'Internal ejaculation into a partner\'s vagina or anus; the ejaculate remains inside or is visibly displayed after withdrawal. Often carries possession or marking significance in power-exchange contexts.',
  'Multiple loads': 'A scene involving ejaculation by multiple partners in sequence or simultaneously. Requires explicit informed consent and thorough STI negotiation with all participants.',

  // ROLES
  'Dominant (Dom)': 'The partner who takes the active, directing role in a power exchange. Responsible for setting scene parameters, monitoring their partner\'s wellbeing, and holding authority within negotiated limits.',
  'Mostly Dominant': 'Primarily takes the directing role in a dynamic but has capacity for or interest in submission depending on context and partner.',
  '50/50 Switch': 'A practitioner who engages in both dominant and submissive roles. May switch within a single scene, across different sessions, or with different partners.',
  'Mostly Submissive': 'Primarily adopts a receptive, following role but retains capacity for dominance in specific contexts.',
  'Submissive (Sub)': 'Consensually cedes control, direction, and authority to a partner within pre-negotiated limits and boundaries.',
  'Exploring / Not Sure': 'No established role identity; currently discovering individual preferences through experience, reading, or community engagement.',

  // CATEGORIES
  'Romance & Affection': 'Gestures of tenderness and courtship that build emotional closeness &mdash; small acts of care, attention, and thoughtfulness that don\'t require a kink framework to feel meaningful.',
  'Vanilla & Everyday Intimacy': 'Non-kink physical and emotional intimacy &mdash; the comfortable, unhurried side of a sexual and romantic connection, valuable on its own or alongside kink.',
  'Bondage & Restraint': 'Use of physical constraints to restrict a person\'s movement. Encompasses techniques from simple wrist ties to elaborate full-body rope work, and implements from handcuffs to custom harnesses.',
  'Impact Play': 'Consensual striking of the body for sensation, using hands or implements. Intensity, implement type, and target area determine the range from mild sting to deep thud.',
  'Sensory Play': 'Deliberate manipulation of the senses—touch, temperature, texture—to heighten awareness, alter perception, or create specific physical sensations.',
  'Power Exchange / D/s': 'A negotiated dynamic in which one person (Dominant) holds authority over another (submissive). D/s stands for Dominant/submissive. Can range from brief scenes to continuous 24/7 arrangements.',
  'Roleplay & Fantasy': 'Consensual enactment of scenarios, characters, or narratives for erotic or psychological exploration. Relies on pre-scene negotiation to establish scope and limits.',
  'Humiliation / Degradation': 'Consensual acts or language intended to evoke psychological feelings of shame, smallness, or objectification in a receiver who finds this erotic or meaningful.',
  'Exhibitionism / Voyeurism': 'Exhibitionism: erotic arousal from being observed during intimate activity. Voyeurism: erotic arousal from observing others. Both require full consent of all parties involved.',
  'Orgasm Control': 'A power-exchange practice in which one person controls the timing, frequency, or circumstances under which another is permitted to reach orgasm.',
  'Sensory Deprivation': 'Deliberate removal or reduction of one or more senses—most commonly sight and hearing—to intensify remaining sensory input and create psychological vulnerability.',
  'Pet Play': 'Roleplay in which one participant embodies an animal persona and is handled, cared for, or trained by an "owner." Common species include puppy, kitten, and pony.',
  'Medical Play': 'Roleplay or sensory activities that simulate a clinical or medical setting—examinations, procedures, restraints—for psychological or sensation-based purposes.',
  'Watersports': 'A euphemism for sexual activity involving urine (urolagnia). Encompasses symbolic power-exchange (marking) as well as physical contact. Distinct from scat play.',
  'Cum Play': 'Activities centered on ejaculate—its placement, display, consumption, or use as a reward or punishment—often carrying power-exchange or degradation elements.',
  'Wax / Fire / Electro': 'A grouping of sensation-focused activities using heat (dripped wax, fire) or electrical current. Each modality carries specific safety requirements and risk profiles.',
  'Breath Play': 'Any activity that restricts or controls breathing. Considered among the highest-risk BDSM practices due to proximity to critical airway and vascular structures; carries risk even at low intensity.',
  'Age Play / DDLG': 'Consensual adult roleplay in which one participant adopts a younger, care-receiving persona ("little") while another takes a nurturing or disciplinary caregiver role. DDLG = Daddy Dom / Little Girl; CGL = Caregiver / Little. All participants are adults.',
  'General Kinks': 'A collection of widely practiced activities that span multiple categories or do not fit neatly into a single specialized grouping.',

  // BONDAGE
  'Spreader bars': 'A rigid bar with cuff or attachment points at each end, used to hold limbs apart at a fixed distance. Prevents the restrained person from closing legs or arms, maintaining exposure.',
  'Hogtie': 'A bondage position in which wrists and ankles are restrained behind the back and connected together. Places the body prone in an arched position; significantly limits mobility.',
  'Suspension bondage': 'A rope bondage practice in which the bound person is lifted fully or partially off the ground. Requires advanced rigging knowledge, load-rated hardware, and continuous safety monitoring.',
  'Chest / body harness': 'A rope or leather configuration tied around the torso, distributing pressure across the chest and back. Can be decorative (shibari aesthetic) or functional (attachment point for restraint or suspension).',
  'Predicament bondage': 'A bondage scenario designed so that any movement to relieve discomfort in one area creates discomfort or exposure elsewhere, forcing the restrained person into an ongoing series of physical choices.',
  'Gags (ball, bit, cloth)': 'Devices placed in or over the mouth to limit verbal communication. A ball gag uses a spherical object; a bit gag mimics an equestrian bit; a cloth gag uses fabric. All impair the standard verbal safeword—an alternative signal (e.g., hand drop, humming) is essential.',
  'Muzzles': 'A covering placed over the nose and mouth for restraint, sensory reduction, or pet-play aesthetics. Restricts speech; some designs also limit breathing—verify adequate ventilation before use.',

  // IMPACT
  'Flogging': 'Striking with a multi-tailed implement (flogger). Sensation ranges from soft and thuddy (suede tails) to sharp and stingy (thin leather or rubber tails). Technique, swing arc, and target area determine intensity.',
  'Caning': 'Striking with a thin, rigid rod—typically rattan or synthetic cane. Produces sharp, highly localized, intense sensation. Carries significant bruising and skin-breaking risk at higher intensities; formal technique is strongly advised.',
  'Strapping / belting': 'Striking with a wide, flat leather strap or belt. Produces a broad, thuddy impact covering a larger surface area than a cane.',
  'Genital impact': 'Directed impact to the genitals. A specialized form of impact play requiring significant negotiation, anatomical awareness, and graduated intensity due to the density of sensitive structures in the area.',
  'Nipple torture': 'Umbrella term for intense nipple stimulation including clamping, pinching, twisting, striking, or suction. Intensity can range from mild to extreme; monitor circulation when using clamps.',

  // SENSORY
  'Temperature play': 'Deliberate application of hot or cold stimuli—ice cubes, warmed implements, cool metal, dripped wax—to create contrasting skin sensations and heighten tactile awareness.',
  'Texture play (fur, leather, etc.)': 'Systematic use of varied tactile surfaces—fur, leather, sandpaper, silk, bristles—on the skin to stimulate diverse nerve receptors and build or contrast sensation.',
  'Sensory overload': 'Deliberate stimulation of multiple senses simultaneously at high intensity to overwhelm cognitive processing, creating disorientation or an altered psychological state.',

  // POWER EXCHANGE
  'Daily rules and tasks': 'Ongoing behavioral requirements assigned by a dominant—rituals, chores, reporting protocols—that maintain a power dynamic outside of explicitly sexual scenes.',
  'Orgasm control / permission to cum': 'A practice in which the submissive must request or wait for explicit permission before reaching orgasm, reinforcing the dominant\'s authority over their body.',
  'Speech restrictions or silence rules': 'Rules governing how or whether a submissive may speak—required forms of address, forbidden words, or full silence—used to reinforce protocol and power differential.',
  'Position and posture training': 'Instruction and enforcement of specific body positions a submissive must hold on command, used to instill discipline, focus, and physical awareness of the dynamic.',
  'Ritual greetings and goodbyes': 'Prescribed physical or verbal actions performed whenever partners meet or part, used to reinforce and mark the boundaries of a power-exchange relationship.',
  'Eye contact rules': 'Protocols governing when a submissive may or may not make direct eye contact with a dominant, used to symbolize and reinforce hierarchy.',
  'Protocol enforcement': 'The consistent application of formal behavioral rules—posture requirements, titles, permitted speech—that define and sustain a structured power dynamic.',
  'Bedtime / wake-up routines': 'Rituals surrounding sleep transitions that extend a dynamic into daily life, such as asking permission to sleep or specific morning reporting behaviors.',
  'Clothing control': 'A dominant directing or approving what a submissive wears, reinforcing authority over their presentation and a degree of bodily autonomy.',
  'Permission for basic actions': 'Requiring a submissive to ask explicit permission before common activities (eating, using the bathroom, sitting on furniture), intensifying a sense of controlled dependency.',
  'Collaring rituals': 'A formal ceremony—ranging from a private exchange to a community event—in which a collar is placed on a submissive as a symbol of ownership, commitment, or established D/s status.',
  'Ownership marks': 'Temporary or permanent markings used to signify that a person is claimed by another. Methods include written text, bruising, piercings, or tattoos; always requires full informed consent.',
  '24/7 dynamic elements': 'Aspects of a power-exchange relationship maintained continuously outside designated scene time, integrating the dynamic into daily routines and decisions.',
  'Total Power Exchange fantasy': 'A conceptual arrangement in which a submissive surrenders comprehensive control—decisions, schedule, finances, possessions—to a dominant. Often treated as an aspirational framework; full literal 24/7 TPE is rare and requires meticulous negotiation.',
  'Slave training positions': 'A repertoire of prescribed body postures—kneeling configurations, presentation stances, display positions—assigned names and practiced until executed on command without additional instruction.',

  // ROLEPLAY
  'CNC (consensual non-consent)': 'A negotiated scene in which one partner acts out a non-consensual encounter that has been fully discussed and explicitly agreed to in advance. Requires extensive pre-negotiation; all parties retain the right to end the scene.',
  'Kidnapping / capture fantasy': 'A roleplay scenario involving the staged abduction or forced capture of one partner. Requires detailed prior negotiation of scenario limits, safewords, and physical safety protocols.',
  'Stranger / pickup scenario': 'A consensual scene in which partners act as strangers meeting for the first time, often incorporating seduction or coercive framing. The scenario is negotiated fully in advance despite the "spontaneous" presentation.',
  'Authority figure roleplay': 'Scenes built around a socially authoritative role—teacher, employer, officer, doctor—to create a structured, contextual power imbalance with associated expectations and consequences.',
  'Uniform / costume play': 'Use of specific clothing—uniforms, costumes, period dress—to establish character, reinforce role dynamics, or enhance immersion in a roleplay scenario.',
  'Historical / period roleplay': 'Scenes set in a specific historical era or cultural context, using period-appropriate language, roles, and dynamics as the framework for power exchange or erotic interaction.',
  'Monster / creature fantasy': 'Roleplay in which one or more participants embodies a non-human creature—mythological, fantasy, or horror-derived—for psychological, aesthetic, or sensation-based play.',
  'Scripted scenes': 'Highly structured scenes in which dialogue, actions, and outcomes are predetermined, allowing all participants to consent to specific acts in advance and removing ambiguity about scene progression.',

  // HUMILIATION
  'Being ignored / objectified': 'A practice in which a person is deliberately treated as if they have no independent presence—used as a prop, furniture, or tool—to reinforce submission through deliberate non-acknowledgment.',
  'Human furniture': 'Use of a person as a functional object: a footstool, table, or seat. A form of service submission that reinforces objectification by subordinating the person\'s comfort to practical use.',
  'Forced nudity': 'A dynamic in which a submissive is required to remain unclothed while others are dressed, reinforcing vulnerability, exposure, and power differential.',
  'Degrading tasks': 'Assigned behaviors designed to evoke a psychological sense of lowliness—serving in degrading postures, performing menial acts—used as a humiliation practice within a consensual framework.',
  'Property writing on body': 'Writing possessive phrases, degrading labels, or ownership claims directly on the submissive\'s skin using markers or similar implements as a temporary marking practice.',
  'Corner time or kneeling': 'A disciplinary or submissive practice in which a person is instructed to remain in a specific, often uncomfortable or exposed position for a defined period, as punishment or a submission demonstration.',
  'Writing lines': 'A repetitive writing task, modeled on traditional academic punishment, in which a submissive writes a phrase or rule a prescribed number of times as a disciplinary or humiliation measure.',

  // EXHIBITIONISM
  'Remote control toys in public': 'Wearable vibrators or plugs that can be activated wirelessly by a partner while both are in a public setting. Creates covert stimulation known only to those involved.',
  'Mirror play': 'Use of reflective surfaces during a scene to allow a participant to observe themselves, employed for exhibitionistic arousal, body awareness, or as a humiliation tool depending on context.',
  'Being watched during play': 'Engaging in a scene with one or more observers present who have consented to witness. Distinct from recording; the exhibitionistic arousal comes from live observation.',
  'Semi-public exposure': 'Partial or full nudity or intimate activity in spaces where discovery is possible but not guaranteed. Note: uninvolved third parties must not be exposed without their consent.',

  // ORGASM CONTROL
  'Edging': 'The practice of repeatedly bringing a person to the threshold of orgasm and then halting or reducing stimulation before climax, prolonging arousal and building intensity over time.',
  'Ruined orgasms': 'An orgasm in which stimulation is deliberately withdrawn at the precise moment of climax. Produces a physiological release without the full neurochemical reward of a complete orgasm, sustaining or increasing arousal afterward.',
  'Chastity devices': 'Physical devices—cages, belts, or shields—worn to mechanically prevent genital access, erection, or self-stimulation. Used as tools of orgasm-control and ongoing power-exchange.',
  'Tease and denial': 'Extended arousal through stimulation with explicit refusal to allow orgasm; may span minutes, hours, days, or longer. The denial itself is the primary dynamic, distinct from edging as a standalone technique.',
  'Counted / rationed orgasms': 'An orgasm-control structure in which a submissive is permitted only a pre-set number of orgasms within a given time period, tracked and enforced by the dominant.',

  // SENSORY DEPRIVATION
  'Hoods': 'Head coverings—made of leather, latex, spandex, or fabric—that restrict vision, muffle hearing, and create isolation. Some designs also cover the mouth; always verify adequate ventilation is maintained.',
  'Full sensory deprivation': 'Simultaneous elimination or reduction of sight, hearing, and tactile orientation, creating extreme psychological vulnerability and an altered sense of space and time.',
  'Isolation play': 'Placing a person alone in a confined, restricted, or featureless environment to create vulnerability through the absence of contact, stimulation, or external reference points.',

  // PET PLAY
  'Puppy play': 'Animal roleplay in which a participant embodies a dog persona—adopting canine body language, vocalizations, and behaviors. May involve specialized gear (hoods, paw mitts, tails) and an "owner" or "handler."',
  'Kitten play': 'Animal roleplay centered on a feline persona; typically characterized by independent yet affectionate behavior, grooming gestures, and cat-specific accessories such as ears, tails, and collar bells.',
  'Pony play': 'Animal roleplay in which a participant takes the role of a horse. May involve specialized tack (bit, reins, blinders, tail attachment), gait training, and equestrian-style handling by a "trainer" or "rider."',
  'Pet names and crawling': 'Use of an animal-derived name for the "pet" partner, combined with moving on all fours rather than upright, reinforcing the animal persona.',
  'Leash and collar in play': 'Use of a collar and attached leash to physically guide and direct a partner during a scene, reinforcing the handler/pet hierarchy through tangible control.',
  'Being caged': 'Confinement within a physical enclosure—a dog crate, custom cage, or similar structure—as part of pet play, service submission, or orgasm-control dynamics.',
  'Feeding from bowl': 'A pet-play practice in which the "pet" is fed or drinks from a floor-level bowl rather than using standard utensils, reinforcing the animal persona and service submission.',
  'Pet gear / accessories': 'Specialized equipment designed for animal roleplay: species-appropriate hoods, paw mitts or hoof covers, tail attachments (plug or belt-mounted), collar and leash sets, and feeding bowls.',

  // MEDICAL
  'Needle play': 'Insertion of sterile hypodermic needles into the superficial layers of skin for sensation—a form of edge play. Requires sterile technique, anatomical knowledge of safe zones, and thorough aftercare including wound monitoring.',
  'Enemas': 'Introduction of liquid into the rectum via the anus. Used in medical roleplay for clinical aesthetics, in control dynamics for psychological effect, or for hygiene in preparation for anal activities.',
  'Medical restraints': 'Restraint devices modeled on clinical tools—leather or cloth cuffs, restraint boards—used within medical roleplay or clinical-scene frameworks.',
  'Clinical inspection': 'A roleplay scenario in which a submissive is systematically examined, measured, or assessed in a formal, detached manner, emphasizing physical vulnerability and objectification through a clinical frame.',
  'Speculum play': 'Use of a gynecological speculum—vaginal or anal—for examination, inspection, or sensation within a medical or clinical play context. Requires lubrication and careful insertion technique.',

  // WATERSPORTS
  'Golden showers': 'Urination onto a partner\'s body, most commonly for power-exchange, marking, or humiliation purposes. Standard safer-sex precautions apply.',
  'Marking / territory play': 'Use of urine as a symbolic act of ownership or territorial claiming, emphasizing the dominant\'s possession of and authority over the submissive\'s body.',
  'Desperation play': 'Controlled restriction of a submissive\'s ability to urinate, creating physical urgency over time. Used for humiliation, control demonstration, or sensation. Monitor for discomfort to avoid medical complications.',
  'Wetting': 'Urinating on oneself—often under explicit instruction from a dominant—as a humiliation act or marking activity.',

  // WAX / FIRE / ELECTRO
  'Candle wax dripping': 'Dripping molten wax from a lit candle onto skin for heat sensation. Temperature is controlled by wax type (paraffin vs. soy vs. beeswax) and drop height—greater height allows more cooling before contact.',
  'Fire cupping': 'A technique in which a flame briefly heats the interior of a glass cup, which is then placed on the skin. Cooling creates suction, producing deep tissue sensation and characteristic circular marks.',
  'Fire play': 'Brief, controlled application of flame to the body\'s surface—typically using isopropyl alcohol ignited and rapidly extinguished—for sensation and psychological effect. Requires trained safety protocols, a spotter, and extinguishing materials on hand.',
  'E-stim / electrostimulation': 'Application of controlled low-level electrical current to the body for sensation play. Devices range from adapted medical TENS units to purpose-built erotic electrostimulation equipment. Keep current paths away from the heart, pacemakers, and metal implants.',
  'TENS unit': 'Transcutaneous Electrical Nerve Stimulation device, originally designed for physiotherapy pain management. Repurposed in sensation play by applying adhesive electrodes to skin. Keep electrode pairs on the same limb or body region; never run current across the chest or near the head.',
  'Violet wand': 'A high-frequency, low-current electrostatic device that produces a visible violet electrical arc at the point of contact. Delivers a distinctive tingling or prickling sensation. Still contraindicated with pacemakers and implanted electronic devices.',

  // BREATH PLAY
  'Light breath restriction': 'Brief, gentle interruption of breathing via a hand lightly placed over the mouth or similar minimal method. Even at low intensity, breath play carries inherent physiological risk—hypoxia and cardiac events can occur without warning.',
  'Hand over mouth': 'Covering the mouth (and sometimes nose) with a hand to muffle sound and briefly restrict airflow. Primarily used for the psychological effect of silencing and control rather than sustained oxygen restriction.',
  'Throat holding / choking': 'Application of pressure to the neck—either to the sides (carotid compression) or to the airway (tracheal compression). Considered extreme edge play: carotid restriction can cause loss of consciousness within seconds; structural damage, stroke, or death can result. Many safety educators advise against this practice entirely.',
  'Smothering': 'Restriction of breathing by pressing a body part over the nose and mouth. Distinct from neck compression; focuses on airway obstruction rather than vascular restriction. Carries risk of hypoxia even with brief application.',

  // AGE PLAY
  'DDLG / CGL dynamic': 'DDLG (Daddy Dom / Little Girl) or CGL (Caregiver / Little): a relationship structure in which one adult adopts an authoritative, nurturing caregiver role and another voluntarily shifts into a younger, care-receiving persona. Strictly between consenting adults; the "little" persona does not represent a minor.',
  'Little space': 'A voluntary, temporary psychological state in which an adult consciously shifts into a childlike headspace—characterized by reduced self-criticism, playfulness, and emotional openness—for comfort, stress relief, or as part of a CGL dynamic.',
  'Caregiver role': 'The partner in a CGL or age-play dynamic who provides structure, nurturing, guidance, and discipline. The caregiver is responsible for scene safety and monitoring the "little\'s" wellbeing throughout.',
  'Age regression elements': 'Practices—using comfort objects, simplified speech, coloring, watching cartoons—that facilitate the psychological shift into a "little space" or younger-feeling headspace.',
  'Comfort items in play': 'Objects such as stuffed animals, pacifiers, or blankets incorporated into age-play or little-space experiences as psychological anchors for the regressed state.',
  'Discipline as caregiver': 'Application of rules, consequences, and corrective measures by a caregiver to a "little" within a pre-negotiated framework, serving both as a power-exchange dynamic and a psychological structure.',
  'Bedtime routines as dynamic': 'Sleep transition rituals—storytime, tucking in, asking permission to sleep—used to extend a CGL or D/s dynamic into daily life and reinforce the caregiver/little relationship structure.',

  // GENERAL KINKS
  'Dirty talk': 'Verbal communication during intimate activity that is sexually explicit, commanding, degrading, or narrating; used to enhance arousal, reinforce role dynamics, or maintain psychological engagement.',
  'Hair pulling': 'Grasping and applying tension to a partner\'s hair as a form of physical control, mild pain play, or dominance signaling. Pulling from the root rather than the ends reduces risk of breakage and scalp injury.',
  'Biting / marking': 'Using the teeth to apply pressure or create temporary skin marks on a partner. Ranges from light nips to sustained pressure that leaves bruising. Breaks in skin carry infection risk.',
  'Toys (vibrators, plugs, etc.)': 'Mechanical or electronic devices used for sexual stimulation, including vibrators, dildos, butt plugs, clamps, and other implements. Material safety (body-safe silicone, glass, metal) and cleaning protocols are important considerations.',
  'Anal play': 'Sexual activity involving the anal region—external massage, digital penetration, or toy/penile penetration. The anus does not self-lubricate; generous lubrication and graduated insertion are required. All insertable objects should have a flared base or retrieval cord.',
  'Oral worship': 'Attentive, devoted oral attention to a partner\'s body or genitals, framed as an act of reverence or service that emphasizes the giving partner\'s submission and the receiving partner\'s authority.',
  'Free use': 'A consent-framework arrangement in which one partner agrees in advance to be available for the other\'s use at any time within agreed parameters, without requiring additional in-the-moment negotiation.',
  'Domestic service': 'A submission practice in which a partner performs household tasks—cooking, cleaning, organizing—as a tangible expression of service to a dominant. May be entirely non-sexual or combined with additional power-exchange elements.',
  'Body worship (feet, ass, etc.)': 'Focused, reverential physical attention—kissing, licking, massaging—directed at a specific body part, expressing adoration or submission through sustained, attentive contact.',
  'Aftercare rituals': 'Post-scene practices used to help participants transition safely from an altered psychological and physiological state back to baseline. May include physical comfort (blankets, water, food), verbal reassurance, or quiet time. Both dominant and submissive partners commonly benefit from and require aftercare.'
};

