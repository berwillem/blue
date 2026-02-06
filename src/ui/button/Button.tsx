
import { useTranslation } from "react-i18next";
import "./Button.css";
export default function Button({
  text,
  width,
}: {
  text: string;
  width: string;
}) {
    const { t } = useTranslation();
  return (
    <button className="action-button" style={{ width: width }}>
      <p className="dot"></p>
      {t(text)}
    </button>
  );
}
