import { Link } from "react-router";
import Button from "../../ui/button/Button";
import "./NotFound.css";
export default function NotFound() {
  return (
    <div className="NotFound">
      404 Not Found
      <Link to="/"><Button text="Go to Home" width="150px"></Button></Link>
    </div>
  )
}