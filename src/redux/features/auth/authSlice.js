import { createSlice } from "@reduxjs/toolkit";

const getStoredName = () => {
  try {
    const storedName = localStorage.getItem("name");
    return storedName ? JSON.parse(storedName) : "";
  } catch (error) {
    console.error("Error parsing stored name:", error);
    return "";
  }
};

const initialState = {
  isLoggedIn: false,
  name: getStoredName(),
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      const newName = action.payload;
      localStorage.setItem("name", JSON.stringify(newName));
      state.name = newName;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
