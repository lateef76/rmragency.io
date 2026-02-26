import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const socials = [
  { href: "https://twitter.com/", icon: FaTwitter, label: "Twitter" },
  { href: "https://linkedin.com/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://github.com/", icon: FaGithub, label: "GitHub" },
];

const SocialIcons: React.FC = () => (
  <div className="flex gap-4 mt-4">
    {socials.map(({ href, icon: Icon, label }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-white/80 hover:text-primary-400 transition-colors text-2xl"
      >
        <Icon />
      </a>
    ))}
  </div>
);

export default SocialIcons;
