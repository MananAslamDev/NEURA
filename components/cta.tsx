"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react" // Added for background
import { gsap } from "gsap" // Added for background

//=================================================================
// 1. ANIMATED BACKGROUND COMPONENT (Merged)
// This is the same component from Hero.tsx
//=================================================================
function AnimatedBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const nodes: any[] = [];
    const lines: any[] = [];
    const nodeCount = 30;
    const lineCount = 40;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // FIX: Set the correct viewBox immediately on the client
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    // --- Create SVG Glow Filter ---
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
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
        radius: Math.random() * 3 + 2,
      };
      circle.setAttribute("cx", data.x.toString());
      circle.setAttribute("cy", data.y.toString());
      circle.setAttribute("r", data.radius.toString());
      circle.setAttribute("fill", "#a78bfa");
      circle.setAttribute("filter", "url(#glow)");
      svg.appendChild(circle);
      nodes.push({ el: circle, data });

      // Animate node position
      gsap.to(data, {
        x: Math.random() * width,
        y: Math.random() * height,
        duration: Math.random() * 20 + 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // --- Create Lines ---
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      const nodeAIndex = Math.floor(Math.random() * nodeCount);
      const nodeBIndex = Math.floor(Math.random() * nodeCount);
      line.setAttribute("x1", nodes[nodeAIndex].data.x.toString());
      line.setAttribute("y1", nodes[nodeAIndex].data.y.toString());
      line.setAttribute("x2", nodes[nodeBIndex].data.x.toString());
      line.setAttribute("y2", nodes[nodeBIndex].data.y.toString());
      line.setAttribute("stroke", "#a78bfa");
      line.setAttribute("stroke-width", "0.5");
      line.setAttribute("opacity", "0.3");
      line.setAttribute("filter", "url(#glow)");
      svg.prepend(line);
      lines.push({ el: line, nodeAIndex, nodeBIndex });

      // Animate line opacity
      gsap.to(line, {
        opacity: Math.random() * 0.4 + 0.1,
        duration: Math.random() * 3 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }

    // --- Ticker to Update Lines ---
    const update = () => {
      if (!svgRef.current) return; // Guard clause for cleanup
      for (const node of nodes) {
        node.el.setAttribute("cx", node.data.x.toString());
        node.el.setAttribute("cy", node.data.y.toString());
      }
      for (const line of lines) {
        const nodeA = nodes[line.nodeAIndex].data;
        const nodeB = nodes[line.nodeBIndex].data;
        line.el.setAttribute("x1", nodeA.x.toString());
        line.el.setAttribute("y1", nodeA.y.toString());
        line.el.setAttribute("x2", nodeB.x.toString());
        line.el.setAttribute("y2", nodeB.y.toString());
      }
      animationFrameRef.current = requestAnimationFrame(update);
    };
    update();

    // --- Handle Resize ---
    const handleResize = () => {
      if (!svgRef.current) return;
      width = window.innerWidth;
      height = window.innerHeight;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      for (const node of nodes) {
        gsap.to(node.data, {
          x: Math.random() * width,
          y: Math.random() * height,
          duration: 10,
          ease: "power1.out",
        });
      }
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      gsap.globalTimeline.clear(); // Clear all GSAP animations
      if (svg) svg.innerHTML = ""; // Clear SVG content
    };
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
//=================================================================
export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      
      {/* --- ADDED ANIMATIONS --- */}
      {/* Animated background grid (from Hero) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      {/* GSAP Animated Background (from Hero) */}
      <AnimatedBackground />
      {/* --- END OF ADDED ANIMATIONS --- */}

      {/* I removed this line, as it would conflict with the Hero animations:
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#9333ea20_0%,transparent_65%)]" />
      */}

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