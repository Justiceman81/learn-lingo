import { useFormContext } from "react-hook-form";
import styles from "./InputType.module.css";

const RadioInput = ({ options }) => {
  const { register } = useFormContext();
  return (
    <>
      {options.map((option) => (
        <div className={styles.boxRadio} key={option.value}>
          <input {...register("radio")} type="radio" value={option.value} />
          <label className={styles.labelRadio} htmlFor={option.value}>
            {option.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default RadioInput;
