import { FC } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../routes/route";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Button } from "../../../components/common/Button";
import { Container } from "../../../components/common/Container";
import { userActions } from "../../../store/slices/UserSlice";
import { IUser } from "../../../types/types";
import { authActions } from "../../../store/slices/AuthSlice";

interface HeaderProps {
  classess?: string;
}

const Header: FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.clear();
    dispatch(userActions.setUser({} as IUser));
    dispatch(authActions.setAuth(false));
  };

  return (
    <div className={styles.Header}>
      <Container>
        <nav className={styles.nav}>
          <ul className={styles.left}>
            <li>
              <Link style={{ marginRight: 20 }} to={RoutePath.oders}>
                Все заказы
              </Link>
            </li>
            <li>
              <Link to={RoutePath.add}>Добавить заказ</Link>
            </li>
          </ul>
          <ul className={styles.right}>
            <li style={{ marginRight: 20 }} className={styles.name}>
              {user.name}
            </li>
            <li>
              <Button onClick={logout} text="Выйти" />
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
