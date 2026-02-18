"use client";

import { useEffect, useRef, useState } from "react";

interface CustomCursorProps {
  mousePos: { x: number; y: number };
}

export default function CustomCursor({ mousePos }: CustomCursorProps) {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const ringPos = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);
  const rawPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const handleMove = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".rail-dot") ||
        target.closest(".nav-arrow")
      ) {
        setHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".rail-dot") ||
        target.closest(".nav-arrow")
      ) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      ringPos.current.x +=
        (rawPos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y +=
        (rawPos.current.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${rawPos.current.x - 2}px, ${rawPos.current.y - 2}px)`;
      }
      if (ringRef.current) {
        const size = hovering ? 48 : 32;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }
    };
    animate();

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(frameRef.current);
    };
  }, [visible, hovering]);

  if (!visible) return null;

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          background: "#e8e6dc",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          border: `1px solid ${hovering ? "rgba(193,95,60,0.5)" : "rgba(232,230,220,0.25)"}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: "difference",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
        }}
      />
    </>
  );
}
