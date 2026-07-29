import FadeIn from './FadeIn';

const SERVICES = [
  {
    num: '01',
    name: 'Full-Stack Product',
    description:
      'End-to-end web apps from idea to production — React, Next.js, APIs, auth, and payments — built to ship and scale with startups.',
  },
  {
    num: '02',
    name: 'AI Agents & Systems',
    description:
      'Agent workflows, LLM integrations, and automation that turn real demand into tools people actually use — not demos that die.',
  },
  {
    num: '03',
    name: 'Mobile Apps',
    description:
      'Cross-platform and native-feeling mobile experiences with clean UX, solid backends, and release-ready polish.',
  },
  {
    num: '04',
    name: 'Product Design',
    description:
      'Clear interfaces and brand-aware UI that make complex flows feel simple — from landing pages to full product systems.',
  },
  {
    num: '05',
    name: 'Web Experiences',
    description:
      'Modern, conversion-focused sites with attention to layout, typography, motion, and performance across devices.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id='services'
      className='rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32'
    >
      <h2
        className='mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28'
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className='mx-auto max-w-5xl'>
        {SERVICES.map((item, i) => (
          <FadeIn key={item.num} delay={i * 0.1} y={24}>
            <div
              className='flex flex-col gap-4 border-b py-8 last:border-b-0 sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:gap-12 md:py-12'
              style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
            >
              <span
                className='shrink-0 font-black text-[#0C0C0C]'
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 0.9 }}
              >
                {item.num}
              </span>
              <div className='flex min-w-0 flex-col justify-center pt-1 sm:pt-4'>
                <h3
                  className='font-medium uppercase text-[#0C0C0C]'
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {item.name}
                </h3>
                <p
                  className='mt-2 max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60'
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
