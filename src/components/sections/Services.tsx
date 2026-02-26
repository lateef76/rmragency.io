import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaRobot,
  FaLaptopCode,
  FaChartLine,
  FaBrain,
  FaArrowRight,
  FaClock,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";
import { SiOpenai, SiPython, SiReact } from "react-icons/si";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  tech: React.ElementType[];
  color: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  features,
  tech,
  color,
  delay,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="group relative perspective-1000"
    >
      {/* 3D Card Container */}
      <motion.div
        whileHover={{ rotateY: 5, rotateX: 5 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-100 preserve-3d cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden">
          <div
            className={`h-full bg-linear-to-br ${color} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 backdrop-blur-sm`}
          >
            {/* Icon with animated background */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform">
              {title}
            </h3>

            {/* Description */}
            <p className="text-white/80 mb-6 line-clamp-3">{description}</p>

            {/* Tech Stack Icons */}
            <div className="flex gap-3 mb-6">
              {tech.map((TechIcon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm"
                >
                  <TechIcon className="w-5 h-5 text-white" />
                </motion.div>
              ))}
            </div>

            {/* Features Preview */}
            <div className="space-y-2 mb-6">
              {features.slice(0, 2).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-white/70 text-sm"
                >
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  {feature}
                </div>
              ))}
            </div>

            {/* Flip Hint */}
            <div className="absolute bottom-4 right-4 text-white/50 text-sm flex items-center gap-1">
              <span>Hover for 3D</span>
              <FaArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 backface-hidden rotateY-180"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div
            className={`h-full bg-linear-to-br ${color} rounded-2xl p-8 shadow-xl border border-white/20`}
          >
            {/* Back Content */}
            <h4 className="text-xl font-bold text-white mb-4">Features</h4>

            {/* All Features */}
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  {feature}
                </motion.div>
              ))}
            </div>

            {/* Timeline */}
            <div className="flex items-center gap-2 text-white/70 mb-4">
              <FaClock className="w-4 h-4" />
              <span className="text-sm">2-4 weeks delivery</span>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 px-4 py-2 bg-white/20 rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
            >
              Learn More
              <FaArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: "AI Chatbots",
      description:
        "Intelligent conversational agents that handle customer support 24/7 with natural language understanding.",
      icon: FaRobot,
      features: [
        "24/7 Automated Support",
        "Natural Language Processing",
        "Multi-language Support",
        "Custom Training Data",
        "Analytics Dashboard",
        "Human Hand-off",
      ],
      tech: [SiOpenai, FaBrain, FaRobot],
      color: "from-purple-600 to-blue-600",
      delay: 0.1,
    },
    {
      title: "Web Development",
      description:
        "High-performance websites and web applications built with modern frameworks and best practices.",
      icon: FaLaptopCode,
      features: [
        "React/Next.js Development",
        "Responsive Design",
        "SEO Optimization",
        "PWA Support",
        "E-commerce Solutions",
        "CMS Integration",
      ],
      tech: [SiReact, FaLaptopCode, FaShieldAlt],
      color: "from-blue-600 to-cyan-600",
      delay: 0.2,
    },
    {
      title: "AI Automation",
      description:
        "Streamline your workflows with intelligent automation that saves time and reduces errors.",
      icon: FaBrain,
      features: [
        "Workflow Automation",
        "Data Processing",
        "Integration Setup",
        "Custom API Development",
        "Real-time Monitoring",
        "Scalable Solutions",
      ],
      tech: [FaRobot, FaBrain, SiPython],
      color: "from-green-600 to-teal-600",
      delay: 0.3,
    },
    {
      title: "AI Analytics",
      description:
        "Transform your data into actionable insights with predictive analytics and business intelligence.",
      icon: FaChartLine,
      features: [
        "Predictive Analytics",
        "Custom Dashboards",
        "Real-time Reporting",
        "Data Visualization",
        "Trend Analysis",
        "ROI Tracking",
      ],
      tech: [FaChartLine, FaBrain, FaUsers],
      color: "from-orange-600 to-red-600",
      delay: 0.4,
    },
  ];

  return (
    <section className="py-24 bg-linear-to-b from-gray-50 to-white overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            AI Solutions That <span className="gradient-text">Transform</span>{" "}
            Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge AI technology with web development expertise
            to deliver solutions that drive real business results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: 50, suffix: "+", label: "AI Models", icon: FaBrain },
            { number: 100, suffix: "+", label: "Websites", icon: FaLaptopCode },
            { number: 200, suffix: "+", label: "Automations", icon: FaRobot },
            { number: 98, suffix: "%", label: "Client Satisfaction", icon: FaUsers },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <stat.icon className="w-8 h-8 mx-auto text-primary-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900">
                <CountUp end={stat.number} duration={2} suffix={stat.suffix} />
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add custom CSS for 3D effects */}
      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Services;
