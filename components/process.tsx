"use client"

import { motion } from "framer-motion"
import { Lightbulb, Pencil, Code, Rocket } from "lucide-react"

const steps = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Discovery",
    description: "We dive deep into your business goals, target audience, and project requirements.",
  },
  {
    icon: Pencil,
    number: "02",
    title: "Design",
    description: "Our designers craft beautiful, user-centric interfaces that align with your brand.",
  },
  {
    icon: Code,
    number: "03",
    title: "Development",
    description: "We build robust, scalable solutions using the latest technologies and best practices.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch",
    description: "We deploy your project and provide ongoing support to ensure continued success.",
  },
]

export function Process() {
  return (
    <section id="process" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 text-balance">
            Our <span className="text-purple-500">Process</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto text-balance">
            A proven methodology that delivers exceptional results every time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent" />
              )}

              <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                <div className="text-6xl font-display font-black text-purple-500/20 mb-4">{step.number}</div>

                <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                  <step.icon className="text-purple-400" size={28} />
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-3">{step.title}</h3>

                <p className="text-white/60 leading-relaxed text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
