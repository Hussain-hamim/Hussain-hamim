import React from 'react';

const SIZE = {
  sm: {
    root: 'min-h-[28px] gap-1.5 px-2.5 py-1 text-[10px] sm:min-h-[30px] sm:px-3 sm:text-[11px]',
    iconWrap: 'h-5 w-5',
    icon: 'h-2.5 w-2.5',
  },
  md: {
    root: 'min-h-[32px] gap-1.5 px-3 py-1.5 text-[11px] sm:min-h-[34px] sm:px-3.5 sm:text-xs',
    iconWrap: 'h-5 w-5 sm:h-6 sm:w-6',
    icon: 'h-2.5 w-2.5 sm:h-3 sm:w-3',
  },
  lg: {
    root: 'min-h-[36px] gap-2 px-4 py-2 text-xs sm:min-h-[38px] sm:px-5 sm:text-sm',
    iconWrap: 'h-6 w-6 sm:h-7 sm:w-7',
    icon: 'h-3 w-3 sm:h-3.5 sm:w-3.5',
  },
};

const VARIANT = {
  primary:
    'border border-line bg-accent text-black shadow-brutal-sm hover:bg-accent-hover dark:border-[#3e4a4e] dark:shadow-[2px_2px_0_0_#2c363a]',
  secondary:
    'border border-line bg-white text-black shadow-brutal-sm hover:bg-[#f5f5f5] dark:border-[#3e4a4e] dark:bg-panel dark:text-ink dark:shadow-[2px_2px_0_0_#2c363a] dark:hover:bg-panel-hover',
  outline:
    'border border-line bg-transparent text-accent shadow-brutal-sm hover:bg-accent/10 dark:border-[#3e4a4e] dark:shadow-[2px_2px_0_0_#2c363a]',
};

/**
 * Neo-brutalist pill button — lime (#D7FF00) face, hard black border + offset shadow.
 * Hover: icon spins and label fades up together on button hover.
 */
export default function Button({
  as,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...rest
}) {
  const Comp = as || (href ? 'a' : 'button');
  const sizeStyles = SIZE[size] || SIZE.md;
  const variantStyles = VARIANT[variant] || VARIANT.primary;

  const iconNode = icon ? (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-black text-accent transition-transform duration-500 ease-out group-hover/btn:rotate-[360deg] ${sizeStyles.iconWrap}`}
      aria-hidden='true'
    >
      <span
        className={`inline-flex items-center justify-center [&_svg]:h-full [&_svg]:w-full ${sizeStyles.icon}`}
      >
        {icon}
      </span>
    </span>
  ) : null;

  const label = (
    <span className='relative z-[1] inline-flex overflow-hidden'>
      <span className='inline-block transition-all duration-300 ease-out group-hover/btn:-translate-y-full group-hover/btn:opacity-0'>
        {children}
      </span>
      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 inline-flex items-center justify-center translate-y-full opacity-0 transition-all duration-300 ease-out group-hover/btn:translate-y-0 group-hover/btn:opacity-100'
      >
        {children}
      </span>
    </span>
  );

  const sharedClass = [
    'group/btn inline-flex items-center justify-center rounded-full font-sans3 font-bold uppercase tracking-wide',
    'transition-[transform,box-shadow,background-color] duration-150 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'disabled:pointer-events-none disabled:opacity-50',
    sizeStyles.root,
    variantStyles,
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' ? iconNode : null}
      {label}
      {icon && iconPosition === 'right' ? iconNode : null}
    </>
  );

  const props = {
    className: sharedClass,
    ...rest,
  };

  if (Comp === 'button') {
    props.type = type;
    props.disabled = disabled;
  } else if (Comp === 'a') {
    props.href = href;
  } else if (href) {
    props.href = href;
  }

  return <Comp {...props}>{content}</Comp>;
}
