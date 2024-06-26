import {
  DetailContainer,
  ChatName,
  LastMassage,
  RequestContainer,
  HorizonInput3,
  BlueBorderButton,
  BlueButtonText,
  BlueButton,
  WhiteButtonText,
  PatientName,
  PatientNameContainer,
  TimeStamp,
  LocationText,
  DesContainer,
} from "./index.style";
import Auth from "../../api/auth";
import * as ImagePicker from "expo-image-picker";
import { AsyncStorage, Alert } from "react-native";
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
import React, { useState, useEffect } from "react";

export default function MedicineOrder({ data, handleDeleteMedications, handleEditMedications, myIndex }) {
  const [medicineName, setMedicineName] = useState("MED");
  const [description, setDescription] = useState("DES");
  const [price, setPrice] = useState("PRICE");

  useEffect(() => {
    setMedicineName(data.name);
    setDescription(data.dosage);
    setPrice(data.price);
  }, []);
  const acceptRequest = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.postAcceptJob({
      body: { jobId: data.jobId, round: data.round },
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

  const declineRequest = async () => {
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
  return (
    <RequestContainer>
      <DetailContainer>
        <PatientNameContainer>
          <PatientName>{medicineName}</PatientName>
          <TimeStamp>{price}</TimeStamp>
        </PatientNameContainer>
        <PatientNameContainer>
        <DesContainer>
        <LocationText>{description}</LocationText>
        </DesContainer>
        </PatientNameContainer>
        <HorizonInput3>
          <BlueBorderButton onPress={() => handleDeleteMedications(myIndex)}>
            <BlueButtonText>Delete</BlueButtonText>
          </BlueBorderButton>
          <BlueButton onPress={() => handleEditMedications(myIndex)}>
            <WhiteButtonText >Edit</WhiteButtonText>
          </BlueButton>
        </HorizonInput3>
      </DetailContainer>
    </RequestContainer>
  );
}
