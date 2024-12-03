import { COLORS } from "@/lib/constants";
import { Calendar, ChevronRight, MapPin, Users } from "lucide-react-native";
import React, { FC, ReactNode } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface OptionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  image: string;
}

const OptionCard: FC<OptionCardProps> = ({
  icon,
  title,
  description,
  image,
}) => (
  <TouchableOpacity className="bg-white rounded-md mb-4">
    <View className="w-full h-40">
      <Image
        source={{ uri: image }}
        className="w-full h-full rounded-t-md"
        resizeMode="cover"
      />
    </View>
    <View className="p-4">
      <View className="flex-row items-center mb-2">
        {icon}
        <Text className="text-lg font-bold ml-2">{title}</Text>
      </View>
      <Text className="text-gray-600 mb-2">{description}</Text>
      <View className="flex-row items-center">
        <Text className="text-primary font-semibold">View details</Text>
        <ChevronRight size={20} color={COLORS.primary} />
      </View>
    </View>
  </TouchableOpacity>
);

export default function DashboardScreen() {
  return (
    <SafeAreaView className="h-full">
      <ScrollView className=" bg-gray-100">
        {/* Header */}
        <View className="bg-primary pt-12 pb-6 rounded-b-3xl">
          <View className="container flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-white text-2xl font-bold">
                Welcome back,
              </Text>
              <Text className="text-white text-lg">John Doe</Text>
            </View>
            <View>
              <View className="w-12 h-12 rounded-full">
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGRxzqH5OcTl9fpjCUJE0HoZxoLFxG4No_2Q&s",
                  }}
                  className="w-full h-full rounded-full"
                />
              </View>
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

        {/* Options */}
        <View className="container py-8">
          <Text className="text-2xl font-bold mb-6">Quick Actions</Text>

          <OptionCard
            icon={<MapPin size={24} color={COLORS.primary} />}
            title="Live Tracking"
            description="Monitor real-time location of your team members."
            image="https://picsum.photos/800"
          />

          <OptionCard
            icon={<Users size={24} color={COLORS.primary} />}
            title="Geo Attendance Tracking"
            description="Track attendance based on geographical location."
            image="https://picsum.photos/800"
          />

          <OptionCard
            icon={<Calendar size={24} color={COLORS.primary} />}
            title="Normal Attendance"
            description="View and manage regular attendance records."
            image="https://picsum.photos/800"
          />
        </View>

        {/* Recent Activity */}
        {/* <View className="bg-white py-8">
          <View className="container">
            <Text className="text-2xl font-bold mb-6">Recent Activity</Text>
            {[1, 2, 3].map((item) => (
              <View key={item} className="flex-row items-center mb-4">
                <View className="w-2 h-2 rounded-full bg-emerald-600 mr-4" />
                <View>
                  <Text className="font-semibold">John Doe checked in</Text>
                  <Text className="text-gray-600">2 hours ago</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity className="flex-row items-center justify-center mt-4">
              <Text className="text-emerald-600 font-semibold mr-2">
                View all activity
              </Text>
              <ChevronRight size={20} color="#10B981" />
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
