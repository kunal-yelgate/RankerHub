import React, { useState, useEffect } from "react";

export const Preloader = () => {
  const [loading, setLoading] = useState(() => {
    // Check if preloader has already played in this session
    const played = sessionStorage.getItem("preloader-played");
    return played !== "true";
  });

  useEffect(() => {
    if (!loading) return;

    // Disable scrolling while preloader runs
    document.body.style.overflow = "hidden";
    sessionStorage.setItem("preloader-played", "true");

    // Remove preloader from viewport after animation concludes
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 3200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [loading]);

  if (!loading) return null;

  const totalColumns = 12;

  return (
    <div id="preloader" aria-hidden="true">
      <div className="preloader-text">
        <span className="preloader-phrase">RankerHub.</span>
        <span className="preloader-crown-emoji">👑</span>
        <span className="preloader-period">Level Up Your Code.</span>
      </div>
      <div className="transition-overlay" id="column-container">
        {[...Array(totalColumns)].map((_, i) => (
          <div
            key={i}
            className="preloader-column"
            style={{ "--col-index": i }}
          >
            <div className="preloader-top-bar" />
            <div className="preloader-bottom-bar" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
