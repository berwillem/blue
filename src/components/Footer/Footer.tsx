//@ts-nocheck
import { useEffect, useRef } from "react";
import "./Footer.css";
import ocean from "../../assets/videos/ocean.mp4";

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);

  const disableScroll = () => (document.body.style.overflow = "hidden");
  const enableScroll = () => (document.body.style.overflow = "");

  useEffect(() => {
    const gsapImport = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger, ScrollToPlugin } = await import("gsap/all");

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      if (!footerRef.current || !videoRef.current) return;

      // trigger timeline only on enter
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          disableScroll();

          // automatic scroll to bottom
          gsap.to(window, {
            scrollTo: { y: "max", autoKill: false },
            duration: 1.2,
            ease: "power3.out",
            onComplete: enableScroll,
          });

          // Timeline for animations
          const tl = gsap.timeline();

          tl.fromTo(
            videoRef.current,
            { yPercent: 100 },
            { yPercent: 0, duration: 2.5, ease: "power3.out" },
            0
          );

          tl.fromTo(
            footerRef.current,
            { scale: 1 },
            { scale: 0.85, duration: 2, ease: "power3.out" },
            0
          );

          tl.fromTo(
            footerRef.current.querySelector(".footer-content"),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            0.2
          );
        },
      });

      // FAST exit animation when scrolling back up
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 75%",
        onLeaveBack: () => {
          gsap.to(videoRef.current, {
            yPercent: 100,
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
    };

    gsapImport();
  }, []);

  return (
    <>
      {/* Background video */}
      <div className="footer-video-wrapper" ref={videoRef}>
        <video src={ocean} autoPlay muted loop playsInline />
      </div>

      <div className="footer-spacer" />

      <footer ref={footerRef}>
        <div className="footer-content">
          <div className="up">
            <div className="left">
              <h2>
                Elevating performance through <br /> balance, clarity, and growth.
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
