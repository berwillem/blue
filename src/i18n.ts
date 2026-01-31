import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Initialisation
i18n
  .use(HttpBackend) // charge les fichiers de traduction
  .use(LanguageDetector) // détecte la langue du navigateur
  .use(initReactI18next) // passe i18n à react-i18next
  .init({
    fallbackLng: "en", // langue par défaut
    debug: false,       // active les logs pour le dev
    interpolation: {
      escapeValue: false, // pas nécessaire pour React
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // chemin des fichiers de traduction
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
