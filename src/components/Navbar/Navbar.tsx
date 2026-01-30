import "./Navbar.css";
import logo1 from "../../assets/images/logo1.png";
import { Menu } from "lucide-react";
import { Link } from "react-router";
export default function Navbar() {
  return (
    <nav>
      <img src={logo1} alt="logo" />
      <Menu color="black" className="menu" />
      <ul>
        <Link to="#">
          <li>Home</li>
        </Link>
        <Link to="#">
          <li>About the founder</li>
        </Link>
        <Link to="#">
          <li>Why</li>
        </Link>
        <Link to="#">
          <li>Services</li>
        </Link>
      </ul>
      <div className="nav-infos">
        <div className="languages">
          <span>EN</span>
          <span>FR</span>
        </div>
        <button>Book a call</button>
      </div>
    </nav>
  );
}
