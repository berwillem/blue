import placeholder from "../../assets/images/redaplaceholder.png";
import Button from "../../ui/button/Button";
import "./Content.css";
import { ArrowRight } from "lucide-react";
export default function Content() {
  return (
    <div className="content-container">
      <div className="mobile">
        <img src={placeholder} alt="Placeholder" />
        <h4>Why we do what we do?</h4>
        <p>
          Executive metabolic method for high performers and achievers.
          Performance, discipline and purpose - the new elite code.
        </p>
        <p>
          Sustainable excellence begins with - through a profound balance of
          metabolism, mindset, and overall well being.
        </p>
        <p className="know-more">
          know more <ArrowRight size={15} />
        </p>
        <div className="button-container">
          <Button text="Start a metabolic test" width="auto" />
        </div>
      </div>
      <div className="big-size">
        <div className="left">
          <h4>Why we do what we do?</h4>
          <p>
            Executive metabolic method for high performers and achievers.
            Performance, discipline and purpose - the new elite code.
          </p>
          <div className="button-container">
            <Button text="Start a metabolic test" width="auto" />
          </div>
        </div>
        <div className="right">

          <p>
            Sustainable excellence begins with - through a profound balance of
            metabolism, mindset, and overall well being.
          </p>
          <img src={placeholder} alt="Placeholder" />
          <p className="know-more">
            know more <ArrowRight size={15} />
          </p>
        </div>


      </div>
    </div>
  );
}
