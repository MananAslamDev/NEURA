"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "TechFlow SaaS",
    category: "Web Application",
    description: "A modern SaaS platform for project management with real-time collaboration features",
    image: "/modern-saas-dashboard-purple-dark.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    link: "#",
  },
  {
    title: "LuxeStore",
    category: "E-Commerce",
    description: "Premium e-commerce platform for luxury fashion with seamless checkout experience",
    image: "/luxury-ecommerce-website-dark-elegant.jpg",
    tags: ["Next.js", "Stripe", "Tailwind", "Framer Motion"],
    link: "#",
  },
  {
    title: "FitnessPro",
    category: "Mobile App",
    description: "Fitness tracking app with personalized workout plans and nutrition guidance",
    image: "/fitness-app-interface-purple-modern.jpg",
    tags: ["React Native", "Firebase", "Redux", "Charts"],
    link: "#",
  },
  {
    title: "CryptoVault",
    category: "Web3 Platform",
    description: "Secure cryptocurrency wallet with portfolio tracking and trading features",
    image: "/crypto-wallet-dashboard-dark-futuristic.jpg",
    tags: ["Web3.js", "Ethereum", "React", "TypeScript"],
    link: "#",
  },
  {
    title: "MindfulSpace",
    category: "Wellness Platform",
    description: "Meditation and mindfulness app with guided sessions and progress tracking",
    image: "/meditation-app-calm-purple-gradient.jpg",
    tags: ["Vue.js", "Audio API", "PWA", "Animation"],
    link: "#",
  },
  {
    title: "DataViz Pro",
    category: "Analytics Dashboard",
    description: "Advanced data visualization platform for business intelligence and reporting",
    image: "/analytics-dashboard-charts-dark-professional.jpg",
    tags: ["D3.js", "React", "Python", "API"],
    link: "#",
  },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 text-white">
              Our <span className="glow-purple">Work</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Explore our portfolio of cutting-edge digital experiences crafted for forward-thinking brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Project Info */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-white/60 mb-6 leading-relaxed">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors group/link"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-white">
              Ready to Start Your <span className="glow-purple">Project?</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Let's create something extraordinary together. Get in touch to discuss your vision.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8">
                Start a Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
