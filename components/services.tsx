"use client"

import { motion } from "framer-motion"
import { Code2, Palette, Rocket, Smartphone, Globe, Zap } from "lucide-react"

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Custom web applications built with cutting-edge technologies and best practices.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that users love and remember.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile solutions for iOS and Android.",
  },
  {
    icon: Globe,
    title: "E-Commerce",
    description: "Scalable online stores that drive conversions and revenue.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Lightning-fast websites optimized for speed and SEO.",
  },
  {
    icon: Rocket,
    title: "Consulting",
    description: "Strategic guidance to accelerate your digital transformation.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-32 relative overflow-hidden">
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
            What We <span className="text-purple-500">Create</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto text-balance">
            Full-spectrum digital solutions tailored to your unique needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-purple-500/0 group-hover:bg-purple-500/5 transition-all duration-300" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="text-purple-400" size={28} />
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-3">{service.title}</h3>

                  <p className="text-white/60 leading-relaxed">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
