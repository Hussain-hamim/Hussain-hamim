// Featured ("Selected Work") projects shown on the homepage and on
// dedicated /case-study/:slug pages.
//
// Anything wrapped in <REPLACE: ...> is a placeholder. The UI renders these
// with a faded style so they are obvious in preview but do not break layout.

export const PLACEHOLDER_PREFIX = '<REPLACE:';

export const isPlaceholder = (value) =>
  typeof value === 'string' && value.trim().startsWith(PLACEHOLDER_PREFIX);

/**
 * Each featured project maps 1:1 to a card on the homepage and a page at
 * /case-study/:slug. Keep titles in sync with ProjectsSection so the card
 * can reuse the existing image via the matching entry in projects/mobileProjects.
 */
export const featuredProjects = [
  {
    slug: 'ideahunt',
    title: 'IdeaHunt',
    cardHeadline: 'Stop guessing. Validate startup ideas from real demand.',
    tagline:
      'Stop building what nobody wants. IdeaHunt scans real conversations across the internet to surface validated startup ideas with real demand.',
    live: 'https://www.ideahunt.pro/',
    code: 'https://github.com/Hussain-hamim',
    role: 'Founder & engineer',
    stack: ['Next.js', 'Supabase', 'OpenAI', 'Dodo Payments'],
    problem:
      'Most founders waste months building ideas nobody wants — guessing at demand instead of listening to it.',
    built:
      'An AI research platform that monitors Reddit, Twitter/X, G2, and forums 24/7, extracts recurring pain points, and scores ideas by demand, competition, and revenue potential.',
    result:
      'IdeaHunt helps builders stop guessing what to build by turning real pain points from Reddit, X, G2, and forums into validated startup ideas with demand, competition, and revenue signals.',
    metrics: [
      { value: '1k+', label: 'Active users' },
      { value: '2,337', label: 'Ideas generated' },
      { value: '4 weeks', label: 'Shipped in' },
    ],
    beforeAfter: {
      before: null, // e.g. require('../images/ideahunt-before.png')
      after: null, // e.g. require('../images/ideahunt-after.png')
      note:
        '<REPLACE: short caption — what changed from before to after? (e.g. "From a blank dashboard to a ranked feed of real-world pain points.")>',
    },
    testimonials: [
      {
        quote:
          "Finally, a tool that uses real data. The Reddit pain point extractor is insane. It found a problem in the dev tools space that I'm now solving.",
        author: 'Ahmed',
        role: 'Indie Hacker',
      },
      {
        quote:
          'The market validation tool is a game changer. It saved me from building a tool that nobody wanted. The competitor analysis alone is worth the subscription.',
        author: 'Samsoor',
        role: 'Software Engineer',
      },
      {
        quote:
          "IdeaHunt surprised me a lot, i didn't expect its analysis report to be so professional and detailed.",
        author: 'Bob Zhang',
        role: 'Software Developer',
      },
    ],
  },
  {
    slug: 'aegnis-ai',
    title: 'Aegnis AI',
    cardHeadline: 'An AI chief of staff that helps you execute, not just plan.',
    tagline:
      'An AI Chief of Staff that doesn’t just plan your day — it actively helps execute it.',
    live: 'https://aegnis.life',
    code: 'https://github.com/Hussain-hamim',
    role: 'Solo founder & engineer',
    stack: ['Next.js', 'Supabase', 'OpenAI', 'TypeScript'],
    problem:
      'Most productivity tools stop at planning — people still have to manually push every task from intention to execution.',
    built:
      'Aegnis is an AI Chief of Staff that helps triage priorities, break work into actionable steps, and keep execution moving instead of just tracking to-dos.',
    result:
      'Aegnis is an AI Chief of Staff for staying organized and moving faster: it helps manage workflows, schedule priorities, and turn daily planning into clear execution.',
    metrics: [
      { value: '300+', label: 'Active users' },
      { value: '2.5h/week', label: 'Avg. time saved / week' },
      { value: '6 weeks', label: 'Shipped in' },
    ],
    beforeAfter: {
      before: null,
      after: null,
      note: '<REPLACE: short caption for before/after.>',
    },
    testimonials: [
      {
        quote:
          "Ambitious scope. Curious to see the 'runs your digital life' part in action.",
        author: 'Zoey Zhang',
        role: 'Indie Developer (@SaaSScout_)',
      },
      {
        quote:
          "okay... this is very cool 👀 let's show Hussain some support, he's really put a lot of effort and energy into the design and functionality of this app.",
        author: 'Haroon Azizi',
        role: 'Founder of Hadaf (had.af) & code.af (@az_haroon)',
      },
      {
        quote: 'well done! This looks very good. Clean UI and function primary',
        author: 'Elly',
        role: 'Founder of Dight.pro (@ellv_16x)',
      },
    ],
  },
  {
    slug: 'proveit-ai',
    title: 'ProveIt AI',
    openLinkLabel: 'ProveIt AI',
    cardHeadline: 'Finally get things done — with photo proof and AI pressure.',
    tagline:
      'ProveIt AI forces accountability with live picture proof, deadlines, and alarms until you prove it — or give up.',
    live: 'https://aura-ai-ivory.vercel.app/',
    code: 'https://github.com/Hussain-hamim',
    role: 'Solo founder & mobile engineer',
    stack: ['Swift', 'SwiftUI', 'AI', 'iOS'],
    problem:
      'Most habit apps rely on soft reminders. People lie to themselves, skip tasks, and nothing forces real proof that the work got done.',
    built:
      'An iOS accountability app with photo proof + AI verification, escalating deadline alarms, discipline stats, pressure levels, and Coach Aura — a relentless AI coach from tough mentor to full roast mode.',
    result:
      'ProveIt AI turns goals into a pressure loop: set a deadline, upload real photo proof, survive AI scan and alarms, and let Coach Aura hold you accountable until you finish or quit.',
    metrics: [
      { value: 'Photo', label: 'Proof required' },
      { value: 'AI', label: 'Scan & reject fakes' },
      { value: 'iOS', label: 'App Store ready' },
    ],
    beforeAfter: {
      before: null,
      after: null,
      note: '<REPLACE: short caption for before/after.>',
    },
    testimonials: [],
  },
  {
    slug: 'goal-tracking-app',
    title: 'Couple Connect',
    /** Optional: friendlier “Open …” label on the case study CTA (avoids long demo URLs). */
    openLinkLabel: 'Couple Connect',
    cardHeadline: 'Couple Connect — shared goals, timeline, and chat for two.',
    tagline:
      'Couple Connect — build your future together. One place for you both: shared timeline, goals, and chat, designed for couples.',
    live: 'https://goals-tracking-cc.vercel.app/#app-screenshots',
    code: 'https://github.com/Hussain-hamim',
    role: 'Solo mobile engineer',
    stack: ['Swift', 'SwiftUI', 'Supabase'],
    problem:
      'Couples still bounce between notes apps, spreadsheets, and DMs — nothing ties savings, travel, home, and fitness goals into one shared space built for two.',
    built:
      'Couple Connect: shared goals (track savings, travel, home, or fitness together with contributions and milestones), private couple chat, unlimited moments & memories on a shared timeline, partner invite (subscribe to Pro and your partner gets it free), plus Home, Goals, Chat, and Profile in one simple app — private & secure.',
    result:
      'Couple Connect is an iOS app for couples to grow together with shared goals, real-time chat, love letters, milestones, memories, and partner invites in one private space.',
    metrics: [
      { value: '4', label: 'Core sections (Home/Goals/Chat/Profile)' },
      { value: '2', label: 'Users per shared space (couple)' },
      { value: '∞', label: 'Moments & memories (timeline)' },
    ],
    beforeAfter: {
      before: null,
      after: null,
      note: '<REPLACE: short caption for before/after.>',
    },
    testimonials: [],
    partnership: {
      badge: {
        en: 'Open to partnership',
        ps: 'د همکارۍ لپاره پرانیست',
      },
      hint: {
        en: 'Seeking a marketing partner to help launch Couple Connect — also open to collaborators on product, distribution, and growth. Get in touch if this fits you.',
        ps: 'د Couple Connect د پیل لپاره د بازاریابۍ شریک لټوم — د محصول او خپرونې لپاره هم غواړم چې راشئ. که سم ښکاري، راته ولیکئ.',
      },
    },
  },
];

export const getFeaturedBySlug = (slug) =>
  featuredProjects.find((p) => p.slug === slug);
