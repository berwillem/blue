// @ts-nocheck
import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

import { personalCapacityTest } from "../../data/personalCapacity.config";
import { metabolicHealthTest } from "../../data/metabolicHealth.config";
import { useTestResultsStore } from "../../store/useTestResultsStore";
import { recordTest } from "../../services/statsService";
import { useUserTypeStore } from "../../store/useUserTypeStore";

import "./MultistepTest.css";

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
  const userType = useUserTypeStore((state) => state.userType);

  if (!testConfig) return <p>Test not found</p>;

  /* ============================= */
  /* 🔥 TEST TYPE FOR BACKEND */
  /* ============================= */

  const testType = testId === "personal-capacity" ? "personal" : "metabolic";

  /* ============================= */
  /* 🔥 TRACK START ONLY ONCE */
  /* ============================= */

  const hasStartedTracked = useRef(false);

  useEffect(() => {
    if (!hasStartedTracked.current) {
      recordTest({
        testType,
        status: "started",
      }).catch((err) => console.error("Start tracking failed:", err));

      hasStartedTracked.current = true;
    }
  }, [testType]);

  /* ============================= */

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [highlightErrors, setHighlightErrors] = useState(false);

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

  const isStepComplete = () =>
    step.questions.every((q) => answers[q.id] !== undefined);

  /* ============================= */
  /* 🔥 CATEGORY CALCULATION */
  /* ============================= */

  const calculateCategoryScores = (answers) => {
    const scores = {};

    testConfig.steps.forEach((step) => {
      let total = 0;
      let count = 0;

      step.questions.forEach((q) => {
        const value = answers[q.id];
        if (typeof value === "number") {
          total += value;
          count++;
        }
      });

      if (count > 0) {
        scores[step.title] = total / count;
      }
    });

    return scores;
  };

  /* ============================= */

  const handleNext = () => {
    if (!isStepComplete()) {
      setHighlightErrors(true);
      toast.error(t("test.please_answer_all"), {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    setHighlightErrors(false);
    setCurrentStep((s) => s + 1);
    window.scrollTo(0, 0);
  };

  /* ============================= */
  /* 🔥 FINISH + TRACK PASSED */
  /* ============================= */

  const handleFinish = () => {
    if (!isStepComplete()) {
      setHighlightErrors(true);
      return;
    }

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
      meta: { skippedCount, answeredCount, totalQuestions },
      completedAt: Date.now(),
    };

    saveResults(testId, newResult);

    // 🔥 Send "passed" event (non-blocking)
    recordTest({
      testType,
      status: "passed",
      categories:
        testType === "personal" ? calculateCategoryScores(answers) : undefined,
    }).catch((err) => console.error("Pass tracking failed:", err));

    navigate("/results", { state: { testId } });
  };

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
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

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="test-content"
        >
          {step.questions.map((q, index) => {
            const isMissing = highlightErrors && answers[q.id] === undefined;

            return (
              <div
                key={q.id}
                className={`question-block ${
                  isMissing ? "error-highlight" : ""
                }`}
              >
                <p
                  className="question-text"
                  style={isMissing ? { color: "#ff4d4d" } : {}}
                >
                  <span>{index + 1 + currentStep * questionsPerStep}. </span>
                  {q.text[lang]}
                </p>

                <div className="answers-row">
                  <span className="sa">Strongly disagree</span>

                  {(testId === "metabolic-health"
                    ? [0, 1, 2, 3, 4]
                    : [1, 2, 3, 4, 5]
                  ).map((value) => (
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

                  <span className="sa">Strongly agree</span>

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
            );
          })}
        </motion.div>
      </AnimatePresence>

      <div className="navigation">
        {currentStep > 0 && (
          <button
            className="nav-btn"
            onClick={() => {
              setHighlightErrors(false);
              setCurrentStep((s) => s - 1);
            }}
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

        <Link to={userType == "individuals" ? "/individuals" : "/corporates"}>
          <button className="nav-btn">
            {lang === "fr" ? "Annuler" : "Cancel"}
          </button>
        </Link>
      </div>
    </div>
  );
}
