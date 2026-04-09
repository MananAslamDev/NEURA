"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const agentTypes = [
  {
    name: "Starter Agent",
    description: "Perfect for answering FAQs and routing basic calls",
    features: ["Human-like answering", "Custom knowledge base", "Call routing", "24/7 Availability", "Transcription logs"],
    popular: false,
  },
  {
    name: "Business Agent",
    description: "Complete voice solution with scheduling capabilities",
    features: [
      "Everything in Starter",
      "Calendar integration",
      "Appointment booking",
      "Rescheduling logic",
      "Email confirmations",
      "Cancellation handling",
    ],
    popular: true,
  },
  {
    name: "Enterprise Agent",
    description: "Full-featured automation with CRM & multi-channels",
    features: [
      "Everything in Business",
      "CRM & Google Sheets Sync",
      "Automated WhatsApp texts",
      "Complex conditionals",
      "Priority API limits",
      "Dedicated account manager",
    ],
    popular: false,
  },
]
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
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
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 text-foreground">
              Our <span className="glow-purple">Services</span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              From basic call handling to complex CRM integrations, we build highly capable Voice AI that drives results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {agentTypes.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl border backdrop-blur-xl
                  bg-foreground/5 dark:bg-white/5 
                  shadow-2xl shadow-black/20
                  before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:-z-10
                  after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-t after:from-background/10 dark:from-black/10 after:to-transparent after:-z-10
                  ${
                    tier.popular
                      ? "border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-transparent dark:from-purple-900/20 dark:to-transparent"
                      : "border-border"
                  } hover:border-purple-500/70 transition-all duration-300`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 rounded-full text-xs font-semibold text-foreground">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-display font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-foreground/60 text-sm mb-6 leading-relaxed">{tier.description}</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-foreground/70 text-sm">
                      <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button
                    className={`w-full ${
                      tier.popular
                        ? "bg-purple-600 hover:bg-purple-700 text-foreground"
                        : "bg-foreground/10 dark:bg-white/10 hover:bg-foreground/20 dark:bg-white/20 text-foreground"
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-foreground">
              Additional <span className="glow-purple">Services</span>
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              We offer comprehensive automation solutions beyond just voice answering.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Prompt Engineering",
                description: "Crafting the perfect persona and constraints for your AI.",
              },
              {
                title: "Custom Integrations",
                description: "Connecting your voice agents to thousands of APIs.",
              },
              {
                title: "Voice Cloning",
                description: "Using secure, authorized models to replicate your own voice.",
              },
              {
                title: "Analytics Dashboard",
                description: "Monitor call volume, sentiment, and AI success rates.",
              },
              {
                title: "Workflow Automation",
                description: "Connecting Make.com/Zapier for post-call data processing.",
              },
              {
                title: "Ongoing Optimization",
                description: "Reviewing transcripts to continuously train and improve the AI.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border backdrop-blur-xl
                  bg-foreground/5 dark:bg-white/5 
                  shadow-2xl shadow-black/20
                  before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:-z-10
                  after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-t after:from-background/10 dark:from-black/10 after:to-transparent after:-z-10
                  border-border hover:border-purple-500/70 transition-all duration-300"
              >
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}