import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const titleMargin = Platform.OS === "ios" ? 0 : 60;

export const TitleContainer = styled.View`
  flex-direction: row;
  margin-top: ${titleMargin}px ;
`;

export const FirstListTitle = styled.Text`
  color: ${Colors.blue};
  
  font-weight: bold;
  font-size: 25px;
  margin-top: ${height * 0.023696}px;
  margin-bottom: ${height * 0.039099}px;
  margin-left: ${width * 0.0641}px;
`;

export const FirstListContainer = styled.View`
  margin-left: ${width * 0.0641}px;
  margin-right: ${width * 0.0641}px;
`;

export const FirstScrollable = styled.ScrollView`
  height: ${height * 0.799142}px;
`;

export const FirstContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${height * 0.023246}px;
`;

export const DetailContainer = styled.View`
  border-width: 2px;
  border-color: ${Colors.blue};
  border-style: solid;
  flex:1;
  padding:10px;
  border-radius:5px;
  flex-direction:row;
  justify-content:space-between;
`;

export const FirstName = styled.Text`
  color: ${Colors.blue};
  
  font-weight: bold;
  font-size: 20px;
  margin-bottom: ${height * 0.007109}px;
`;

export const Description = styled.Text`
  color: ${Colors.blue};
  
  font-size: 15px;
`;

export const BlueCircleButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  elevation: 10;
  background-color: ${Colors.blue};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
