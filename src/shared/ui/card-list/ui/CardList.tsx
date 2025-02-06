import { classnames } from '@/shared/lib/styling';
import { Card, type CardProps } from '../../card';
import styles from './CardList.module.scss';

interface CardListProps {
  items: CardProps[];
  className?: string;
}

export const CardList = ({ items = [], className }: CardListProps) => {
  return (
    <>
      {items.length > 0 ? (
        <div className={classnames(styles.cardList, className)}>
          {items.map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      ) : null}
    </>
  );
};
