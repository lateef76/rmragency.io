import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
// @ts-expect-error: No type definitions for react-lazy-load-image-component
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaRobot,
  FaLaptopCode,
  FaBrain,
  FaChartLine,
} from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  category: "ai-chatbot" | "website" | "automation" | "analytics";
  description: string;
  image: string;
  images: string[];
  technologies: string[];
  client: string;
  date: string;
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  challenge: string;
  solution: string;
}

const Portfolio: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // For swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Move nextImage/prevImage above useEffect to avoid TDZ
  const nextImage = React.useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1,
      );
    }
  }, [selectedProject]);

  const prevImage = React.useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1,
      );
    }
  }, [selectedProject]);

  // Handle swipe for modal image gallery
  useEffect(() => {
    if (!selectedProject) return;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      if (touchStartX.current !== null && touchEndX.current !== null) {
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50) nextImage();
        if (diff < -50) prevImage();
      }
      touchStartX.current = null;
      touchEndX.current = null;
    };
    const modal = document.getElementById("portfolio-modal-gallery");
    if (modal) {
      modal.addEventListener("touchstart", handleTouchStart);
      modal.addEventListener("touchmove", handleTouchMove);
      modal.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (modal) {
        modal.removeEventListener("touchstart", handleTouchStart);
        modal.removeEventListener("touchmove", handleTouchMove);
        modal.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [selectedProject, currentImageIndex, nextImage, prevImage]);

  const categories = [
    { id: "all", label: "All Projects", icon: null },
    { id: "ai-chatbot", label: "AI Chatbots", icon: FaRobot },
    { id: "website", label: "Websites", icon: FaLaptopCode },
    { id: "automation", label: "Automation", icon: FaBrain },
    { id: "analytics", label: "Analytics", icon: FaChartLine },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "EcoSmart AI Assistant",
      category: "ai-chatbot",
      description:
        "Intelligent chatbot for sustainable living advice and carbon footprint tracking.",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      ],
      technologies: ["OpenAI", "LangChain", "Next.js", "Pinecone"],
      client: "EcoSmart Solutions",
      date: "2024",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: [
        "24/7 automated responses",
        "Carbon footprint calculator",
        "Personalized recommendations",
        "Multi-language support",
      ],
      challenge:
        "Creating an engaging conversational experience that educates users about sustainability while providing practical advice.",
      solution:
        "Implemented a fine-tuned GPT model with custom knowledge base about sustainability topics and real-time data integration.",
    },
    {
      id: 2,
      title: "FinTech Dashboard Pro",
      category: "analytics",
      description:
        "Real-time financial analytics dashboard with predictive insights.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      ],
      technologies: ["Python", "TensorFlow", "D3.js", "React"],
      client: "CapitalVison Inc",
      date: "2024",
      liveUrl: "https://example.com",
      features: [
        "Real-time market data",
        "Predictive analytics",
        "Custom alerts",
        "Portfolio optimization",
      ],
      challenge:
        "Processing large volumes of financial data in real-time while maintaining accuracy and performance.",
      solution:
        "Built a scalable architecture using WebSocket connections and implemented machine learning models for trend prediction.",
    },
    {
      id: 3,
      title: "HealthCare Workflow Automator",
      category: "automation",
      description: "Automated patient scheduling and record management system.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      ],
      technologies: ["Python", "Zapier", "React", "Node.js"],
      client: "City Medical Center",
      date: "2023",
      liveUrl: "https://example.com",
      features: [
        "Automated scheduling",
        "Patient record management",
        "Insurance verification",
        "Appointment reminders",
      ],
      challenge:
        "Integrating with legacy hospital systems while ensuring HIPAA compliance and data security.",
      solution:
        "Developed secure API middleware and implemented automated workflows with encryption at rest and in transit.",
    },
    {
      id: 4,
      title: "E-Commerce Platform",
      category: "website",
      description:
        "Modern e-commerce platform with AI-powered recommendations.",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      ],
      technologies: ["Next.js", "Stripe", "Tailwind", "MongoDB"],
      client: "FashionHub",
      date: "2024",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: [
        "AI recommendations",
        "Secure checkout",
        "Inventory management",
        "Analytics dashboard",
      ],
      challenge:
        "Creating a seamless shopping experience that handles high traffic during sales events.",
      solution:
        "Implemented server-side rendering with Next.js and optimized database queries for scalability.",
    },
    {
      id: 5,
      title: "Customer Support AI",
      category: "ai-chatbot",
      description: "Multi-channel AI support bot for telecom company.",
      image:
        "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      ],
      technologies: ["Dialogflow", "React", "Node.js", "MongoDB"],
      client: "Telecom Plus",
      date: "2023",
      features: [
        "Multi-channel support",
        "Ticket automation",
        "Sentiment analysis",
        "Handoff to humans",
      ],
      challenge:
        "Handling complex telecom queries across multiple channels (web, WhatsApp, SMS).",
      solution:
        "Built a unified AI backend that maintains context across channels with seamless human handoff.",
    },
    {
      id: 6,
      title: "Supply Chain Optimizer",
      category: "automation",
      description: "AI-powered supply chain optimization system.",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        "https://images.unsplash.com/photo-1566576912321-d8e65e048dff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      ],
      technologies: ["Python", "TensorFlow", "Apache Airflow", "React"],
      client: "LogiCorp",
      date: "2024",
      features: [
        "Demand forecasting",
        "Route optimization",
        "Inventory management",
        "Supplier analytics",
      ],
      challenge:
        "Optimizing complex supply chains with multiple variables and constraints.",
      solution:
        "Developed reinforcement learning models that continuously improve routing and inventory decisions.",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  const openLightbox = (project: Project, index: number) => {
    setSelectedProject(project);
    setCurrentImageIndex(index);
    setTimeout(() => {
      document.body.style.overflow = "hidden";
    }, 0);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setTimeout(() => {
      document.body.style.overflow = "unset";
    }, 0);
  };

  // (Removed duplicate nextImage/prevImage declarations)

  return (
    <>
      <section className="py-24 bg-gray-50" ref={ref}>
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Our Work
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of AI and web development projects that
              deliver real business value.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  filter === cat.id
                    ? "bg-linear-to-r from-primary-600 to-secondary-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:shadow-md"
                }`}
              >
                {cat.icon && <cat.icon className="w-4 h-4" />}
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(project, 0)}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-64">
                      <LazyLoadImage
                        src={project.image}
                        alt={project.title}
                        effect="blur"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex gap-2">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaExternalLinkAlt className="w-4 h-4 text-white" />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaGithub className="w-4 h-4 text-white" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                          {
                            categories.find((c) => c.id === project.category)
                              ?.label
                          }
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg"
            >
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <FaTimes />
              </button>

              <div className="flex flex-col lg:flex-row h-full">
                {/* Image Gallery */}
                <div id="portfolio-modal-gallery" className="lg:w-3/5 h-64 lg:h-auto relative bg-gray-900 touch-pan-x">
                  <LazyLoadImage
                    src={selectedProject.images[currentImageIndex]}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain select-none"
                    draggable={false}
                  />

                  {/* Navigation Arrows */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                    <span aria-live="polite" aria-atomic="true">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="lg:w-2/5 p-8 overflow-y-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProject.title}
                  </h3>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-gray-500">
                      Client: {selectedProject.client}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedProject.date}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Challenge & Solution */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-2">Challenge</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {selectedProject.challenge}
                    </p>

                    <h4 className="font-bold text-gray-900 mb-2">Solution</h4>
                    <p className="text-gray-600 text-sm">
                      {selectedProject.solution}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedProject.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-center gap-2"
                        >
                          <div className="w-1 h-1 bg-primary-600 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                          tabIndex={0}
                          aria-label={tech}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-linear-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <FaExternalLinkAlt />
                        Live Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <FaGithub />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;
