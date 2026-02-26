// ...existing code...
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Portfolio from "./components/sections/Portfolio";
import Testimonials from "./components/sections/Testimonials";
import Blog from "./components/sections/Blog";
function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <Blog />
    </div>
  );
}

export default App;
