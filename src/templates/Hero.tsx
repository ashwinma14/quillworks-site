import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-surface-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">
            GitHub
          </Link>
        </li>
        <li>
          <Link href="/">Sign in</Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
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
    </Section>
  </Background>
);

export { Hero };
