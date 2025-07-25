import Image from 'next/image';

const Hero = () => {
  return (
    <section className="flex min-h-screen items-center bg-surface-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* Left Column - Text Content */}
          <div className="flex-1 text-center md:w-3/5 md:text-left">
            {/* Main Tagline */}
            <h1
              id="hero-heading"
              className="my-8 font-serif text-[20px] font-bold leading-tight text-primary md:my-16 md:text-[30px]"
            >
              Let Digital <br />
              Come to You
            </h1>

            {/* Subheading */}
            <div className="font-body text-xs md:text-sm">
              <span className="font-bold text-gray-900">
                Technology should adapt to human rhythm
              </span>
              <br />
              <span className="font-medium italic text-primary">
                — not the other way around.
              </span>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="mx-auto w-full max-w-md flex-1 md:w-2/5">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {/* TODO: Replace with actual ripple image */}
              <Image
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Water ripples representing the gentle flow of technology adapting to human rhythm"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />

              {/* Soft white overlay */}
              <div className="absolute inset-0 z-10 bg-white/30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
