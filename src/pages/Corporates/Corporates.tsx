import "./Corporates.css";
import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Why from "../../components/Why/Why";
import placeholder1 from "../../assets/images/redacontent1.jpg";
import placeholder2 from "../../assets/images/redcontent2.jpg";
import placeholder3 from "../../assets/images/redacontent3.jpg";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import IntroCorp from "../../components/IntroCorp/IntroCorp";
import Modus from "../../components/Modus/Modus";

export default function Corporates() {
const links = [
  { name: "home", path: "/individuals" },
  { name: "about", path: "/about" },
  { name: "services", path: "#" },
  { name: "joinus", path: "/joinus" },
  { name: "privacy", path: "/privacy.pdf", isExternal: true }, // Ajout ici
];
const DATA = [
  {
    id: 1,
    title: "Metabolic Method",
    leftText:
      "Executive metabolic method for high performers and achievers. Performance, discipline and purpose.",
    rightDesc:
      "Sustainable excellence begins within — through a profound balance of metabolism, mindset, and overall well-being. This understanding led us to dedicate our work to mentoring individuals who seek not just success, but alignment between body, mind, and purpose. ",
    rightDesc2:
      "We never disclose personal details, and your information is used only to support your wellness journey. You can trust us to protect your personal life with the utmost care and discretion. We take the protection of your personal data seriously. Any information you choose to share with us is handled with care, discretion, and confidentiality, and processed only for legitimate, clearly defined purposes related to our professional services. We do not disclose personal data to third parties without a valid legal basis, and we apply appropriate technical and organizational measures to safeguard your information against unauthorized access, misuse, or disclosure. Your personal data is processed in accordance with European Union data protection regulations (GDPR) and applicable confidentiality obligations. You may exercise your data protection rights at any time, in line with applicable law.",
    img: placeholder1,
  },
  {
    id: 2,
    title: "Precision Nutrition",
    leftText:
      "Tailored protocols to optimize your energy levels and cognitive clarity throughout the day.",
    rightDesc:
      "Optimize your brain and body with precision-based nutritional protocols.",
    rightDesc2:
      "Sustainable excellence begins with - through a profound balance of metabolism, mindset, and overall well being. Sustainable excellence begins with",
    img: placeholder2,
  },
  {
    id: 3,
    title: "Resilient Health",
    leftText:
      "A transformative journey designed for those who refuse to settle for average health.",
    rightDesc:
      "Long-term health is not an accident; it's a deliberate executive strategy.",
    rightDesc2:
      "Sustainable excellence begins with - through a profound balance of metabolism, mindset, and overall well being. Sustainable excellence begins with",
    img: placeholder3,
  },
];
  return (
    <div className="corporates-container">
      <Navbar links={links} />
      <IntroCorp></IntroCorp>

      <div className="scroll-container">
        <section className="snap-section video1"> </section>
        <section className="snap-section video2">
          {" "}
          <Why />
        </section>
        <section className="normal-section">
           <div className="snap-group-container">
             <div className="snap-panel"><Content DATA={DATA}/></div>
             <div className="snap-panel"><Content DATA={DATA}/></div>
             <div className="snap-panel"><Content DATA={DATA}/></div>
        
           </div>
          <Modus></Modus>
          <Footer />
        </section>
      </div>
    </div>
  );
}
