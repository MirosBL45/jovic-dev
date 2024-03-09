//components
import About from '@/components/PageComponents/homePage/about/About';
import Portfolio from '@/components/PageComponents/homePage/portfolio/Portfolio';
import Contact from '@/components/PageComponents/homePage/contact/Contact';
import ScrollButton from '@/components/UIComponents/ScrollButton/ScrollButton';
import Landing from '@/components/PageComponents/homePage/landing/Landing';
import Technologies from '@/components/PageComponents/homePage/technologies/Technologies';

// style
import './globals.css'

export default function Home() {
  return (
    <>
      <Landing />
      <About />
      <Technologies />
      <Portfolio />
      <Contact />
      <ScrollButton />
    </>
  );
}
