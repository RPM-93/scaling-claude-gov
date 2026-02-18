"use client";

import { useState, useCallback, useEffect, useRef, lazy, Suspense } from "react";
import Rail from "./components/Rail";
import BottomBar from "./components/BottomBar";
import PanelContent from "./components/PanelContent";
import CustomCursor from "./components/CustomCursor";
import { panels } from "./components/panelData";

const Scene = lazy(() => import("./components/Scene"));

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [locked, setLocked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const scrollAccum = useRef(0);
  const touchStart = useRef(0);
  const total = panels.length;

  const goTo = useCallback(
    (index: number) => {
      if (locked || index === current || index < 0 || index >= total) return;
      setDirection(index > current ? 1 : -1);
      setLocked(true);
      setCurrent(index);
      setTimeout(() => setLocked(false), 700);
    },
    [current, locked, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  // Wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current += e.deltaY;
      if (Math.abs(scrollAccum.current) > 60) {
        if (scrollAccum.current > 0) next();
        else prev();
        scrollAccum.current = 0;
      }
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel);
  }, [next, prev]);

  // Touch navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 40) {
        if (delta > 0) next();
        else prev();
      }
    };
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [next, prev]);

  // Mouse position for parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Progress bar width
  const progressWidth = total > 1 ? (current / (total - 1)) * 100 : 0;

  return (
    <>
      {/* Three.js scene - lazy loaded */}
      <Suspense fallback={null}>
        <Scene currentPanel={current} mousePos={mousePos} />
      </Suspense>

      {/* Overlays */}
      <div className="vignette" />

      {/* Progress bar */}
      <div className="progress-bar" style={{ width: `${progressWidth}%` }} />

      {/* Custom cursor */}
      <CustomCursor mousePos={mousePos} />

      {/* Main shell */}
      <div className="shell">
        <Rail current={current} onNavigate={goTo} />
        <PanelContent current={current} direction={direction} />
      </div>

      {/* Bottom bar */}
      <BottomBar onPrev={prev} onNext={next} />
    </>
  );
}
