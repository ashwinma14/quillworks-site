import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Sponsors } from './Sponsors';
import { VerticalFeatures } from './VerticalFeatures';

const Base = () => (
  <div className="text-muted font-body antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <main id="main-content" className="flex flex-col">
      <Hero />
      <VerticalFeatures />
      <Banner />
    </main>
    <footer className="text-muted mt-16 py-8 text-center">
      <Sponsors />
      <Footer />
      <p className="mt-4 text-xs">&copy; 2025 Quillworks</p>
    </footer>
  </div>
);

export { Base };
