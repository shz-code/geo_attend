import "@/assets/css/global.css";
import { store } from "@/store/store";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Slot />
      </Provider>
    </>
  );
}
