import { useMemo } from "react";
import "./AnnouncementBar.css";

const MESSAGES = [
  "FLAT 20% OFF",
  "FREE DELIVERY ON ORDERS ABOVE ₹499",
  "SHOP NOW & SAVE MORE",
];

export default function AnnouncementBar({ messages = MESSAGES, speed = 12 }) {
  // Duplicate the list once so the track can translate -50% and loop with no gap
  const items = useMemo(() => [...messages, ...messages], [messages]);

  return (
    <div className="announcement-bar">
      <div className="announcement-track" style={{ animationDuration: `${speed}s` }}>
        {items.map((msg, i) => (
          <span className="announcement-item" key={i}>
            <span className="announcement-text">{msg}</span>
            <span className="announcement-sep" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}