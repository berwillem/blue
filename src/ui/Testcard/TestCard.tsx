import "./TestCard.css";
import placeholder from "../../assets/images/redaplaceholder.png";
import { Link } from "react-router";
export default function TestCard() {
  return (
    <div className="testCard-container">
      <img src={placeholder} alt="" />
      <h1>Personal Capacity Assessment</h1>
      <p>Measures your energy, focus, and daily performance.</p>
      <Link to="#" className="start-test-btn">
        Start the test
      </Link>
    </div>
  );
}
