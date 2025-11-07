"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Zap, Users, Award, Rocket } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/* ---------- CountUp ---------- */
function CountUp({
  end,
  suffix = "",
  className,
}: {
  end: number
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const counter = { val: 0 }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
    })

    tl.to(counter, {
      val: end,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (el) el.textContent = Math.round(counter.val) + suffix
      },
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll?.().forEach((st) => st.kill())
    }
  }, [end, suffix])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}

/* ---------- Data ---------- */
const stats = [
  { label: "Projects Delivered", value: 150, suffix: "+", icon: Rocket },
  { label: "Happy Clients", value: 80, suffix: "+", icon: Users },
  { label: "Years Experience", value: 5, suffix: "+", icon: Award },
  { label: "Team Members", value: 12, suffix: "", icon: Zap },
]

const values = [
  {
    title: "Innovation First",
    description:
      "We stay ahead of the curve, leveraging cutting-edge technologies to build future-proof solutions.",
  },
  {
    title: "Client-Centric",
    description:
      "Your success is our success. We work closely with you to understand and exceed your expectations.",
  },
  {
    title: "Quality Obsessed",
    description:
      "Every pixel, every line of code matters. We're committed to delivering excellence in everything we do.",
  },
  {
    title: "Transparent Process",
    description:
      "No surprises. We keep you informed every step of the way with clear communication and regular updates.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-purple-900/20 to-transparent" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 text-white">
              About <span className="glow-purple">NEURA</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Neural. Digital. Different. We're a team of passionate creators building the future of web
              experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-white/70 leading-relaxed text-lg"
          >
            <p>
              Founded in 2019, NEURA emerged from a simple belief: the web should be more than functional—it should be
              extraordinary. We started as a small team of designers and developers who were tired of seeing bland,
              cookie-cutter websites dominate the digital landscape.
            </p>
            <p>
              Today, we're a full-service digital agency specializing in creating premium web experiences that don't
              just look good—they perform. From startups to established brands, we've helped over 80 clients transform
              their digital presence and achieve measurable results.
            </p>
            <p>
              Our approach combines cutting-edge technology with timeless design principles. We believe in building
              websites that are fast, accessible, and optimized for conversion—without sacrificing aesthetics or user
              experience.
            </p>
            <p className="text-white font-semibold text-xl">
              Powered by <span className="glow-purple">NEURA</span> — where intelligence meets design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 px-6 border-y border-white/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                {/* glass badge */}
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20 mb-4
                    before:absolute before:inset-0 before:rounded-full before:p-px before:bg-linear-to-b before:from-white/20 before:to-transparent before:-z-10
                    after:absolute after:inset-0 after:rounded-full after:bg-linear-to-t after:from-black/10 after:to-transparent after:-z-10
                    hover:border-purple-500/70 transition-all duration-300 relative"
                >
                  <stat.icon className="w-8 h-8 text-purple-400 relative z-10" />
                </div>

                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  className="block text-4xl md:text-5xl font-display font-black text-white mb-2"
                />

                <div className="text-white/60 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-white">
              Our <span className="glow-purple">Values</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              The principles that guide everything we do at NEURA
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border backdrop-blur-xl
                  bg-white/5 shadow-2xl shadow-black/20
                  before:absolute before:inset-0 before:rounded-2xl before:p-px before:bg-linear-to-b before:from-white/20 before:to-transparent before:-z-10
                  after:absolute after:inset-0 after:rounded-2xl after:bg-linear-to-t after:from-black/10 after:to-transparent after:-z-10
                  border-white/20 hover:border-purple-500/70 transition-all duration-300 relative"
              >
                <h3 className="text-2xl font-display font-bold text-white mb-4">{v.title}</h3>
                <p className="text-white/60 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team / Skills ── */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-white">
              Built by <span className="glow-purple">Experts</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              Our team brings together designers, developers, and strategists with expertise in modern web technologies,
              UX design, and digital marketing.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
              {[
                "React & Next.js",
                "UI/UX Design",
                "TypeScript",
                "Node.js",
                "Cloud Architecture",
                "SEO & Analytics",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/20
                    shadow-lg shadow-black/10
                    before:absolute before:inset-0 before:rounded-full before:p-px before:bg-linear-to-b before:from-white/20 before:to-transparent before:-z-10
                    after:absolute after:inset-0 after:rounded-full after:bg-linear-to-t after:from-black/10 after:to-transparent after:-z-10
                    hover:border-purple-500/70 transition-all duration-300 relative"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}