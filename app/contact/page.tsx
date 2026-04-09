"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedText } from "@/components/ui/animated-text"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Mail, Phone, MapPin, MessageCircle, Clock, CalendarCheck, Zap, Globe2 } from "lucide-react"
import { toast } from "sonner"

const faqs = [
  {
    question: "How fast can you deploy an AI receptionist?",
    answer: "Typically, our team can configure, connect to your APIs, and deploy a fully trained AI Voice Receptionist within 3 to 7 business days, depending on workflow complexity."
  },
  {
    question: "Can it integrate with my current calendar?",
    answer: "Yes! Our AI agents natively integrate with Google Calendar, Outlook, and popular CRM schedulers like Calendly and Mindbody to book, cancel, or reschedule appointments seamlessly."
  },
  {
    question: "Do callers know they are speaking to AI?",
    answer: "Our voice models are hyper-realistic with breathing sounds and natural latencies (<500ms). While they sound indistinguishable from a human, we typically recommend a brief disclosure."
  },
  {
    question: "What happens if the AI cannot answer a question?",
    answer: "We configure fallback logic so that if the AI detects a question outside its knowledge base, it immediately routes the call to a live human agent or takes a message to send directly to your inbox."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    needs: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("[v0] Form submitted:", formData)
      setIsSubmitting(false);
      toast.success("Message Delivered — An agent will be in touch shortly!");
      setFormData({ name: "", email: "", company: "", needs: "", message: "" });
    }, 1000);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedText
              el="h1"
              text={<>Automate Your <span className="glow-purple">Front Desk</span></>}
              className="text-5xl md:text-7xl font-display font-black mb-6 text-foreground text-balance leading-tight"
            />
            <p className="text-xl text-foreground/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              Ready to stop missing calls and start converting every lead? Get in touch with our team to configure your AI Voice Agent today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-8 border-y border-border bg-foreground/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-x-0 md:divide-x divide-white/10">
            {[
              { icon: Zap, text: "Response under 15 mins" },
              { icon: Globe2, text: "Global 24/7 Availability" },
              { icon: Clock, text: "Rapid 3-Day Deployments" }
            ].map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center justify-center gap-3 text-foreground/80"
              >
                <metric.icon className="w-5 h-5 text-purple-500" />
                <span className="font-medium text-lg">{metric.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Column: Direct Booking & Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-8"
            >
              {/* Direct Booking Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-background border border-purple-500/30 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-foreground/10 dark:bg-white/10 rounded-xl border border-border flex items-center justify-center mb-6">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">Talk to our AI First</h3>
                  <p className="text-foreground/70 mb-8 leading-relaxed">
                    Want to hear how human our bots sound? Call our live AI demo assistant right now. It can answer your questions about Neura and even help you book a meeting.
                  </p>
                  <a href="tel:+12186076415" className="block">
                    <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 cursor-pointer group">
                      <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Call +1 (218) 607-6415
                    </Button>
                  </a>
                </div>
              </div>

              {/* Contact Info blocks */}
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-foreground mb-4">Or reach us directly</h3>
                
                <a href="mailto:hello@neura.agency" className="flex items-center gap-4 p-4 rounded-xl border border-border bg-foreground/5 dark:bg-white/5 hover:border-purple-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 mb-1">Email us</p>
                    <p className="font-semibold text-foreground">hello@neura.agency</p>
                  </div>
                </a>

                <a href="tel:+1234567890" className="flex items-center gap-4 p-4 rounded-xl border border-border bg-foreground/5 dark:bg-white/5 hover:border-purple-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 mb-1">Call us directly</p>
                    <p className="font-semibold text-foreground">+1 (234) 567-890</p>
                  </div>
                </a>
                
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-border bg-green-900/10 hover:border-green-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 mb-1">WhatsApp Chat</p>
                    <p className="font-semibold text-foreground">Start a quick chat</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Glassmorphism Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="p-8 md:p-12 rounded-3xl bg-foreground/[0.02] border border-border backdrop-blur-md relative shadow-lg h-full">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
                
                <AnimatedText
                  el="h2"
                  text="Send us a Message"
                  className="text-3xl font-display font-bold text-foreground mb-2"
                />
                <p className="text-foreground/60 mb-8">Fill out the form below and our integration specialists will get back to you immediately.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10 mt-8">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground/70">Your Name *</label>
                        <Input
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-background/50 dark:bg-black/50 border-border text-foreground placeholder:text-foreground/30 focus:border-purple-500 px-4 py-6"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground/70">Email Address *</label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-background/50 dark:bg-black/50 border-border text-foreground placeholder:text-foreground/30 focus:border-purple-500 px-4 py-6"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium text-foreground/70">Company Name</label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="bg-background/50 dark:bg-black/50 border-border text-foreground placeholder:text-foreground/30 focus:border-purple-500 px-4 py-6"
                          placeholder="Your Company Inc."
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="needs" className="text-sm font-medium text-foreground/70">Monthly Call Volume</label>
                        <select
                          id="needs"
                          name="needs"
                          value={formData.needs}
                          onChange={handleChange}
                          className="w-full px-4 h-12 rounded-lg bg-background/50 dark:bg-black/50 border border-border text-foreground focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        >
                          <option value="" disabled className="text-foreground/30">Select volume</option>
                          <option value="under 500">Under 500 calls/mo</option>
                          <option value="500-2000">500 - 2,000 calls/mo</option>
                          <option value="2000+">2,000+ calls/mo</option>
                          <option value="not sure">Not sure</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground/70">What do you want the AI to do? *</label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="bg-background/50 dark:bg-black/50 border-border text-foreground placeholder:text-foreground/30 focus:border-purple-500 resize-none p-4"
                        placeholder="e.g. I need an AI to answer missed calls, book appointments in my CRM, and send a WhatsApp confirmation..."
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 text-lg relative cursor-pointer group mt-6"
                  >
                    <span className="relative z-10">{isSubmitting ? "Sending..." : "Submit Request"}</span>
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-6 border-t border-border bg-foreground/[0.01]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <AnimatedText
              el="h2"
              text="Frequently Asked Questions"
              className="text-4xl font-display font-bold text-foreground mb-4"
            />
            <p className="text-foreground/60 text-lg">Everything you need to know about setting up your AI Receptionist.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border bg-background/50 dark:bg-black/50 px-6 rounded-xl overflow-hidden border">
                <AccordionTrigger className="text-foreground hover:text-purple-400 hover:no-underline font-semibold py-6 text-left cursor-pointer">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/60 leading-relaxed pb-6 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[500px] border-t border-border flex items-center justify-center">
        {/* Contact popup on top of map */}
        <div className="absolute z-20 pointer-events-none hidden md:block">
           <div className="bg-background/80 dark:bg-black/80 backdrop-blur-md border border-border p-6 rounded-2xl shadow-lg flex items-center gap-4">
             <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center border border-purple-500/20">
                <MapPin className="text-purple-500" />
             </div>
             <div className="pointer-events-auto">
               <h3 className="font-bold text-foreground mb-1 tracking-wide">NEURA AGENCY</h3>
               <p className="text-foreground/60 text-sm">1 Market Street<br/>San Francisco, CA 94105</p>
             </div>
           </div>
        </div>

        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0194458852614!2d-122.3957297846819!3d37.79429417975618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806443c2bd01%3A0xe7261a868f773cd3!2s1%20Market%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(80%) sepia(20%) opacity(80%)" }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full object-cover absolute inset-0 z-0 bg-background pointer-events-auto"
        />
        
        {/* Soft blackout gradients for blending the map nicely */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      </section>

      <Footer />
    </main>
  )
}
