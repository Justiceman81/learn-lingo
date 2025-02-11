import TeachersForm from "../../components/TeachersForm/TeachersForm";
import TeachersList from "../../components/TeachersList/TeachersList";
import styles from "./TeachersPage.module.css";

const TeachersPage = () => {
  return (
    <>
      <div className={styles.teacherContainer}>
        <TeachersForm />
        <TeachersList />
      </div>
    </>
  );
};

export default TeachersPage;
