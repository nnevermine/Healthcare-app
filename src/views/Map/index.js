import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import { Colors } from "../../constants";
import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../lib/firebase";
import * as Location from "expo-location";
import { Google } from "expo";
import { Audio } from "expo-av";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  Title,
  ItalicText,
  LoadingContainer,
} from "../../components/components/index.style";
import {
  Container,
  MapContainer,
  Image,
  Text,
  ThemeButton,
  ThemeButtonText,
  ThemeButton2,
  ThemeButtonText2,
  RoundButton,
  FindingPrompt,
  InlineIcon,
  HospitalName,
  DistanceText,
  ChatButton,
  ChatIcon,
  FirstAidContainer,
  Cpr,
  CprButton
} from "./index.style";
import { ScrollView } from "react-navigation";
import Auth from "../../api/auth";
import { AsyncStorage, Alert } from "react-native";
import MapFinder from "../MapFinder";
import MapFound from "../MapFound";


function MapPage({ navigation, route }) {
  const [sound, setSound] = useState();
  const [play, setPlay]=useState(false);
  async function loadSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../../../assets/heartbeatTempo.mp3')
    );
    setSound(sound);
  }
  async function handleClicked(){
    if(!play){
      setPlay(true)
      await sound.playAsync();
    }else{
      setPlay(false)
      await sound.stopAsync();
    }
  }

  const mapRef = useRef(null);
  const origin = "Bangkok";
  const apiKey = "AIzaSyB1OZN6aK-ey5ZPoeezFvZ5yhtYyS-CRDs";
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=13.771864275082%2c100.575864649699&radius=500&type=hospital&key=${apiKey}`;
  // const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${apiKey}`;
  // const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=13.771864275082%2c100.575864649699&radius=500&type=hospital&key=${apiKey}`;

  const markers = [
    { latitude: 13.773508065440815, longitude: 100.5730804572769 },
    { latitude: 8.444526370150388, longitude: 99.96210658564331 },
    { latitude: 13.771864275082038, longitude: 100.57586464969924 },
    { latitude: 13.97918633927129, longitude: 98.33740674666498 },
  ];  
  const myToken = route.params.myToken;
  // axios.get(placesUrl);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [nearbyPlaces, setNearby] = useState(null);
  const [destinationMap, setDestination] = useState(null);
  const [myUID, setMyUID] = useState("");
  const [foundHospital, setFoundHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("finding");
  const [duration, setDuration] = useState("");
  const auth = useSelector((state) => state.Authentication);
  const isAuthenticated = auth.isAuthenticated;
  const matchedHospital = {
    Name: "EiEi Hospital",
    ParamedicName: "Tee Hid",
    latitude: 13.7226408802915,
    longitude: 100.7752069802915,
  };

  const cancelAmublance = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.postCancelJob({
      body: { jobId: myToken.data.jobId, round: "1" },
      token: token,
    });
    if (user.isOk) {
      console.log(user);
    }
    // try {
    //   console.log("here");
    //   const postEmergency = async () => {
    //     const token = await AsyncStorage.getItem("token");
    //     const user = await Auth.postEmergencyCase({
    //       body: {},
    //       token: token,
    //     });
    //     if (!user.isOk) {
    //       console.log("NOT OK ", user);
    //     }
    //     if (user.isOk) {
    //       console.log("response = ", user);
    //       setJobId(user.data.jobId);
    //       console.log(user.data.jobId);
    //     }
    //   };
    //   await postEmergency();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const getHospital = async (lat, lng, radius = 1000) => {
    setLoading(true);
    let curLocation = lat + "%2c" + lng;
    setRegion({
      region: {
        latitude: lat,
        longitude: lng,
        latitudeDelta:  0.222,
        longitudeDelta: 0.0821,
      },
    });
    let destination =
      matchedHospital.latitude + "%2c" + matchedHospital.longitude;
    // getDistance(curLocation, destination);

    setLoading(false);
  };

  const getDistance = async (inFoundHospital) => {
    let curLocation = route.params.lat + "%2c" + route.params.lng;
    let destination = inFoundHospital.job.receiverUser.hospitalAddress.latitude + "%2c" + inFoundHospital.job.receiverUser.hospitalAddress.latitude;
    const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${curLocation}&destinations=${destination}&key=${apiKey}`;
    const response = await axios.get(distanceUrl);
    if (response != null) {
      setDuration(response.data.rows[0].elements[0].duration.text);
    }
  };

  const getReciever = async (jobId) => {
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.getHospitalByJobId({
      params: { id: jobId },
      token: token,
    });
    if (user.isOk) {
      // getDistance(user);
      return user;
    }
  };

  const fetchData = async (jobId) => {
    const data = await getReciever(jobId);
    console.log(data);
    setFoundHospital(data);
    setIsLoading(false);
  };

  useEffect(() => {
    try{
      loadSound();
    }catch(error){
      console.log('Failed to load sound', error)
    }
    if (auth.user) {
      setMyUID(auth.user.uid);
    }
    setLatitude(route.params.lat);
    setLongitude(route.params.lng);
    console.log("LAT:", route.params.lat);
    console.log("LNG:", route.params.lng);
    console.log("My token=", myToken.data.jobId);
    if (status == "doing") {
      fetchData(myToken.data.jobId);
    }

    // const unsub = onSnapshot(doc(db, "jobs", token.params), (doc) => {
    //   const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //   console.log(source, " data: ", doc.data());
    // });
    // axios
    //   .get(placesUrl)
    //   .then((response) => {
    //     setNearby(response.data.results);
    //     console.log(nearbyPlaces);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log("Error!!!!!!!!!!!!!!!!!!!!!!", error);
    //   });

    // axios
    //   .get(distanceUrl)
    //   .then((response) => {
    //     // Do something with the response data
    //     console.log(
    //       response.data.rows[0].elements[0].distance.text,
    //       response.data.rows[0].elements[0].duration.text
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    //   console.log("USERRR!!", user);
    // };
    // getUserID();

    // try {
    //   const getUserID = async () => {
    //     console.log("GET USER ID");
    //     const token = await AsyncStorage.getItem("token");
    //     const user = await Auth.getUserProfile({
    //       token: token,
    //     });
    //     console.log("User ID= ", user.data.user._id);
    //   };
    //   getUserID();
    // } catch (error) {
    //   console.log("ERROR!!!", error);
    // }

    const unsub = onSnapshot(doc(db, "jobs", myToken.data.jobId), (doc) => {
      if (doc.data()) {
        console.log("Current data: ", doc.data().status);
        setStatus(doc.data().status);
      }
    });
    axios
      .get(placesUrl)
      .then((response) => {
        setNearby(response.data.results);
        console.log(nearbyPlaces);
      })
      .catch((error) => {
        console.log("Error!", error);
      });

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      getHospital(location.coords.latitude, location.coords.longitude);
    })();
  }, [status]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (region) {
    text = JSON.stringify(region);
  }
  return (
    <Container>
      {status === "finding" || loading ? (
        <MapContainer>
          <MapFinder myLat={latitude} myLng={longitude} />
          <FindingPrompt>Waiting for available Ambulance ...</FindingPrompt>
          <ThemeButton onPress={cancelAmublance}>
            <ThemeButtonText>Cancelled</ThemeButtonText>
          </ThemeButton>
        </MapContainer>
      ) : status === "doing" ? (
        <MapContainer>
          {isLoading ? (
            <LoadingContainer>
              <ActivityIndicator size="large" color="#00a5cb" />
            </LoadingContainer>
          ) : (
            <MapContainer>
              <HospitalName>
                {foundHospital.job.receiverUser.hospital.name}
              </HospitalName>
              {/* <MapFound myLat={foundHospital.job.receiverUser.hospitalAddress.latitude} myLng={foundHospital.job.receiverUser.hospitalAddress.name} /> */}
              <MapView
                style={{ flex: 1, borderRadius: 20 }}
                initialRegion={region.region}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                zoomEnabled={true}
                zoomControlEnabled={true}
                rotateEnabled={false}
                ref={mapRef}
                mapType="standard"
                onMapError={(error) => console.log(error)}
                // onPress={(e) => console.log(e.nativeEvent)}
                // onLongPress={(e) =>
                //   getHospital(
                //     region.region.latitude,
                //     region.region.longitude,
                //     10000
                //   )
                // }
                onMarkerPress={(e) => console.log(e.nativeEvent.coordinate)}
                // onRegionChange={(e) => console.log(e.nativeEvent)}
                // onRegionChangeComplete={(e) => console.log(e.nativeEvent)}
              >
                <Marker
                  coordinate={{
                    latitude: foundHospital.job.receiverUser.hospitalAddress.latitude,
                    longitude: foundHospital.job.receiverUser.hospitalAddress.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                ></Marker>
              </MapView>
              <DistanceText>Estimated arrival time: {duration}</DistanceText>
              <FindingPrompt>
                Ambulance found
                <InlineIcon
                  name="checkmark-circle"
                  type="ionicon"
                  color={Colors.teal}
                  size={20}
                />
              </FindingPrompt>
              <ChatButton
                onPress={() =>
                  navigation.navigate("Chatting", {
                    chatName:
                      foundHospital.job.receiverUser.medicalInformation.name,
                    groupID: myToken.data.jobId,
                    myUID: myUID,
                  })
                }
              >
                <ChatIcon
                  name="chatbubble-ellipses-outline"
                  type="ionicon"
                  color={Colors.blue}
                  size={30}
                />
              </ChatButton>
            </MapContainer>
          )}
          {/* {isLoading ? (
            <LoadingContainer>
              <ActivityIndicator size="large" color="#00a5cb" />
            </LoadingContainer>
          ) : (
            <HospitalName>{foundHospital.receiverUser.hospital.name}</HospitalName>
          )} */}
        </MapContainer>
      ) : (
        <MapContainer>
          <FindingPrompt>
            Request Cancelled
            <InlineIcon
              name="alert-circle"
              type="ionicon"
              color={Colors.red}
              size={20}
            />
          </FindingPrompt>
        </MapContainer>
      )}
      <FirstAidContainer>
      <ThemeButton2 onPress={() => navigation.navigate("Firstaid")}>
        <ThemeButtonText2>First-aid Knowledge</ThemeButtonText2>
      </ThemeButton2>
      <CprButton onPress={handleClicked}> 
      <Cpr source= {require("../../../assets/cprIcon.png")}/>
      </CprButton>
      
      </FirstAidContainer>
    </Container>
  );
}

//AIzaSyBzfd20-1HPdKJWq3KZcU1wxgLxUpuZDhg
export default MapPage;
