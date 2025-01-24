import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://firebase.googleapis.com",
});

export const apiLogin = createAsyncThunk(
  "auth/login",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("/users/login", formData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiRegister = createAsyncThunk(
  "auth/register",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("/users/signup", formData);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
