/**
 * @format
 */
import React, { useState } from "react";
import { View, Text } from "native-base";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { StyleSheet } from "react-native";

function Map() {
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };

  const [coordinates] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: "yellow" }}>
      <MapView
        style={styles.map}
        provider={"google"}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
      >
        {/* <MapViewDirections
        origin={coordinates[0]}
        destination={coordinates[1]}
        apikey={GOOGLE_API_KEY} // insert your API Key here
        strokeWidth={4}
        strokeColor="#111111"
      /> */}
        {/* <Marker coordinate={coordinates[0]} />
      <Marker coordinate={coordinates[1]} /> */}
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={"AIzaSyDEt0nZud8h4k4iDmLJb0kpC24QD-WcCHc"} // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Map;
