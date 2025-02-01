import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import styles from "./Header.module.css";
import sprite from "../../assets/icons/sprite.svg";
import ukrLogo from "../../assets/icons/nativeUkr.svg";
import { logoutUser } from "../../redux/auth/operations";
import { selectIsAuthenticated, selectUser } from "../../redux/auth/selectors";

const Header = ({ isOpenModalLogin, isOpenModalRegister }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={ukrLogo} alt="nativeLogo" />
          <p className={styles.logoText}>LearnLingo</p>
        </div>
        <nav className={styles.nav}>
          <NavLink
            className={({ isActive }) =>
              clsx(styles.link, isActive && styles.active)
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(styles.link, isActive && styles.active)
            }
            to="/teachers"
          >
            Teachers
          </NavLink>
          {isAuth && (
            <NavLink
              className={({ isActive }) =>
                clsx(styles.link, isActive && styles.active)
              }
              to="/favorites"
            >
              Favorites
            </NavLink>
          )}
        </nav>
        <div className={styles.boxBtn}>
          {isAuth ? (
            <>
              <p className={styles.textEmail}>
                Email&nbsp;:&nbsp;
                <span className={styles.textEmailSpan}>{user?.email}</span>
              </p>
              <button
                className={styles.btnLogin}
                type="button"
                onClick={() => dispatch(logoutUser())}
              >
                <svg className={styles.svg} width={20} height={20}>
                  <use href={`${sprite}#icon-log_out`}></use>
                </svg>
                <p>Logout</p>
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.btnLogin}
                type="button"
                onClick={isOpenModalLogin}
              >
                <svg className={styles.svg} width={20} height={20}>
                  <use href={`${sprite}#icon-log_in`}></use>
                </svg>
                <p>Log in</p>
              </button>
              <button
                className={styles.btnRegister}
                type="button"
                onClick={isOpenModalRegister}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
