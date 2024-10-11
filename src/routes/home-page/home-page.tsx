import { useSelector } from 'react-redux';
import UserCard from '../../components/ui/user-card/user-card';
import { useAppDispatch } from '../../store/hooks';
import styles from './home-page.module.scss'
import { selectUsers } from '../../store/selectors/selectUsers';
import { useEffect } from 'react';
import { fetchUsers } from '../../features/users/userSlice';

const HomePage = () => {
  const { users, isLoading } = useSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div className={styles.homePage}>
        <ul>
          {
            users.map(user => (
              <UserCard
                name={user.name}
                city={user.address.city}
                company={user.company.name}
                userId={user.id}
                key={user.id}
              />
            ))
          }
        </ul>
        <p>
          Найдено {users.length} пользователей
        </p>
    </div>
  )
}

export default HomePage;