"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { panels } from "./panelData";

interface PanelContentProps {
  current: number;
  direction: number;
}

// Stagger orchestration
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE as unknown as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.3, ease: EASE as unknown as [number, number, number, number] },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE as unknown as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3, ease: EASE as unknown as [number, number, number, number] },
  },
};

// Word-by-word stagger for headings
function AnimatedHeading({
  text,
  html,
  className,
}: {
  text?: string;
  html?: string;
  className: string;
}) {
  if (html) {
    // Parse HTML to extract words while preserving tags
    const words = splitHtmlIntoWords(html);
    return (
      <motion.h1 className={className} variants={fadeUp}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block", marginRight: "0.25em" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.2 + i * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
            dangerouslySetInnerHTML={{ __html: word }}
          />
        ))}
      </motion.h1>
    );
  }

  const words = (text || "").split(" ");
  return (
    <motion.h2 className={className} variants={fadeUp}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.2 + i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

// Split HTML string into word chunks preserving tags
function splitHtmlIntoWords(html: string): string[] {
  const result: string[] = [];
  let current = "";
  let inTag = false;

  for (let i = 0; i < html.length; i++) {
    const ch = html[i];
    if (ch === "<") {
      inTag = true;
      current += ch;
    } else if (ch === ">") {
      inTag = false;
      current += ch;
    } else if (ch === " " && !inTag) {
      if (current.trim()) result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) result.push(current);
  return result;
}

// Stat counter animation
function AnimatedStat({
  value,
  suffix,
  desc,
  hasAnimated,
}: {
  value: number;
  suffix: string;
  desc: string;
  hasAnimated: boolean;
}) {
  const [display, setDisplay] = useState(hasAnimated ? value : 0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (hasAnimated) {
      setDisplay(value);
      return;
    }

    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, hasAnimated]);

  return (
    <motion.div className="stat-cell" variants={fadeUp}>
      <div className="stat-num">
        {display}
        {suffix}
      </div>
      <div className="stat-desc">{desc}</div>
    </motion.div>
  );
}

// Evidence block with animated border
function EvidenceBlock({
  text,
  tag,
}: {
  text: string;
  tag: string;
}) {
  return (
    <motion.div className="context-block" variants={slideInLeft}>
      <motion.div
        className="context-border"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: "top" }}
      />
      <p>{text}</p>
      <span className="tag">{tag}</span>
    </motion.div>
  );
}

export default function PanelContent({ current, direction }: PanelContentProps) {
  const [heroAnimated, setHeroAnimated] = useState(false);

  useEffect(() => {
    if (current === 0 && !heroAnimated) {
      // Small delay then mark as animated
      const timer = setTimeout(() => setHeroAnimated(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [current, heroAnimated]);

  return (
    <div className="main-area">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="panel-content">
            <PanelRenderer
              index={current}
              heroAnimated={heroAnimated}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PanelRenderer({
  index,
  heroAnimated,
}: {
  index: number;
  heroAnimated: boolean;
}) {
  const panel = panels[index];

  switch (panel.type) {
    case "hero":
      return (
        <>
          <motion.div className="label" variants={fadeUp}>
            {panel.label}
          </motion.div>
          {panel.headingHtml && (
            <AnimatedHeading
              html={panel.headingHtml}
              className="panel-heading panel-h1"
            />
          )}
          {panel.paragraphs.map((p, i) => (
            <motion.p key={i} className="panel-p" variants={fadeUp}>
              {p}
            </motion.p>
          ))}
          {panel.stats && (
            <motion.div className="stat-grid" variants={fadeUp}>
              {panel.stats.map((s, i) => (
                <AnimatedStat
                  key={i}
                  value={s.value}
                  suffix={s.suffix}
                  desc={s.desc}
                  hasAnimated={heroAnimated}
                />
              ))}
            </motion.div>
          )}
        </>
      );

    case "observation":
    case "lesson":
      return (
        <>
          <motion.div className="label" variants={fadeUp}>
            {panel.label}
          </motion.div>
          {panel.heading && (
            <AnimatedHeading
              text={panel.heading}
              className="panel-heading panel-h2"
            />
          )}
          {(panel.paragraphsHtml || panel.paragraphs).map((p, i) => (
            <motion.p
              key={i}
              className="panel-p"
              variants={fadeUp}
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
          {panel.evidence && (
            <EvidenceBlock
              text={panel.evidence.text}
              tag={panel.evidence.tag}
            />
          )}
        </>
      );

    case "vision":
      return (
        <>
          <motion.div className="label" variants={fadeUp}>
            {panel.label}
          </motion.div>
          {panel.visionTexts?.map((t, i) => (
            <motion.p key={i} className="vision-text" variants={fadeUp}>
              {t}
            </motion.p>
          ))}
          {panel.visionCoda && (
            <motion.p className="vision-coda" variants={fadeUp}>
              {panel.visionCoda}
            </motion.p>
          )}
        </>
      );

    case "about":
      return (
        <>
          <motion.div className="label" variants={fadeUp}>
            {panel.label}
          </motion.div>
          {panel.heading && (
            <AnimatedHeading
              text={panel.heading}
              className="panel-heading panel-h2"
            />
          )}
          <motion.div className="about-grid" variants={fadeUp}>
            <div>
              <p className="panel-p">
                9+ years driving technology adoption across 20+ government
                agencies. Currently managing an $18M+ portfolio as Delivery
                Director at MTX Group with full P&L responsibility and
                complete lifecycle ownership of every customer relationship.
              </p>
              <p className="panel-p">
                No support team. No handoff structure. Every customer succeeds
                or fails based on what I personally deliver. That&apos;s not a
                complaint. It&apos;s where I learned everything on these pages.
              </p>
            </div>
            <div>
              <p className="panel-p">
                Actively building AI fluency through Claude Code, Databricks
                accreditations, and Compass AI, an AI-powered compliance
                platform for government agencies that I&apos;m developing from
                scratch.
              </p>
              <p className="panel-p" style={{ marginTop: 16 }}>
                <a
                  href="https://www.linkedin.com/in/ryan-mccormack-84841891/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--color-accent)",
                    textDecoration: "none",
                    borderBottom: "1px solid transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderBottomColor =
                      "var(--color-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderBottomColor = "transparent")
                  }
                >
                  LinkedIn
                </a>
              </p>
              <p
                className="panel-p"
                style={{
                  marginTop: 16,
                  color: "var(--color-text-muted)",
                  fontSize: 13,
                }}
              >
                I&apos;ve applied for the Customer Success Manager, Public
                Sector role and would love to connect. My contact information
                is on my application.
              </p>
            </div>
          </motion.div>
        </>
      );

    default:
      return null;
  }
}
