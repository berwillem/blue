// @ts-nocheck
import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { personalCapacityTest } from "../../data/personalCapacity.config";
import { metabolicHealthTest } from "../../data/metabolicHealth.config";
import "./MultiStepTest.css";
import { useTestResultsStore } from "../../store/useTestResultsStore";

const TESTS_MAP = {
  "personal-capacity": personalCapacityTest,
  "metabolic-health": metabolicHealthTest,
};

const questionsPerStep = 5;

// Fisher-Yates shuffle
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function MultiStepTest() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  const testId = pathname.split("/").pop();
  const testConfig = TESTS_MAP[testId];

  const { saveResults } = useTestResultsStore();

  if (!testConfig) return <p>Test not found</p>;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  // Only metabolic test allows skip
  const allowSkip = testId === "metabolic-health";

  const allQuestions = useMemo(() => {
    const flat = testConfig.steps.flatMap((s) =>
      s.questions.map((q) => ({
        ...q,
        category: s.title, // keep category stable
      })),
    );
    return shuffleArray(flat);
  }, [testConfig.steps]);

  const steps = useMemo(() => {
    const result = [];
    for (let i = 0; i < allQuestions.length; i += questionsPerStep) {
      result.push({
        step: i / questionsPerStep + 1,
        questions: allQuestions.slice(i, i + questionsPerStep),
      });
    }
    return result;
  }, [allQuestions]);

  const step = steps[currentStep];

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const categoryScores = useMemo(() => {
    const scores = {};
    allQuestions.forEach((q) => {
      if (!scores[q.category]) scores[q.category] = 0;
      const val = answers[q.id];
      if (typeof val === "number") scores[q.category] += val;
    });
    return scores;
  }, [answers, allQuestions]);

  const handleFinish = () => {
    saveResults(testId, {
      answers,
      categoryScores,
    });
  };

  return (
    <div className="test-container">
      <div className="steps-progress">
        {steps.map((_, index) => (
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
              {q.text[lang]}
            </p>

            <div className="answers-row">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`answer-btn ${
                    answers[q.id] === value ? "active" : ""
                  }`}
                  onClick={() => handleAnswer(q.id, value)}
                >
                  {value}
                </button>
              ))}

              {allowSkip && (
                <button
                  className={`answer-btn skip-btn ${
                    answers[q.id] === null ? "active" : ""
                  }`}
                  onClick={() => handleAnswer(q.id, null)}
                >
                  Skip
                </button>
              )}
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

        {currentStep < steps.length - 1 ? (
          <button
            className="nav-btn"
            onClick={() => setCurrentStep((s) => s + 1)}
          >
            Next
          </button>
        ) : (
          <Link to="/results">
            <button className="nav-btn primary" onClick={handleFinish}>
              Finish
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
