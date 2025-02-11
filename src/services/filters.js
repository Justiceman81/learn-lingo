import { get, ref } from "firebase/database";
import { dbRealtime } from "./firebase.js";

export const getFilteredTeachers = async (filters) => {
  const teachersRef = ref(dbRealtime, "teachers");
  const snapshot = await get(teachersRef);
  const teachers = [];

  snapshot.forEach((childSnapshot) => {
    const teacher = childSnapshot.val();
    const price = parseInt(teacher.price_per_hour, 10);
    let newPrice = false;

    switch (filters.price_range) {
      case "10":
        newPrice = price >= 10 && price <= 19;
        break;
      case "20":
        newPrice = price >= 20 && price <= 29;
        break;
      case "25":
        newPrice = price >= 20 && price <= 29;
        break;
      case "30":
        newPrice = price >= 30 && price <= 39;
        break;
      case "40":
        newPrice = price >= 40;
        break;
      default:
        newPrice = false;
    }

    const newLanguage = teacher.languages.includes(filters.languages);
    const newLevel = teacher.levels.includes(filters.levels);

    if (newPrice && newLanguage && newLevel) {
      teachers.push(teacher);
    }
  });

  return teachers;
};
