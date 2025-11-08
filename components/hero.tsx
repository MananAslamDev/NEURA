"use client";

// Imports for all components in this file
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { gsap } from "gsap"; // Import GSAP for all components

//=================================================================
// 1. ANIMATED BACKGROUND COMPONENT (OPTIMIZED)
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
          radius: Math.random() * 2 + 1.5, // Slightly smaller
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
        // We need to store the onUpdate function to re-use it after resize
        const onUpdate = () => {
          // 1. Update the node's own position
          node.el.setAttribute("cx", node.data.x.toString());
          node.el.setAttribute("cy", node.data.y.toString());

          // 2. Find and update all lines connected to this node
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
        
        // Store the onUpdate function on the element object for later
        node.el.onUpdate = onUpdate;

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

        // Stop old tweens
        gsap.killTweensOf(nodes.map(n => n.data)); 

        nodes.forEach((node) => {
          gsap.to(node.data, {
            x: () => Math.random() * width,
            y: () => Math.random() * height,
            duration: 5, // Shorter duration to adapt to new size
            ease: "power1.out",
            // After adapting, restart the main animation
            onComplete: () => {
              gsap.to(node.data, {
                x: () => Math.random() * width,
                y: () => Math.random() * height,
                duration: () => Math.random() * 20 + 15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                onUpdate: node.el.onUpdate // Re-use the onUpdate logic
              });
            }
          });
        });
      };

      window.addEventListener("resize", handleResize);

      // --- Cleanup ---
      return () => {
        window.removeEventListener("resize", handleResize);
        // ctx.revert() will be called automatically
      };
    }, svgRef); // Scope the context to the SVG element

    // Return the cleanup function from the context
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
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let proxy = { val: 0 };
          gsap.to(proxy, {
            val: end,
            duration: duration,
            ease: "power3.out",
            onUpdate: () => {
              if (spanRef.current) {
                spanRef.current.textContent = `${Math.round(proxy.val)}${suffix}`;
              }
            },
            onComplete: () => {
              if (spanRef.current) {
                spanRef.current.textContent = `${end}${suffix}`;
              }
            },
          });
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [end, suffix, duration]);

  return <span ref={spanRef}>0{suffix}</span>;
}

//=================================================================
// 3. HERO COMPONENT (Main Export - Unchanged)
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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size:4rem_4rem" />

      {/* GSAP Animated Background (Now Optimized) */}
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
            <span className="glow-purple bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-purple-500 to-violet-500">
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