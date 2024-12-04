import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const _layout = () => {
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
