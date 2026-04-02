import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: "fr", // Définit le français comme langue active au démarrage
    fallbackLng: "fr", // Utilise le français si la traduction est manquante dans une autre langue
    debug: false,
    interpolation: { escapeValue: false },
    backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
    react: { useSuspense: true },
    returnObjects: true 
  });

export default i18n;