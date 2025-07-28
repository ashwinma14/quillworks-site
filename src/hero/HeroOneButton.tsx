import type { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    <h1
      id="hero-heading"
      className="whitespace-pre-line font-heading text-5xl font-bold leading-hero text-primary"
      aria-labelledby="hero-heading"
    >
      {props.title}
    </h1>
    <div
      id="hero-description"
      className="mb-16 mt-4 font-body text-2xl font-bold italic text-primary"
      aria-describedby="hero-description"
    >
      {props.description}
    </div>

    {props.button}
  </header>
);

export { HeroOneButton };
