"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Web Application",
    description: "Real-time financial analytics platform",
    image: "/modern-fintech-dashboard-dark-purple.jpg",
  },
  {
    title: "E-Commerce Platform",
    category: "Online Store",
    description: "Next-gen shopping experience",
    image: "/luxury-ecommerce-website-dark-theme.jpg",
  },
  {
    title: "SaaS Product",
    category: "Web Application",
    description: "Cloud-based project management",
    image: "/saas-project-management-interface-dark.jpg",
  },
  {
    title: "Mobile Banking App",
    category: "Mobile App",
    description: "Secure digital banking solution",
    image: "/mobile-banking-app-interface-purple.jpg",
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#9333ea10_0%,transparent_65%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 text-balance">
            Featured <span className="text-purple-500">Work</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto text-balance">
            Explore our latest projects and see how we bring visions to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5 border border-white/10">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-sm text-purple-400 mb-2">{project.category}</div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">View Project</span>
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
