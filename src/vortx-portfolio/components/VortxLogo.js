/** Vortex / plus mark — four quarter-circles */
export default function VortxLogo({ className = '' }) {
  return (
    <svg
      viewBox='0 0 256 256'
      className={className}
      fill='white'
      aria-hidden
    >
      <path d='M128 16c-28 0-52 10-72 28C36 64 16 96 16 128h56c0-16 6-30 16-40 10-10 24-16 40-16V16z' />
      <path d='M240 128c0-32-20-64-40-84-20-18-44-28-72-28v56c16 0 30 6 40 16 10 10 16 24 16 40h56z' />
      <path d='M128 240c28 0 52-10 72-28 20-20 40-52 40-84h-56c0 16-6 30-16 40-10 10-24 16-40 16v56z' />
      <path d='M16 128c0 32 20 64 40 84 20 18 44 28 72 28v-56c-16 0-30-6-40-16-10-10-16-24-16-40H16z' />
    </svg>
  );
}
