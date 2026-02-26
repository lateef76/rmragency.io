import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Portfolio from "./components/sections/Portfolio";
import Testimonials from "./components/sections/Testimonials";
import Blog from "./components/sections/Blog";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import { useState } from "react";

const sections = [
  { id: "hero", component: <Hero /> },
  { id: "services", component: <Services /> },
  { id: "portfolio", component: <Portfolio /> },
  { id: "testimonials", component: <Testimonials /> },
  { id: "blog", component: <Blog /> },
  { id: "contact", component: <Contact /> },
];

function App() {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <>
      <Navbar onNavigate={setActiveSection} />
      <main>
        {sections.map(
          (section) =>
            section.id === activeSection && (
              <div key={section.id}>{section.component}</div>
            ),
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
