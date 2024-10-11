import Sidebar from "../../components/shared/sidebar/sidebar";
import styles from './root.module.scss';
import { Outlet } from "react-router-dom";

const Root = () => {

  return (
    <main id={styles.main}>
      <div className={styles.container}>
        <Sidebar />
        <Outlet />
      </div>
    </main>
  )
}

export default Root;
