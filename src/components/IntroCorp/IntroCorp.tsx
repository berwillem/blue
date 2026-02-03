//@ts-nocheck
import { useEffect, useRef } from "react";
import Button from "../../ui/button/Button";
import gsap from "gsap";
import "./IntroCorp.css";

export default function IntroCorp() {
  const h3Ref = useRef(null);
  const h1Ref = useRef(null);

  useEffect(() => {
    // Split h1 text into spans for character animation
    const h1Chars = h1Ref.current.innerText.split("").map((char) => {
      return `<span class="char">${char}</span>`;
    });
    h1Ref.current.innerHTML = h1Chars.join("");

    // Timeline for staggered reveal
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // h3 slide up and fade in
    tl.fromTo(
      h3Ref.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
    );

    // h1 characters stagger reveal with blur and opacity
    tl.fromTo(
      ".char",
      { y: 20, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.03,
      },
      "-=0.5", // overlap slightly with h3
    );
  }, []);

  return (
    <div className="intro-corp">
      <div className="intro-content">
        <div className="intro-text">
          <h3 ref={h3Ref}>Where performance meets balance.</h3>
          <h1 ref={h1Ref}>
            Aligning physical energy, mental clarity, and
            <br />
            purposeful action to drive results at every
            <br />
            level
          </h1>
        </div>
      </div>
      <div className="intro-bottom">
        <Button text="About the Founder" width="100%" />
        <div className="scroll-indicator">
          <span />
        </div>
      </div>
    </div>
  );
}
