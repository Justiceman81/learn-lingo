import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./operations";

const initialState = {
  email: null,
  token: null,
  id: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.id = action.payload.id;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.id = action.payload.id;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.email = null;
        state.token = null;
        state.id = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
