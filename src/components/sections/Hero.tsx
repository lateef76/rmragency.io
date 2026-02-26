import React from "react";
import heroTeamImg from "../../assets/images/heroTeamImg.png";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Typewriter from "../ui/Typewriter";
import SocialIcons from "../ui/SocialIcons";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-blue-900 to-blue-600 overflow-hidden">
      <div className="container mx-auto px-4 py-16 flex flex-col-reverse md:flex-row items-center gap-12 z-10">
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col items-start justify-center text-white"
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2">
            Real Men Real Agency
            <br />
            <span className="bg-linear-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
              Where Real Ideas Meet Real Impact
            </span>
          </h1>
          <div className="mb-4 text-blue-200 text-lg md:text-xl">
            <Typewriter />
          </div>
          <p className="text-base md:text-lg text-blue-100 mb-6 max-w-xl">
            We build beautiful, high-performance websites and intelligent AI automations that drive real results for your business.
          </p>
          <motion.div
            whileHover={{ scale: 1.07, boxShadow: "0 0 16px #38bdf8" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block mb-4"
          >
            <Button
              variant="primary"
              size="lg"
              className="px-8 py-3 text-lg font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Explore Our Work
            </Button>
          </motion.div>
          <SocialIcons />
          {/* Decorative badge/achievement */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="mt-6 bg-linear-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-full shadow-lg text-sm font-semibold"
            aria-label="Achievement badge"
          >
            🏆 50+ Projects Delivered
          </motion.div>
        </motion.div>
        {/* Animated scroll-down indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        >
          <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center items-start">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-bounce"></div>
          </div>
          <span className="mt-1 text-xs text-white/60 tracking-wide">
            Scroll Down
          </span>
        </motion.div>
        {/* Right Side: Team Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 flex items-center justify-center"
        >
          <img
            src={heroTeamImg}
            alt="RMR Agency Team"
            className="rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl object-cover border-4 border-blue-700"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
