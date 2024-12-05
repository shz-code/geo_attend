import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Map from "@/components/Map";
import Button from "@/components/ui/Button";
import { COLORS } from "@/lib/constants";
import { LOCATION_TASK_NAME } from "@/lib/locationTask";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { MapPin, Play, StopCircle } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, ScrollView, Text, View } from "react-native";

export default function LiveTrackingScreen() {
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animation
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
      setLocation(null);
      pulseAnim.setValue(1);
    }
  }, [isTracking]);

  useEffect(() => {
    (async () => {
      const ck = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
      if (ck) {
        startTracking();
      }
    })();
  }, []);

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

  const stopTracking = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    setIsTracking(false);
    Alert.alert("Tracking Stopped", "Your attendance has been recorded.");
  };

  return (
    <View className="h-full relative">
      {/* Header */}
      <Header
        title="Live Tracking"
        description="Monitor your attendance in real-time"
      />
      <ScrollView>
        {/* Tracking Status */}
        <View className="container py-12 items-center gap-4 justify-center">
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

          {location && (
            <Map
              coordinates={{
                lat: location.coords.latitude,
                lon: location.coords.longitude,
              }}
            />
            // <View className="bg-white rounded-md p-4 mb-8 w-full">
            //   <Text className="text-lg font-semibold mb-2">
            //     Current Location:
            //   </Text>
            //   <Text className="text-base">
            //     Latitude: {location.coords.latitude}
            //   </Text>
            //   <Text className="text-base">
            //     Longitude: {location.coords.longitude}
            //   </Text>
            // </View>
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
              {isTracking ? (
                <StopCircle size={24} color="white" />
              ) : (
                <Play size={24} color="white" />
              )}
            </View>
          </Button>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
