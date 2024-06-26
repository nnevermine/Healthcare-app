import {
  ChatContainer,
  DetailContainer,
  ChatName,
  LastMassage,
} from "./index.style";
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
import React, { useState, useEffect } from "react";
import Auth from "../../api/auth";
import { AsyncStorage, Alert, ActivityIndicator } from "react-native";
import { LoadingContainer } from "../components/index.style";

export default function ChatModule({ navigation, chat, myUID }) {
  const [chatName, setChatName] = useState("");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getChatter = async (myUID) => {
    const otherUID = chat.data().member.filter((jobID) => jobID !== myUID);
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.getUserByUID({
      params: { uid: otherUID },
    });
    if (user.isOk) {
      return user;
    }
  };
  const fetchData = async (myUID) => {
    const data = await getChatter(myUID);
    setChatName(data.data.medicalInformation.name);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(myUID);
  }, []);

  return (
    <ChatContainer
      onPress={() =>
        navigation.navigate("Chatting", {
          chatName: chatName,
          groupID: chat.data().jobId,
          myUID: myUID,
        })
      }
    >
      <Avatar
        // source={require("../../../assets/appLogo.png")}
        size={"large"}
        rounded
        icon={{ name: "user", type: "font-awesome" }}
        overlayContainerStyle={{ backgroundColor: "#efece8" }}
      ></Avatar>

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="small" color={Colors.blue} />
        </LoadingContainer>
      ) : (
        <DetailContainer>
          <ChatName>{chatName}</ChatName>
          <LastMassage>{chat.data().lastMsg.message}</LastMassage>
        </DetailContainer>
      )}
    </ChatContainer>
  );
}
