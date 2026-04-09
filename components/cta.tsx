"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"


//=================================================================
// 2. CTA COMPONENT (Main Export)
// This is your original component, unchanged.
//=================================================================
export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      
      {/* --- ADDED ANIMATIONS --- */}
      {/* Animated background grid (from Hero) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />


      <div className="container mx-auto px-6 relative z-10">
        <div
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-purple-800/20 border border-purple-500/30 backdrop-blur-md overflow-hidden">
            {/* Glow effects */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 text-balance">
                Ready to Automate your <span className="text-purple-400">Front Desk?</span>
              </h2>

              <p className="text-lg text-foreground/70 mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
                Let's discuss your business needs and deploy an AI voice receptionist that exceeds expectations. Get in touch
                today and never miss a lead again.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-foreground text-background hover:bg-foreground/90 dark:bg-white/90 font-semibold text-base px-8 py-6 group"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-foreground hover:bg-foreground/10 dark:bg-white/10 font-semibold text-base px-8 py-6 bg-transparent"
                  >
                    Schedule a Call
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}