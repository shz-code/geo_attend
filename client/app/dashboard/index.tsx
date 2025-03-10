import Header from "@/components/Header";
import { COLORS } from "@/lib/constants";
import { RootState } from "@/store/store";
import { Link } from "expo-router";
import { Calendar, ChevronRight, MapPin, Users } from "lucide-react-native";
import React, { FC, ReactNode } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";

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
  <View className="bg-white rounded-md w-full">
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
  </View>
);

export default function DashboardScreen() {
  const { name } = useSelector((state: RootState) => state.auth);

  return (
    <View className="h-full">
      {/* Header */}
      <Header title="Welcome Back," description={name!} />
      <ScrollView className=" bg-gray-100">
        {/* Options */}
        <View className="container py-8 gap-6">
          <Text className="text-2xl font-bold">Quick Actions</Text>

          <Link href={"/dashboard/liveLocationTracking"}>
            <OptionCard
              icon={<MapPin size={24} color={COLORS.primary} />}
              title="Live Tracking"
              description="Monitor real-time location of your team members."
              image="https://picsum.photos/800"
            />
          </Link>

          <Link href={"/dashboard/geoAttendance"}>
            <OptionCard
              icon={<Users size={24} color={COLORS.primary} />}
              title="Geo Attendance Tracking"
              description="Track attendance based on geographical location."
              image="https://picsum.photos/800"
            />
          </Link>

          <Link href="/dashboard/regularAttendance">
            <OptionCard
              icon={<Calendar size={24} color={COLORS.primary} />}
              title="Normal Attendance"
              description="View and manage regular attendance records."
              image="https://picsum.photos/800"
            />
          </Link>
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
    </View>
  );
}
