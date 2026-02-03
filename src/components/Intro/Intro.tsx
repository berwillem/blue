import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../../assets/images/redaabout.png";

import "./Intro.css";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const whyRef = useRef<HTMLElement | null>(null);
  const { t, i18n } = useTranslation();
  const headlineText =
    "I conduct Blu to help people rebuild themselves—physically, mentally, and morally—so they can live with strength, purpose, and responsibility instead of exhaustion and confusion";

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !containerRef.current ||
        !imageRef.current ||
        !buttonRef.current ||
        !whyRef.current
      )
        return;

      // INITIAL STATES
      gsap.set(imageRef.current, {
        position: "absolute",
        bottom: "0%",
        left: "50%",
        xPercent: -50,
        width: "90vw",
        height: "50vh",
        borderRadius: "40px 40px 0 0",
        zIndex: 5,
      });

      gsap.set(buttonRef.current, { opacity: 0, y: 20 });
      gsap.set(whyRef.current, { y: "100%" });

      // SPLIT WORDS
      const paragraphs = whyRef.current.querySelectorAll("p");
      paragraphs.forEach((p) => {
        if (p.dataset.split) return;
        p.dataset.split = "true";
        const words = p.innerText.split(" ");
        p.innerHTML = words
          .map((w) => `<span class="revealWord">${w}&nbsp;</span>`)
          .join("");
      });

      // TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
     const entryTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      entryTl
        .to(imageRef.current, { bottom: 0, opacity: 1, duration: 1.5 })
        .from(
          textRef.current.querySelectorAll(`.word`),
          {
            opacity: 0,
            filter: "blur(15px)",
            y: 30,
            duration: 1,
            stagger: 0.02,
          },
          "-=1.0",
        )
        .from(".navbar-anim", { y: -100, opacity: 0, duration: 1.2 }, "-=1.2");
      tl.to(textRef.current, {
        opacity: 0,
        y: -50,
        filter: "blur(10px)",
        duration: 1,
      })
        .to(
          imageRef.current,
          {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            bottom: 0,
            duration: 1,
          },
          "<",
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "<0.2",
        )
        .to(whyRef.current, { y: "0%", duration: 1 }, "+=0.2")
        .to(
          ".revealWord",
          {
            opacity: 1,
            stagger: 0.02,
            duration: 0.5,
          },
          "<0.5",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ================= INTRO (PINNED) ================= */}
      <section ref={containerRef} className="hero-container">
        <div className="intro-section">
          <h1 ref={textRef} className="headline">
            {t("individuals.main_title").split(" ").map((word, i) => (
              <span key={i} className="word">
                {word}&nbsp;
              </span>
            ))}
          </h1>

          <div ref={imageRef} className="imageCard">
            <img src={heroImage} alt="Reda" />
          </div>

          <div ref={buttonRef} className="btn-wrapper">
            <button className="founderBtn">
              <div className="yellow" />
             {t("individuals.button")}
            </button>
          </div>
        </div>

        {/* WHY OVERLAY */}
        <section ref={whyRef} className="why-overlay">
          <span className="smallTitle">Why?</span>
          <div className="longText">
            <p>
    We help people who are suffering regain control of their body, mind, and life—so they can stand upright again and become reliable for themselves and for others
            </p>
            <p>
             Blu is not theoretical. It is built on lived experience: losing clarity and energy, then rebuilding them through discipline, metabolic health, responsibility, and meaning
            </p>
            <p>
             When a person collapses, their environment pays the price—spouse, children, teams, and friends. We help protect what matters most: family, responsibility, and legacy.
            </p>
          </div>
        </section>
      </section>
    </>
  );
}
