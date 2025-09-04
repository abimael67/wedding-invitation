import { useEffect, useRef } from "react";

interface ConfettiProps {
  count?: number; // number of confetti pieces
}

const Confetti: React.FC<ConfettiProps> = ({ count = 80 }) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Clear old confetti if the component re-renders
    wrap.innerHTML = "";

    const colors = [
      "#f59e0b",
      "#10b981",
      "#3b82f6",
      "#a855f7",
      "#ef4444",
      "#22d3ee",
    ];

    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "piece";

      const left = Math.random() * 100; // 0–100%
      const tx = `${Math.random() * 60 - 30}px`; // -30px ~ 30px drift
      const delay = `${Math.random().toFixed(2)}s`;
      const dur = `${(3 + Math.random() * 1.5).toFixed(2)}s`;
      const rot = `${180 + Math.random() * 540}deg`;
      const w = Math.random() < 0.5 ? 6 : 10;
      const h = Math.random() < 0.5 ? 10 : 6;
      const color = colors[Math.floor(Math.random() * colors.length)];

      s.style.setProperty("--x", `${left}%`);
      s.style.setProperty("--tx", tx);
      s.style.setProperty("--delay", delay);
      s.style.setProperty("--dur", dur);
      s.style.setProperty("--rot", rot);
      s.style.setProperty("--w", `${w}px`);
      s.style.setProperty("--h", `${h}px`);
      s.style.setProperty("--c", color);

      wrap.appendChild(s);
    }
  }, [count]);

  return <div ref={wrapRef} className="confetti-wrap" />;
};

export default Confetti;
