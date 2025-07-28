import React from 'react';

import { useReveal } from '../hooks/useReveal';

const Hero: React.FC = () => {
  const revealRef = useReveal<HTMLDivElement>();
  return (
    <>
      <section className="relative overflow-hidden bg-white before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/images/noise.png')] before:opacity-5 before:mix-blend-multiply">
        <div
          style={{
            background:
              'radial-gradient(ellipse at center bottom, rgba(103,112,93,0.02) 0%, rgba(103,112,93,0) 70%)',
          }}
          className="pointer-events-none absolute inset-0"
        />

        <div
          ref={revealRef}
          className="relative mx-auto max-w-[980px] px-[6vw] pt-12"
          data-animate=""
        >
          <p className="mb-2 text-[14px] font-semibold uppercase tracking-[1.1px] text-primary/70">
            LET DIGITAL COME TO YOU
          </p>

          <h1
            className="mb-6 font-serif text-[clamp(48px,8vw,88px)] font-semibold
                     leading-[1.1] -tracking-[0.5px] text-charcoal"
          >
            Technology should adapt to your rhythm — not the other way around.
          </h1>

          <a
            href="#"
            className="focus-visible:outline-offset-3 inline-flex items-center rounded-full px-8 py-4 text-lg font-medium text-white
                    shadow-md transition-all duration-150
                    hover:scale-[1.04] focus-visible:outline focus-visible:outline-2"
            style={{ background: 'linear-gradient(#6F7563, #646B59)' }}
          >
            Join the waitlist
          </a>
        </div>
      </section>

      {/* SPACER */}
      <div style={{ height: '120px' }}></div>
    </>
  );
};

export default Hero;
