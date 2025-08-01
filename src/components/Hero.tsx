import React, { useEffect } from 'react';

import { useReveal } from '../hooks/useReveal';
import SubstackForm from './SubstackForm';

const Hero: React.FC = () => {
  const revealRef = useReveal<HTMLDivElement>();

  // Dev-mode font validation
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const checkFontLoading = () => {
        const h1Element = document.querySelector('h1');
        if (h1Element) {
          const computedFont = getComputedStyle(h1Element).fontFamily;
          if (
            computedFont.includes('Times New Roman') ||
            computedFont.includes('serif')
          ) {
            // eslint-disable-next-line no-console
            console.warn(
              '⚠️ Font fallback detected - Instrument Serif not loading properly'
            );
            // eslint-disable-next-line no-console
            console.log('Current font-family:', computedFont);
          } else if (computedFont.includes('Instrument Serif')) {
            // eslint-disable-next-line no-console
            console.log('✅ Instrument Serif loaded successfully');
          }
        }
      };

      // Check after fonts should be loaded
      setTimeout(checkFontLoading, 2000);
    }
  }, []);
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
            className="relative mx-auto max-w-[980px] px-[6vw] py-12 sm:pb-16"
            data-animate=""
          >
            <p className="mb-2 text-[14px] font-semibold uppercase tracking-[1.1px] text-primary/70">
              LET DIGITAL COME TO YOU
            </p>

            <h1
              className="mb-6 font-instrument text-[clamp(48px,8vw,88px)] font-semibold
                       leading-[1.1] text-[#353535]"
              style={{ letterSpacing: '-0.5px' }}
            >
              Technology should adapt to your rhythm - not the other way around.
            </h1>

            <SubstackForm />
          </div>
        </section>
      </section>
    </>
  );
};

export default Hero;
