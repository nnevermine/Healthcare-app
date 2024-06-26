import styled from "styled-components/native";
import { Colors } from "../../constants";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.white};
  padding: 25px 25px 0px 25px;
  width: 100%;
  justify-content: center;
  align-self: center;
`;
export const Title = styled.Text`
  color: ${Colors.blue};
  
  font-weight: bold;
  font-size: 40px;
  align-self: center;
`;
export const Text = styled.Text`
  color: ${Colors.blue};
  
  font-weight: light;
  font-style: italic;
  font-size: 15px;
  align-self: center;
`;
export const Image = styled.Image`
  width: 150px;
  height: 150px;
  align-self: center;
`;

export const ThemeButton = styled.TouchableOpacity`
  margin-top:200px;
  padding: 15px;
  width: 300px;
  height: 60px;
  border: 1px solid ${Colors.blue};
  align-self: center;
  background-color: white;
  border-radius: 10px;
`;
export const ThemeButtonText = styled.Text`
  font-size: 20px;
  align-self: center;
  
  font-weight: bold;
  color: ${Colors.blue};
`;
export const ThemeButton2 = styled.TouchableOpacity`
  margin-top: 30px;
  padding: 15px;
  width: 300px;
  height: 60px;
  align-self: center;
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


