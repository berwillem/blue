import { useTranslation } from "react-i18next";
import "./Button.css";

interface ButtonProps {
  text: string;
  width?: string; // Optionnel avec le "?"
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Le bon type pour un clic
}

export default function Button({ text, width, onClick }: ButtonProps) {
  const { t } = useTranslation();

  return (
    <button 
      type="button" // Bonne pratique pour éviter les soumissions de formulaire accidentelles
      onClick={onClick} 
      className="action-button" 
      style={{ width: width || "auto" }} // Valeur par défaut si width n'est pas passé
    >
      <div className="dot"></div> {/* Changé <p> en <div> car un <p> dans un <button> est sémantiquement déconseillé */}
      <span className="button-text">{t(text)}</span>
    </button>
  );
}