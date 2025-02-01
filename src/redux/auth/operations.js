import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { setUser } from "./slice";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await getIdToken(user);
      return { email: user.email, token, id: user.uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await getIdToken(user);
      return { email: user.email, token, id: user.uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return { email: null, token: null, id: null };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const listenAuthState = (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await getIdToken(user);
      dispatch(setUser({ email: user.email, token, id: user.uid }));
    } else {
      dispatch(setUser({ email: null, token: null, id: null }));
    }
  });
};
