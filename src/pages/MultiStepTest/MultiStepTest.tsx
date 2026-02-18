// @ts-nocheck
import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

import { personalCapacityTest } from "../../data/personalCapacity.config";
import { metabolicHealthTest } from "../../data/metabolicHealth.config";
import { useTestResultsStore } from "../../store/useTestResultsStore";
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

  // ÉTATS
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [highlightErrors, setHighlightErrors] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false); // État Modale

  if (!testConfig) return <p>Test not found</p>;

  const allowSkip = testId === "metabolic-health";

  const allQuestions = useMemo(() => {
    const flat = testConfig.steps.flatMap((step) =>
      step.questions.map((q) => ({
        ...q,
        category: step.title,
      }))
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
    const skippedCount = allQuestionsFlat.filter((q) => answers[q.id] === null).length;
    const answeredCount = allQuestionsFlat.filter((q) => typeof answers[q.id] === "number").length;
    const totalQuestions = allQuestionsFlat.length;

    const newResult = {
      testId,
      answers,
      meta: { skippedCount, answeredCount, totalQuestions },
      completedAt: Date.now(),
    };

    saveResults(testId, newResult);
    navigate("/results", { state: { testId } });
  };

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const confirmCancelAction = () => {
    const targetPath = userType === "individuals" ? "/individuals" : "/corporates";
    navigate(targetPath);
  };

  return (
    <div className="test-container">
      <ToastContainer />

      {/* MODALE DE CONFIRMATION */}
      <AnimatePresence>
        {showConfirmCancel && (
          <div className="modal-overlay">
            <motion.div
              className="confirm-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h3>{lang === "fr" ? "Abandonner le test ?" : "Quit the test?"}</h3>
              <p>
                {lang === "fr"
                  ? "Votre progression actuelle sera perdue."
                  : "Your current progress will be lost."}
              </p>
              <div className="modal-buttons">
                <button className="nav-btn" onClick={() => setShowConfirmCancel(false)}>
                  {lang === "fr" ? "Continuer" : "Resume"}
                </button>
                <button className="nav-btn danger" onClick={confirmCancelAction}>
                  {lang === "fr" ? "Quitter" : "Quit"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                className={`question-block ${isMissing ? "error-highlight" : ""}`}
                style={isMissing ? { borderLeft: "4px solid #ff4d4d", paddingLeft: "15px" } : {}}
              >
                <p className="question-text" style={isMissing ? { color: "#ff4d4d" } : {}}>
                  <span>{index + 1 + currentStep * questionsPerStep}. </span>
                  {q.text[lang]}
                </p>

                <div className="answers-row">
                  <span className="sa">{lang === "fr" ? "Pas d'accord" : "Disagree"}</span>
                  {(testId === "metabolic-health" ? [0, 1, 2, 3, 4] : [1, 2, 3, 4, 5]).map(
                    (value) => (
                      <button
                        key={value}
                        className={`answer-btn ${answers[q.id] === value ? "active" : ""}`}
                        onClick={() => handleAnswer(q.id, value)}
                      >
                        {value}
                      </button>
                    )
                  )}
                  <span className="sa">{lang === "fr" ? "Tout à fait d'accord" : "Agree"}</span>
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
            );
          })}
        </motion.div>
      </AnimatePresence>

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