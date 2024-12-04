import { router } from "expo-router";
import { Alert } from "react-native";
import apiSlice from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: `/auth/login`,
        method: "POST",
        body: body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log(arg);

        try {
          const res = await queryFulfilled;

          dispatch(
            userLoggedIn({
              email: "web.shahidul.alam@gmail.com",
              id: "1",
              name: "Shahidul Alam",
              token: "132",
            })
          );
          router.push("/dashboard");
        } catch (err) {
          console.log(err);
          Alert.alert("Error", "Something went wrong");
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
