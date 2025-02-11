import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import styles from "./Select.module.css";

const Select = ({
  name,
  label,
  options,
  selectedValue,
  onChange,
  classStyle,
}) => {
  const { register } = useFormContext();

  return (
    <div className={styles.boxSelect}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        className={clsx(styles.select, classStyle)}
        {...register(name, { required: true })}
        onChange={onChange}
        value={selectedValue}
      >
        {options.map((option) => (
          <option
            key={option.value}
            className={clsx(
              styles.option,
              selectedValue === option.value && styles.selectedOption
            )}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
