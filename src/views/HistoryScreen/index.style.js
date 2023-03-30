import styled from "styled-components/native";
import { Colors } from "../../constants";
export const Background = styled.ScrollView`
  background-color: ${Colors.white};
  flex: 1;
  flex-direction: column;
  padding: 25px 25px 0px 25px;
`;
export const Title = styled.Text`
  color: ${Colors.blue};
  font-family: Monaco;
  font-weight: bold;
  font-size: 25px;
  margin-top:45px;
  margin-bottom:50px;
`;
export const Block = styled.ScrollView`
border: 1px solid ${Colors.blue};
width:340px;
height:120px;
padding:20px;
border-radius:20px;
margin-bottom:20px;

`
export const Id = styled.Text`
  color: ${Colors.blue};
  font-family: Monaco;
  font-weight: bold;
  font-size: 20px;
`
export const IdContainer = styled.View`
flex-direction: row;
justify-content: space-between;
`
export const Status = styled.Text`
color: ${Colors.grey};
  font-family: Monaco;
  font-size: 14px;
`
export const Name = styled.Text`
  color: ${Colors.blue};
  font-family: Monaco;
  font-weight: bold;
  font-size: 17px;
`
export const Medication = styled.Text`
color: ${Colors.blue};
  font-family: Monaco;
  font-size: 14px;
`
export const Space = styled.View`
height:30px;
width:100%;
`