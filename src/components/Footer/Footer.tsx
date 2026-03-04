// @ts-nocheck
import { useEffect, useRef } from "react";
import "./Footer.css";
import ocean from "../../assets/videos/ocean.mp4";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserTypeStore } from "../../store/useUserTypeStore";

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const userType = useUserTypeStore((state) => state.userType);

  // LOGIQUE DE SCROLL (Compatible Desktop "section-0" et Mobile wrapper)
  const handleScrollLink = (e, path, targetId) => {
    // Si on n'est pas sur la bonne page, on laisse le <Link> naviguer normalement
    if (location.pathname !== path) {
      return;
    }

    // Si on est déjà sur la page, on force le scroll manuel
    e.preventDefault();

    // On cherche l'ID (section-0) ou le wrapper mobile si l'ID spécifique n'est pas trouvé
    let targetElement = document.getElementById(targetId);
    
    if (!targetElement) {
      // Fallback mobile : on cherche le premier wrapper de contenu
      targetElement = document.querySelector('.content-scroll-wrapper');
    }

    if (targetElement) {
      const offset = 80; // Hauteur de ta navbar
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });

      // Mettre à jour l'URL avec l'ancre
      navigate(`${path}#${targetId}`, { replace: true });
    }
  };

  // MAPPING DES LIENS PAR TEXTE (IF/ELSE)
// MAPPING DES LIENS PAR TEXTE (Modifié pour ignorer le userType global)
// MAPPING DES LIENS PAR COLONNE (Ignore le userType global)
  const getLinkData = (linkText, col) => {
    const text = linkText.toLowerCase().trim();
    
    // On définit le chemin de base selon la colonne (1: Indiv, 2: Corpo)
    const basePath = col === 1 ? "/individuals" : "/corporates";

    // 1. Accueil / Home
    if (text === "home page" || text === "accueil") {
      return { path: basePath };
    }

    // 2. What we do (On force le scroll sur la page de la colonne correspondante)
    if (text === "what we do" || text === "ce que nous faisons") {
      return { 
        path: `${basePath}#section-0`, 
        isScroll: true, 
        basePath: basePath, 
        target: "section-0" 
      };
    }

    // 3. Tests (Destinations fixes)
    if (text === "start personal capacity test" || text === "test de capacité personnelle") {
      return { path: "/disclaimer/personal-capacity" };
    }
    if (text === "start metabolic health test" || text === "test de santé métabolique") {
      return { path: "/disclaimer/metabolic-health" };
    }

    // 4. Contact (Individuels vs B2B selon la colonne)
    if (text === "contact us" || text === "contactez-nous") {
      return { path: col === 1 ? "/contact" : "/contactb2b" };
    }

    // 5. Partenariat (Colonne 3)
    if (text === "become a partner" || text === "devenir partenaire") {
      return { path: "/partnerform" };
    }

    return { path: "/" }; 
  };

  // ANIMATION GSAP PARALLAXE
  useEffect(() => {
    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
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
      {t(`footer.col${col}.links`, { returnObjects: true }).map((link, i) => {
        
        // ON PASSE 'col' ICI
        const linkData = getLinkData(link, col); 

        return (
          <li key={i} className="link-item">
            <Link 
              to={linkData.path}
              onClick={(e) => {
                if (linkData.isScroll) {
                  handleScrollLink(e, linkData.basePath, linkData.target);
                }
              }}
            >
              {link}
            </Link>
          </li>
        );
      })}
    </ul>
  ))}
</div>
        </div>
      </footer>
    </div>
  );
}