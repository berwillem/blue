import { useState, useEffect } from "react";
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
