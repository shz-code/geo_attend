import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import {
  Calendar,
  CheckCircle2,
  Clock,
  LogIn,
  LogOut,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

const RegularAttendanceScreen = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [entryTime, setEntryTime] = useState<Date | null>(null);
  const [exitTime, setExitTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEntry = () => {
    setEntryTime(new Date());
    Alert.alert(
      "Entry Recorded",
      "Your entry time has been logged successfully."
    );
  };

  const handleExit = () => {
    setExitTime(new Date());
    Alert.alert(
      "Exit Recorded",
      "Your exit time has been logged successfully."
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View className="h-full">
      {/* Header */}
      <Header
        title="Normal Attendance"
        description="Record your daily attendance"
      />
      <ScrollView className="container">
        {/* Current Date and Time */}
        <View className="pt-6">
          <View className="bg-white rounded-md p-4 mb-6">
            <View className="flex-row items-center mb-2">
              <Calendar size={24} color="#10B981" />
              <Text className="text-lg font-semibold ml-2">
                {currentTime.toLocaleDateString([], {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Clock size={24} color="#10B981" />
              <Text className="text-3xl font-bold ml-2">
                {formatTime(currentTime)}
              </Text>
            </View>
          </View>
        </View>

        {/* Attendance Actions */}
        <View className="mb-6 gap-4">
          <Button
            variant="secondary"
            textType="secondary"
            onPress={handleEntry}
            disabled={entryTime !== null}
          >
            <View className="flex-row items-center gap-4">
              <LogIn size={24} color="white" className="mr-2" />
              <Text className="text-white text-lg font-semibold">
                Record Entry
              </Text>
            </View>
          </Button>

          <Button
            className="bg-red-500"
            textType="secondary"
            onPress={handleExit}
            disabled={exitTime !== null || entryTime === null}
          >
            <View className="flex-row items-center gap-4">
              <Text className="text-white text-lg font-semibold">
                Record Exit
              </Text>
              <LogOut size={24} color="white" />
            </View>
          </Button>
        </View>

        {/* Attendance Summary */}
        <View className="mb-6">
          <View className="bg-white rounded-md p-4">
            <Text className="text-xl font-bold mb-4">Today's Attendance</Text>
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center gap-2">
                <LogIn size={20} color="#10B981" className="mr-2" />
                <Text className="text-gray-600">Entry Time:</Text>
              </View>
              <Text className="font-semibold">
                {entryTime ? formatTime(entryTime) : "Not recorded"}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <LogOut size={20} color="#EF4444" className="mr-2" />
                <Text className="text-gray-600">Exit Time:</Text>
              </View>
              <Text className="font-semibold">
                {exitTime ? formatTime(exitTime) : "Not recorded"}
              </Text>
            </View>
          </View>
        </View>

        {/* Attendance Status */}
        {entryTime && (
          <View className="px-6 mb-6">
            <View className="bg-emerald-100 rounded-xl p-4 shadow-md flex-row items-center">
              <CheckCircle2 size={24} color="#10B981" className="mr-2" />
              <Text className="text-emerald-800 font-semibold">
                {exitTime ? "Attendance Completed" : "Currently Checked In"}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default RegularAttendanceScreen;
