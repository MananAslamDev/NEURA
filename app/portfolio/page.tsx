"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { AnimatedText } from "@/components/ui/animated-text"

const projects = [
  {
    title: "Dental Clinic Receptionist",
    category: "Call Booking & Scheduling",
    description: "Handles patient inquiries and autonomously schedules dental appointments into Jane App.",
    image: "/dental_ai_dashboard.png",
    tags: ["Voice AI", "Jane App API", "Twilio", "Rescheduling Logic"],
  },
  {
    title: "Medspa Booking Agent",
    category: "Patient Follow-ups & Sales",
    description: "Answers procedure FAQs and books aesthetic consultations directly into Mindbody.",
    image: "/real_estate_ai.png", 
    tags: ["Mindbody API", "Procedure FAQs", "SMS Reminders"],
  },
  {
    title: "Chiropractic Lead Qualifier",
    category: "After-hours Answering",
    description: "Taps into after-hours calls to triage urgent needs and book next-day adjustments.",
    image: "/gym_mobile_ai.png",
    tags: ["Google Calendar", "Voice Interface", "Urgency Triage"],
  },
  {
    title: "Dermatology Clinic Assistant",
    category: "Insurance & FAQs",
    description: "A specialized agent trained on complex insurance codes and cosmetic procedure questions.",
    image: "/saas_marketing_graph.png",
    tags: ["Knowledge Base", "HIPAA Compliant", "Call Routing"],
  },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <AnimatedText
              el="h1"
              text={<>Our <span className="glow-purple">Work</span></>}
              className="text-5xl md:text-7xl font-display font-black mb-6 text-foreground"
            />
            <p className="text-xl text-foreground/70 leading-relaxed">
              Explore our latest case studies showcasing intelligent AI voice receptionists deployed for medical clinics and medspas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-border bg-background/50 dark:bg-black/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 dark:via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Project Info */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-foreground/60 mb-6 leading-relaxed">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-foreground/5 dark:bg-white/5 border border-border rounded-full text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <button
                    onClick={(e) => { e.preventDefault(); toast.info("Viewing full case study data is currently restricted under HIPAA and client NDA."); }}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors group/link cursor-pointer"
                  >
                    View Project Details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              text={<>Ready to Automate Your <span className="glow-purple">Clinic?</span></>}
              className="text-4xl md:text-5xl font-display font-black mb-6 text-foreground"
            />
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Let&apos;s create a custom AI receptionist tailored for your patient workflows.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8">
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
