import { Feather, Layers, Waves } from 'lucide-react';
import React, { useEffect } from 'react';

import { useReveal } from '../hooks/useReveal';

interface Card {
  title: string;
  body: string;
  icon: React.ReactNode;
}

const StoryCards: React.FC = () => {
  const revealRef = useReveal<HTMLElement>();

  useEffect(() => {
    // Handle card animations
    const cards = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              'opacity-100',
              'translate-y-0',
              'blur-0'
            );
            entry.target.classList.remove(
              'opacity-0',
              'translate-y-8',
              'blur-sm'
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '20px' }
    );

    cards.forEach((card) => {
      observer.observe(card);
    });

    // Handle parallax scrolling
    const parallaxCards = document.querySelectorAll('[data-parallax]');
    const handleScroll = () => {
      const y = window.scrollY;
      parallaxCards.forEach((card) => {
        // eslint-disable-next-line no-param-reassign
        (card as HTMLElement).style.transform =
          `translateY(${Math.max(-15, -(y * 0.03))}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const cards: Card[] = [
    {
      title: 'The Problem',
      body: 'Digital tools pull us away from natural rhythms -\nreplacing flow with friction.',
      icon: <Waves size={28} strokeWidth={1.5} className="stroke-primary/80" />,
    },
    {
      title: 'Our Approach',
      body: 'Let digital come to you -\nnot as noise, but as a quiet layer that tracks, shares,\nand preserves what already moves you.',
      icon: (
        <Layers size={28} strokeWidth={1.5} className="stroke-primary/80" />
      ),
    },
    {
      title: 'The Shift',
      body: "We're entering a new era -\nwhere tools no longer demand attention,\nbut quietly earn their place.\nA world where technology whispers,\nand analog ways lead the way.",
      icon: (
        <Feather size={28} strokeWidth={1.5} className="stroke-primary/80" />
      ),
    },
  ];

  return (
    <section ref={revealRef} className="bg-paper">
      <div
        data-testid="story-card-grid"
        className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-8 px-[6vw] pb-24 pt-12 sm:pt-16"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            data-animate=""
            data-parallax=""
            style={{ transitionDelay: `${index * 100}ms` }}
            className="flex w-[300px] translate-y-8 flex-col gap-6
                      rounded-[16px] border border-[#E4E5E2] bg-white px-6
                      py-8 opacity-0 shadow-[0_4px_16px_rgba(103,112,93,0.08)] blur-sm transition-all duration-700"
          >
            {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
            <div className="flex size-14 items-center justify-center rounded-full bg-[#F0F1ED]/90">
              {card.icon}
            </div>
            <h2 className="text-[20px] font-semibold tracking-tight text-[#353535]">
              {card.title}
            </h2>
            <p className="max-w-[220px] text-[16px] leading-[1.55]">
              {card.body.split('\n').map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {line}
                  {lineIndex < card.body.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoryCards;
