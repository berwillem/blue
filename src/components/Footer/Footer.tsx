// @ts-nocheck
import { useEffect, useRef } from "react";
import "./Footer.css";
import ocean from "../../assets/videos/ocean.mp4";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useUserTypeStore } from "../../store/useUserTypeStore";

export default function Footer() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Animation de parallaxe : la vidéo monte pendant le scroll
        // Fonctionne sur desktop et tablette (largeur > 768px)
        gsap.fromTo(videoRef.current, 
          { yPercent: 30 }, 
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom", 
              end: "bottom bottom",
              scrub: 1
            }
          }
        );
      });
    };

    initGSAP();
    return () => ctx && ctx.revert();
  }, []);

  const userType = useUserTypeStore((state) => state.userType);
  const contactPath = userType === "individuals" ? "/contact" : "/contactb2b";

  return (
    <div className="footer-main-container" ref={containerRef}>
      <div className="footer-video-mask">
        <video 
          ref={videoRef}
          src={ocean} 
          autoPlay muted loop playsInline 
          className="footer-bg-video"
        />
        <div className="footer-overlay" />
      </div>

      <footer className="footer-content-wrapper">
        <div className="footer-content">
          <div className="up">
            <div className="left">
              <h2>Blu., the New Elite Code</h2>
            </div>
            <div className="right">
              <Link to={contactPath} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <button className="cta-button">
                  <span className="dot" />
                  <span>{t("footer.cta")}</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="down">
            {[1, 2, 3].map((col) => (
              <ul key={col} className="footer-column">
                <li className="title">{t(`footer.col${col}.title`)}</li>
                {t(`footer.col${col}.links`, { returnObjects: true }).map((link, i) => (
                  <li key={i} className="link-item">{link}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}