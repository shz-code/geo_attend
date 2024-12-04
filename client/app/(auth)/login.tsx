import Button from "@/components/ui/Button";
import InputGroup from "@/components/ui/InputGroup";
import { useLoginMutation } from "@/features/auth/authApi";
import { COLORS } from "@/lib/constants";
import { StatusBar } from "expo-status-bar";
import { Lock, Mail, MapPin } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    // Implement your login logic here

    const res = await login({ email, password });
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    Alert.alert(
      "Forgot Password",
      "Forgot password functionality to be implemented"
    );
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <StatusBar style="dark" />
      <View className="items-center mb-12">
        <MapPin size={50} color="#10B981" />
        <Text className="text-2xl font-bold text-emerald-600 mt-2">
          Geo Attendance
        </Text>
      </View>

      <View className="container gap-4">
        <InputGroup
          icon={<Mail size={20} color={COLORS.grey} />}
          placeholder="Email"
          keyboardType="email-address"
        />
        <InputGroup
          icon={<Lock size={20} color={COLORS.grey} />}
          placeholder="Password"
          secureTextEntry
        />

        <View>
          <Button
            variant="secondary"
            textType="secondary"
            onPress={handleLogin}
          >
            Login
          </Button>
        </View>

        {/* <TouchableOpacity onPress={handleForgotPassword}>
          <Text className="text-emerald-600 text-center">Forgot Password?</Text>
        </TouchableOpacity> */}

        {/* <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text className="text-emerald-600 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <Text className="absolute bottom-6 text-center text-gray-500 text-xs px-6">
        This app requires location access for attendance tracking.
      </Text>
    </View>
  );
};

export default LoginScreen;
