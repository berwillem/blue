// @ts-nocheck
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTestResultsStore } from "../../store/useTestResultsStore";
import "./Results.css";

export default function Results() {
  const navigate = useNavigate();
  const { testResults } = useTestResultsStore();

  const hasResults = testResults && Object.keys(testResults).length > 0;

  // useEffect(() => {
  //   if (!hasResults) {
  //     const timer = setTimeout(() => {
  //       navigate("/");
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [hasResults, navigate]);

  // if (!hasResults) {
  //   return (
  //     <div className="results-container">
  //       <h1>There is no test result</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="results-container">
      <h1>
        Our approach blends strategic clarity with human depth, guiding you
        through a journey of transformation built on self-discipline, inner
        strength, and optimal metabolic health
      </h1>
    </div>
  );
}
