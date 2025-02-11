import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import styles from "./Header.module.css";
import sprite from "../../assets/icons/sprite.svg";
import ukrLogo from "../../assets/icons/nativeUkr.svg";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useAuth } from "../../redux/auth/auth";
import { removeUser } from "../../redux/auth/slice.js";
import { openModal } from "../../redux/modal/slice.js";
import {
  selectIsOpenModal,
  selectModalType,
} from "../../redux/modal/selectors.js";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();
  const isOpenModal = useSelector(selectIsOpenModal);

  const modalType = useSelector(selectModalType);

  const isOpenModalRegister = () => {
    dispatch(openModal("register"));
  };

  const isOpenModalLogin = () => {
    dispatch(openModal("login"));
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.containerHeader}>
          <div className={styles.logo}>
            <img
              className={styles.imgLogo}
              src={ukrLogo}
              alt="Ukrainian logo"
            />
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
                  <span className={styles.textEmailSpan}>{email}</span>
                </p>
                <button
                  className={styles.btnLogin}
                  type="button"
                  onClick={() => dispatch(removeUser())}
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
      {isOpenModal && modalType === "register" && <RegisterModal />}
      {isOpenModal && modalType === "login" && <LoginModal />}
    </>
  );
};

export default Header;
