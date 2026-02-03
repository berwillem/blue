import React from 'react';
import './PartnerCard.css';

interface PartnerCardProps {
  title: string;
  imageUrl?: string; // Optionnel si vous voulez passer une image réelle plus tard
}

const PartnerCard: React.FC<PartnerCardProps> = ({ title, imageUrl }) => {
  return (
    <div className={'card'}>
      <div className={'imageWrapper'}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={'image'} />
        ) : (
          <div className={'placeholder'} />
        )}
      </div>
      <p className={"card-title"}>{title}</p>
    </div>
  );
};

export default PartnerCard;