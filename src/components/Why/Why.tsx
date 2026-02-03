import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Why.css";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);


export default function Why() {
  const sectionRef = useRef(null);
    const { t, i18n } = useTranslation();

useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text logic
      const paragraphs = sectionRef.current.querySelectorAll(".longText p");
      paragraphs.forEach((p) => {
        const words = p.innerText.split(" ");
        p.innerHTML = words.map(w => `<span class="revealWord">${w} </span>`).join("");
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", 
          end: "+=150%", 
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      })
      .to(".revealWord", { opacity: 1, stagger: 0.1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={sectionRef} className="philosophy-section">
      <div className="why-content-container">
          <span className="smallTitle">{t("individuals.why")}</span>
          <div className="longText">
            <p>{t("individuals.whyp1")}</p>
            <p>{t("individuals.whyp2")}</p>
            <p>{t("individuals.whyp3")}</p>
          </div>
      </div>
    </section>
  );
}