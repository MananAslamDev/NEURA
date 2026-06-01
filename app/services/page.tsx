"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { AnimatedText } from "@/components/ui/animated-text"

const clinicPackages = [
  {
    name: "Starter Clinic Agent",
    description: "Perfect for answering patient FAQs and routing calls",
    features: ["Human-like answering", "Custom clinic knowledge base", "Call routing to staff", "24/7 Availability", "Transcription logs"],
    popular: false,
  },
  {
    name: "Pro Booking Agent",
    description: "Complete voice solution with automated scheduling",
    features: [
      "Everything in Starter",
      "Mindbody/Jane/Calendly sync",
      "Automated appointment booking",
      "Rescheduling & cancellations logic",
      "Email & SMS confirmations",
      "Waitlist management",
    ],
    popular: true,
  },
  {
    name: "Enterprise Healthcare System",
    description: "Full-featured automation with EHR & multi-locations",
    features: [
      "Everything in Pro",
      "Secure EHR/EMR Integration",
      "Automated patient follow-ups",
      "Multi-location routing logic",
      "Priority API limits",
      "Dedicated integration manager",
    ],
    popular: false,
  },
]

const PackageCard = ({ tier, index }: { tier: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`relative p-8 rounded-2xl border backdrop-blur-md h-full
      bg-foreground/5 dark:bg-white/5 
      shadow-lg shadow-black/20
      before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:-z-10
      after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-t after:from-background/10 dark:from-black/10 after:to-transparent after:-z-10
      ${
        tier.popular
          ? "border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-transparent dark:from-purple-900/20 dark:to-transparent"
          : "border-border"
      } hover:border-purple-500/70 transition-all duration-300 flex flex-col`}
  >
    {tier.popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 rounded-full text-xs font-semibold text-white">
        Most Popular
      </div>
    )}

    <h3 className="text-2xl font-display font-bold text-foreground mb-2">{tier.name}</h3>
    <p className="text-foreground/60 text-sm mb-6 leading-relaxed">{tier.description}</p>

    <ul className="space-y-3 mb-8 flex-1">
      {tier.features.map((feature: string) => (
        <li key={feature} className="flex items-start gap-3 text-foreground/70 text-sm">
          <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <Link href="/contact" className="mt-auto">
      <Button
        className={`w-full ${
          tier.popular
            ? "bg-purple-600 hover:bg-purple-700 text-white"
            : "bg-foreground/10 dark:bg-white/10 hover:bg-foreground/20 dark:bg-white/20 text-foreground"
        }`}
      >
        Get Started
      </Button>
    </Link>
  </motion.div>
)

export default function ServicesPage() {
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
              text={<>Our <span className="glow-purple">Services</span></>}
              className="text-5xl md:text-7xl font-display font-black mb-6 text-foreground"
            />
            <p className="text-xl text-foreground/70 leading-relaxed">
              From intelligent AI voice agents to seamless calendar and EHR integrations, we build autonomous systems that scale your clinic.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
            {clinicPackages.map((tier, index) => (
              <PackageCard key={tier.name} tier={tier} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <AnimatedText 
              el="h2" 
              text={<>Additional <span className="glow-purple">Services</span></>}
              className="text-4xl md:text-5xl font-display font-black mb-6 text-foreground"
            />
            <p className="text-lg text-foreground/70 leading-relaxed">
              We offer comprehensive technical solutions to support every aspect of your clinic's automation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Prompt Engineering & Persona",
                description: "Crafting the perfect empathetic voice persona and workflow rules for your clinic.",
              },
              {
                title: "Custom EHR Connections",
                description: "Building secure API bridges between the AI and your legacy health record systems.",
              },
              {
                title: "Patient Retention Strategy",
                description: "Automated SMS and call workflows to reactivate old patients and prevent no-shows.",
              },
              {
                title: "Analytics Dashboards",
                description: "Custom internal dashboards to monitor AI call volume, bookings, and patient sentiment.",
              },
              {
                title: "Workflow Automation",
                description: "Connecting Make.com/Zapier for complex post-call data processing and notifications.",
              },
              {
                title: "Multi-Location Scaling",
                description: "Deploying unified AI architectures across franchised clinics or multiple medspa locations.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border backdrop-blur-md
                  bg-foreground/5 dark:bg-white/5 
                  shadow-lg shadow-black/20
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