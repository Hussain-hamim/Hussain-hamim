import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import BranchBackground from './BranchBackground';
import './ExperienceSection.css';

function trunkPath(points) {
  return points.reduce((path, point, index) => {
    if (!index) return `M ${point.x} ${point.y}`;
    const previous = points[index - 1];
    const bend = (previous.y - point.y) / 2;
    return `${path} C ${previous.x} ${previous.y - bend}, ${point.x} ${point.y + bend}, ${point.x} ${point.y}`;
  }, '');
}

// Measure the cards so every branch stays attached as text wraps or fonts load.
function useTreeGeometry(isRtl) {
  const treeRef = useRef(null);
  const cardRefs = useRef([]);
  const [geometry, setGeometry] = useState(null);

  useLayoutEffect(() => {
    const tree = treeRef.current;
    if (!tree) return undefined;
    let frameId;

    const measure = () => {
      const bounds = tree.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const desktop = window.matchMedia('(min-width: 768px)').matches;
      const axis = desktop ? bounds.width / 2 : isRtl ? bounds.width - 12 : 12;
      const nodes = cardRefs.current.filter(Boolean).map((card, index) => {
        const rect = card.getBoundingClientRect();
        const toRight = rect.left + rect.width / 2 > bounds.left + axis;
        const endX = (toRight ? rect.left : rect.right) - bounds.left;
        const endY = rect.top - bounds.top + 48;
        const x = axis + (index % 2 ? 1 : -1) * (desktop ? 6 : 2);
        const y = endY + (desktop ? 44 : 20);
        const reach = Math.abs(endX - x) * 0.55;
        const direction = toRight ? 1 : -1;

        return {
          x, y, endX, endY,
          path: `M ${x} ${y} C ${x} ${endY + 12}, ${endX - direction * reach} ${endY}, ${endX} ${endY}`,
        };
      });

      const root = { x: axis, y: bounds.height - 18 };
      const tip = { x: axis, y: 22 };
      setGeometry({
        width: bounds.width,
        height: bounds.height,
        axis,
        root,
        nodes,
        trunk: trunkPath([root, ...nodes.slice().reverse(), tip]),
      });
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(tree);
    cardRefs.current.forEach((card) => card && observer.observe(card));
    measure();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [isRtl]);

  return { treeRef, cardRefs, geometry };
}

function ExperienceBranches({ geometry, activeIndex, reducedMotion }) {
  if (!geometry) return null;
  const { width, height, axis, root, nodes, trunk } = geometry;
  const draw = { hidden: { pathLength: 0 }, visible: { pathLength: 1 } };

  return (
    <motion.svg
      className='experience-tree__drawing'
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden='true'
      focusable='false'
      initial={reducedMotion ? false : 'hidden'}
      whileInView='visible'
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.path
        d={trunk}
        className='experience-tree__trunk'
        variants={draw}
        transition={{ duration: reducedMotion ? 0 : 1.4, ease: 'easeOut' }}
      />
      {nodes.map((node, index) => (
        <g
          key={index}
          className={`experience-tree__branch ${activeIndex === index ? 'is-active' : ''}`}
        >
          <motion.path
            d={node.path}
            variants={draw}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.2 + index * 0.12 }}
          />
          <circle cx={node.x} cy={node.y} r={index === 0 ? 4.5 : 3} />
          <circle cx={node.endX} cy={node.endY} r='3' />
        </g>
      ))}
      <path
        className='experience-tree__sprout'
        d={`M ${axis} 24 C ${axis - 14} 24 ${axis - 22} 13 ${axis - 22} 6 C ${axis - 9} 6 ${axis - 1} 13 ${axis} 24 Z M ${axis} 24 C ${axis + 1} 12 ${axis + 11} 3 ${axis + 22} 3 C ${axis + 22} 14 ${axis + 13} 23 ${axis} 24 Z`}
      />
      <circle className='experience-tree__root' cx={root.x} cy={root.y} r='5' />
    </motion.svg>
  );
}

const ExperienceSection = ({ locale = 'en' }) => {
  const isPashto = locale === 'ps';
  const reducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { treeRef, cardRefs, geometry } = useTreeGeometry(isPashto);

  const experiences = [
    {
      id: 1,
      role: isPashto ? 'سافټوېیر انجينر' : 'Software Engineer',
      company: 'Chamoy Labs',
      duration: 'Jul 2026',
      isCurrent: true,
      tags: [isPashto ? 'د محصول پراختيا' : 'Product engineering'],
      description: isPashto
        ? 'د محصول ایډیو په دوامداره او فکر شوي سافټوېیر بدلول — له مفهوم څخه تر سپارلو پورې پاک تطبیق او عملي قضاوت.'
        : 'I turn product ideas into software that holds up, from the first sketch to something people can use.',
    },
    {
      id: 2,
      role: isPashto ? 'سافټوېیر انجينر' : 'Software Engineer',
      company: 'Zapp studios',
      duration: 'Sept 2025',
      isCurrent: false,
      tags: ['Next.js', 'Swift', 'Supabase'],
      description: isPashto
        ? 'د Next.js او Supabase په مرسته د Full-Stack وېب پروګرامونو پراختيا.'
        : 'I built web and mobile apps with Next.js, Swift, and Supabase.',
    },
    {
      id: 3,
      role: isPashto ? 'سافټوېیر انجينر' : 'Software Engineer',
      company: 'EvolvFit',
      duration: 'Aug 2025 - Oct 2025',
      isCurrent: false,
      tags: ['React Native', 'Node.js'],
      description: isPashto
        ? 'د React Native او Node.js بیکېنډ په کارولو د موبايل پروګرامونو جوړول او پراختيا.'
        : 'I built mobile apps in React Native, with a Node.js backend behind them.',
    },
    {
      id: 4,
      role: isPashto ? 'د موبايل پروګرامونو انجينر' : 'Mobile App Developer',
      company: 'Himalbyte',
      duration: 'May 2025 - Jul 2025',
      isCurrent: false,
      tags: [isPashto ? 'موبايل پروګرامونه' : 'Mobile development'],
      description: isPashto
        ? 'د کراس پلېټفارم موبايل پروګرامونو پراختيا، په لوړ کارکردګۍ تمرکز سره.'
        : 'I worked on cross-platform mobile apps, paying close attention to how they felt to use.',
    },
  ];

  return (
    <section
      id='experience-section'
      aria-labelledby='experience-heading'
      dir={isPashto ? 'rtl' : 'ltr'}
      className='experience-section relative isolate z-10 overflow-hidden px-4 py-20 md:px-8 md:py-28'
    >
      <BranchBackground className='-z-10 opacity-50' />
      <div className='relative z-10 mx-auto w-full max-w-4xl'>
        <div className='experience-heading'>
          <div>
            <h2 id='experience-heading' className='font-sans1 text-3xl font-medium tracking-tight text-ink sm:text-4xl'>
              {isPashto ? 'تجربه' : 'Experience'}
            </h2>
            <p className='experience-heading__description'>
              {isPashto
                ? 'هغه ټیمونه چې ورسره مې وېب او موبايل پروګرامونه جوړ کړي دي.'
                : 'The teams I’ve built with, from mobile apps to full-stack products.'}
            </p>
          </div>
        </div>

        <div className='experience-tree' ref={treeRef}>
          <ExperienceBranches
            geometry={geometry}
            activeIndex={hoveredIndex ?? 0}
            reducedMotion={reducedMotion}
          />
          <ol className='experience-tree__roles'>
            {experiences.map((exp, index) => (
              <motion.li
                key={exp.id}
                ref={(element) => { cardRefs.current[index] = element; }}
                className={`experience-role ${exp.isCurrent ? 'experience-role--current' : ''}`}
                onPointerEnter={() => setHoveredIndex(index)}
                onPointerLeave={() => setHoveredIndex(null)}
                initial={reducedMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className='experience-role__meta'>
                  <span dir='ltr'>{exp.duration}</span>
                  {exp.isCurrent && (
                    <span className='experience-role__current'>
                      <span aria-hidden='true' />
                      {isPashto ? 'اوس' : 'Current'}
                    </span>
                  )}
                </div>
                <h3 className='experience-role__company'>{exp.company}</h3>
                <p className='experience-role__title'>{exp.role}</p>
                <p className='experience-role__description'>{exp.description}</p>
                <ul className='experience-role__tags' aria-label={isPashto ? 'د کار برخې' : 'Focus areas'}>
                  {exp.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
