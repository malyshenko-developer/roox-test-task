import { Link } from 'react-router-dom';
import styles from './user-card.module.scss';

interface UserCardProps {
    name: string;
    city: string;
    company: string;
    userId: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, city, company, userId }) => {
  return (
    <li className={styles.userCard}>
        <div className="userInfo">
            <h3><span>ФИО:</span> {name}</h3>
            <h3><span>город:</span> {city}</h3>
            <h3><span>компания:</span> {company}</h3>
        </div>
        <Link to={`/roox-test-task/user/${userId}`}>
            Подробнее
        </Link>
    </li>
  )
}

export default UserCard