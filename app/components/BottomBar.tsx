"use client";

interface BottomBarProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function BottomBar({ onPrev, onNext }: BottomBarProps) {
  return (
    <div className="bottom-bar">
      <div className="bottom-label">Arrow keys or scroll to navigate</div>
      <div className="nav-arrows">
        <button className="nav-arrow" onClick={onPrev} aria-label="Previous panel">
          &#8592;
        </button>
        <button className="nav-arrow" onClick={onNext} aria-label="Next panel">
          &#8594;
        </button>
      </div>
      <div className="bottom-label">Feb 2026</div>
    </div>
  );
}
