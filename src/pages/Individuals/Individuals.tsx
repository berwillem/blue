// @ts-nocheck
import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Content from "../../components/Content/Content";
import Last from "../../components/Last/Last";
import Footer from "../../components/Footer/Footer";
import "./Individuals.css";
import placeholder1 from "../../assets/images/redacontent1.jpg";
import placeholder2 from "../../assets/images/redcontent2.jpg";
import placeholder3 from "../../assets/images/redacontent3.jpg";
export default function Individuals() {
  const links = [
    { name: "home", path: "/individuals" },
    { name: "about", path: "/about" },
    { name: "services", path: "#" },
    { name: "joinus", path: "/joinus" },
  ];
  const DATA = [
    {
      id: 1,
      title: "Metabolic Method",
      leftText:
        "Executive metabolic method for high performers and achievers. Performance, discipline and purpose.",
      rightDesc:
        "Sustainable excellence begins with metabolism - through a profound balance.",
      rightDesc2:
        "Sustainable excellence begins with - through a profound balance of metabolism, mindset, and overall well being. Sustainable excellence begins with",
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
    <div className="mainWrapper">
      <div className="navbar-anim">
        <Navbar links={links} />
      </div>
      <Intro />
      <div className="snap-group-container">
        <div className="snap-panel">
          <Content DATA={DATA} />
        </div>
        <div className="snap-panel">
          <Content DATA={DATA} />
        </div>
        <div className="snap-panel">
          <Content DATA={DATA} />
        </div>
      </div>
      <div>
        <Last />
      </div>
      <Footer />
    </div>
  );
}
