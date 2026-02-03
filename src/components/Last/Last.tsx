
import { useTranslation } from "react-i18next";
import TestCard from "../../ui/Testcard/TestCard";
import "./Last.css";
import psyimg from "../../assets/images/testpsy.jpg";

export default function Last() {
  const { t } = useTranslation();

  return (
    <div className="last-container">
      <div className="texts">
        <h1>{t("last.title")}</h1>
        <p>{t("last.description")}</p>
      </div>
      <div className="cards">
        <TestCard 
          link="personal-capacity" 
          img={psyimg} 
          title={t("last.card1.title")} 
          desc={t("last.card1.desc")} 
        />
        <TestCard 
          link="metabolic-health" 
          img={psyimg} 
          title={t("last.card2.title")} 
          desc={t("last.card2.desc")} 
        />
      </div>
    </div>
  );
}