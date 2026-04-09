"use client";

// Imports for all components in this file
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

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
function CustomCountUp({ end, suffix }: CustomCountUpProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (spanRef.current) {
            spanRef.current.textContent = `${end}${suffix}`;
            // Add a simple CSS fade in
            spanRef.current.style.opacity = "0";
            spanRef.current.style.transition = "opacity 0.5s ease-out";
            requestAnimationFrame(() => {
              if (spanRef.current) spanRef.current.style.opacity = "1";
            });
          }
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Rich Radial Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/60 via-background to-background pointer-events-none z-0" />
      
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf615_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf615_1px,transparent_1px)] bg-size:4rem_4rem z-0" />


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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-4 text-balance leading-tight"
          >
            <span className="text-foreground">Never Miss </span>
            <span className="glow-purple bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-purple-500 to-violet-500">
              Another
            </span>
            <br />
            <span className="text-foreground">Call Again</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto text-balance leading-relaxed"
          >
            Instantly deploy a hyper-realistic AI receptionist that answers calls, books appointments, and captures every lead—day or night.
          </motion.p>

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
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-foreground/10 dark:bg-white/10 font-semibold text-base px-8 py-6 group bg-transparent"
              >
                <Play
                  className="mr-2 group-hover:scale-110 transition-transform"
                  size={20}
                />
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
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
        </div>
      </div>
    </section>
  );
}