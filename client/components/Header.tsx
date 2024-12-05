import { userLoggedOut } from "@/features/auth/authSlice";
import { router } from "expo-router";
import React, { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";

interface HeaderProps {
  title: string;
  description: string;
}

const Header: FC<HeaderProps> = ({ title, description }) => {
  const dispatch = useDispatch();
  return (
    <View className="bg-primary pt-16 pb-6 rounded-b-3xl">
      <View className="container flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-white text-2xl font-bold">{title}</Text>
          <Text className="text-white text-lg">{description}</Text>
        </View>
        <View>
          <Pressable
            className="w-12 h-12 rounded-full"
            onPress={() => {
              dispatch(userLoggedOut());
              router.push("/(auth)/login");
            }}
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGRxzqH5OcTl9fpjCUJE0HoZxoLFxG4No_2Q&s",
              }}
              className="w-full h-full rounded-full"
            />
          </Pressable>
        </View>
      </View>
      {/* <View className="bg-white rounded-xl p-4">
    <Text className="text-lg font-semibold mb-2">Today's Overview</Text>
    <View className="flex-row justify-between">
      <View>
        <Text className="text-gray-600">Present</Text>
        <Text className="text-2xl font-bold text-emerald-600">42</Text>
      </View>
      <View>
        <Text className="text-gray-600">Absent</Text>
        <Text className="text-2xl font-bold text-red-500">3</Text>
      </View>
      <View>
        <Text className="text-gray-600">On Leave</Text>
        <Text className="text-2xl font-bold text-yellow-500">5</Text>
      </View>
    </View>
  </View> */}
    </View>
  );
};

export default Header;
