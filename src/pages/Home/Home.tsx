import { Link } from "react-router";
import { useUserTypeStore } from "../../store/useUserTypeStore";
import "./Home.css";
import logo from "../../assets/images/logo1.png";

export default function Home() {
  const setUserType = useUserTypeStore((state) => state.setUserType);

  return (
    <div className="home-container">
      <Link to="/individuals" onClick={() => setUserType("individuals")}>
        <div className="individuals">
          <h1>Individuals</h1>
          <p>Coaching and mentoring</p>
        </div>
      </Link>

      <Link to="/corporates" onClick={() => setUserType("corporates")}>
        <div className="corporates">
          <h1>Corporates</h1>
          <p>Consulting and advice</p>
        </div>
      </Link>

      <img src={logo} alt="Logo" className="home-logo" />
    </div>
  );
}
