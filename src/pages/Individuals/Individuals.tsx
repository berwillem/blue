import "./Individuals.css";
import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Why from "../../components/Why/Why";
import Last from "../../components/Last/Last";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";

export default function Individuals() {
    const links=[  {
      name:"home",
      path:"/"
    },
    {
      name:"about",
      path:"/about"
    },
    {
      name:"why_us",
      path:"#"
    },
    {
      name:"services",
      path:"#"
    }
  ]


  return (
    <div className="individuals-container">
      <Navbar links={links} />
<div className="scroll-container">
  <section className="snap-section video1">   <Intro /></section>
  <section className="snap-section video2">  <Why /></section>
  
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
