// ...existing code...
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Portfolio from "./components/sections/Portfolio";

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Portfolio />
    </div>
  );
}

export default App;
