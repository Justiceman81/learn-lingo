import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { Container } from "../Container/Container.jsx";
import Select from "../Select/Select.jsx";
import { getTeachers } from "../../redux/teachers/operations.js";
import { setFilters } from "../../redux/teachers/slice.js";

import styles from "./TeachersForm.module.css";

const TeachersForm = () => {
  const dispatch = useDispatch();
  const methods = useForm();
  const { handleSubmit } = methods;

  const [selectedOptions, setSelectedOptions] = useState({
    languages: "French",
    price_per_hour: "10",
    levels: "A1 Beginner",
  });

  useEffect(() => {
    setSelectedOptions({
      languages: "French",
      price_per_hour: "10",
      levels: "A1 Beginner",
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSelectedOptions((prevSelectedOptions) => {
      const newOptions = {
        ...prevSelectedOptions,
        [name]: value,
      };
      return newOptions;
    });
  };
  const onSubmit = async (data) => {
    const filters = {
      price_range: data.price_per_hour,
      languages: data.languages,
      levels: data.levels,
    };
    try {
      dispatch(setFilters(filters));
      dispatch(getTeachers());
    } catch (error) {
      console.error("Error fetching filtered teachers:", error);
    }
  };

  const languagesOptions = [
    { value: "French", label: "French" },
    { value: "English", label: "English" },
    { value: "German", label: "German" },
    { value: "Ukrainian", label: "Ukrainian" },
    { value: "Polish", label: "Polish" },
    { value: "Spanish", label: "Spanish" },
    { value: "Italian", label: "Italian" },
    { value: "Korean", label: "Korean" },
    { value: "Mandarin Chinese", label: "Mandarin Chinese" },
    { value: "Vietnamese", label: "Vietnamese" },
  ];

  const levelsOptions = [
    { value: "A1", label: "A1 Beginner" },
    { value: "A2", label: "A2 Elementary" },
    { value: "B1", label: "B1 Intermediate" },
    { value: "B2", label: "B2 Upper-Intermediate" },
    { value: "C1", label: "C1 Advanced" },
    { value: "C2", label: "C2 Proficient" },
  ];

  const priceOptions = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
    { value: "40", label: "40" },
  ];

  return (
    <Container>
      <FormProvider {...methods}>
        <form className={styles.boxForm} onSubmit={handleSubmit(onSubmit)}>
          <Select
            name="languages"
            label="Languages"
            options={languagesOptions}
            selectedValue={selectedOptions.languages}
            onChange={handleChange}
            classStyle={styles.selectLanguages}
          />
          <Select
            name="levels"
            label="Level of knowledge"
            options={levelsOptions}
            selectedValue={selectedOptions.levels}
            onChange={handleChange}
            classStyle={styles.selectLevels}
          />
          <Select
            name="price_per_hour"
            label="Price"
            options={priceOptions}
            selectedValue={selectedOptions.price_per_hour}
            onChange={handleChange}
            classStyle={styles.selectPrice}
          />
          <div className={styles.boxBtn}>
            <button className={styles.btnForm} type="submit">
              Search
            </button>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default TeachersForm;
