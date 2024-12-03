import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import { COLORS } from "@/lib/constants";
import * as Location from "expo-location";
import { Clock, MapPin, Play, StopCircle, User } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Text, View } from "react-native";

export default function LiveTrackingScreen() {
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isTracking) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isTracking]);

  const startTracking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    setIsTracking(true);
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const stopTracking = () => {
    setIsTracking(false);
    Alert.alert("Tracking Stopped", "Your attendance has been recorded.");
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <Header
        title="Live Tracking"
        description="Monitor your attendance in real-time"
      />

      {/* Tracking Status */}
      <View className="container flex-1 items-center justify-center">
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
          }}
        >
          <MapPin size={64} color={COLORS.primary} />
        </Animated.View>

        <Text className="text-2xl font-bold my-4">
          {isTracking ? "Tracking Active" : "Ready to Track"}
        </Text>

        {/* <MapView coordinates={{ lat: 23.8869461, lon: 90.3890378 }} /> */}

        {location && (
          <View className="bg-white rounded-md p-4 mb-8 w-full">
            <Text className="text-lg font-semibold mb-2">
              Current Location:
            </Text>
            <Text className="text-base">
              Latitude: {location.coords.latitude}
            </Text>
            <Text className="text-base">
              Longitude: {location.coords.longitude}
            </Text>
          </View>
        )}

        {errorMsg && <Text className="text-red-500 mb-4">{errorMsg}</Text>}

        <Button
          variant="secondary"
          textType="secondary"
          onPress={isTracking ? stopTracking : startTracking}
          className={isTracking ? "bg-red-400" : ""}
        >
          <View className="flex-row items-center gap-4">
            <Text className="text-white text-lg font-semibold">
              {isTracking ? "Stop Tracking" : "Start Tracking"}
            </Text>
            {isTracking ? <StopCircle size={24} /> : <Play size={24} />}
          </View>
        </Button>
      </View>

      {/* Footer */}
      <View className="bg-white py-4">
        <View className="container flex-row justify-between items-center">
          <View className="flex-row items-center">
            <User size={20} color="#10B981" className="mr-2" />
            <Text className="text-gray-600">John Doe</Text>
          </View>
          <View className="flex-row items-center">
            <Clock size={20} color="#10B981" className="mr-2" />
            <Text className="text-gray-600">
              {new Date().toLocaleTimeString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
