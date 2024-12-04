import "@/assets/css/global.css";
import { store } from "@/store/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="dashboard" />
        </Stack>
      </Provider>
    </>
  );
}
