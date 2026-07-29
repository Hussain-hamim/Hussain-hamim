import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

const DECOR = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    className:
      'absolute top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    className:
      'absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    className:
      'absolute top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    className:
      'absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
];

export default function AboutSection() {
  return (
    <section
      id='about'
      className='relative flex min-h-screen items-center justify-center overflow-x-clip px-5 py-20 sm:px-8 md:px-10'
    >
      {DECOR.map((item) => (
        <FadeIn
          key={item.src}
          delay={item.delay}
          x={item.x}
          y={0}
          duration={0.9}
          className={item.className}
        >
          <img src={item.src} alt='' className='h-auto w-full' loading='lazy' />
        </FadeIn>
      ))}

      <div className='relative z-10 mx-auto flex max-w-[560px] flex-col items-center text-center'>
        <FadeIn delay={0} y={40}>
          <h2
            className='hero-heading font-black uppercase leading-none tracking-tight'
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className='mt-10 flex flex-col items-center sm:mt-14 md:mt-16'>
          <AnimatedText
            text="With more than five years of experience building products, I focus on full-stack web, mobile apps, and AI agent systems. I truly enjoy working with startups that need to ship and present their best image. Let's build something incredible together!"
            className='max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]'
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <div className='mt-16 sm:mt-20 md:mt-24' id='contact'>
          <ContactButton href='https://cal.com/hussain-hamim-fp9qc6/30min' />
        </div>
      </div>
    </section>
  );
}
