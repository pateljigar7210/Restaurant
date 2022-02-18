/**
 * @format
 */
import React, { useEffect, useState } from "react";
import { View } from "native-base";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Geolocation from "react-native-geolocation-service";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from "react-native";
import { showSnackbar } from "../../utils/SnackBar";
import { theme } from "../../theme";

interface locationData {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number | 0;
  longitude: number | 0;
  speed: number;
}

const defultLatLong = {
  accuracy: 5,
  altitude: 5,
  altitudeAccuracy: 0.5,
  heading: 0,
  latitude: 20.6509,
  longitude: 73.0464,
  speed: 0,
};

let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 5; //map zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function Map(props: any) {
  const { route } = props;
  const [curuntLatLong, setCurrentLatLong] =
    useState<locationData>(defultLatLong);
  const [desinationLatLong, setDesinationLatLong] = useState<any>();

  useEffect(() => {
    if (route.params) {
      const data = {
        latitude: parseFloat(route.params.latitude),
        longitude: parseFloat(route.params.longitude),
      };
      setDesinationLatLong(data);
    }
  }, [route.params]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getLocation();
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    return () => {
      requestLocationPermission();
      setDesinationLatLong(null);
    };
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const latLong = position.coords as locationData;
        setCurrentLatLong(latLong);
      },
      (error) => {
        showSnackbar({ message: error.message, type: "danger" });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        provider={"google"}
        initialRegion={{
          latitude: curuntLatLong.latitude,
          longitude: curuntLatLong.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {desinationLatLong && (
          <MapViewDirections
            origin={{
              latitude: curuntLatLong.latitude,
              longitude: curuntLatLong.longitude,
            }}
            destination={desinationLatLong}
            apikey={"AIzaSyDEt0nZud8h4k4iDmLJb0kpC24QD-WcCHc"} // insert your API Key here
            strokeWidth={4}
            strokeColor={theme.colors.primary[200]}
          />
        )}

        <Marker
          coordinate={curuntLatLong}
          description={"This is a marker in React Natve"}
        >
          <MaterialIcons
            name="location-on"
            color={theme.colors.primary[100]}
            size={35}
          />
        </Marker>

        {desinationLatLong && (
          <Marker
            coordinate={desinationLatLong}
            description={"This is a marker in React Natve"}
          >
            <MaterialIcons
              name="location-on"
              color={theme.colors.primary[200]}
              size={35}
            />
          </Marker>
        )}
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
