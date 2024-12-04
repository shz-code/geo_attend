import { RootState } from "@/store/store";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { useSelector } from "react-redux";

const _layout = () => {
  const { id } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!id) router.replace("/(auth)/login");

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Prevent back navigation when logged in
        if (!id) {
          return true; // Block back action
        }
        return false; // Allow default behavior otherwise
      }
    );

    return () => backHandler.remove();
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
