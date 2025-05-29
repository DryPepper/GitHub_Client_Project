import React from 'react';
import { cc } from 'utils/combineClasses';
import styles from './styles.module.scss';

interface Props {
  image: string;
  title: string;
  subtitle: string;
  stars: number;
  updatedAt: string;
  onClick?: React.MouseEventHandler;
  className?: string;
}

const Card = ({
  image,
  title,
  subtitle,
  stars,
  updatedAt,
  onClick,
  className,
}: Props) => {
  return (
    <div className={cc(styles.cardRoot, className)}>
      <img
        className={styles.repoAvatar}
        src={image}
        alt={title}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      />
      <div className={styles.repoContent}>
        <strong className={styles.repoName}>{title}</strong>
        <p className={styles.repoUser}>{subtitle}</p>
        <div className={styles.repoMeta}>
          <span className={styles.repoStars}>⭐ {stars}</span>
          <span className={styles.repoSeparator}>   </span>
          <span className={styles.repoUpdated}>Updated {updatedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
