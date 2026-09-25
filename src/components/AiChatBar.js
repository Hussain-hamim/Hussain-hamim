import React from 'react';
import {
  SiOpenai,
  SiClaude,
  SiPerplexity,
  SiGooglegemini,
} from 'react-icons/si';

const SITE_URL = 'https://www.hussainhamim.xyz/';

const PROMPT = `I want to chat with Hussain Hamim. Use this website as context: ${SITE_URL}
Act as a member of his team (or someone familiar with his work). Keep responses concise and direct. Start with a short overview of who he is and what he builds, then ask what I'd like to explore.`;

const q = encodeURIComponent(PROMPT);

/** Grok monogram (circle + slash) — not the X logo. */
function GrokIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox='0 0 256 246'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden
    >
      <path d='M63.8307299,56.8426545 C91.2989169,29.362978 131.465298,21.9776085 165.542128,34.9726459 L167.855892,35.8902557 C175.501463,38.7335174 182.164746,42.7796414 187.363427,46.5414469 L158.506099,59.882758 C131.637157,48.5973415 100.857492,56.2740175 82.0711204,75.0832754 C56.6656274,100.496833 51.5320736,144.566967 81.3069473,173.04336 L-1.42108547e-14,245.764227 C4.29613789,239.840925 9.45698399,234.190695 14.7493257,228.586421 L20.5645541,222.456072 L23.1726477,219.681571 C38.703877,203.027306 51.983468,185.912092 43.6693415,162.973056 L42.9033683,160.992465 C28.3109637,125.495663 36.8086459,83.896995 63.8307299,56.8426545 Z M220.785826,35.2560304 L256,0 L245.871984,14.068605 C224.778304,43.78544 215.415895,62.4930162 224.761831,102.727911 L224.69655,102.66263 C231.927394,133.390838 224.194269,167.466048 199.225391,192.464878 C167.746834,224.002573 117.372848,231.022982 75.8893821,202.634909 L104.811992,189.227703 C131.287711,199.638122 160.254097,195.066907 181.071863,174.224565 C201.890397,153.381454 206.565294,123.024196 196.101882,97.7634735 C194.113496,92.9733751 188.149873,91.7706665 183.977257,94.8542395 L98.8698734,157.755289 L220.785826,35.1466653 L220.785826,35.2560304 Z' />
    </svg>
  );
}

const LINKS = [
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    href: `https://chatgpt.com/?q=${q}`,
    Icon: SiOpenai,
  },
  {
    id: 'claude',
    label: 'Claude',
    href: `https://claude.ai/new?q=${q}`,
    Icon: SiClaude,
  },
  {
    id: 'perplexity',
    label: 'Perplexity',
    href: `https://www.perplexity.ai/search/new?q=${q}`,
    Icon: SiPerplexity,
  },
  {
    id: 'grok',
    label: 'Grok',
    href: `https://x.com/i/grok?text=${q}`,
    Icon: GrokIcon,
  },
  {
    id: 'gemini',
    label: 'Gemini',
    href: `https://www.google.com/search?udm=50&aep=11&q=${q}`,
    Icon: SiGooglegemini,
  },
];

/**
 * Deep-link bar with brand marks (Simple Icons + Grok monogram).
 */
export default function AiChatBar({ className = '' }) {
  return (
    <div className={className}>
      <p className='mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40'>
        Or chat about us via AI
      </p>
      <div className='inline-flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full bg-black p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'>
        {LINKS.map(({ id, label, href, Icon }) => (
          <a
            key={id}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Chat about this portfolio in ${label}`}
            title={label}
            className='group/ai inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-black transition-transform duration-200 hover:scale-105 sm:h-9 sm:w-9'
          >
            <Icon
              className='h-4 w-4 transition-transform duration-500 ease-out group-hover/ai:rotate-[360deg]'
              aria-hidden
            />
          </a>
        ))}
      </div>
    </div>
  );
}
