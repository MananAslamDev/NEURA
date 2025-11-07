"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const websiteTypes = [
  {
    name: "Landing Page",
    description: "Perfect for product launches, campaigns, or lead generation",
    features: ["Single page design", "Contact form", "Mobile responsive", "SEO optimized", "Fast loading"],
    price: "Starting at $999",
    popular: false,
  },
  {
    name: "Business Website",
    description: "Complete online presence for your business",
    features: [
      "Up to 10 pages",
      "CMS integration",
      "Contact forms",
      "Blog section",
      "Analytics setup",
      "Social media integration",
    ],
    price: "Starting at $2,499",
    popular: true,
  },
  {
    name: "E-Commerce",
    description: "Full-featured online store with payment processing",
    features: [
      "Product catalog",
      "Shopping cart",
      "Payment gateway",
      "Order management",
      "Customer accounts",
      "Inventory tracking",
    ],
    price: "Starting at $4,999",
    popular: false,
  },
  {
    name: "Custom Web App",
    description: "Tailored solutions for complex business needs",
    features: [
      "Custom functionality",
      "Database design",
      "API integration",
      "User authentication",
      "Admin dashboard",
      "Scalable architecture",
    ],
    price: "Custom pricing",
    popular: false,
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
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
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 text-white">
              Our <span className="glow-purple">Services</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              From simple landing pages to complex web applications, we build digital experiences that drive results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {websiteTypes.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl border backdrop-blur-xl
                  bg-white/5 
                  shadow-2xl shadow-black/20
                  before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:-z-10
                  after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-t after:from-black/10 after:to-transparent after:-z-10
                  ${
                    tier.popular
                      ? "border-purple-500/50 bg-gradient-to-b from-purple-900/20 to-black/50"
                      : "border-white/20"
                  } hover:border-purple-500/70 transition-all duration-300`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 rounded-full text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-display font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">{tier.description}</p>

                <div className="mb-6">
                  <p className="text-3xl font-bold text-white">{tier.price}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-white/70 text-sm">
                      <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button
                    className={`w-full ${
                      tier.popular
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white"
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
      <section className="py-20 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-white">
              Additional <span className="glow-purple">Services</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              We offer comprehensive digital solutions beyond website development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "UI/UX Design",
                description: "Beautiful, intuitive interfaces that users love",
              },
              {
                title: "Brand Identity",
                description: "Logo design, color schemes, and brand guidelines",
              },
              {
                title: "SEO Optimization",
                description: "Get found on Google with our SEO strategies",
              },
              {
                title: "Maintenance & Support",
                description: "Ongoing updates, security, and technical support",
              },
              {
                title: "Performance Optimization",
                description: "Lightning-fast loading speeds and smooth interactions",
              },
              {
                title: "Analytics & Tracking",
                description: "Understand your users with detailed analytics",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border backdrop-blur-xl
                  bg-white/5 
                  shadow-2xl shadow-black/20
                  before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:-z-10
                  after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-t after:from-black/10 after:to-transparent after:-z-10
                  border-white/20 hover:border-purple-500/70 transition-all duration-300"
              >
                <h3 className="text-xl font-display font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}