import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Why.css";

gsap.registerPlugin(ScrollTrigger);


export default function Why() {
  const sectionRef = useRef(null);

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
        <span className="smallTitle">[ PHILOSOPHY ]</span>
        <div className="longText">
               <p>
            Avec plus de 21 ans d’expérience dans des environnements exigeants
            — dont 15 années à des postes de responsabilités — Redha a
            longtemps évolué à haut niveau tout en faisant face à des
            difficultés personnelles bien réelles.
          </p>
          <p>
            En parcourant son propre chemin de transformation, il a
            progressivement retrouvé une énergie durable, une clarté d’esprit
            profonde et une discipline plus stable et alignée.
          </p>
          <p>
            Aujourd’hui, il met cette expérience vécue au service des personnes 
            qui souhaitent se reconnecter à elles-mêmes.
          </p>
        </div>
      </div>
    </section>
  );
}