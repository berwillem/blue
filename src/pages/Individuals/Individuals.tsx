import "./Individuals.css";
import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Why from "../../components/Why/Why";
import Last from "../../components/Last/Last";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";

export default function Individuals() {
  return (
    <div className="individuals-container">
      <Navbar />
      <div className="scroll-container">
        {/* SECTION 1: INTRO */}
        <section className="snap-section video1">
          <Intro />
        </section>

        {/* SECTION 2: WHY (L'animation de texte va bloquer ici car Why fait 300vh) */}
        <section className="snap-section video2">
          <Why />
        </section>

        {/* SECTION 3: CONTENT (L'effet TikTok des 3 images se passe ici) */}
        <section className="snap-section">
          <Content />
        </section>
        <section className="snap-section video3">
          <Content />
        </section>
        <section className="snap-section video4">
          <Content />
        </section>

        {/* SECTION 4: LAST & FOOTER */}
        <section className="normal-section">
          <Last />
          <Footer />
        </section>
      </div>
    </div>
  );
}
