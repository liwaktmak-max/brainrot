/* ==========================================================================
   BRAINROT — ARCHIVO ÚNICO DE CONFIGURACIÓN
   --------------------------------------------------------------------------
   Todo lo editable de la web está aquí: marca, colores, textos, enlaces,
   tokenomics, roadmap, FAQ, memes y disclaimer.
   Cambia este archivo y tendrás otra landing sin tocar HTML ni CSS.

   ⚠️  TODOS los números (supply, %, seguidores, chaos meter) son
       PLACEHOLDERS de un proyecto FICTICIO. Búscalos por "PLACEHOLDER".
   ========================================================================== */

window.BRAINROT_CONFIG = {

  /* ---------------------------------------------------------------- MARCA */
  brand: {
    name: 'BRAINROT',
    ticker: '$ROT',
    tagline: 'YOUR BRAIN IS COOKED',
    description: 'A meme coin about doomscrolling, bad decisions and internet culture. Experimental project — not financial advice.',
    url: 'https://liwaktmak-max.github.io/brainrot/', // URL pública (la reescribe configure.cmd)
    lang: 'en'
  },

  /* --------------------------------------------------------------- COLORES
     Se inyectan como CSS custom properties en :root. */
  colors: {
    bg:      '#09090B',
    pink:    '#FF3B81',
    green:   '#B7FF00',
    purple:  '#7C3AED',
    white:   '#FFFFFF'
  },

  /* -------------------------------------------------------------- IMÁGENES */
  images: {
    mascot:      'assets/images/mascot.jpg',      // cerebro rosa (hero)
    coin:        'assets/images/coin.jpg',        // moneda $ROT (story)
    og:          'assets/images/og-image.jpg',    // 1200x630 para redes
    favicon:     'assets/icons/favicon-32.png',
    appleIcon:   'assets/icons/favicon-180.png'
  },

  /* ---------------------------------------------------------- REDES SOCIALES
     Con una URL real sale como enlace; con "#" sale como botón que responde
     "NOT YET." y no aparece en el pie. */
  social: [
    { label: 'X / TWITTER', url: 'https://x.com/marielisabethh9' },
    { label: 'DISCORD',     url: 'https://discord.gg/6BjhC8tmS' },
    { label: 'TELEGRAM',    url: '#' }
  ],

  /* ------------------------------------------------------------- NAVEGACIÓN */
  nav: {
    links: [
      { label: 'STORY',    href: '#story' },
      { label: 'WHY',      href: '#why' },
      { label: 'UTILITY',  href: '#utility' },
      { label: 'MEME LAB', href: '#memes' },
      { label: 'TOKEN',    href: '#token' },
      { label: 'ROADMAP',  href: '#roadmap' }
    ],
    cta: { label: 'JOIN THE ROT', href: '#community' }
  },

  /* -------------------------------------------------------------------- HERO */
  hero: {
    badge: 'TOTAL BRAIN ROT DETECTED',
    titleTop: ['YOUR', 'BRAIN'],       // blanco
    titleBottom: ['IS', 'COOKED.'],    // rosa
    subtitle: 'The internet needed another terrible idea. So we made one.',
    primaryCta:   { label: 'JOIN THE ROT',        href: '#community' },
    secondaryCta: { label: 'I NEED TO KNOW MORE', href: '#story' },
    stats: [
      { label: 'TICKER',   value: '$ROT',          tone: 'white' },
      { label: 'VALUE',    value: 'ABSOLUTELY 0%', tone: 'green' }, // PLACEHOLDER
      { label: 'USE CASE', value: 'PURE CHAOS',    tone: 'pink'  }
    ],
    stickerTop:    'IT\'S FINE',
    stickerBottom: 'SEND HELP',
    scrollHint: 'SCROLL IF YOU DARE'
  },

  /* ------------------------------------------------------------------ TICKER */
  ticker: [
    { text: '$ROT', tone: 'pink' },
    { text: 'YOUR BRAIN, BUT WORSE' },
    { text: 'NO ROADMAP, NO PROBLEM' },
    { text: 'TOP 1 IN BRAIN ROT', tone: 'green' },
    { text: '0% REAL UTILITY' },
    { text: 'WE CAME FOR THE MEME, WE STAYED FOR THE MEME' },
    { text: 'STILL COOKED', tone: 'pink' },
    { text: 'NOBODY ASKED FOR THIS' }
  ],

  /* ------------------------------------------------------- 01 / THE STORY */
  story: {
    eyebrow: '01 / ORIGIN',
    titleWhite: 'HOW DID',
    titleGreen: 'WE GET HERE?',
    quote: 'We opened the internet for five minutes. Five hours later we had a meme coin, a mascot and zero memory of the last three tabs. Nobody stopped us. So here we are.',
    body: 'Nobody knows why it exists. Nobody knows who asked for it. There was no whitepaper, no venture round and no adult in the room — just a pink brain in a cap and a group chat that would not shut up. Your brain, statistically speaking, is already cooked.',
    imageCaption: 'EXHIBIT A — THE EVIDENCE'
  },

  /* ------------------------------------------------------ 02 / WHY EXISTS */
  why: {
    eyebrow: '02 / REASONS',
    titleLine1: 'WHY DOES',
    titleLine2: 'THIS EXIST?',
    cards: [
      { icon: '🧠', tag: 'REASON 01', tone: 'pink',   text: 'Because someone had to do it and nobody volunteered to stop it.' },
      { icon: '🗑️', tag: 'REASON 02', tone: 'green',  text: 'Because the internet needed another terrible idea this week.' },
      { icon: '⏳', tag: 'REASON 03', tone: 'purple', text: 'Because apparently we have free time and no supervision.' },
      { icon: '🐸', tag: 'REASON 04', tone: 'pink',   text: 'Because memes. That is the whole reason. That is it.' }
    ]
  },

  /* --------------------------------------------------------- 03 / UTILITY */
  utility: {
    eyebrow: '03 / UTILITY',
    title: 'REAL UTILITY',
    pill: 'SPOILER: ZERO PROMISES',
    items: [
      { tag: 'USE 01', tone: 'pink',   text: 'Makes you question your recent life choices.' },
      { tag: 'USE 02', tone: 'green',  text: 'Provides absolutely zero productivity, guaranteed.' },
      { tag: 'USE 03', tone: 'purple', text: 'Gives your group chat something new to argue about.' }
    ],
    bannerWhite: 'That\'s it.',
    bannerPink:  'That\'s the utility.'
  },

  /* ----------------------------------------------------- 04 / CHAOS METER
     100% local. Sin datos financieros. Si algún día conectas una API real,
     usa chaos.endpoint y app.js hará fetch en lugar de simular. */
  chaos: {
    eyebrow: '04 / CHAOS METER',
    pill: 'LIVE DEMO',
    label: 'CURRENT BRAIN STATUS',
    value: 87,                 // PLACEHOLDER (0-100)
    suffix: '% COOKED',
    endpoint: null,            // ej: 'https://tu-api/chaos' → { value: 87 }
    scale: ['00 FRESH', '25 MILD', '50 TOASTED', '75 COOKED', '100 GONE'],
    messages: [
      'Someone bought the meme.',
      'Someone sold the meme.',
      'Someone reposted the meme.',
      'Nobody knows what is happening.',
      'A brain was cooked in the last 4 seconds.',
      'Someone said "one more scroll".',
      'The group chat has opinions again.'
    ],
    note: 'SIMULATED — NOT MARKET DATA'
  },

  /* --------------------------------------------------------- 05 / ORACLE */
  oracle: {
    eyebrow: '05 / THE ORACLE',
    title: 'ASK THE ROT',
    subtitle: 'One question. One answer. Zero responsibility.',
    placeholder: 'Ask the rot anything…',
    button: 'ASK',
    answerLabel: 'ROT SAYS:',
    defaultAnswer: 'Ask me something. I have nothing better to do.',
    answers: [
      'Yes. Absolutely. Probably. Actually, no idea.',
      'Touch grass first, then ask again.',
      'The brain says maybe. The brain is unreliable.',
      'Have you considered closing the app? No? Same.',
      'That is a 3 AM question and it is 3 AM somewhere.',
      'My sources say: lol.',
      'Signs point to "you already know the answer".',
      'Reply hazy. Brain cooked. Try again after a nap.',
      'Ask your group chat. They are equally unqualified.',
      'This is not financial advice. This is not advice at all.',
      'Statistically? No. Emotionally? Also no.',
      'The vibes are immaculate. The logic is not.',
      'One more scroll and the answer appears. (It does not.)',
      'Consider: what would a pink brain in a cap do?'
    ]
  },

  /* -------------------------------------------------------- 06 / MEME LAB */
  memeLab: {
    eyebrow: '06 / MEME LAB',
    title: 'MEME LAB',
    subtitle: 'Certified brain damage, produced in-house. Screenshot it, post it, blame us.',
    shareLabel: 'SHARE',
    shareText: 'my brain is cooked and it is $ROT\'s fault',
    cards: [
      { mascot: 'cooked',    tag: 'HOT',   tone: 'pink',   title: 'YOUR BRAIN ON FEED',   text: 'Started the day with a plan. Ended it watching a man restore a rusty pan for 40 minutes.' },
      { mascot: 'melting',   tag: 'NEW',   tone: 'green',  title: 'THE SLOW MELT',        text: 'It does not happen all at once. It happens one "just five more minutes" at a time.' },
      { mascot: 'confused',  tag: 'TA',    tone: 'purple', title: 'TECHNICAL ANALYSIS',   text: 'Drew a line. Drew another line. Concluded that lines exist. This is now a strategy.' },
      { mascot: 'dead',      tag: 'SUN',   tone: 'pink',   title: 'DOOMSCROLL SUNDAY',    text: 'Woke up. Picked up phone. It is Tuesday. Nobody can explain the missing days.' },
      { mascot: 'hyper',     tag: 'GRASS', tone: 'green',  title: 'GRASS: 0 · SCREEN: 9', text: 'Outside was recommended by three separate doctors. The feed was recommended by nobody.' },
      { mascot: 'sleepy',    tag: '3AM',   tone: 'purple', title: 'THE 3 AM DECISION',    text: 'Every terrible idea in history was approved by a brain that should have been asleep.' }
    ]
  },

  /* ------------------------------------------------------- 07 / COMMUNITY
     Números marcados como PLACEHOLDER / demo. */
  community: {
    eyebrow: '07 / COMMUNITY',
    titleLine1: 'JOIN THE',
    titleLine2: 'BRAIN DAMAGE.',
    subtitle: 'No roadmap. No promises. Just thousands of strangers sharing pictures of a melted brain.',
    stats: [
      { value: '10,000+', label: 'TOTALLY REAL PEOPLE',   tone: 'pink'   }, // PLACEHOLDER
      { value: '999',     label: 'QUESTIONABLE DECISIONS', tone: 'green'  }, // PLACEHOLDER
      { value: '∞',       label: 'MEMES',                  tone: 'purple' }  // PLACEHOLDER
    ],
    note: 'Demo numbers. This is a meme project, not a metrics dashboard.'
  },

  /* ----------------------------------------------------- 08 / TOKENOMICS
     TODOS los porcentajes son PLACEHOLDER. */
  token: {
    eyebrow: '08 / TOKENOMICS',
    titleSymbol: '$',
    titleRest: 'ROT TOKEN',
    pill: '100% FICTIONAL',
    supplyLabel: 'TOTAL SUPPLY',
    supply: '1,000,000,000',
    supplyCaption: 'No presale. No private round. No contract. No token. Yet.',
    allocations: [
      { percent: '80%', tone: 'green',  label: 'COMMUNITY / MEMES', text: 'For the people who make the memes and the people who repost them.' },   // PLACEHOLDER
      { percent: '10%', tone: 'pink',   label: 'LIQUIDITY',         text: 'Reserved so the chart can exist one day. Placeholder number.' },        // PLACEHOLDER
      { percent: '5%',  tone: 'purple', label: 'TREASURY',          text: 'Stickers, hosting, and whatever the group chat votes for.' },           // PLACEHOLDER
      { percent: '5%',  tone: 'white',  label: 'BURN',              text: 'Symbolic. Like the brain cells. Placeholder number.' }                  // PLACEHOLDER
    ],
    notes: ['No price', 'No chart', 'No contract address', 'No promises', 'Fictional project — placeholder numbers']
  },

  /* -------------------------------------------------------- 09 / ROADMAP */
  roadmap: {
    eyebrow: '09 / ROADMAP (KIND OF)',
    title: 'ROADMAP',
    phases: [
      { phase: 'PHASE 01', tone: 'green',  title: 'GET BRAIN',        text: 'Acquire one (1) pink brain. Give it a cap. Refuse to explain further.' },
      { phase: 'PHASE 02', tone: 'pink',   title: 'ROT BRAIN',        text: 'Expose said brain to the internet for an unhealthy number of hours.' },
      { phase: 'PHASE 03', tone: 'purple', title: 'POST MEMES',       text: 'Deploy the memes. Measure success in screenshots, not in charts.' },
      { phase: 'PHASE 04', tone: 'white',  title: 'INTERNET NOTICES', text: 'Somebody quotes us with "what is this". That is the whole milestone.' },
      { phase: 'PHASE 05', tone: 'white',  title: '???',              text: 'Redacted. Not because it is secret — we genuinely have not decided.' },
      { phase: 'PHASE 06', tone: 'pink',   title: 'WE HAVE NO IDEA',  text: 'Total honesty: the plan ends here. The memes, however, do not.' }
    ]
  },

  /* ------------------------------------------------------- 10 / DIAGNOSIS */
  levels: {
    eyebrow: '10 / DIAGNOSIS',
    title: 'HOW COOKED ARE YOU?',
    items: [
      { icon: '🧠✨', tag: 'LVL 01', name: 'NORMAL',  tone: 'white',  text: 'Sleeps at night. Reads books. Suspicious behaviour, honestly.' },
      { icon: '🧠⚡', tag: 'LVL 02', name: 'ONLINE',  tone: 'purple', text: 'Knows what the algorithm wants and gives it freely.' },
      { icon: '🧠🔥', tag: 'LVL 03', name: 'COOKED',  tone: 'pink',   text: 'Speaks in references nobody outside the feed understands.' },
      { icon: '🥴📱', tag: 'LVL 04', name: 'FRIED',   tone: 'green',  text: 'Opens the app to close the app. Opens it again immediately.' },
      { icon: '💀📵', tag: 'LVL 05', name: 'GONE',    tone: 'white',  text: 'You are reading a meme coin landing page at this hour. Diagnosis complete.' }
    ]
  },

  /* -------------------------------------------------------------- 11 / FAQ */
  faq: {
    eyebrow: '11 / QUESTIONS',
    title: 'FAQ',
    items: [
      { q: 'What is this?',            a: 'A meme project built around a pink brain in a cap. It is a landing page, a joke and a mascot — that is the entire product right now.' },
      { q: 'Why does this exist?',     a: 'Because the internet exists and somebody left us unsupervised with a code editor at an unreasonable hour.' },
      { q: 'Is this financial advice?', a: 'No. It is not financial advice, investment advice, legal advice or even particularly good life advice. It is a meme.' },
      { q: 'Who made this?',           a: 'Some people on the internet with a shared sense of humour and a worrying screen-time report. No real person is the mascot.' },
      { q: 'Where can I buy it?',      a: 'Not available yet. There is no token, no contract address and no exchange listing. Anyone offering you one is not us.' },
      { q: 'Is my brain cooked?',      a: 'You scrolled this far to read the FAQ of a fictional meme coin. Draw your own conclusions.' }
    ]
  },

  /* ------------------------------------------------------------------ FOOTER */
  footer: {
    tagline: 'COME FOR THE MEME, STAY BECAUSE YOU FORGOT WHY YOU CAME.',
    links: [
      { label: 'STORY',     href: '#story' },
      { label: 'MEME LAB',  href: '#memes' },
      { label: 'TOKEN',     href: '#token' },
      { label: 'COMMUNITY', href: '#community' }
    ],
    disclaimer: 'BRAINROT is an experimental meme project. Nothing on this site is financial advice. Cryptocurrencies and meme coins are highly volatile and can result in the total loss of your funds. There is no token, no contract and no sale at this time.',
    legal: '© 2026 BRAINROT · NO RIGHTS RESERVED · YOUR BRAIN IS STILL COOKED'
  }
};
