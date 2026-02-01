import TestCard from "../../ui/Testcard/TestCard";
import "./Last.css";
import psyimg from "../../assets/images/testpsy.jpg";
export default function Last() {
  return (
    <div className="last-container">
      <div className="texts">
        <h1>Discover Your Starting Point</h1>
        <p>
          Take a few minutes to explore either your personal capacity or your
          metabolic balance — and gain immediate personal insight.
        </p>
      </div>
      <div className="cards">
        <TestCard link="personal-capacity" img={psyimg}></TestCard>
        <TestCard link="metabolic-health" img={psyimg}></TestCard>
      </div>
    </div>
  );
}
