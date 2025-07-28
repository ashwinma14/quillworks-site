import Image from 'next/image';

// TODO: Place paper-texture.webp in public/images/ directory
// Convert from: https://upload.wikimedia.org/wikipedia/commons/8/82/Vintage_Paper_Texture_%289789792113%29.jpg
// Use: bash scripts/convert-paper.sh

const Thesis = () => {
  return (
    <section data-testid="thesis-section" className="relative py-16 md:py-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/paper-texture.webp"
          alt="Faded vintage paper backdrop"
          fill
          className="object-cover object-center"
          priority={false}
        />
        {/* Semi-transparent white overlay */}
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Left Column - Main Thesis (60% on desktop) */}
          <div className="flex-1 md:w-3/5">
            <h2
              id="thesis-heading"
              className="mb-8 font-heading text-2xl font-bold leading-tight text-primary md:text-3xl"
              aria-labelledby="thesis-heading"
            >
              Technology should adapt to human rhythm — not the other way
              around.
            </h2>

            <p
              className="text-muted font-body text-sm leading-relaxed md:text-base"
              style={{ fontSize: '12pt', lineHeight: '1.5' }}
            >
              In the quiet of a notebook, between chalk lines and margins,
              learning once moved at the pace of thought. We build tools that
              remember this.
            </p>
          </div>

          {/* Right Column - Design Principles (40% on desktop) */}
          <div className="flex-1 md:w-2/5">
            <h3
              id="principles-heading"
              className="mb-6 font-body text-lg font-bold text-gray-900"
              aria-labelledby="principles-heading"
            >
              Design principles:
            </h3>

            <ul
              className="text-muted space-y-4 font-body"
              style={{ fontSize: '12pt', lineHeight: '1.5' }}
              aria-describedby="principles-heading"
            >
              <li className="flex items-start gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                ></span>
                <span>
                  Embrace the slow, deliberate pace of deep understanding
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                ></span>
                <span>Elevate tactile over transactional</span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                ></span>
                <span>Let analog moments anchor digital tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                ></span>
                <span>Minimize disruption, maximize attention</span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                ></span>
                <span>Treat learning as a rhythm, not a race</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Thesis;
