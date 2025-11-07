"use client";

// Imports for all components in this file
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { gsap } from "gsap"; // Import GSAP for all components

//=================================================================
// 1. ANIMATED BACKGROUND COMPONENT (Merged)
//=================================================================

/**
 * Renders an animated network of nodes and lines using GSAP.
 * This component is now self-contained within Hero.tsx.
 */
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

    // FIX: Set the correct viewBox immediately on the client to avoid hydration mismatch
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
// 2. CUSTOM COUNTUP COMPONENT (Replaces react-countup)
//=================================================================
interface CustomCountUpProps {
  end: number;
  suffix: string;
  duration?: number;
}

/**
 * A custom CountUp component using GSAP and IntersectionObserver
 * to replace the external 'react-countup' library.
 */
function CustomCountUp({ end, suffix, duration = 3 }: CustomCountUpProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false); // Ensures animation only runs once

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return;

    // Use IntersectionObserver to trigger animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Check if element is in view and has not animated yet
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true; // Mark as animated

          // Create a proxy object for GSAP to animate
          let proxy = { val: 0 };
          gsap.to(proxy, {
            val: end,
            duration: duration,
            ease: "power3.out",
            onUpdate: () => {
              // Update the DOM element's text content on each frame
              if (spanRef.current) {
                spanRef.current.textContent = `${Math.round(proxy.val)}${suffix}`;
              }
            },
            onComplete: () => {
              // Ensure final value is exact
              if (spanRef.current) {
                spanRef.current.textContent = `${end}${suffix}`;
              }
            },
          });
          observer.disconnect(); // Stop observing after animation
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [end, suffix, duration]);

  // Start by displaying 0 and the suffix
  return <span ref={spanRef}>0{suffix}</span>;
}

//=================================================================
// 3. HERO COMPONENT (Main Export)
//=================================================================
export function Hero() {
  const stats = [
    { end: 150, suffix: "+", label: "Projects Delivered" },
    { end: 98, suffix: "%", label: "Client Satisfaction" },
    { end: 50, suffix: "+", label: "Global Clients" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* GSAP Animated Background (Now defined in this file) */}
      <AnimatedBackground />

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
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 text-balance leading-tight"
          >
            <span className="text-white">Building the </span>
            <span className="glow-purple bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-500 to-violet-500">
              Future
            </span>
            <br />
            <span className="text-white">of Digital</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mb-10 max-w-3xl mx-auto text-balance leading-relaxed"
          >
            We craft premium digital experiences that merge cutting-edge
            technology with stunning design. Transform your vision into reality
            with NEURA.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-semibold text-base px-8 py-6 group"
            >
              Start Your Project
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 group bg-transparent"
            >
              <Play
                className="mr-2 group-hover:scale-110 transition-transform"
                size={20}
              />
              Watch Demo
            </Button>
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
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  {/* Replaced CountUp with our new CustomCountUp */}
                  <CustomCountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={3}
                  />
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}