//components
import About from '@/components/PageComponents/homePage/about/About';
import Portfolio from '@/components/PageComponents/homePage/portfolio/Portfolio';
import Contact from '@/components/PageComponents/homePage/contact/Contact';
import Landing from '@/components/PageComponents/homePage/landing/Landing';
import Technologies from '@/components/PageComponents/homePage/technologies/Technologies';

// style
import './globals.css'

export default function Home() {
  return (
    <>
      <Landing />
      <Portfolio />
      <About />
      <Technologies />
      <Contact />
    </>
  );
}
