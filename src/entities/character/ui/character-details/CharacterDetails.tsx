import { useLocation, useNavigate, useParams } from 'react-router';
import { useCharacter } from '@/entities/character';
import { Button, ErrorMessage, Loader } from '@/shared/ui';
import styles from './CharacterDetails.module.scss';

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, error, isLoading } = useCharacter(Number(id));

  const handleClick = () => {
    navigate({
      pathname: '/',
      search: location.search,
    });
  };

  return (
    <div className={styles.container} key={id} role="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <>
          <img
            src={data.image}
            alt={data.name}
            className={styles.image}
            role="img"
          />
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>Name</th>
                <td role="name">{data.name}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td role="status">{data.status}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td role="type">{data.type || 'unknown'}</td>
              </tr>
              <tr>
                <th>Species</th>
                <td role="species">{data.species}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td role="gender">{data.gender}</td>
              </tr>
              <tr>
                <th>Origin</th>
                <td role="origin">{data.origin.name}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td role="location">{data.location.name}</td>
              </tr>
              <tr>
                <th>Episodes</th>
                <td role="episodes">{data.episode.length}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      <Button onClick={handleClick} className={styles.btn} variant="danger">
        &times;
      </Button>
    </div>
  );
};
