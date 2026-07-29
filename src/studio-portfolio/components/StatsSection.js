import { motion } from 'framer-motion';

const STATS = [
  { value: '5+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '100%', label: 'Focus on Craft' },
];

export default function StatsSection() {
  return (
    <section className='bg-studio py-16 md:py-24'>
      <div className='mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-10 lg:px-16'>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            className='text-center'
          >
            <p className='font-display text-studio text-5xl italic md:text-6xl lg:text-7xl'>
              {stat.value}
            </p>
            <p className='text-studio-muted mt-3 text-xs uppercase tracking-[0.25em]'>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
