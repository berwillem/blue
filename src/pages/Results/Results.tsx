// @ts-nocheck
import { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";

import "./Results.css";
import Button from "../../ui/button/Button";
import { useTestResultsStore } from "../../store/useTestResultsStore";
import { personalCapacityTest } from "../../data/personalCapacity.config";
import { metabolicHealthTest } from "../../data/metabolicHealth.config";
import { personalResultsConfig } from "../../data/personalResults.config";
import { metabolicResultsConfig } from "../../data/metabolicResults.config";

// ---------------- SCORING HELPERS (Identiques) ----------------
const computePersonalScores = (testConfig, storedResult) => {
  const { answers } = storedResult;
  const categoryScores = {};
  testConfig.steps.forEach((step) =>
    step.questions.forEach((q) => {
      const value = answers[q.id];
      if (typeof value !== "number") return;
      if (!categoryScores[step.title])
        categoryScores[step.title] = { score: 0, max: 0 };
      categoryScores[step.title].score += value;
      categoryScores[step.title].max += 5;
    })
  );
  return categoryScores;
};

const computeMetabolicScore = (testConfig, storedResult) => {
  const { answers } = storedResult;
  const answeredValues = testConfig.steps
    .flatMap((step) => step.questions.map((q) => {
      const val = answers[q.id];
      return typeof val === "number" ? val : null;
    }))
    .filter((v) => v !== null);
  if (answeredValues.length < 5) return { tooFewAnswers: true };
  const rawScore = answeredValues.reduce((acc, val) => acc + val, 0);
  const maxScore = answeredValues.length * 4;
  const percentage = Math.round((rawScore / maxScore) * 100);
  return { score: percentage, max: 100 };
};

const getPersonalSentence = (categoryKey, score, lang) => {
  const config = personalResultsConfig[categoryKey];
  if (!config) return null;
  const result = config.find((item) => score >= item.min && score <= item.max);
  return result ? result[`text_${lang}`] : null;
};

const getMetabolicSentences = (scoreData, lang) => {
  if (!scoreData) return [];
  if (scoreData.tooFewAnswers) {
    return [lang === "fr" ? "Vous avez sauté trop de questions. Refaites le test." : "Too many skipped questions."];
  }
  const { score } = scoreData;
  const matched = metabolicResultsConfig.find((item) => score >= item.min && score <= item.max);
  if (!matched) return [];
  return [matched[`meaning_${lang}`], matched[`focus_${lang}`], matched[`direction_${lang}`]];
};

// ---------------- COMPONENT ----------------

export default function Results() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const results = useTestResultsStore((s) => s.results);
  const location = useLocation();
  const { testId } = location.state || {};
  const storedResult = testId ? results[testId] : null;

  const computedScores = useMemo(() => {
    if (!storedResult || !testId) return null;
    return testId === "personal-capacity" 
      ? computePersonalScores(personalCapacityTest, storedResult)
      : computeMetabolicScore(metabolicHealthTest, storedResult);
  }, [storedResult, testId]);

  const mappedResults = useMemo(() => {
    if (!computedScores) return [];
    if (testId === "personal-capacity") {
      return Object.entries(computedScores).map(([category, catData]) => ({
        category,
        sentence: getPersonalSentence(category, catData.score, lang),
      }));
    }
  const sentences = getMetabolicSentences(computedScores, lang);
    
    // On définit les titres selon la langue
    const titles = lang === "fr" 
      ? ["Ce que cela signifie", "Sur quoi se concentrer", "Direction"] 
      : ["What this means", "What to focus on", "Direction"];

    return sentences.map((text, index) => ({ 
      category: titles[index] || "", // Utilise le titre correspondant à l'index
      sentence: text 
    }));

  }, [computedScores, testId, lang]);

  // ---------------- PDF GENERATION ----------------
// ---------------- PDF GENERATION ----------------
// ---------------- PDF GENERATION ----------------
  const handleDownloadPDF = (e) => {
    if (e) e.preventDefault();
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;

    // --- LOGIQUE DU FOOTER ---
    const addFooter = (pageDoc) => {
      const totalPages = pageDoc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pageDoc.setPage(i);
        pageDoc.setDrawColor(200, 200, 200);
        pageDoc.setLineWidth(0.1);
        pageDoc.line(20, pageHeight - 20, 190, pageHeight - 20);

        pageDoc.setFont("helvetica", "normal");
        pageDoc.setFontSize(9);
        pageDoc.setTextColor(120, 120, 120);
        
        const footerText = "Blu - contact@blu-path.com";
        const pageNum = `Page ${i} / ${totalPages}`;
        
        pageDoc.text(footerText, 20, pageHeight - 13);
        const pageNumWidth = pageDoc.getTextWidth(pageNum);
        pageDoc.text(pageNum, 190 - pageNumWidth, pageHeight - 13);
      }
    };

    // --- LOGO ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(14, 58, 74); // Bleu foncé
    doc.text("Blu", 20, 25);

    const bluWidth = doc.getTextWidth("Blu");
    doc.setTextColor(255, 204, 0); // Jaune point
    doc.text(".", 20 + bluWidth, 25);

    // --- TRAIT DE SÉPARATION ---
    doc.setDrawColor(14, 58, 74);
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);

    // --- TITRE PRINCIPAL ---
    doc.setTextColor(14, 58, 74);
    doc.setFontSize(18);
    doc.text(lang === "fr" ? "Vos Résultats" : "Your Results", 20, 45);

    let y = 60;

    // --- BOUCLE SUR LES RÉSULTATS (AVEC TITRES) ---
    mappedResults.forEach((item) => {
      // 1. Dessiner le TITRE de la catégorie (ex: What this means)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(14, 58, 74);
      
      const categoryTitle = item.category.toUpperCase();
      doc.text(categoryTitle, 20, y);
      
      y += 8; // Petit saut après le titre

      // 2. Dessiner le TEXTE (sentence)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);

      const lines = doc.splitTextToSize(item.sentence, 170);

      // Vérifier si ça passe sur la page (marge footer 30mm)
      if (y + (lines.length * 7) > pageHeight - 30) {
        doc.addPage();
        y = 30;
      }

      doc.text(lines, 20, y);
      y += (lines.length * 7) + 15; // Espace plus large entre les blocs
    });

    // Finaliser avec le footer
    addFooter(doc);

    doc.save(`Blu_Results_${testId}.pdf`);
  };
  // ---------------- AUTO SCROLL LOGIC FIXED ----------------
  useEffect(() => {
    if (!containerRef.current || mappedResults.length === 0) return;

    const paragraphs = containerRef.current.querySelectorAll(".result-paragraph");
    const SCROLL_DELAY = 5000;

    const startAutoScroll = async () => {
      paragraphs[0]?.scrollIntoView({ behavior: "smooth", block: "center" });

      for (let i = 1; i < paragraphs.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, SCROLL_DELAY));
        paragraphs[i].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      await new Promise((resolve) => setTimeout(resolve, SCROLL_DELAY));
      setShowButton(true);
      
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setIsAutoScrolling(false);
      }, 500);
    };

    startAutoScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("focused", "passed");
          else entry.target.classList.remove("focused");
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    paragraphs.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, [mappedResults]);

  if (!storedResult) return <p>{lang === "fr" ? "Aucun résultat." : "No results."}</p>;
console.log('====================================');
console.log(mappedResults);
console.log('====================================');
  return (
    <div className="results-wrapper">
      <h1>{lang === "fr" ? "Résultat" : "Result"}</h1>

      <div className={`results-content ${isAutoScrolling ? "lock-user-scroll" : ""}`} ref={containerRef}>
        <div className="spacer"></div>

        {mappedResults.map((item, index) => (
       <>
         
          <p key={index} className="result-paragraph">
            <span className="title-result-paragraph"> {item.category || "❌ NO SENTENCE FOUND"}</span>
        
            {item.sentence || "❌ NO SENTENCE FOUND"}
          </p>
       </>
        ))}

        <div ref={buttonRef} className={`button-footer ${showButton ? "visible" : ""}`}>
          <Button 
            onClick={handleDownloadPDF}
            text={lang === "fr" ? "Télécharger les résultats" : "Download results"} 
            width="250px" 
          />
          <Button 
            onClick={() => navigate("/")}
            text={lang === "fr" ? "Retourner à l'accueil" : "Go Home"} 
            width="250px" 
          />
        </div>

        <div className="spacer"></div>
      </div>
    </div>
  );
}