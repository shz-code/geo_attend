import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthUser = {
  name: undefined,
  id: undefined,
  email: undefined,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<AuthUser>) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;

      (async () => {
        await AsyncStorage.setItem(
          "auth",
          JSON.stringify({
            id: action.payload.id,
            email: action.payload.email,
          })
        );
      })();
    },
    userLoggedOut: (state) => {
      state.name = undefined;
      state.id = undefined;
      state.email = undefined;
      state.token = undefined;
      // Remove local storage
      (async () => {
        await AsyncStorage.removeItem("auth");
      })();
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
