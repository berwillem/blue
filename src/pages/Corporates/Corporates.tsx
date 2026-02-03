import "./Corporates.css";
import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Why from "../../components/Why/Why";

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
          {/* <Content />
          <Content />
          <Content /> */}
          <Modus></Modus>
          <Footer />
        </section>
      </div>
    </div>
  );
}
