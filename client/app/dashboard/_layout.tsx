import { RootState } from "@/store/store";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const _layout = () => {
  const { id } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!id) router.replace("/(auth)/login");
  }, [id]);

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="liveLocationTracking" />
        <Stack.Screen name="regularAttendance" />
      </Stack>
    </>
  );
};

export default _layout;
