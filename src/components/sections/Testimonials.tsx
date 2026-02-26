import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
// Carousel removed
import {
  FaQuoteLeft,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaRocket,
  FaRobot,
  FaUsers,
  FaSmile,
  FaChartLine,
  FaAward,
} from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  companyLogo?: string;
  image: string;
  content: string;
  rating: number;
  linkedin?: string;
  twitter?: string;
  website?: string;
  projectType: string;
}

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
}

const Testimonials: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Carousel state removed

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CTO",
      company: "TechFlow Solutions",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      content:
        "RMR Agency transformed our customer support with an AI chatbot that handles 80% of inquiries automatically. The integration was seamless and the results were immediate. Our response time went from hours to seconds.",
      rating: 5,
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      website: "https://techflow.com",
      projectType: "AI Chatbot",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Founder",
      company: "EcoSmart",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      content:
        "The team at RMR didn't just build us a website—they created a complete digital ecosystem. Our online sales have increased by 150% since launch, and the AI-powered recommendations are driving repeat business.",
      rating: 5,
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      website: "https://ecosmart.com",
      projectType: "E-commerce Website",
    },
  ];

  const stats: StatItem[] = [
    {
      icon: FaRocket,
      value: 150,
      suffix: "+",
      label: "Projects Delivered",
      description: "Successfully completed projects",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaUsers,
      value: 85,
      suffix: "+",
      label: "Happy Clients",
      description: "Satisfied customers worldwide",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaRobot,
      value: 200,
      suffix: "+",
      label: "AI Automations",
      description: "Intelligent workflows deployed",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: FaSmile,
      value: 98,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Would recommend our services",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: FaChartLine,
      value: 300,
      suffix: "%",
      label: "Avg. ROI",
      description: "Return on investment for clients",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: FaAward,
      value: 15,
      suffix: "+",
      label: "Industry Awards",
      description: "Recognition for excellence",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <section className="py-24 bg-linear-to-b from-white to-gray-50 overflow-hidden">
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
            Social Proof
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it — hear from some of our satisfied
            clients about how we've helped transform their businesses.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                {/* Icon with gradient background */}
                <div className={`relative mb-4 inline-block`}>
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${stat.color} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}
                  ></div>
                  <div
                    className={`relative w-16 h-16 mx-auto bg-linear-to-r ${stat.color} rounded-2xl flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform`}
                  >
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>

                {/* Counter */}
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>

                {/* Label */}
                <div className="font-semibold text-gray-800 mb-1">
                  {stat.label}
                </div>

                {/* Description (hidden by default, shows on hover) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-12 left-0 right-0 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-xl z-10 pointer-events-none"
                >
                  {stat.description}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials List (carousel removed) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="grid gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-xl relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-2xl text-primary-100">
                  <FaQuoteLeft />
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Client Image */}
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-linear-to-r from-primary-600 to-secondary-600 rounded-full blur-lg opacity-50"></div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />

                    {/* Project Type Badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-linear-to-r from-primary-600 to-secondary-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                      {testimonial.projectType}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    {/* Rating */}
                    <div className="flex gap-1 mb-3">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 text-lg mb-6 italic">
                      "{testimonial.content}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600">
                          {testimonial.position} at {testimonial.company}
                        </p>
                      </div>

                      {/* Social Links */}
                      <div className="flex gap-2">
                        {testimonial.linkedin && (
                          <a
                            href={testimonial.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors"
                          >
                            <FaLinkedin className="w-4 h-4" />
                          </a>
                        )}
                        {testimonial.twitter && (
                          <a
                            href={testimonial.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors"
                          >
                            <FaTwitter className="w-4 h-4" />
                          </a>
                        )}
                        {testimonial.website && (
                          <a
                            href={testimonial.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors"
                          >
                            <FaGlobe className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}

      </div>
    </section>
  );
};

export default Testimonials;
