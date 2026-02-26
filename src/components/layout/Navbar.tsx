import { useState } from "react";
import {
  FaHome,
  FaCogs,
  FaBriefcase,
  FaUsers,
  FaBlog,
  FaEnvelope,
  FaRobot,
  FaTimes,
} from "react-icons/fa";

const navLinks = [
  { label: "Home", to: "hero", icon: <FaHome /> },
  { label: "Services", to: "services", icon: <FaCogs /> },
  { label: "Portfolio", to: "portfolio", icon: <FaBriefcase /> },
  { label: "Testimonials", to: "testimonials", icon: <FaUsers /> },
  { label: "Blog", to: "blog", icon: <FaBlog /> },
  { label: "Contact", to: "contact", icon: <FaEnvelope /> },
];

const Navbar = ({ onNavigate }: { onNavigate: (id: string) => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="container-custom flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center gap-2 select-none">
          <span
            className="text-3xl text-primary-700 drop-shadow-lg transition-transform duration-300 hover:scale-110 hover:text-secondary-600 cursor-pointer relative"
            title="Welcome to RMR Agency!"
            onClick={() => onNavigate("home")}
          >
            <FaRobot />
            <span className="absolute -top-1 -right-2 w-3 h-3 bg-linear-to-r from-secondary-600 to-primary-400 rounded-full border border-white animate-pulse"></span>
          </span>
          <span className="font-display text-2xl md:text-3xl font-extrabold tracking-tight leading-none text-transparent bg-linear-to-r from-primary-700 via-secondary-600 to-primary-400 bg-clip-text uppercase">
            <span className="tracking-widest">RMR</span>
            <span className="ml-2 font-black text-secondary-600">Agency</span>
          </span>
        </div>
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-primary-700 border-primary-700"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Desktop Nav */}
        <ul className="hidden md:flex md:items-center">
          {navLinks.map((link) => (
            <li key={link.to} className="mx-4 my-2 md:my-0">
              <button
                onClick={() => onNavigate(link.to)}
                className="flex items-center gap-2 cursor-pointer text-primary-700 hover:text-secondary-600 font-medium transition-colors bg-transparent border-none outline-none px-2 py-1 rounded-md hover:bg-primary-50"
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile Sidebar Nav */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{
          willChange: "transform",
          background: open ? "#fff" : "#fff",
          height: "100vh",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
          className="absolute top-2 right-2 text-2xl text-primary-700 hover:text-secondary-600 bg-gray-100 rounded-full p-1 shadow"
        >
          <FaTimes />
        </button>
        <div className="flex flex-col items-center gap-2 select-none min-h-22.5 justify-center relative mt-8">
          <span className="text-4xl md:text-3xl text-primary-700 drop-shadow-lg animate-bounce">
            <FaRobot />
          </span>
        </div>
        <ul className="flex flex-col gap-2 p-6 mt-4">
          {navLinks.map((link) => (
            <li key={link.to}>
              <button
                onClick={() => {
                  onNavigate(link.to);
                  setOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left text-primary-700 hover:text-secondary-600 font-medium transition-colors bg-transparent border-none outline-none px-2 py-3 rounded-md hover:bg-primary-50 text-lg"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black z-40 md:hidden"
          style={{ opacity: 0.7 }}
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
