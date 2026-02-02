import "./Corporates.css";
import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Why from "../../components/Why/Why";
import Last from "../../components/Last/Last";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import IntroCorp from "../../components/IntroCorp/IntroCorp";

export default function Corporates() {
  return (
    <div className="corporates-container">
      {/* <Navbar /> */}
      <div className="scroll-container">
        <section className="snap-section video1">
          {" "}
          <IntroCorp></IntroCorp>
        </section>
        <section className="snap-section video2">
          {" "}
          <Why />
        </section>

        <section className="normal-section">
          <Content />
          <Content />
          <Content />
          <Last />

          <Footer />
        </section>
      </div>
    </div>
  );
}
