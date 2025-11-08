"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react" // Used by AnimatedBackground
import { gsap } from "gsap" // Used by AnimatedBackground

//=================================================================
// 1. ANIMATED BACKGROUND COMPONENT (OPTIMIZED)
// This is the fast version that fixes the lag.
//=================================================================
function AnimatedBackground() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Use gsap.context() for scoping and cleanup.
    let ctx = gsap.context(() => {
      // Reduced element count for performance
      const nodeCount = 15;
      const lineCount = 20;
      let width = window.innerWidth;
      let height = window.innerHeight;

      const nodes: any[] = [];
      const lines: any[] = [];

      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      // --- Create SVG Defs (Filter definition, but not applied to elements) ---
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );
      defs.innerHTML = `
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      `;
      svg.appendChild(defs);

      // --- Create Nodes ---
      for (let i = 0; i < nodeCount; i++) {
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        const data = {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1.5,
        };
        circle.setAttribute("cx", data.x.toString());
        circle.setAttribute("cy", data.y.toString());
        circle.setAttribute("r", data.radius.toString());
        circle.setAttribute("fill", "#a78bfa");

        // OPTIMIZATION: Removed SVG filter, added CSS class
        circle.classList.add("hero-glow-node");
        svg.appendChild(circle);
        nodes.push({ el: circle, data });
      }

      // --- Create Lines ---
      for (let i = 0; i < lineCount; i++) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        let nodeAIndex = Math.floor(Math.random() * nodeCount);
        let nodeBIndex = Math.floor(Math.random() * nodeCount);

        // Ensure nodes are different
        while (nodeAIndex === nodeBIndex) {
          nodeBIndex = Math.floor(Math.random() * nodeCount);
        }

        const nodeA = nodes[nodeAIndex].data;
        const nodeB = nodes[nodeBIndex].data;

        line.setAttribute("x1", nodeA.x.toString());
        line.setAttribute("y1", nodeA.y.toString());
        line.setAttribute("x2", nodeB.x.toString());
        line.setAttribute("y2", nodeB.y.toString());
        line.setAttribute("stroke", "#a78bfa");
        line.setAttribute("stroke-width", "0.5");
        line.setAttribute("opacity", "0.3");

        // OPTIMIZATION: Removed SVG filter, added CSS class
        line.classList.add("hero-glow-line");
        svg.prepend(line);
        lines.push({ el: line, nodeAIndex, nodeBIndex });

        // Line opacity animation (low-cost)
        gsap.to(line, {
          opacity: Math.random() * 0.4 + 0.1,
          duration: Math.random() * 3 + 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      }

      // --- OPTIMIZATION: Animate nodes and update lines in ONE place ---
      nodes.forEach((node, index) => {
        const onUpdate = () => {
          node.el.setAttribute("cx", node.data.x.toString());
          node.el.setAttribute("cy", node.data.y.toString());
          for (const line of lines) {
            if (line.nodeAIndex === index) {
              line.el.setAttribute("x1", node.data.x.toString());
              line.el.setAttribute("y1", node.data.y.toString());
            }
            if (line.nodeBIndex === index) {
              line.el.setAttribute("x2", node.data.x.toString());
              line.el.setAttribute("y2", node.data.y.toString());
            }
          }
        };
        
        node.el.onUpdate = onUpdate; // Store for resize

        gsap.to(node.data, {
          x: () => Math.random() * width,
          y: () => Math.random() * height,
          duration: () => Math.random() * 20 + 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          onUpdate: onUpdate,
        });
      });

      // --- Handle Resize ---
      const handleResize = () => {
        if (!svgRef.current) return;
        width = window.innerWidth;
        height = window.innerHeight;
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

        gsap.killTweensOf(nodes.map(n => n.data)); 

        nodes.forEach((node) => {
          gsap.to(node.data, {
            x: () => Math.random() * width,
            y: () => Math.random() * height,
            duration: 5,
            ease: "power1.out",
            onComplete: () => {
              gsap.to(node.data, {
                x: () => Math.random() * width,
                y: () => Math.random() * height,
                duration: () => Math.random() * 20 + 15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                onUpdate: node.el.onUpdate
              });
            }
          });
        });
      };

      window.addEventListener("resize", handleResize);

      // --- Cleanup ---
      return () => {
        window.removeEventListener("resize", handleResize);
        // ctx.revert() is called automatically
      };
    }, svgRef); // Scope the context to the SVG element

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1920 1080" // Static for hydration
      aria-hidden="true"
    />
  );
}


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
      
      {/* GSAP Animated Background (Now Optimized) */}
      <AnimatedBackground />
      {/* --- END OF ADDED ANIMATIONS --- */}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-purple-800/20 border border-purple-500/30 backdrop-blur-xl overflow-hidden">
            {/* Glow effects */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 text-balance">
                Ready to Build Something <span className="text-purple-400">Amazing?</span>
              </h2>

              <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
                Let's discuss your project and create a digital experience that exceeds expectations. Get in touch
                today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 font-semibold text-base px-8 py-6 group"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 bg-transparent"
                  >
                    Schedule a Call
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}