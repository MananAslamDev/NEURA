"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Zap, Users, Award, Rocket } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatedText } from "@/components/ui/animated-text"

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
    title: "Automate Everything",
    description:
      "We believe that manual, repetitive front-desk tasks should be entirely automated so humans can focus on deep work.",
  },
  {
    title: "Client-Centric",
    description:
      "Your success is our success. We train your agents specifically for your unique business logic and tone.",
  },
  {
    title: "Accuracy Obsessed",
    description:
      "No hallucinations. We use strict prompting and RAG techniques to ensure the AI speaks only the truth.",
  },
  {
    title: "Seamless Integration",
    description:
      "Our agents don't just speak; they take actionâ€”booking calendars, updating sheets, and sending texts instantly.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* â”€â”€ Hero â”€â”€ */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-purple-900/20 to-transparent" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <AnimatedText
              el="h1"
              text={<>About <span className="glow-purple">NEURA</span></>}
              className="text-5xl md:text-7xl font-display font-black mb-6 text-foreground"
            />
            <p className="text-xl text-foreground/70 leading-relaxed">
              Intelligent. Automated. Always on. We're a team of AI engineers building the future of customer interactions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ Story â”€â”€ */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-foreground/70 leading-relaxed text-lg"
          >
            <p>
              Founded with a clear vision, NEURA emerged from a simple observation: businesses lose countless opportunities
              and hours to missed calls, repetitive inquiries, and manual scheduling. We knew that recent advancements in LLMs
              and Voice Synthesis could solve this perfectly.
            </p>
            <p>
              Today, we're a specialized AI Voice agency creating receptionist agents that don't just sound humanâ€”they perform
              like a seasoned employee. From dental clinics to real estate firms, we've helped dozens of businesses
              completely automate their front desk and achieve measurable ROI.
            </p>
            <p>
              Our approach combines state-of-the-art voice models with bulletproof logic workflows (make.com, internal APIs),
              ensuring that every caller gets a helpful, accurate, and instantaneous response.
            </p>
            <p className="text-foreground font-semibold text-xl">
              Powered by <span className="glow-purple">NEURA.</span>  where intelligence meets design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ Stats â”€â”€ */}
      <section className="py-16 px-6 border-y border-border">
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
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/5 dark:bg-white/5 backdrop-blur-md border border-border shadow-lg shadow-black/20 mb-4
                    before:absolute before:inset-0 before:rounded-full before:p-px before:bg-linear-to-b before:from-white/20 before:to-transparent before:-z-10
                    after:absolute after:inset-0 after:rounded-full after:bg-linear-to-t after:from-background/10 dark:from-black/10 after:to-transparent after:-z-10
                    hover:border-purple-500/70 transition-all duration-300 relative"
                >
                  <stat.icon className="w-8 h-8 text-purple-400 relative z-10" />
                </div>

                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  className="block text-4xl md:text-5xl font-display font-black text-foreground mb-2"
                />

                <div className="text-foreground/60 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Values â”€â”€ */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <AnimatedText
              el="h2"
              text={<>Our <span className="glow-purple">Values</span></>}
              className="text-4xl md:text-5xl font-display font-black mb-6 text-foreground"
            />
            <p className="text-lg text-foreground/70 leading-relaxed">
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
                className="p-8 rounded-2xl border backdrop-blur-md
                  bg-foreground/5 dark:bg-white/5 shadow-lg shadow-black/20
                  before:absolute before:inset-0 before:rounded-2xl before:p-px before:bg-linear-to-b before:from-white/20 before:to-transparent before:-z-10
                  after:absolute after:inset-0 after:rounded-2xl after:bg-linear-to-t after:from-background/10 dark:from-black/10 after:to-transparent after:-z-10
                  border-border hover:border-purple-500/70 transition-all duration-300 relative"
              >
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">{v.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Team / Skills â”€â”€ */}
      <section className="py-16 px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <AnimatedText
              el="h2"
              text={<>Built by <span className="glow-purple">Experts</span></>}
              className="text-4xl md:text-5xl font-display font-black mb-6 text-foreground"
            />
            <p className="text-lg text-foreground/70 leading-relaxed mb-8">
              Our team brings together designers, developers, and strategists with expertise in modern web technologies,
              UX design, and digital marketing.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground/60">
              {[
                "Voice AI Models",
                "Prompt Engineering",
                "Make.com / Zapier",
                "Twilio Integration",
                "RAG Architecture",
                "API Integrations",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-foreground/5 dark:bg-white/5 backdrop-blur-md border border-border
                    shadow-lg shadow-black/10
                    before:absolute before:inset-0 before:rounded-full before:p-px before:bg-linear-to-b before:from-white/20 before:to-transparent before:-z-10
                    after:absolute after:inset-0 after:rounded-full after:bg-linear-to-t after:from-background/10 dark:from-black/10 after:to-transparent after:-z-10
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