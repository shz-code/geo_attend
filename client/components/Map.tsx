import { LOCATION_TASK_NAME } from "@/lib/locationTask";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { getDistance } from "geolib";
import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, {
  Circle,
  LatLng,
  MapPressEvent,
  Marker,
  UserLocationChangeEvent,
} from "react-native-maps";

interface UserLocationType {
  lat: number;
  lon: number;
}

interface MapProps {
  coordinates: {
    lat: number;
    lon: number;
  };
}

const Map: FC<MapProps> = ({ coordinates }) => {
  const [userLocation, setUserLocation] =
    useState<UserLocationType>(coordinates);
  const [target, setTarget] = useState<LatLng | null>(null);
  const [attendanceRadius] = useState<number>(1000);

  const handlePress = (event: MapPressEvent) => {
    const latLan = event.nativeEvent.coordinate;
    setTarget(latLan);
  };

  const handleLocationChange = (event: UserLocationChangeEvent) => {
    const lat = event.nativeEvent.coordinate?.latitude!;
    const lon = event.nativeEvent.coordinate?.longitude!;

    setUserLocation({ lat, lon });
  };

  const isWithinRadius = () => {
    if (!target) return false;
    const distance = getDistance(
      { latitude: userLocation.lat, longitude: userLocation.lon },
      { latitude: target.latitude, longitude: target.longitude }
    );
    return distance <= attendanceRadius;
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android") {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.error("Notification permission not granted");
        }
      }

      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== "granted") {
        Alert.alert("Background location permission not granted");
        return;
      }

      const ck = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);

      if (!ck) {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.High,
          timeInterval: 20000, // 20 seconds
          foregroundService: {
            notificationTitle: "Location Tracking",
            notificationBody:
              "Your location is being tracked in the background.",
            notificationColor: "#FF0000",
          },
        });
      }
    })();
  }, []);

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation.lat,
          longitude: userLocation.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onPress={handlePress}
        onUserLocationChange={handleLocationChange}
      >
        {target && (
          <Circle
            center={target}
            radius={attendanceRadius} // Radius in meters
            strokeColor="rgba(0, 0, 255, 0.5)" // Circle border color
            fillColor="rgba(0, 0, 255, 0.2)" // Circle fill color
          />
        )}
        {target && <Marker coordinate={target} title="Target Location" />}
      </MapView>
      {target && (
        <Text className="text-center mt-4">
          {" "}
          {isWithinRadius()
            ? "You are within the required radius!"
            : "You are outside the required radius."}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: 400,
  },
});

export default Map;
