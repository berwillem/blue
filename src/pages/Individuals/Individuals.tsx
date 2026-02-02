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
 <div className={'mainWrapper'}>
      <div className="navbar-anim">
       <Navbar links={links} />
      </div>

      {/* 1. L'INTRO (Hero avec Zoom image) */}
      <Intro  />

 
      {/* 3. LE RESTE (Split Sections) */}
      <section className={"restSections"}>
        <Content />
        <Content />
        <Content />
        <Last/>
      </section>
      <Footer/>
    </div>
  );
}
