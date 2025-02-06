import { useState } from 'react';
import { useSearchParams } from 'react-router';
import {
  useCharacters,
  QueryParams,
  type Character,
} from '@/shared/api/characters';
import { CardList, Loader, Button, ErrorMessage } from '@/shared/ui/';
import { Header } from '@/widgets/header';
import styles from './MainPage.module.scss';

const characterMapper = ({ id, image, name, status }: Character) => {
  return {
    id,
    imageUrl: image,
    title: name,
    description: status,
  };
};

export const MainPage = () => {
  const [searchParams] = useSearchParams();
  const [hasError, setHasError] = useState(false);
  const { data, error, isLoading } = useCharacters(
    searchParams.get(QueryParams.Name) || ''
  );

  const handleThrowErrorClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test Error');
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {data && <CardList items={data.results.map(characterMapper)} />}
        <Button className={styles.btn} onClick={handleThrowErrorClick}>
          Throw Error
        </Button>
      </main>
    </>
  );
};
