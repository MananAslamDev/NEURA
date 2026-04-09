"use client";

// Imports for all components in this file
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Phone } from "lucide-react";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/animated-text";

//=================================================================
// 2. CUSTOM COUNTUP COMPONENT (Unchanged)
//=================================================================
interface CustomCountUpProps {
  end: number;
  suffix: string;
  duration?: number;
}

/**
 * A custom CountUp component using GSAP and IntersectionObserver
 */
function CustomCountUp({ end, suffix, duration = 3 }: CustomCountUpProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          let startTime: number;
          const durationMs = duration * 1000;
          
          if (spanRef.current) {
            spanRef.current.style.opacity = "1";
          }

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            // power3.out ease
            const t = Math.min(progress / durationMs, 1);
            const easeProgress = 1 - Math.pow(1 - t, 3);
            
            const currentValue = Math.floor(easeProgress * end);
            
            if (spanRef.current) {
               spanRef.current.textContent = `${currentValue}${suffix}`;
            }

            if (progress < durationMs) {
              requestAnimationFrame(animate);
            } else if (spanRef.current) {
              spanRef.current.textContent = `${end}${suffix}`;
            }
          };
          
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [end, suffix]);

  return <span ref={spanRef}>0{suffix}</span>;
}

//=================================================================
// 3. HERO COMPONENT (Main Export - Unchanged)
//=================================================================
export function Hero() {
  const stats = [
    { end: 10, suffix: "k+", label: "Calls Handled" },
    { end: 99, suffix: "%", label: "Query Resolution" },
    { end: 500, suffix: "ms", label: "Response Latency" },
  ];

  return (
    <section className="relative min-h-screen overflow-x-hidden overflow-y-auto pt-24 pb-20">
      {/* Rich Radial Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/60 via-background to-background pointer-events-none z-0" />
      
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf615_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf615_1px,transparent_1px)] bg-size:4rem_4rem z-0" />

      {/* Smooth flowing blobs for premium animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-100 z-0">
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-purple-500/30 rounded-full mix-blend-normal filter blur-[100px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-[35rem] h-[35rem] bg-violet-600/30 rounded-full mix-blend-normal filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/2 w-[40rem] h-[40rem] bg-fuchsia-500/30 rounded-full mix-blend-normal filter blur-[100px] animate-blob animation-delay-4000" />
      </div>


      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium">
              Neural. Digital. Different.
            </span>
          </motion.div>

          {/* Main Heading */}
          <AnimatedText 
            el="h1" 
            text={<>
              <span className="text-foreground">Never Miss </span>
              <span className="glow-purple bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-purple-500 to-violet-500">
                Another
              </span>
              <br />
              <span className="text-foreground">Call Again</span>
            </>}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-4 text-balance leading-tight" 
          />

          {/* Description */}
          <AnimatedText
            el="p"
            text="Instantly deploy a hyper-realistic AI receptionist that answers calls, books appointments, and captures every lead—day or night."
            className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto text-balance leading-relaxed"
          />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 dark:bg-white/90 font-semibold text-base px-8 py-6 group"
              >
                Start Your Project
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Button>
            </Link>
            <a href="tel:+12186076415">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-700 dark:text-purple-300 hover:bg-purple-500/10 font-semibold text-base px-8 py-6 group bg-purple-500/5"
              >
                <Phone
                  className="mr-2 group-hover:rotate-12 transition-transform"
                  size={20}
                />
                Call Demo AI
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  <CustomCountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={3}
                  />
                </div>
                <div className="text-sm text-foreground/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Combined CTA Card */}
          <div className="mt-16 max-w-4xl mx-auto text-center relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-purple-800/20 border border-purple-500/30 backdrop-blur-md overflow-hidden shadow-lg z-10">
            {/* Glow effects */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/30 rounded-full blur-3xl pointer-events-none" />

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
                <a href="tel:+12186076415">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-500/50 text-purple-700 dark:text-purple-300 hover:bg-purple-500/10 font-semibold text-base px-8 py-6 bg-purple-500/5"
                  >
                    <Phone className="mr-2" size={20} />
                    Call AI Assistant
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}