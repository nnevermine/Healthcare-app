import {
  WhiteMessage,
  MyBubble,
  MessageContainer,
  MyTimeStamp,
  OthersBubble,
  OthersTimeStamp,
  BlueMessage,
  SelectedImage,
  ImagesContainer,
  MyImage,
} from "./index.style";
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
export default function ChatBubble({ message, timeStamp, sender, image }) {
  if (image === null) {
    image = [];
  }
  if (image.length === 0 && message === "") {
    return;
  } else {
    if (sender === "Me") {
      return (
        <MessageContainer>
          {image.length !== 0 && (
            <ImagesContainer>
              {image.map((val, index) => {
                return <MyImage source={{ uri: val }} key={index} />;
              })}
            </ImagesContainer>
          )}
          {message && (
            <MyBubble>
              <WhiteMessage>{message}</WhiteMessage>
            </MyBubble>
          )}

          <MyTimeStamp>{timeStamp}</MyTimeStamp>
        </MessageContainer>
      );
    } else {
      return (
        <MessageContainer>
          <OthersBubble>
            <BlueMessage>{message}</BlueMessage>
          </OthersBubble>
          <OthersTimeStamp>{timeStamp}</OthersTimeStamp>
        </MessageContainer>
      );
    }
  }
}