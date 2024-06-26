import React, { useState, useRef, useEffect } from "react";
import { View, Dimensions, Animated, Button } from "react-native";
import Geocoder from "react-native-geocoding";
import MapView, { Marker, Circle } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

function MapFinder({ navigation, route }) {
  Geocoder.init("AIzaSyA-Pb23fMnh-ofKWhoP9PC9Aaj9C81MCQM");
  const [radius, setRadius] = useState(1000);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  





  useEffect(() => {
    const interval = setInterval(() => {
      if (radius < 5000) {
        setRadius(radius + 400);
        // Zoom out the map as the radius increases

    
        const r = {
          ...region,
          latitudeDelta: region.latitudeDelta + 0.03,
          longitudeDelta: region.longitudeDelta + 0.03,
        };
  
        setRegion(r);
        mapRef.current.animateToRegion(r, 500);
      } else {
        // Zoom to marker after maximum radius is reached
        const markerRegion = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };

          
        mapRef.current.animateToRegion(markerRegion, 500);
      }
    }, 1000);
  
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  
    return () => {
      clearInterval(interval);
    };
  }, [radius]);

  const mapRef = useRef(null);

  const onMapReady = () => {
    mapRef.current.animateToRegion(region, 100);
  };



  const coordinates = [
    {
      latitude: 100.78825,
      longitude: -122.4324,
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        onMapReady={onMapReady}
        ref={mapRef}
      >
        <Circle
          center={{ latitude: 37.78825, longitude: -122.4324 }}
          radius={radius}
          fillColor="rgba(255, 0, 0, 0.2)"
          strokeColor="rgba(255, 0, 0, 0.8)"
          strokeWidth={2}
        />

        <CustomMarker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
        />

        {/* <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
        
          <View style={{ backgroundColor: "transparent" }}>
          <Animated.View
        style={{
          width: 35,
          height: 35,
          borderRadius: 100,
          backgroundColor: "orange",
          alignItems: "center",
          justifyContent: "center",
          opacity: opacity,
        }}
      >
        <MaterialCommunityIcons name="store" size={24} color="black" />
      </Animated.View>
          </View>
        </Marker> */}

        {coordinates.map((coordinate, index) => (
          <CustomMarker key={index} coordinate={coordinate} />
        ))}
      </MapView>
    </View>
  );
}

const CustomMarker = ({ coordinate,picked }) => {
  const [opacity, setOpacity] = useState(new Animated.Value(1));

  useEffect(() => {
    
    const intervalId = setInterval(() => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [opacity]);

  return (
    <Marker coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={{ backgroundColor: "transparent" }}>
        <Animated.View
          style={{
            width: 35,
            height: 35,
            borderRadius: 100,
            backgroundColor: !picked ? "yellow" : "green",
            alignItems: "center",
            justifyContent: "center",
            opacity: opacity,
          }}
        >
          <MaterialCommunityIcons name="store" size={24} color="black" />
        </Animated.View>
      </View>
    </Marker>
  );
};

export default MapFinder;
