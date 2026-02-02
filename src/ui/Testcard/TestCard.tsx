import "./TestCard.css";
import { Link } from "react-router-dom";
export default function TestCard({
  link,
  img,
}: {
  link: string;
  img?: string;
}) {
  return (
    <div className="testCard-container">
      <img src={img} alt="" />
      <h1>Personal Capacity Assessment</h1>
      <p>Measures your energy, focus, and daily performance.</p>
      <Link to={`/tests/${link}`} className="start-test-btn">
        Start the test
      </Link>
    </div>
  );
}
