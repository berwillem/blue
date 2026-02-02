// @ts-nocheck
import { useState } from "react";
import { personalCapacityTest } from "../../data/personalCapacity.config";
import { metabolicHealthTest } from "../../data/metabolicHealth.config";
import { useLocation } from "react-router-dom";
import "./MultiStepTest.css";

const TESTS_MAP = {
  "personal-capacity": personalCapacityTest,
  "metabolic-health": metabolicHealthTest,
};

export default function MultiStepTest() {
  const { pathname } = useLocation();
  const testId = pathname.split("/").pop();
  const testConfig = TESTS_MAP[testId];

  if (!testConfig) return <p>Test not found</p>;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const step = testConfig.steps[currentStep];

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div className="test-container">
      <div className="steps-progress">
        {testConfig.steps.map((_, index) => (
          <div
            key={index}
            className={`step-bar ${index <= currentStep ? "active" : ""}`}
          />
        ))}
      </div>
      <div className="test-content">
        {step.questions.map((q, index) => (
          <div key={q.id} className="question-block">
            <p className="question-text">
              <span>{index + 1}. </span>
              {q.text}
            </p>
            <div className="answers-row">
              {[0, 1, 2, 3, 4].map((value) => (
                <button
                  key={value}
                  className={`answer-btn ${answers[q.id] === value ? "active" : ""}`}
                  onClick={() => handleAnswer(q.id, value)}
                >
                  {value}
                </button>
              ))}
              <button
                className={`answer-btn skip-btn ${answers[q.id] === null ? "active" : ""}`}
                onClick={() => handleAnswer(q.id, null)}
              >
                Skip
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="navigation">
        {currentStep > 0 && (
          <button
            className="nav-btn"
            onClick={() => setCurrentStep((s) => s - 1)}
          >
            Previous
          </button>
        )}

        {currentStep < testConfig.steps.length - 1 ? (
          <button
            className="nav-btn"
            onClick={() => setCurrentStep((s) => s + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="nav-btn primary"
            onClick={() => console.log("FINAL ANSWERS:", answers)}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
