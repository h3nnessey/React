import { useLocation, useNavigate } from 'react-router';
import type { Character } from '@/shared/api/characters';
import { classnames } from '@/shared/lib/styling';
import styles from './CharacterCard.module.scss';

export interface CharacterCardProps extends Character {
  className?: string;
}

export const CharacterCard = ({
  id,
  name,
  status,
  image,
  className,
}: CharacterCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/${id}${location.search}`);
  };

  return (
    <>
      <div
        className={classnames(styles.card, className)}
        title={name}
        onClick={handleClick}
      >
        <img className={styles.image} src={image} alt={name} />
        <div className={styles.about}>
          <p className={styles.title}>{name}</p>
          <p
            className={classnames(
              styles.description,
              styles[status.toLowerCase()]
            )}
          >
            {status}
          </p>
        </div>
      </div>
    </>
  );
};
