import { Icon, Avatar, Accessory } from "react-native-elements";
import { ToastProvider } from 'react-native-toast-notifications'
import {
  GreyText,
  Container,
  InfoInput,
  SmallInfoInput,
  DateCalendar,
  BigInfoInput,
  BlueButton,
  BlueButtonText,
  RedButton,
  LoadingContainer,
} from "../../components/components/index.style";
import { AuthenticationActions } from "../../../src/redux/store.js";
import Toggle from "react-native-toggle-input";
import {
  Background,
  EditButton,
  EditButtonText,
  AvaContainer,
  OnDutyWrapper
} from "./index.style";

import { useEffect, useState } from "react";
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import AvatarContainer from "../../components/Avatar";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "../../constants";
import { async, jsonEval } from "@firebase/util";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../api/auth";
function ProfileScreen({ navigation }) {
  const auth = useSelector((state) => state.Authentication);

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [mode, setMode] = useState("Edit");
  const dispatch = useDispatch();

  const [gender, setGender] = useState("");
  const [id, setID] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [onDuty, setOnDuty] = useState(null);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [staffId, setStaffId] = useState("")
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [licenseNum, setLicenseNum] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const dateFormat = (date) => {
    const mongodbDate = new Date(date);
    // Extract year, month, and day from the MongoDB date
    const year = mongodbDate.getFullYear();
    const month = mongodbDate.getMonth() + 1; // Add 1 to get 1-based month index
    const day = mongodbDate.getDate();

    // Concatenate year, month, and day to form a custom date string
    const dateString = `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
    return dateString;
  };
  const editMode = () => {
    if (mode === "Edit") {
      //editing
      setEdit(true);
      setMode("Save");
    } else {
      //save
      setEdit(false);
      const updateUser = async () => {
        const token = await AsyncStorage.getItem("token");
        const user = await Auth.updateUserProfile({
          body: {
            name: name,
            dateOfBirth: text,
            gender: gender,
            citizenId: id,
            phoneNumber: tel,
            address: address,
            city: city,
            zipCode: zipCode,
          },
          token: token,
        });
      };
      updateUser();
      setMode("Edit");
    }
  };
  const handleLogOut = async () => {
    await Auth.logout();
    dispatch(AuthenticationActions.logout({}));
    navigation.navigate("Landing");
  };


  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
  };
  const [toggle, setToggle] = useState(false)
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    try {
      const getUserData = async () => {
        setIsloading(true);
        const token = await AsyncStorage.getItem("token");
        const user = await Auth.getUserProfile({
          token: token,
        });
        setName(user.data.medicalInformation.name);
        setText(user.data.medicalInformation.dateOfBirth);
        setGender(user.data.medicalInformation.gender);
        setID(user.data.medicalInformation.citizenId);
        setTel(user.data.medicalInformation.phoneNumber);
        setAddress(user.data.address.address);
        setCity(user.data.address.city);
        setZipCode(user.data.address.zipCode);
        setIsloading(false);
        setRole(user.data.user.role);
        if (role === "paramedics") {
          setLicenseNum(user.data.paramedics.licenseId);
          setExpiryDate(user.data.paramedics.licenseExpireDate);
          if(onDuty===null){
            setOnDuty(user.data.paramedics.isOnDuty);
          }
          setStaffId(user.data.paramedics._id);
        }
        if (role === "pharmacist") {
          setLicenseNum(user.data.pharmacist.licenseId);
          setExpiryDate(user.data.pharmacist.licenseExpireDate);
        }
      };
      const putParamedics = async () =>{
        const token = await AsyncStorage.getItem("token");
        console.log("before:" ,onDuty)
        await Auth.putStaffOnDuty({
          body:{
            isOnDuty: onDuty
          },
          token: token,
        })
        console.log("after:" ,onDuty)
      }
      

      getUserData();
      if(role==="paramedics"){
          putParamedics()
      }
    } catch (error) {
      console.error(error);
    }
  }, [role, onDuty]);
  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#00a5cb" />
      </LoadingContainer>
    );
  }

  return (
    <ToastProvider>
    <Background>
      <AvaContainer>
        <AvatarContainer />
        <EditButton onPress={editMode}>
          <EditButtonText>{mode}</EditButtonText>
        </EditButton>
      </AvaContainer>
      <GreyText>Name</GreyText>
      <InfoInput onChangeText={setName} value={name} editable={edit} />
      <GreyText>Date of Birth</GreyText>
      <DateCalendar>
        <SmallInfoInput value={text} editable={edit} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Icon
          name="calendar-outline"
          type="ionicon"
          color={Colors.blue}
          size={30}
          onPress={() => {
            if (mode === "Save") {
              setShow(true);
            }
          }}
        />
      </DateCalendar>
      <GreyText>Gender</GreyText>
      <DropDownPicker
        open={open}
        value={gender}
        items={items}
        setOpen={setOpen}
        setValue={setGender}
        setItems={setItems}
        placeholder={gender}
        placeholderStyle={{
          fontSize: 15,
          color: "#00a5cb",
        }}
        style={{ borderColor: "#d8d8d8", backgroundColor: "white" }}
        textStyle={{
          color: "#00a5cb",
          fontWeight: "bold",
        }}
        disabled={!edit}
      />
      <GreyText>Citizen ID</GreyText>
      <InfoInput
        onChangeText={setID}
        value={id}
        maxLength={14}
        editable={edit}
      />
      <GreyText>Tel.</GreyText>
      <InfoInput
        onChangeText={setTel}
        value={tel}
        maxLength={10}
        editable={edit}
      />
      <GreyText>Address</GreyText>
      <BigInfoInput
        multiline
        numberOfLines={3}
        onChangeText={setAddress}
        value={address}
        editable={edit}
      />
      <GreyText>City</GreyText>
      <InfoInput onChangeText={setCity} value={city} editable={edit} />
      <GreyText>Zipcode</GreyText>
      <InfoInput onChangeText={setZipCode} value={zipCode} editable={edit} />
      <GreyText>Role</GreyText>
      <InfoInput value={role} editable={false} />
      {role === "paramedics" && (
        <View>
          <GreyText>License number</GreyText>
          <InfoInput value={licenseNum} editable={false} />
          <GreyText>License expiry date</GreyText>
          <InfoInput value={expiryDate} editable={false} />
          <OnDutyWrapper>
          <GreyText>On duty status</GreyText>
          <Toggle
            toggle={onDuty}
            setToggle={setOnDuty}
            color={"#00a5cb"}
            size={20}
            filled={true}
            circleColor={"white"}
          />
          </OnDutyWrapper>
          
        </View>
      )}
      {role === "pharmacist" && (
        <View>
          <GreyText>License number</GreyText>
          <InfoInput value={licenseNum} editable={false} />
          <GreyText>License expiry date</GreyText>
          <InfoInput value={expiryDate} editable={false} />
        </View>
      )}

      <BlueButton
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("MedInfoSummary")}
      >
        <BlueButtonText>View Medical Information</BlueButtonText>
      </BlueButton>
      <RedButton onPress={handleLogOut}>
        <BlueButtonText>Log out</BlueButtonText>
      </RedButton>
    </Background>
    </ToastProvider>
  );
}
export default ProfileScreen;
