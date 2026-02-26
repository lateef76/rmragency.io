import React from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaArrowUp } from "react-icons/fa";

const socialLinks = [
  { href: "https://linkedin.com", icon: <FaLinkedin />, label: "LinkedIn" },
  { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
  { href: "https://github.com", icon: <FaGithub />, label: "GitHub" },
];

const Footer: React.FC = () => (
  <footer className="w-full bg-gray-900 text-white py-6 text-center text-sm mt-8">
    <div className="container-custom mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
      <div className="flex gap-4 mb-2 md:mb-0">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary-400 text-xl transition-colors"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
      <div className="mb-2 md:mb-0">
        &copy; {new Date().getFullYear()} RMR Agency. All rights reserved.
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-1 px-3 py-2 rounded bg-primary-700 hover:bg-primary-600 text-white text-xs font-semibold shadow transition-all"
        aria-label="Back to top"
      >
        <FaArrowUp /> Top
      </button>
    </div>
  </footer>
);

export default Footer;
