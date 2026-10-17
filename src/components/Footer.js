import React from "react";

const Footer = () => {
  return (
    <footer className="relative pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-10">
      {/* Giant name watermark - centered behind footer, allowed to overflow upward */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 px-4 md:px-8"
        style={{ top: "-9rem" }}
        aria-hidden
      >
        <div className="mx-auto flex h-full w-full max-w-4xl items-center justify-center">
          <span className="select-none whitespace-nowrap bg-gradient-to-r from-[#D7FF00] to-teal-400 bg-clip-text text-center font-sans1 font-bold leading-none tracking-tighter text-transparent opacity-[0.12] text-[clamp(2.5rem,15vw,11rem)]">
            Hussain
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
