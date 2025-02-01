import { createSlice } from "@reduxjs/toolkit";
export type TUser = {
  id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  iat: number;
  exp: number;
};

const initialState: TUser = {
  id: "",
  name: "",
  role: "",
  email: "",
  status: "",
  iat: 0,
  exp: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, role, email, status, iat, exp } = action.payload;
      state.id = id;
      state.name = name;
      state.role = role;
      state.email = email;
      state.status = status;
      state.iat = iat;
      state.exp = exp;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
