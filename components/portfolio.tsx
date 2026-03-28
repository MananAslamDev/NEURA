"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { toast } from "sonner"

const projects = [
  {
    title: "Dental Clinic Receptionist",
    category: "Call Booking & Scheduling",
    description: "Handles inquiries and schedules appointments",
    image: "/dental_ai_dashboard.png",
  },
  {
    title: "Real Estate Lead Qualifier",
    category: "CRM Automation",
    description: "Scores leads and updates Google Sheets CRM",
    image: "/real_estate_ai.png",
  },
  {
    title: "E-Commerce Support",
    category: "Intelligent FAQ Handling",
    description: "Tracks orders and sends WhatsApp updates",
    image: "/ecommerce_ai_support.png",
  },
  {
    title: "Gym Booking Assistant",
    category: "Mobile Management",
    description: "Manages class schedules and cancellations",
    image: "/gym_mobile_ai.png",
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
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4 text-balance">
            Use Cases / <span className="text-purple-500">Case Studies</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Explore how our AI Voice Agents are transforming businesses
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
              onClick={() => toast.info("Viewing case study data is currently restricted under client NDA.")}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5 dark:bg-white/5 border border-border">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 dark:via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-sm text-purple-400 mb-2">{project.category}</div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-foreground/70 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
