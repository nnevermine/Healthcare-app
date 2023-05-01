import {
  MedContainer,
  MedColumn,
  MedRow,
  MedText,
  MedTextInput,
  QtyInput,
  PriceInput,
  MedScollable,
  MedFirstColumn,
  HorizonInput,
  SaveButton,
  WhiteButtonText,
  CloseButton,
  TotalText,
  WhiteContainer,
  PageTitle,
  AddMedicineButton,
  MedicineScrollable,
  PreContainer,
  Wrapper,
} from "./index.style";
import {
  CircleButton,
  FormInput,
  SmallFormInput,
  BigFormInput,
  BlueContainer,
  SignUpForm,
  FormText,
  PageTitleContainer,
  BlueButtonText,
  WhiteKeyboard,
  DateCalendar,
} from "../../components/components/index.style";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";

import AddMedicine from "../../components/AddMedicine";
import MedicineOrder from "../../components/MedicineOrder";

export default function Prescription({ navigation, route }) {
  const [medications, setMedication] = useState([]);
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { medication } = route.params;

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleMedications = (value) => {
    setMedication([ ...medications, value]);
  };

  const saveAndClose = () => {
    route.params.updateData(medications)
    navigation.goBack()
  };

  useEffect(() => {
    if(medications.length <= 0){
      setMedication(medication);
    }
  }, []);

  return (
    <PreContainer>
      <PageTitleContainer>
        <CircleButton
          onPress={saveAndClose}
          style={{ backgroundColor: Colors.white }}
        >
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            color={Colors.blue}
            size={20}
          />
        </CircleButton>
        <PageTitle>Prescription</PageTitle>
      </PageTitleContainer>
      {medications.length > 0 && (
        <Wrapper>
        <MedicineScrollable>
          {medications.map((val, index) => {
            return <MedicineOrder data={val}></MedicineOrder>;
          })}
        </MedicineScrollable>
        </Wrapper>
      )}
      <AddMedicineButton onPress={toggleModal}>
      <Icon
            name="add-outline"
            type="ionicon"
            color={Colors.blue}
            size={20}
          />
      </AddMedicineButton>
      <Modal
            visible={isModalVisible}
            animationType="fade"
            backdropOpacity={0.5}
          >
            <SafeAreaView>
              <AddMedicine
                handleModalVisible={toggleModal}
                handleSaveMedications={handleMedications}
              />
            </SafeAreaView>
          </Modal>
    </PreContainer>
  );
}