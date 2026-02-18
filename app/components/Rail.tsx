"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { panels } from "./panelData";

interface RailProps {
  current: number;
  onNavigate: (index: number) => void;
}

export default function Rail({ current, onNavigate }: RailProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [connectorTop, setConnectorTop] = useState(0);
  const [connectorHeight, setConnectorHeight] = useState(0);
  const [fillHeight, setFillHeight] = useState(0);

  const measure = useCallback(() => {
    if (!navRef.current) return;
    const wrappers = navRef.current.querySelectorAll(".rail-dot-wrapper");
    if (wrappers.length === 0) return;

    const navRect = navRef.current.getBoundingClientRect();
    const first = wrappers[0] as HTMLElement;
    const last = wrappers[wrappers.length - 1] as HTMLElement;

    // Dot centers relative to rail-nav container
    const firstCenter = first.offsetTop + first.offsetHeight / 2;
    const lastCenter = last.offsetTop + last.offsetHeight / 2;

    setConnectorTop(firstCenter);
    setConnectorHeight(lastCenter - firstCenter);

    if (current === 0) {
      setFillHeight(0);
    } else {
      const activeDot = wrappers[current] as HTMLElement;
      const activeCenter = activeDot.offsetTop + activeDot.offsetHeight / 2;
      setFillHeight(activeCenter - firstCenter);
    }
  }, [current]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const total = panels.length;
  const indexStr = `${String(current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div className="rail">
      <div className="rail-brand">McCormack / Public Sector AI</div>
      <div className="rail-nav" ref={navRef}>
        {/* Background connector line: first dot to last dot */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            top: `${connectorTop}px`,
            height: `${connectorHeight}px`,
            background: "var(--color-border)",
            zIndex: 0,
          }}
        />
        {/* Orange fill line: first dot to active dot */}
        {current > 0 && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "1.5px",
              top: `${connectorTop}px`,
              height: `${fillHeight}px`,
              background: "var(--color-accent)",
              zIndex: 1,
              transition: "height 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        )}
        {panels.map((p, i) => (
          <div key={i} className="rail-dot-wrapper">
            <div
              className={`rail-dot${i === current ? " active" : ""}${i < current ? " visited" : ""}`}
              onClick={() => onNavigate(i)}
            />
            <span className="rail-dot-label">{p.navLabel}</span>
          </div>
        ))}
      </div>
      <div className="rail-index">{indexStr}</div>
    </div>
  );
}
