import "@/assets/css/global.css";
import { userLoggedIn } from "@/features/auth/authSlice";
import { RootState } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { id } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await AsyncStorage.getItem("auth");
        if (res) dispatch(userLoggedIn(JSON.parse(res!)));
      } catch (error) {
        console.log(error);
      }
      setIsMounted(true);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (id) router.replace("/dashboard");
      else router.replace("/home");
    }
  }, [isMounted, id]);

  let stackScreens = (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
  if (id) {
    stackScreens = (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" />
      </Stack>
    );
  }

  return <>{stackScreens}</>;
}
