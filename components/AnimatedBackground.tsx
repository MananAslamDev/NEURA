"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function AnimatedBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const nodes: any[] = [];
    const lines: any[] = [];
    const nodeCount = 30; // More nodes
    const lineCount = 40; // More lines
    let width = window.innerWidth;
    let height = window.innerHeight;

    // FIX: Set the correct viewBox immediately on the client
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    // --- Create SVG Glow Filter ---
    // This is key to the "neon" look
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
        radius: Math.random() * 3 + 2, // Smaller, more refined nodes
      };

      circle.setAttribute("cx", data.x.toString());
      circle.setAttribute("cy", data.y.toString());
      circle.setAttribute("r", data.radius.toString());
      circle.setAttribute("fill", "#a78bfa"); // Purple color
      circle.setAttribute("filter", "url(#glow)"); // Apply glow
      svg.appendChild(circle);

      nodes.push({ el: circle, data });

      // Animate node position
      gsap.to(data, {
        x: Math.random() * width,
        y: Math.random() * height,
        duration: Math.random() * 20 + 15, // Slow, long drift
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
      
      // Connect two random nodes
      const nodeAIndex = Math.floor(Math.random() * nodeCount);
      const nodeBIndex = Math.floor(Math.random() * nodeCount);

      line.setAttribute("x1", nodes[nodeAIndex].data.x.toString());
      line.setAttribute("y1", nodes[nodeAIndex].data.y.toString());
      line.setAttribute("x2", nodes[nodeBIndex].data.x.toString());
      line.setAttribute("y2", nodes[nodeBIndex].data.y.toString());
      line.setAttribute("stroke", "#a78bfa"); // Purple color
      line.setAttribute("stroke-width", "0.5");
      line.setAttribute("opacity", "0.3");
      line.setAttribute("filter", "url(#glow)"); // Apply glow
      svg.prepend(line); // Prepend so lines are behind nodes

      lines.push({ el: line, nodeAIndex, nodeBIndex });

      // Animate line opacity (data pulse)
      gsap.to(line, {
        opacity: Math.random() * 0.4 + 0.1, // Pulse between 0.1 and 0.5
        duration: Math.random() * 3 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }

    // --- Ticker to Update Lines ---
    // This function runs every frame and makes the lines "stick" to the moving nodes
    const update = () => {
      // Update node visual positions
      for (const node of nodes) {
        node.el.setAttribute("cx", node.data.x.toString());
        node.el.setAttribute("cy", node.data.y.toString());
      }

      // Update line end-points
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
      width = window.innerWidth;
      height = window.innerHeight;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      // Optional: Re-calculate node target positions on resize
      for (const node of nodes) {
        gsap.to(node.data, {
          x: Math.random() * width,
          y: Math.random() * height,
          duration: 10, // Quickly move to new valid positions
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
      svg.innerHTML = ""; // Clear SVG content
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      // FIX: Use static values for initial render to match server
      viewBox="0 0 1920 1080"
      aria-hidden="true"
    />
  );
}