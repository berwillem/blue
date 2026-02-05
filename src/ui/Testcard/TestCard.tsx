
import "./TestCard.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface TestCardProps {
  link: string;
  img?: string;
  title: string;
  desc: string;
}

export default function TestCard({ link, img, title, desc }: TestCardProps) {
  const { t } = useTranslation();

  return (
    <div className="testCard-container">
      <img src={img} alt={title} />
      <h1>{title}</h1>
      <p>{desc}</p>
    <Link to={`/disclaimer/${link}`} className="start-test-btn">
        {t("last.button")}
      </Link>
    </div>
  );
}