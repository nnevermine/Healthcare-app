import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SosButton = styled.TouchableOpacity`
  width: ${height * 0.2962}px;
  height: ${height * 0.2962}px;
  border-radius: 200px;
  background-color: ${Colors.red};
  margin-top: ${height * 0.03436}px;
  margin-left: ${width * 0.1794}px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.8);
  elevation: 10;
`;

export const SosButtonText = styled.Text`
  font-size: 64px;
  align-self: center;

  font-weight: bold;
  color: ${Colors.white};
`;

export const PromptText1 = styled.Text`
  width: ${width * 0.62564}px;
  font-size: 17px;
  align-self: center;
  justify-self:center;
  text-align:center;
  margin-top: ${height * 0.10436}px;
  font-weight: bold;
  color: ${Colors.blue};
  margin-left: ${width * 0.02564}px;
`;

export const SosTitle = styled.Text`
  color: ${Colors.blue};

  font-weight: bold;
  font-size: 25px;
  margin-left: ${width * 0.0641}px;
`;

export const SosContainer = styled.View``;
export const ThemeButton2 = styled.Pressable`
  padding: 15px;
  flex:1;
  height: 64px;
  align-self: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  background-color: ${Colors.blue};
  border-radius: 10px;
`;
export const ThemeButtonText2 = styled.Text`
  font-size: 20px;
  padding: 0;
  align-self: center;

  font-weight: bold;
  color: ${Colors.white};
`;
export const FirstAidContainer = styled.View`
flex-direction:row;
justify-content:center;
margin:50px 25px 0px 25px;
`
export const CprButton = styled.Pressable`
`
export const Cpr = styled.Image`
  width: 64px;
  height: 64px;
  margin-left: 10px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
  elevation: 10;
`;
