// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import "./Footer.css";
import ocean from "../../assets/videos/ocean.mp4";

export default function Footer() {
  const footerRef = useRef(null);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let hasUserScrolled = false;
    let isAnimating = false;

    const onFirstScroll = () => {
      hasUserScrolled = true;
      window.removeEventListener("scroll", onFirstScroll);
    };

    window.addEventListener("scroll", onFirstScroll);

    let ctx;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger, ScrollToPlugin } = await import("gsap/all");

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      if (!footerRef.current || !videoRef.current) return;

      ctx = gsap.context(() => {
        gsap.set(videoRef.current, { yPercent: 100, autoAlpha: 0 });
        gsap.set(footerRef.current, { scale: 1 });
        gsap.set(footerRef.current.querySelector(".footer-content"), {
          opacity: 0,
          y: 24,
        });

        const disableScroll = () => (document.body.style.overflow = "hidden");
        const enableScroll = () => (document.body.style.overflow = "");

        requestAnimationFrame(() => {
          setTimeout(() => {
            ScrollTrigger.refresh();

            ScrollTrigger.create({
              trigger: footerRef.current,
              start: "top 85%",
              onEnter: () => {
                if (!hasUserScrolled || isAnimating) return;

                isAnimating = true;
                disableScroll();

                gsap.to(window, {
                  scrollTo: {
                    y: footerRef.current,
                    autoKill: false,
                  },
                  duration: 1.2,
                  ease: "power3.out",
                  onComplete: () => {
                    enableScroll();
                    isAnimating = false;
                  },
                });

                const tl = gsap.timeline();
                tl.to(videoRef.current, { autoAlpha: 1, duration: 0 });
                tl.fromTo(
                  videoRef.current,
                  { yPercent: 100 },
                  { yPercent: 0, duration: 2.5, ease: "power3.out" },
                  0,
                );
                tl.fromTo(
                  footerRef.current,
                  { scale: 1 },
                  { scale: 0.85, duration: 2, ease: "power3.out" },
                  0,
                );
                tl.fromTo(
                  footerRef.current.querySelector(".footer-content"),
                  { opacity: 0, y: 24 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                  },
                  0.2,
                );
              },

              onLeaveBack: () => {
                gsap.to(videoRef.current, {
                  yPercent: 100,
                  autoAlpha: 0,
                  duration: 0.6,
                  ease: "power3.in",
                });
                gsap.to(footerRef.current, {
                  scale: 1,
                  duration: 0.6,
                  ease: "power3.in",
                });
                gsap.to(footerRef.current.querySelector(".footer-content"), {
                  opacity: 0,
                  y: 24,
                  duration: 0.4,
                  ease: "power3.in",
                });
              },
            });
          }, 300);
        });
      });
    };

    initGSAP();

    return () => {
      window.removeEventListener("scroll", onFirstScroll);
      if (ctx) ctx.revert();
    };
  }, [isMobile]);

  return (
    <>
      {!isMobile && (
        <div className="footer-video-wrapper" ref={videoRef}>
          <video src={ocean} autoPlay muted loop playsInline />
        </div>
      )}

      <div className="footer-spacer" />

      <footer ref={footerRef}>
        <div className="footer-content">
          <div className="up">
            <div className="left">
              <h2>
                Elevating performance through <br />
                balance, clarity, and growth.
              </h2>
            </div>
            <div className="right">
              <button>
                <span></span>
                <span>Contact us</span>
              </button>
            </div>
          </div>

          <div className="down">
            <ul>
              <li className="title">For individuals</li>
              <li>Home page</li>
              <li>What we do</li>
              <li>Start personal capacity test</li>
              <li>Start metabolic health test</li>
              <li>Contact us</li>
              <li>Useful links</li>
            </ul>

            <ul>
              <li className="title">For individuals</li>
              <li>Home page</li>
              <li>What we do</li>
              <li>Contact us</li>
              <li>Useful links</li>
            </ul>

            <ul>
              <li className="title">For partnership</li>
              <li>Home page</li>
              <li>What we do</li>
              <li>Become a partner</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
