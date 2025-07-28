import Head from 'next/head';

import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import StoryCards from '../components/StoryCards';
import Thesis from '../components/Thesis';

export default function Home() {
  return (
    <>
      <Head>
        <title>Quillworks – Let Digital Come to You</title>
      </Head>
      <NavBar />
      <main id="main">
        <Hero />
        <StoryCards />
        <Thesis />
      </main>
    </>
  );
}
