// @ts-nocheck
import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

  const testType = testId === "personal-capacity" ? "personal" : "metabolic";

  /* 🔥 Track test start once */
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

  /* ---------------- State ---------------- */

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [highlightErrors, setHighlightErrors] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const allowSkip = testId === "metabolic-health";

  /* ---------------- Questions Shuffle ---------------- */

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

  /* 🔥 Category Score Calculation */

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

  /* ---------------- Navigation ---------------- */

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

    // 🔥 Track passed
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

  const confirmCancelAction = () => {
    const targetPath =
      userType === "individuals" ? "/individuals" : "/corporates";
    navigate(targetPath);
  };

  return (
    <div className="test-container">
      <ToastContainer />

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showConfirmCancel && (
          <div className="modal-overlay">
            <motion.div
              className="confirm-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h3>
                {lang === "fr" ? "Abandonner le test ?" : "Quit the test?"}
              </h3>
              <p>
                {lang === "fr"
                  ? "Votre progression actuelle sera perdue."
                  : "Your current progress will be lost."}
              </p>
              <div className="modal-buttons">
                <button
                  className="nav-btn"
                  onClick={() => setShowConfirmCancel(false)}
                >
                  {lang === "fr" ? "Continuer" : "Resume"}
                </button>
                <button
                  className="nav-btn danger"
                  onClick={confirmCancelAction}
                >
                  {lang === "fr" ? "Quitter" : "Quit"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="navigation">
        <button className="nav-btn" onClick={() => setShowConfirmCancel(true)}>
          {lang === "fr" ? "Annuler" : "Cancel"}
        </button>

        {currentStep > 0 && (
          <button
            className="nav-btn"
            onClick={() => {
              setHighlightErrors(false);
              setCurrentStep((s) => s - 1);
            }}
          >
            {lang === "fr" ? "Précédent" : "Previous"}
          </button>
        )}

        {currentStep < steps.length - 1 ? (
          <button className="nav-btn" onClick={handleNext}>
            {lang === "fr" ? "Suivant" : "Next"}
          </button>
        ) : (
          <button className="nav-btn primary" onClick={handleFinish}>
            {lang === "fr" ? "Terminer" : "Finish"}
          </button>
        )}
      </div>
    </div>
  );
}
