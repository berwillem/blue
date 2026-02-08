// @ts-nocheck
import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { personalCapacityTest } from "../../data/personalCapacity.config";
import { metabolicHealthTest } from "../../data/metabolicHealth.config";
import { useTestResultsStore } from "../../store/useTestResultsStore";

import "./MultiStepTest.css";

const TESTS_MAP = {
  "personal-capacity": personalCapacityTest,
  "metabolic-health": metabolicHealthTest,
};

const questionsPerStep = 5;

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
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  const testId = pathname.split("/").pop();
  const testConfig = TESTS_MAP[testId];
  const { saveResults } = useTestResultsStore();

  if (!testConfig) return <p>Test not found</p>;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const allowSkip = testId === "metabolic-health";

  const allQuestions = useMemo(() => {
    const flat = testConfig.steps.flatMap((step) =>
      step.questions.map((q) => ({
        ...q,
        category: step.title,
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

  // --- VALIDATION ---
  const isStepComplete = () =>
    step.questions.every((q) => answers[q.id] !== undefined);

  const handleNext = () => {
    if (!isStepComplete()) {
      toast.error(t("test.please_answer_all"), {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    setCurrentStep((s) => s + 1);
    window.scrollTo(0, 0);
  };

  const handleFinish = () => {
    const allQuestionsFlat = testConfig.steps.flatMap((step) => step.questions);

    const skippedCount = allQuestionsFlat.filter(
      (q) => answers[q.id] === null,
    ).length;
    const answeredCount = allQuestionsFlat.filter(
      (q) => typeof answers[q.id] === "number",
    ).length;
    const totalQuestions = allQuestionsFlat.length;

    const newResult = {
      testId,
      answers,
      meta: {
        skippedCount,
        answeredCount,
        totalQuestions,
      },
      completedAt: Date.now(),
    };

    console.log("DEBUG SAVE META ->", newResult.meta);
    console.log("Current answers ->", answers);

    // Save results to Zustand
    saveResults(testId, newResult);

    console.log("STORE AFTER SAVE ->", newResult);

    navigate("/results", { state: { testId } });
  };

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div className="test-container">
      <ToastContainer />

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
              <span>{index + 1 + currentStep * questionsPerStep}. </span>
              {q.text[lang]}
            </p>

            <div className="answers-row">
              {/* --- Metabolic test uses 0–4, Personal uses 1–5 --- */}
              {(testId === "metabolic-health"
                ? [0, 1, 2, 3, 4]
                : [1, 2, 3, 4, 5]
              ).map((value) => (
                <button
                  key={value}
                  className={`answer-btn ${answers[q.id] === value ? "active" : ""}`}
                  onClick={() => handleAnswer(q.id, value)}
                >
                  {value}
                </button>
              ))}

              {allowSkip && (
                <button
                  className={`answer-btn skip-btn ${answers[q.id] === null ? "active" : ""}`}
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
          <button className="nav-btn" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="nav-btn primary" onClick={handleFinish}>
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
