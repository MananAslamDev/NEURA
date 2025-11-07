"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const features = [
  "Cutting-edge technology stack",
  "Agile development methodology",
  "Dedicated project management",
  "Post-launch support & maintenance",
]

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 text-balance">
              We Turn Ideas Into <span className="text-purple-500">Digital Reality</span>
            </h2>

            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              NEURA is a premium web development agency specializing in creating exceptional digital experiences. We
              combine strategic thinking, stunning design, and robust engineering to deliver solutions that drive real
              business results.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="text-purple-500 flex-shrink-0" size={24} />
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-3xl font-display font-bold text-white mb-2">8+</div>
                <div className="text-sm text-white/60">Years Experience</div>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-3xl font-display font-bold text-white mb-2">25+</div>
                <div className="text-sm text-white/60">Team Members</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              {/* Placeholder for image/visual */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-purple-800/20 backdrop-blur-3xl" />

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-10 left-10 p-6 rounded-xl bg-black/50 border border-purple-500/30 backdrop-blur-xl"
              >
                <div className="text-sm text-purple-400 mb-2">Design</div>
                <div className="text-2xl font-bold text-white">100%</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute bottom-10 right-10 p-6 rounded-xl bg-black/50 border border-purple-500/30 backdrop-blur-xl"
              >
                <div className="text-sm text-purple-400 mb-2">Performance</div>
                <div className="text-2xl font-bold text-white">A+</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                className="absolute top-1/2 right-10 p-6 rounded-xl bg-black/50 border border-purple-500/30 backdrop-blur-xl"
              >
                <div className="text-sm text-purple-400 mb-2">Code Quality</div>
                <div className="text-2xl font-bold text-white">99%</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
