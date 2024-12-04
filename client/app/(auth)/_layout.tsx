import { RootState } from "@/store/store";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { id } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id) router.replace("/dashboard");

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Prevent back navigation when logged in
        if (id) {
          return true; // Block back action
        }
        return false; // Allow default behavior otherwise
      }
    );

    return () => backHandler.remove();
  }, [id]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default AuthLayout;
