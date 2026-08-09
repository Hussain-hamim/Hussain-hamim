const COVER = (path) => `https://chamoylabs.com${path}`;

export const BLOG_POSTS = [
  {
    title: 'Designing AI Loading States That Feel Instant',
    titlePs: 'د AI لوډینګ حالتونه چې فوري ښکاري',
    description:
      'Most AI applications are not slow. They simply feel slow. Here is how to design progressive loading experiences that turn uncertain waits into visible momentum.',
    descriptionPs:
      'د AI محصولاتو لپاره د لوډینګ حالتونو ډیزاین چې چټک ښکاري — حتی کله چې ماډل لا فکر کوي.',
    url: 'https://chamoylabs.com/article/designing-ai-loading-states-that-feel-instant/',
    source: 'Chamoy Labs',
    date: '2026-07-19',
    image: COVER('/ai-loading-states.png'),
  },
  {
    title: 'AI Workflows vs AI Agents',
    titlePs: 'AI ورک فلو vs AI ایجنټان',
    description:
      'An LLM in the pipeline does not make it an agent. The architecture does. This post breaks down the differences, when to use each, and what production systems actually look like.',
    descriptionPs:
      'په پایپ لاین کې LLM درلودل دا ایجنټ نه جوړوي — جوړښت یې کوي.',
    url: 'https://chamoylabs.com/article/ai-workflows-vs-ai-agents/',
    source: 'Chamoy Labs',
    date: '2026-07-08',
    image: COVER('/stunning.jpeg'),
    imageObjectPosition: 'center 70%',
  },
  {
    title: 'Building Collaborative AI Instead of Autonomous AI',
    titlePs: 'د خپلواکو AI پر ځای همکار AI جوړول',
    description:
      'The best AI products do not maximize autonomy. They give AI room to contribute while keeping consequential authority with the people accountable for the outcome.',
    descriptionPs:
      'غوره AI محصولات خلک له کاره نه لرې کوي — هغوی په کار کې غوره کوي.',
    url: 'https://chamoylabs.com/article/building-collaborative-ai-instead-of-autonomous-ai',
    source: 'Chamoy Labs',
    date: '2026-07-26',
    image: COVER('/collaborative-ai-cover.png'),
  },
  {
    title: 'Confidence Without Percentages',
    titlePs: 'پرته له سلنې باور',
    description:
      'An unexplained confidence score is not transparency. Learn how citations, previews, verification, and honest uncertainty help users decide when AI deserves their trust.',
    descriptionPs:
      'د AI انټرفېسونو ډیزاین چې د شواهدو له لارې باور رامنځته کوي — نه د ناڅرګندو سلنې نمرو سره.',
    url: 'https://chamoylabs.com/article/confidence-without-percentages',
    source: 'Chamoy Labs',
    date: '2026-08-02',
    image: COVER('/confidence-without-percentages-cover-v2.png'),
  },
  {
    title: 'The UX Cost of AI Mistakes',
    titlePs: 'د AI تېروتنو UX لګښت',
    description:
      'Every incorrect answer chips away at user trust. Learn how confirmation flows, recoverability, and transparent reasoning help products survive inevitable AI failures.',
    descriptionPs:
      'هر ناسم ځواب د کاروونکي باور کموي — تایید، بیا رغونه او روښانه استدلال مرسته کوي.',
    url: 'https://chamoylabs.com/article/the-ux-cost-of-ai-mistakes',
    source: 'Chamoy Labs',
    date: '2026-08-05',
    image: COVER('/ux-cost-ai-mistakes-cover-v2.png'),
  },
];
