import React from 'react';
import styles from '../../pages/JoinUs/JoinUs.module.css';

interface SectionHeaderProps {
  overline: string;
  title?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ overline, title }) => (
  <div className={styles.sectionHeader}>
    <span className={styles.overline}>{overline}</span>
    {title && <h2 className={styles.sectionTitle}>{title}</h2>}
  </div>
);