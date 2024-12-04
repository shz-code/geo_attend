import React, { FC } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Circle } from "react-native-maps";

interface MapProps {
  coordinates: {
    lat: number;
    lon: number;
  };
}

const Map: FC<MapProps> = ({ coordinates }) => {
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        <Circle
          center={{ latitude: coordinates.lat, longitude: coordinates.lon }}
          radius={500} // Radius in meters
          strokeColor="rgba(0, 0, 255, 0.5)" // Circle border color
          fillColor="rgba(0, 0, 255, 0.2)" // Circle fill color
        />
      </MapView>
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
