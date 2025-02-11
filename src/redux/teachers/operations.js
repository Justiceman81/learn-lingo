import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getFilteredTeachers } from "../../services/filters.js";

export const instance = axios.create({
  baseURL:
    "https://learnlingo-e01dd-default-rtdb.europe-west1.firebasedatabase.app",
});

export const getTeachers = createAsyncThunk(
  "teachers/getAll",
  async ({ startAfter, limit = 4, filters }, thunkApi) => {
    try {
      let teachers = [];
      const filteredTeachers = await getFilteredTeachers(filters);

      if (filteredTeachers.length === 0) {
        const response = await instance.get("/teachers.json");
        teachers = Object.values(response.data || {});
      } else {
        teachers = filteredTeachers;
      }

      const startIndex = startAfter
        ? teachers.findIndex((teacher) => teacher.id === startAfter) + 1
        : 0;
      const paginatedTeachers = teachers.slice(startIndex, startIndex + limit);

      const hasNextPage = startIndex + limit < teachers.length;

      return {
        teachers: paginatedTeachers,
        lastVisible: paginatedTeachers[paginatedTeachers.length - 1]?.id,
        hasNextPage,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
