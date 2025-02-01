import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "../../redux/auth/operations.js";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { closeModal } from "../../redux/modal.js";
import { setUser } from "../../redux/auth/slice.js";

import sprite from "../../assets/icons/sprite.svg";

import styles from "./RegisterForm.module.css";

const validateSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must contain '@' and '.'")
    .required("Email is required"),
  password: yup
    .string()
    .min(
      6,
      "Password must be at least 6 characters, with at least 2 of them being uppercase letters"
    )
    .matches(
      /(?=.*[A-Z].*[A-Z])/,
      "Password must contain at least 2 uppercase letters"
    )
    .required("Password is required"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(validateSchema),
  });

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleRegister = ({ email, password }) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
    dispatch(closeModal());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} autoComplete="off" noValidate>
      <div className={styles.box}>
        <label htmlFor="name">
          <input
            id="name"
            className={styles.input}
            {...register("name")}
            placeholder="Name"
          />
        </label>
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <label htmlFor="email">
          <input
            id="email"
            className={styles.input}
            {...register("email")}
            placeholder="Email"
          />
        </label>
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <label className={styles.boxBtn} htmlFor="password">
          <input
            id="password"
            className={styles.input}
            type={isPasswordVisible ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.btnSvg}
          >
            {isPasswordVisible ? (
              <svg className={styles.svg} width={20} height={20}>
                <use href={`${sprite}#icon-eye`}></use>
              </svg>
            ) : (
              <svg className={styles.svg} width={20} height={20}>
                <use href={`${sprite}#icon-eye-off`}></use>
              </svg>
            )}
          </button>
        </label>
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>
      <button className={styles.btn} type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
