// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import "./Footer.css";
import ocean from "../../assets/videos/ocean.mp4";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useUserTypeStore } from "../../store/useUserTypeStore";

export default function Footer() {
  const { t } = useTranslation();
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
                  scrollTo: { y: footerRef.current, autoKill: false },
                  duration: 1.2,
                  ease: "power3.out",
                  onComplete: () => {
                    enableScroll();
                    isAnimating = false;
                  },
                });

                const tl = gsap.timeline();
                tl.to(videoRef.current, { autoAlpha: 1, duration: 0 });
                tl.fromTo(videoRef.current, { yPercent: 100 }, { yPercent: 0, duration: 2.5, ease: "power3.out" }, 0);
                tl.fromTo(footerRef.current, { scale: 1 }, { scale: 0.85, duration: 2, ease: "power3.out" }, 0);
                tl.fromTo(
                  footerRef.current.querySelector(".footer-content"),
                  { opacity: 0, y: 24 },
                  { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                  0.2
                );
              },
              onLeaveBack: () => {
                gsap.to(videoRef.current, { yPercent: 100, autoAlpha: 0, duration: 0.6, ease: "power3.in" });
                gsap.to(footerRef.current, { scale: 1, duration: 0.6, ease: "power3.in" });
                gsap.to(footerRef.current.querySelector(".footer-content"), { opacity: 0, y: 24, duration: 0.4, ease: "power3.in" });
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
    const userType = useUserTypeStore((state) => state.userType);
  const contactPath = userType === "individuals" ? "/contact" : "/contactb2b";

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
              <h2 dangerouslySetInnerHTML={{ __html: t("footer.headline") }} />
            </div>
            <div className="right">
              <Link to={contactPath}>
                      <button>
                <span />
                <span>{t("footer.cta")}</span>
              </button>
              </Link>
      
            </div>
          </div>

          <div className="down">
            <ul>
              <li className="title">{t("footer.col1.title")}</li>
              {t("footer.col1.links", { returnObjects: true }).map((link, i) => (
                <li key={i}>{link}</li>
              ))}
            </ul>

            <ul>
              <li className="title">{t("footer.col2.title")}</li>
              {t("footer.col2.links", { returnObjects: true }).map((link, i) => (
                <li key={i}>{link}</li>
              ))}
            </ul>

            <ul>
              <li className="title">{t("footer.col3.title")}</li>
              {t("footer.col3.links", { returnObjects: true }).map((link, i) => (
                <li key={i}>{link}</li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}