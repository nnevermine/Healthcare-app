import styled from "styled-components/native";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const FindButton = styled.TouchableOpacity`
  width: ${height * 0.2962}px;
  height: ${height * 0.2962}px;
  border-radius: 200px;
  background-color: ${Colors.teal};
  margin-top: ${height * 0.04739}px;
  margin-left: ${width * 0.1794}px;
  justify-content: center;
  align-items: center;
  padding: 53px;
`;

export const WaitingButton = styled.TouchableOpacity`
  width: ${height * 0.2962}px;
  height: ${height * 0.2962}px;
  border-radius: 200px;
  background-color: ${Colors.grey};
  margin-top: ${height * 0.04739}px;
  margin-left: ${width * 0.1794}px;
  justify-content: center;
  align-items: center;
  padding: 53px;
`;

export const FindButtonText = styled.Text`
  font-size: 24px;
  align-self: center;
  font-family: Monaco;
  text-align: center;
  color: ${Colors.white};
`;

export const PromptText1 = styled.Text`
  width: ${width * 0.62564}px;
  font-size: 20px;
  align-self: center;
  font-family: Monaco;
  font-weight: bold;
  color: ${Colors.blue};
  margin-top: ${height * 0.12914}px;
  margin-left: ${width * 0.02564}px;
`;

export const FindTitle = styled.Text`
  color: ${Colors.blue};
  font-family: Monaco;
  font-weight: bold;
  font-size: 25px;
  margin-top: ${height * 0.023696}px;
  margin-left: ${width * 0.0641}px;
`;

export const PharmacyIcon = styled.Image`
  width: ${width * 0.27948}px;
  height: ${width * 0.27948}px;
  margin-left: ${width * 0.30769}px;
  margin-top: ${height * 0.04739}px;
`;

export const FindingPrompt = styled.Text`
  color: ${Colors.blue};
  font-family: Monaco;
  font-weight: bold;
  font-size: 20px;
  margin-top: ${height * 0.09004}px;
  margin-left: ${width * 0.02889}px;
  text-align: center;
`;

export const ChattingButton = styled.TouchableOpacity`
  font-size: 17px;
  background-color: ${Colors.teal};
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  width: ${width * 0.87179}px;
  height: ${height * 0.05331}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${height * 0.02132}px;
  margin-left: ${width * 0.06923}px;
`;

export const WhiteButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  font-family: Monaco;
  color: ${Colors.white};
`;

export const InlineIcon = styled(Icon)`
  padding-top: 5px;
`;

export const ButtonContainer = styled.View``;

export const FindContainer = styled.View``;