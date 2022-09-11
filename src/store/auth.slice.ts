import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserAttributes } from "../interfaces";

export interface AuthState {
  token: string;
  login: boolean;
  user: UserAttributes | null;
}

const initialState: AuthState = {
  token: "",
  login: false,
  user: null,
};

interface loginPayload {
  token: string;
  user: UserAttributes;
}

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<loginPayload>) => {
      state.login = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.login = false;
      state.token = "";
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
