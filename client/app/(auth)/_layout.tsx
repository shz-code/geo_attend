import { RootState } from "@/store/store";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { id } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id) router.replace("/dashboard");
  }, [id]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default AuthLayout;
