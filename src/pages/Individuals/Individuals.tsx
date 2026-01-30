import "./Individuals.css";
import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Why from "../../components/Why/Why";
import Last from "../../components/Last/Last";
import Content from "../../components/Content/Content";

export default function Individuals() {
  return (
    <div className="individuals-container">
      <Navbar></Navbar>
      {/* <Intro></Intro> */}
      {/* <Why></Why> */}
      {/* <Content></Content>
      <Content></Content>
      <Content></Content> */}
      <Last></Last>
    </div>
  );
}
