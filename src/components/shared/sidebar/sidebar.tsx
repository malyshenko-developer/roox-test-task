import { sortByCity, sortByCompany } from "../../../features/users/userSlice";
import { useAppDispatch } from "../../../store/hooks";
import Button from "../../ui/button/button";
import styles from './sidebar.module.scss';

const Sidebar = () => {
  const dispatch = useAppDispatch();

  return (
    <aside className={styles.sidebar}>
      <h2>
        Сортировка
      </h2>
      <Button onClick={() => dispatch(sortByCity())}>
        по городу
      </Button>
      <Button onClick={() => dispatch(sortByCompany())}>
        по компании
      </Button>
    </aside>
  )
}

export default Sidebar;