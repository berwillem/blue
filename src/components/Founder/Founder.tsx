//@ts-nocheck
import React, { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from "../../assets/images/redaintro.jpg";
import "./Founder.css"
gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const { t, i18n } = useTranslation();

  const renderSplitText = (textKey, className) => {
    return t(textKey)
      .split(" ")
      .map((word, i) => (
        <span key={i} className={className}>
          {word}&nbsp;
        </span>
      ));
  };

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const titleWords = textRef.current?.querySelectorAll(".word");

      // --- 1. ÉTATS INITIAUX ---
      gsap.set(imageRef.current, {
        position: "absolute",
        bottom: "0%",
        opacity: 0,
        left: "50%",
        xPercent: -50,
        width: "90vw",
        height: "80vh",
        borderRadius: "40px 40px 0 0",
        zIndex: 5,
      });
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });

      if (titleWords) {
        gsap.set(titleWords, { opacity: 0, y: 30, filter: "blur(15px)" });
      }

      // --- 2. ANIMATION D'ENTRÉE ---
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power4.out" },
      });

      entryTl.to(imageRef.current, { opacity: 1, duration: 1.2 })
        .to(titleWords, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.02,
          duration: 1,
        }, "-=0.8");

      // --- 3. TIMELINE PRINCIPALE (SCRUB) ---
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Réduit car moins de contenu
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      mainTl
        .to(textRef.current, {
          opacity: 0,
          y: -50,
          filter: "blur(10px)",
          duration: 1,
        })
        .to(imageRef.current, {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          bottom: 0,
          duration: 1,
        }, "<")
        .to(buttonRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8 
        }, "<0.5");

    }, containerRef);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [t, i18n.language]);

  return (
    <section ref={containerRef} className="hero-container">
      <div className="intro-section">
   

        <div ref={imageRef} className="imageCard">
          <img src={heroImage} alt="Founder" />
        </div>

        <div ref={buttonRef} className="btn-wrapper">
          <Link to="/about">
            <button className="founderBtn">
              <div className="yellow" />
              {t("individuals.button")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}