"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { toast } from "sonner"

export function Footer() {
  const footerLinks = {
    Company: ["About", "Services", "Work", "Careers"],
    Resources: ["Blog", "Case Studies", "Documentation", "Support"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  }

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ]

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-3xl font-display font-black text-foreground glow-purple mb-4">NEURA</h3>
              <p className="text-foreground/60 leading-relaxed max-w-sm">
                Intelligent. Automated. Always On.
                <br />
                <br />
                Crafting intelligent AI voice receptionists that automate your front desk round the clock.
              </p>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg bg-foreground/5 dark:bg-white/5 border border-border hover:border-purple-500/50 flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-foreground/70" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h4 className="text-foreground font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <button onClick={(e) => { e.preventDefault(); toast.info(`Opening ${link} (Coming Soon)`); }} className="text-foreground/60 hover:text-foreground transition-colors text-sm cursor-pointer">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-foreground/50 text-sm">Â© {new Date().getFullYear()} NEURA. All rights reserved.</p>
          <p className="text-foreground/50 text-sm">Built with precision and passion</p>
        </motion.div>
      </div>
    </footer>
  )
}
