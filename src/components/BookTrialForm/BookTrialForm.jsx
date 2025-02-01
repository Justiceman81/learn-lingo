import { FormProvider, useForm } from "react-hook-form";
import styles from "./BookTrialForm.module.css";
import InputType from "../InputType/InputType.jsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modal/slice.js";

const validateSchemaBook = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must contain '@' and '.'")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
});

const BookTrialForm = () => {
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: { radio: "careerAndBusiness" },
    resolver: yupResolver(validateSchemaBook),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Book trial lesson successful!");
    dispatch(closeModal());
    reset();
  };

  const radioValue = [
    { value: "careerAndBusiness", name: "Career and business" },
    { value: "lessonForKids", name: "Lesson for kids" },
    { value: "livingAbroad", name: "Living abroad" },
    { value: "examsAndCoursework", name: "Exams and coursework" },
    { value: "cultureTravelHobby", name: "Culture, travel or hobby" },
  ];

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.boxBookForm}>
            <InputType options={radioValue} />
          </div>
          <div className={styles.boxInput}>
            <input
              className={styles.inputBook}
              {...register("fullName", { required: true })}
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p className={styles.error}>{errors.fullName.message}</p>
            )}

            <input
              className={styles.inputBook}
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}

            <input
              className={styles.inputBook}
              {...register("phoneNumber", { required: true })}
              placeholder="Phone number"
            />
            {errors.phoneNumber && (
              <p className={styles.error}>{errors.phoneNumber.message}</p>
            )}
          </div>
          <button className={styles.btnBook} type="submit">
            Book
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default BookTrialForm;
