

import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Content from "../../components/Content/Content";
import Last from "../../components/Last/Last";
import Footer from "../../components/Footer/Footer";
import "./Individuals.css";



export default function Individuals() {




  const links = [
    { name: "home", path: "/individuals" },
    { name: "about", path: "/about" },
    { name: "why_us", path: "#" },
    { name: "services", path: "#" }
  ];

  return (
    <div className="mainWrapper">
      <div className="navbar-anim">
        <Navbar  links={links}/>
      </div>

      <Intro />

      <div className="snap-group-container">
        <div className="snap-panel"><Content /></div>
        <div className="snap-panel"><Content /></div>
        <div className="snap-panel"><Content /></div>
   
      </div>
     <div ><Last /></div>
      <Footer />
    </div>
  );
}