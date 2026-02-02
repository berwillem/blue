// @ts-nocheck
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./TransitionOverlay.module.css";

export default function TransitionOverlay({
  isActive,
  clickX,
  clickY,
  onComplete,
}) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isActive || !overlayRef.current) return;

    // Position exactly at click coordinates, centered
    gsap.set(overlayRef.current, {
      left: clickX,
      top: clickY,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 1,
    });

    const tl = gsap.timeline({
      onComplete: onComplete, // navigate when fully scaled
    });

    // Grow to huge size – stays visible
    tl.to(overlayRef.current, {
      scale: 108, // Very large to cover full screen from any click point
      duration: 0.9,
      ease: "power3.inOut",
    });

    // No fade-out animation → it remains big and covering after animation finishes
  }, [isActive, clickX, clickY, onComplete]);

  if (!isActive) return null;

  return <div ref={overlayRef} className={styles.overlay} />;
}
