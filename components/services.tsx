"use client"

import { motion } from "framer-motion"
import { 
  PhoneCall, Calendar, Mail, MessageCircle, Table, Bot
} from "lucide-react"

const aiServices = [
  {
    icon: PhoneCall,
    title: "Patient Call Handling",
    description: "Answers your clinic's phone natively with a human-like voice, 24/7.",
  },
  {
    icon: Calendar,
    title: "Calendar Booking",
    description: "Integrates perfectly to schedule, reschedule, or cancel patient appointments.",
  },
  {
    icon: Mail,
    title: "Automated Emails",
    description: "Sends instant email confirmations and follow-ups right after patient calls.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Triggers",
    description: "Sends automated WhatsApp texts for immediate patient reminders.",
  },
  {
    icon: Table,
    title: "EHR/EMR Integration",
    description: "Logs patient details and transcripts automatically into your CRM or health records system.",
  },
  {
    icon: Bot,
    title: "Procedure FAQs",
    description: "Understands context and flawlessly answers your clinic's generic procedure and insurance questions.",
  },
]

const ServiceCard = ({ service, index }: { service: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="group relative"
  >
    <div className="relative p-8 rounded-2xl bg-foreground/5 dark:bg-white/5 border border-border backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 h-full">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-purple-500/0 group-hover:bg-purple-500/5 transition-all duration-300" />

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <service.icon className="text-purple-400" size={28} />
        </div>

        <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.title}</h3>

        <p className="text-foreground/60 leading-relaxed">{service.description}</p>
      </div>
    </div>
  </motion.div>
)

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
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4 text-balance">
            Our AI <span className="text-purple-500">Capabilities</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Comprehensive autonomous solutions to manage your clinic's front desk efficiently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {aiServices.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
