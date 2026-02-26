import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
  FaTelegramPlane,
  FaClock,
  FaPaperPlane,
  FaSpinner,
  FaRobot,
  FaUserTie,
} from "react-icons/fa";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.enum([
    "ai-chatbot",
    "web-development",
    "automation",
    "analytics",
    "other",
  ]),
  budget: z
    .enum(["<10k", "10k-25k", "25k-50k", "50k-100k", ">100k"])
    .optional(),
  timeline: z.enum(["urgent", "1-3months", "3-6months", "planning"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
  newsletter: z.boolean().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAIAssist, setIsAIAssist] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: "other",
      timeline: "planning",
      newsletter: false,
    },
  });

  // Remove memoized variables for watch to avoid React Compiler warning
  // Use watch directly where needed instead of assigning to selectedService/selectedTimeline
  // Example usage: services.find((s) => s.value === watch("service"))
  // and timelines.find((t) => t.value === watch("timeline"))

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form data:", data);

    toast.success(
      "Message sent successfully! We'll get back to you within 24 hours.",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      },
    );

    setIsSubmitting(false);
    reset();
  };

  const services = [
    { value: "ai-chatbot", label: "AI Chatbot Development", icon: FaRobot },
    { value: "web-development", label: "Web Development", icon: FaEnvelope },
    { value: "automation", label: "AI Automation", icon: FaClock },
    { value: "analytics", label: "AI Analytics", icon: FaUserTie },
    { value: "other", label: "Other / Custom Solution", icon: FaTelegramPlane },
  ];

  const budgetRanges = [
    { value: "<10k", label: "Under $10,000" },
    { value: "10k-25k", label: "$10,000 - $25,000" },
    { value: "25k-50k", label: "$25,000 - $50,000" },
    { value: "50k-100k", label: "$50,000 - $100,000" },
    { value: ">100k", label: "$100,000+" },
  ];

  const timelines = [
    { value: "urgent", label: "Urgent (ASAP)", color: "red" },
    { value: "1-3months", label: "1-3 Months", color: "yellow" },
    { value: "3-6months", label: "3-6 Months", color: "green" },
    { value: "planning", label: "Just Planning", color: "blue" },
  ];

  const aiSuggestMessage = () => {
    setIsAIAssist(true);
    // Simulate AI generating a message based on selected options
    setTimeout(() => {
      const serviceLabel =
        services.find((s) => s.value === watch("service"))?.label ||
        "your project";
      const timelineLabel =
        timelines.find((t) => t.value === watch("timeline"))?.label || "soon";

      const suggestedMessage = `I'm interested in discussing ${serviceLabel} for our company. We're looking to get started ${timelineLabel}. I'd love to learn more about your approach and how you've helped similar businesses. Could we schedule a call to discuss further?`;

      setValue("message", suggestedMessage);
      setIsAIAssist(false);
    }, 1500);
  };

  return (
    <>
      <section
        className="py-24 bg-linear-to-b from-gray-50 to-white relative overflow-hidden"
        ref={ref}
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Let's Build Something{" "}
              <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your business with AI? We're here to help you
              every step of the way.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Quick Response Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-linear-to-br from-primary-600 to-secondary-600 rounded-2xl p-6 text-white shadow-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FaClock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Quick Response</h3>
                    <p className="text-white/80">Within 24 hours</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  We pride ourselves on fast, professional responses to all
                  inquiries.
                </p>
              </motion.div>

              {/* AI Chat Assistant Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setShowAIChat(!showAIChat)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <FaRobot className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">AI Assistant</h3>
                    <p className="text-sm text-gray-500">24/7 instant help</p>
                  </div>
                </div>

                <AnimatePresence>
                  {showAIChat && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-100">
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <p className="text-sm text-gray-600">
                            👋 Hi! I'm your AI assistant. How can I help you
                            today?
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Ask me anything..."
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <button className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                            <FaPaperPlane className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Contact Details */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">
                  Contact Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href="mailto:hello@rmragency.com"
                        className="text-gray-900 font-medium hover:text-primary-600"
                      >
                        hello@rmragency.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FaPhone className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href="tel:+1234567890"
                        className="text-gray-900 font-medium hover:text-primary-600"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FaMapMarkerAlt className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Office</p>
                      <p className="text-gray-900 font-medium">
                        123 AI Street
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3">Follow us</p>
                  <div className="flex gap-3">
                    {[FaLinkedinIn, FaTwitter, FaGithub, FaWhatsapp].map(
                      (Icon, index) => (
                        <motion.a
                          key={index}
                          href="#"
                          whileHover={{ y: -3 }}
                          className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors"
                        >
                          <Icon className="w-5 h-5" />
                        </motion.a>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900 font-medium">
                      9:00 - 18:00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900 font-medium">
                      10:00 - 16:00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-900 font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                          errors.name ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                          errors.email ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone and Company Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                        placeholder="+1 (234) 567-890"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        {...register("company")}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interested In *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {services.map((service) => (
                        <label
                          key={service.value}
                          className={`relative flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                            watch("service") === service.value
                              ? "border-primary-600 bg-primary-50"
                              : "border-gray-200 hover:border-primary-300"
                          }`}
                        >
                          <input
                            type="radio"
                            value={service.value}
                            {...register("service")}
                            className="sr-only"
                          />
                          <service.icon
                            className={`w-4 h-4 ${
                              watch("service") === service.value
                                ? "text-primary-600"
                                : "text-gray-400"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              watch("service") === service.value
                                ? "text-primary-600 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {service.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  {/* Budget and Timeline Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        {...register("budget")}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {timelines.map((timeline) => (
                          <button
                            key={timeline.value}
                            type="button"
                            onClick={() =>
                              setValue(
                                "timeline",
                                timeline.value as ContactFormData["timeline"],
                              )
                            }
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                              watch("timeline") === timeline.value
                                ? `bg-${timeline.color}-500 text-white border-${timeline.color}-500`
                                : "border-gray-200 text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            {timeline.label}
                          </button>
                        ))}
                      </div>
                      {errors.timeline && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.timeline.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Message *
                      </label>
                      <button
                        type="button"
                        onClick={aiSuggestMessage}
                        disabled={isAIAssist}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 disabled:opacity-50"
                      >
                        {isAIAssist ? (
                          <>
                            <FaSpinner className="w-3 h-3 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FaRobot className="w-3 h-3" />
                            AI Assist
                          </>
                        )}
                      </button>
                    </div>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                        errors.message ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Tell us about your project..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Newsletter */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("newsletter")}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label className="text-sm text-gray-600">
                      Subscribe to our newsletter for AI insights and updates
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-linear-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FaPaperPlane className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Privacy Note */}
                  <p className="text-xs text-center text-gray-500">
                    By submitting this form, you agree to our privacy policy and
                    consent to being contacted. We'll never share your
                    information with third parties.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Map (Optional) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100949.2442971396!2d-122.43763492089839!3d37.7576792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1645564623456!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      <ToastContainer />
    </>
  );
};

export default Contact;
