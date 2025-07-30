import React from 'react';

import { useReveal } from '../hooks/useReveal';

const Hero: React.FC = () => {
  const revealRef = useReveal<HTMLDivElement>();
  return (
    <>
      <section className="relative isolate">
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            backgroundImage:
              "url('https://grainy.s3.us-east-1.amazonaws.com/noise.png')",
            opacity: 0.05,
          }}
        />
        <section className="relative overflow-hidden bg-white">
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
              className="font-['Instrument_Serif'] font-semibold tracking-tight text-[#353535] leading-[1.1]
                       text-[clamp(48px,8vw,88px)] -tracking-[0.5px] mb-6"
              data-chromatic="ignore-text-rendering"
            >
              Technology should adapt to your rhythm — not the other way around.
            </h1>

            <a
              href="#"
              className="inline-flex items-center px-8 py-4 rounded-full text-white font-medium text-lg shadow-md
                      transition-all duration-150 hover:scale-[1.04]
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#67705D] focus-visible:outline-offset-3"
              style={{ background: 'linear-gradient(#6F7563, #646B59)' }}
            >
              Join the waitlist
            </a>
          </div>
        </section>
      </section>

      {/* SPACER */}
      <div style={{ height: '120px' }}></div>
    </>
  );
};

export default Hero;
