import styled from "styled-components/native";
import { Colors } from "../../constants";
import {
  Dimensions,
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent,
} from "react-native";

const { width, height } = Dimensions.get("window");
const titleMargin = Platform.OS === "ios" ? 0 : 50;

export const ChatField = styled.FlatList`
  background-color: ${Colors.white};
  padding: 0px 20px 20px 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const ChatView = styled.SafeAreaView`
  background-color: ${Colors.white};
`;

export const SelectedImagesContainer = styled.ScrollView`
  padding: 0px 10px 0px 10px;
`;

export const PageTitle = styled.Text`
  align-self: center;
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.white};
  /* margin-left: ${width * 0.035897}px;
  margin-right: ${width * 0.035897}px;
  margin-top: ${titleMargin}px; */
`;

export const HorizonTitle = styled.View`
  /* background-color: ${Colors.red}; */
  margin-left: ${width * 0.035897}px;
  /* margin-right: ${width * 0.035897}px; */
  margin-top: ${titleMargin}px;
  flex-direction: row;

  align-items: center;
  flex: 1;
`;

export const WhiteContainer = styled.View`
  background-color: ${Colors.white};
`;

export const BlueFooter = styled.View`
  background-color: ${Colors.blue};
  align-items: center;
  justify-content: center;
  padding-top: 10px;
`;

export const BlueKeyboard = styled.KeyboardAvoidingView`
  background-color: ${Colors.blue};
  padding-top: 10px;
`;

export const DoneButton = styled.TouchableOpacity`
  margin-left: auto;
  flex-direction: row;
  padding: 10px;
  width: 50px;
  height: 50px;
  background-color: ${Colors.teal};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

export const CallButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;
  width: 50px;
  height: 50px;
  background-color: ${Colors.white};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-left: auto;
`;

export const PhoneNumber = styled.Text`
  font-size: 12px;

  font-weight: bold;
  color: ${Colors.blue};
`;

export const ChatInputContainer = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.blue};
  height: ${height * 0.094786}px;
  padding: 20px;
`;

export const GreyInput = styled.TextInput`
  font-size: 15px;
  background-color: ${Colors.white};
  border-radius: 10px;
  height: 40px;
  flex: 1;
  padding: 10px;
  margin-right: ${width * 0.046153}px;
`;

export const PictureButton = styled.TouchableOpacity`
  margin-left: ${width * 0.046153}px;
  margin-right: ${width * 0.046153}px;
`;

export const MedButton = styled.TouchableOpacity`
  margin-right: ${width * 0.046153}px;
`;

export const RemoveButton = styled.TouchableOpacity``;

export const SendButton = styled.TouchableOpacity`
  /* margin-right: ${width * 0.046153}px; */
  margin-right: ${width * 0.046153}px;
`;

export const SelectedImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin-top: 10px;
`;

export const SelectedImageContainer = styled.View``;

export const BubbleContainer = styled.View`
  margin-bottom: 10px;
`;

export const BlueContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.blue};
  width: 100%;
`;

export const Wrapper = styled.KeyboardAvoidingView`
  background-color: ${Colors.red};
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const ProfileContainer = styled.SafeAreaView`
  display: flex;
  height: 100%;
  background-color: ${Colors.blue};
  border-radius: 20px;
  box-shadow: 0px 0px 70px grey;
`;

export const ProfileTitleContainer = styled.SafeAreaView`
  margin-bottom: 30px;
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
`;

export const ProfileTitle = styled.Text`
  align-self: center;
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.white};
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const ProfileImgContainer = styled.View`
  align-items: center;
`;

export const InfoContainer = styled.View`
  padding: 20px;
`;
export const InfoText = styled.Text`
  font-size: 15px;
  color: ${Colors.black};
  margin-bottom: 10px;
`;
export const CaseText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.red};
  margin-bottom: 10px;
`;

export const InfoScrollable = styled.ScrollView`
  background-color: ${Colors.white};
`;

export const CaseImage = styled.Image`
  width: 200px;
  height: 200px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  elevation: 10;
`;
