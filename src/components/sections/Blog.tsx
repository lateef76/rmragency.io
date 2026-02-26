import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { format } from "date-fns";
import {
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaSearch,
  FaTimes,
  FaBookmark,
  FaShareAlt,
  FaHeart,
  FaComment,
  FaEye,
} from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
  };
  date: Date;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
}

const Blog: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);

  const categories = [
    "all",
    "AI Technology",
    "Web Development",
    "Automation",
    "Business Strategy",
    "Case Studies",
    "Industry Trends",
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of AI in Business: 2024 Trends",
      excerpt:
        "Explore how artificial intelligence is reshaping industries and what trends will dominate 2024.",
      content: "Full article content here...",
      author: {
        name: "Dr. Sarah Chen",
        avatar:
          "https://images.unsplash.com/photo-1494790108777-466d345a23c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
        role: "AI Research Lead",
        bio: "PhD in Machine Learning with 10+ years experience in AI implementation.",
      },
      date: new Date(2024, 0, 15),
      readTime: 8,
      category: "AI Technology",
      tags: ["AI", "Trends", "Business"],
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      views: 1234,
      likes: 89,
      comments: 23,
      featured: true,
    },
    {
      id: 2,
      title: "Building Scalable Chatbots: A Technical Deep Dive",
      excerpt:
        "Learn the architecture and best practices for creating chatbots that handle millions of conversations.",
      content: "Full article content here...",
      author: {
        name: "Mike Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
        role: "Senior AI Engineer",
        bio: "Full-stack developer specializing in conversational AI and NLP.",
      },
      date: new Date(2024, 0, 10),
      readTime: 12,
      category: "Automation",
      tags: ["Chatbots", "NLP", "Architecture"],
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      views: 892,
      likes: 45,
      comments: 12,
      featured: true,
    },
    {
      id: 3,
      title: "Web Development Trends 2024: What's Next?",
      excerpt:
        "From server components to edge computing, discover the technologies shaping the web.",
      content: "Full article content here...",
      author: {
        name: "Alex Thompson",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
        role: "Lead Web Developer",
        bio: "Full-stack developer with passion for modern web technologies.",
      },
      date: new Date(2024, 0, 5),
      readTime: 6,
      category: "Web Development",
      tags: ["React", "Next.js", "Trends"],
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      views: 2156,
      likes: 167,
      comments: 34,
      featured: false,
    },
    {
      id: 4,
      title: "Automating Customer Support: ROI Analysis",
      excerpt:
        "Real data showing how AI automation reduces costs and improves satisfaction.",
      content: "Full article content here...",
      author: {
        name: "Jessica Park",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
        role: "Business Strategist",
        bio: "Expert in digital transformation and ROI optimization.",
      },
      date: new Date(2023, 11, 20),
      readTime: 10,
      category: "Business Strategy",
      tags: ["ROI", "Automation", "Support"],
      image:
        "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      views: 567,
      likes: 34,
      comments: 8,
      featured: false,
    },
    {
      id: 5,
      title: "Case Study: How AI Increased Sales by 200%",
      excerpt:
        "A deep dive into our e-commerce client's journey with AI-powered recommendations.",
      content: "Full article content here...",
      author: {
        name: "David Williams",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
        role: "Solutions Architect",
        bio: "Designs AI solutions for e-commerce and retail.",
      },
      date: new Date(2023, 11, 15),
      readTime: 15,
      category: "Case Studies",
      tags: ["E-commerce", "AI", "Success Story"],
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      views: 3456,
      likes: 234,
      comments: 56,
      featured: true,
    },
    {
      id: 6,
      title: "Getting Started with LangChain",
      excerpt:
        "A beginner's guide to building applications with LangChain and LLMs.",
      content: "Full article content here...",
      author: {
        name: "Emily Zhang",
        avatar:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
        role: "AI Developer",
        bio: "Specializes in LLM applications and prompt engineering.",
      },
      date: new Date(2023, 11, 10),
      readTime: 8,
      category: "AI Technology",
      tags: ["LangChain", "LLM", "Tutorial"],
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      views: 1876,
      likes: 145,
      comments: 28,
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  const toggleSavePost = (postId: number) => {
    setSavedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  };

  return (
    <>
      <section className="py-24 bg-white" ref={ref}>
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Insights
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Latest from <span className="gradient-text">Our Blog</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends in AI, web development, and
              automation.
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-linear-to-r from-primary-600 to-secondary-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category === "all" ? "All Posts" : category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Featured Articles
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-64 overflow-hidden">
                        <LazyLoadImage
                          src={post.image}
                          alt={post.title}
                          effect="blur"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                            {post.category}
                          </span>
                        </div>

                        {/* Featured Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold">
                            Featured
                          </span>
                        </div>

                        {/* Post Meta at Bottom */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h4 className="text-xl font-bold mb-2 line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt className="w-3 h-3" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock className="w-3 h-3" />
                              {post.readTime} min read
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <LazyLoadImage
                        src={post.image}
                        alt={post.title}
                        effect="blur"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Category Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                          {post.category}
                        </span>
                      </div>

                      {/* Save Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSavePost(post.id);
                        }}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                      >
                        <FaBookmark
                          className={`w-4 h-4 text-white ${savedPosts.includes(post.id) ? "fill-current" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Author and Date */}
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {post.author.name}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt className="w-3 h-3" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FaClock className="w-3 h-3" />
                              {post.readTime} min
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaEye className="w-4 h-4" />
                          {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaHeart className="w-4 h-4" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment className="w-4 h-4" />
                          {post.comments}
                        </span>
                      </div>

                      {/* Read More Link */}
                      <div className="mt-4 flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                        <span>Read More</span>
                        <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Button */}
          {filteredPosts.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12"
            >
              <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-105">
                Load More Articles
              </button>
            </motion.div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <FaTimes />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto h-full">
                {/* Featured Image */}
                <div className="relative h-96">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex gap-2 mb-4">
                      {selectedPost.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                      {selectedPost.title}
                    </h1>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedPost.author.avatar}
                          alt={selectedPost.author.name}
                          className="w-12 h-12 rounded-full border-2 border-white"
                        />
                        <div>
                          <p className="font-semibold">
                            {selectedPost.author.name}
                          </p>
                          <p className="text-sm text-white/80">
                            {selectedPost.author.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt />
                          {new Date(selectedPost.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock />
                          {selectedPost.readTime} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Author Bio */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-gray-900 mb-2">
                      About the Author
                    </h3>
                    <p className="text-gray-600">{selectedPost.author.bio}</p>
                  </div>

                  {/* Article Content */}
                  <div className="prose prose-lg max-w-none">
                    <p className="lead text-xl text-gray-700 mb-6">
                      {selectedPost.excerpt}
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h2>Key Takeaways</h2>
                    <ul>
                      <li>Understanding the core concepts</li>
                      <li>Implementation strategies</li>
                      <li>Best practices and common pitfalls</li>
                    </ul>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </div>

                  {/* Share and Interaction */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                          <FaHeart className="w-4 h-4 text-red-500" />
                          <span>{selectedPost.likes} Likes</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                          <FaBookmark className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <FaShareAlt />
                        </button>
                      </div>
                    </div>
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

export default Blog;
