// @ts-nocheck
import { useEffect, useRef, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

import "./Results.css";
import Button from "../../ui/button/Button";
import { useTestResultsStore } from "../../store/useTestResultsStore";
import { personalCapacityTest } from "../../data/personalCapacity.config";
import { metabolicHealthTest } from "../../data/metabolicHealth.config";
import { personalResultsConfig } from "../../data/personalResults.config";
import { metabolicResultsConfig } from "../../data/metabolicResults.config";

// ---------------- SCORING HELPERS ----------------

// Personal test scoring (1-5, skipped ignored)
const computePersonalScores = (testConfig, storedResult) => {
  const { answers } = storedResult;
  const categoryScores = {};

  testConfig.steps.forEach((step) =>
    step.questions.forEach((q) => {
      const value = answers[q.id];
      if (typeof value !== "number") return; // skip

      if (!categoryScores[step.title])
        categoryScores[step.title] = { score: 0, max: 0 };

      categoryScores[step.title].score += value;
      categoryScores[step.title].max += 5;
    }),
  );

  return categoryScores;
};

// Metabolic test scoring (0-4, skipped ignored, scale 0-100%)
const computeMetabolicScore = (testConfig, storedResult) => {
  const { answers } = storedResult;

  const answeredValues = testConfig.steps
    .flatMap((step) =>
      step.questions.map((q) => {
        const val = answers[q.id];
        return typeof val === "number" ? val : null;
      }),
    )
    .filter((v) => v !== null);

  if (answeredValues.length < 5) return { tooFewAnswers: true };

  const rawScore = answeredValues.reduce((acc, val) => acc + val, 0);
  const maxScore = answeredValues.length * 4; // 0-4 scale
  const percentage = Math.round((rawScore / maxScore) * 100);

  return { score: percentage, max: 100 };
};

// ---------------- MAP TO SENTENCES ----------------

const getPersonalSentence = (categoryKey, score, lang) => {
  const config = personalResultsConfig[categoryKey];
  if (!config) return null;

  const result = config.find((item) => score >= item.min && score <= item.max);
  return result ? result[`text_${lang}`] : null;
};

const getMetabolicSentences = (scoreData, lang) => {
  if (!scoreData) return [];

  if (scoreData.tooFewAnswers) {
    return [
      lang === "fr"
        ? "Vous avez sauté trop de questions. Veuillez refaire le test."
        : "You skipped too many questions. Please take the test again.",
    ];
  }

  const { score } = scoreData;

  const matched = metabolicResultsConfig.find(
    (item) => score >= item.min && score <= item.max,
  );

  if (!matched) return [];

  return [
    matched[`meaning_${lang}`],
    matched[`focus_${lang}`],
    matched[`direction_${lang}`],
  ];
};

// ---------------- COMPONENT ----------------

export default function Results() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const results = useTestResultsStore((s) => s.results);
  const location = useLocation();
  const { testId } = location.state || {};
  const storedResult = testId ? results[testId] : null;

  if (!storedResult)
    return (
      <p>
        {lang === "fr"
          ? "Aucun résultat trouvé."
          : "No results found for this test."}
      </p>
    );

  // ---------------- COMPUTE SCORES ----------------
  const computedScores = useMemo(() => {
    if (!storedResult || !testId) return null;

    if (testId === "personal-capacity")
      return computePersonalScores(personalCapacityTest, storedResult);

    if (testId === "metabolic-health")
      return computeMetabolicScore(metabolicHealthTest, storedResult);

    return null;
  }, [storedResult, testId]);

  // ---------------- MAP RESULTS TO SENTENCES ----------------
  const mappedResults = useMemo(() => {
    if (!computedScores) return [];

    if (testId === "personal-capacity") {
      return Object.entries(computedScores).map(([category, catData]) => ({
        category,
        sentence: getPersonalSentence(category, catData.score, lang),
      }));
    }

    if (testId === "metabolic-health") {
      const sentences = getMetabolicSentences(computedScores, lang);
      return sentences.map((text, index) => ({
        category: `Metabolic-${index}`,
        sentence: text,
      }));
    }

    return [];
  }, [computedScores, testId, lang]);

  // ---------------- AUTO SCROLL LOGIC ----------------
  useEffect(() => {
    if (!containerRef.current) return;

    const paragraphs =
      containerRef.current.querySelectorAll(".result-paragraph");

    const startAutoScroll = async () => {
      for (let i = 0; i < paragraphs.length; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            paragraphs[i].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            resolve();
          }, 7000);
        });
      }

      setShowButton(true);
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setIsAutoScrolling(false);
      }, 800);
    };

    startAutoScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("focused", "passed");
          else entry.target.classList.remove("focused");
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    paragraphs.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  // ---------------- RENDER ----------------
  return (
    <div className="results-wrapper">
      <h1>{lang === "fr" ? "Résultat" : "Result"}</h1>
      <Link to="/" className="back">
        <ArrowLeft />
      </Link>

      <div
        className={`results-content ${isAutoScrolling ? "lock-user-scroll" : ""}`}
        ref={containerRef}
      >
        <div className="spacer"></div>

        {mappedResults.map((item, index) => (
          <p key={index} className="result-paragraph">
            {item.sentence || "❌ NO SENTENCE FOUND"}
          </p>
        ))}

        <div
          ref={buttonRef}
          className={`button-footer ${showButton ? "visible" : ""}`}
        >
          <Button
            text={
              lang === "fr"
                ? "Télécharger les résultats"
                : "Download the results"
            }
            width="250px"
          />
        </div>

        <div className="spacer"></div>
      </div>
    </div>
  );
}
