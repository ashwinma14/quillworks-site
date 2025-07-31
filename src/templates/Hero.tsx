import Image from 'next/image';
import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-surface-100">
    <header className="w-full py-4">
      <Section yPadding="py-6">
        <nav aria-label="Primary" className="flex items-center justify-between">
          <NavbarTwoColumns logo={<Logo xl />}>
            {/* Navigation links removed for simplified header */}
            <></>
          </NavbarTwoColumns>
        </nav>
      </Section>
    </header>

    <Section yPadding="pt-20 pb-32">
      <div className="mt-8 flex flex-col items-center gap-8 md:mt-16 md:flex-row md:gap-12">
        {/* Left Column - Text Content */}
        <div className="flex-1 text-center md:w-3/5 md:text-left">
          <HeroOneButton
            title={
              <>
                {
                  'Technology should adapt to human rhythm. Quillworks quietly captures analog moments and syncs them seamlessly - bringing digital benefits without distraction, disruption, or behavioral change.'
                }
              </>
            }
            description="Let Digital Come to You."
            button={
              <Link href="/">
                <Button xl>Learn More</Button>
              </Link>
            }
          />
        </div>

        {/* Right Column - Image */}
        <div className="mx-auto w-full max-w-md flex-1 md:w-2/5">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            {/* Image: "Water Ripples 1" by Ron Pieket, CC BY 3.0 */}
            <Image
              src="/images/ripples.webp"
              alt="Calm water ripples"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />

            {/* Semi-transparent white overlay */}
            <div className="absolute inset-0 z-10 bg-white/30"></div>
          </div>
        </div>
      </div>
    </Section>
  </Background>
);

export { Hero };
