const SERVICES = [
  {
    num: '01',
    title: 'Full-Stack Product',
    body: 'Web apps from idea to production — React, Next.js, APIs, auth, payments.',
  },
  {
    num: '02',
    title: 'AI Agents & Systems',
    body: 'LLM workflows and automation that turn real demand into tools people use.',
  },
  {
    num: '03',
    title: 'Mobile Experiences',
    body: 'iOS & cross-platform apps with clean UX and release-ready polish.',
  },
];

export default function WorkSection() {
  return (
    <section id='work' className='border-t border-white/10 bg-black px-6 py-24 md:px-10 lg:px-16'>
      <div className='mx-auto max-w-6xl'>
        <p className='text-xs font-light tracking-[0.3em] text-white/50'>
          03 — SERVICES
        </p>
        <h2 className='mt-4 max-w-xl text-4xl font-normal leading-[1.1] tracking-[-0.04em] text-white md:text-5xl lg:text-6xl'>
          What I forge
          <br />
          for clients
        </h2>

        <div className='mt-14 grid gap-4 md:grid-cols-3'>
          {SERVICES.map((s) => (
            <article
              key={s.num}
              className='rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm'
            >
              <span className='text-xs text-white/40'>{s.num}</span>
              <h3 className='mt-4 text-2xl font-medium tracking-[-0.03em] text-white'>
                {s.title}
              </h3>
              <p className='mt-3 text-sm leading-relaxed text-white/60'>
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
