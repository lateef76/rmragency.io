import React, { useEffect, useState } from "react";

const words = [
  "AI-Powered Solutions",
  "Web Development",
  "Automation Experts",
  "Your Digital Partner",
];

const Typewriter: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }
    if (subIndex === 0 && deleting) {
      setTimeout(() => {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 100);
      return;
    }
    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      },
      deleting ? 40 : 120,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  useEffect(() => {
    const blinkTimeout = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkTimeout);
  }, []);

  return (
    <span className="inline-block min-w-56">
      {words[index].substring(0, subIndex)}
      <span className={blink ? "opacity-100" : "opacity-0"}>|</span>
    </span>
  );
};

export default Typewriter;
