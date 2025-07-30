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
      className="font-heading whitespace-pre-line text-5xl font-bold leading-hero text-primary"
      aria-labelledby="hero-heading"
    >
      {props.title}
    </h1>
    <div
      id="hero-description"
      className="font-body mb-16 mt-4 text-2xl font-bold italic text-primary"
      aria-describedby="hero-description"
    >
      {props.description}
    </div>

    {props.button}
  </header>
);

export { HeroOneButton };
