import { useState } from "react";
import { SafeAreaView, Text, Alert, View, KeyboardAvoidingView } from "react-native";
import {
  ThemeButton,
  ThemeButtonText,
  Or,
  ForgotPassword,
  CircleButton,
  SendButton,
} from "./index.style";
import {
  Input,
  InputGroup,
  SubTitle,
  ItalicText2,
  BlueContainer,
  Form,
  NonScrollForm,
  BlueButton,
  BlueButtonText,
  WhiteKeyboard,
} from "../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import BackButton from "../../components/BackButton";
import Auth from "../../api/auth";
import { Formik, ErrorMessage } from "formik";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
function ForgetPasswordPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function createAlert() {
    Alert.alert("Forget password", "Password reset email sent!", [
      {
        text: "Ok",
        style: "cancel",
      },
    ]);
  }
  const handleSubmit = (values) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, values.email)
    .then(() => {
      // Password reset email sent!
      // ..
      createAlert();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    //Send forget password
    console.log("values.email",values.email)

  };
  return (
    <BlueContainer>
      <CircleButton onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back-outline"
          type="ionicon"
          color={Colors.blue}
          size={20}
        />
      </CircleButton>
      <Formik
        initialValues={{email:email}}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
          }else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        validateOnChange={false}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
        }) => (
          <WhiteKeyboard
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 0 }}
          >
          <NonScrollForm>
            <SubTitle>Password Recovery</SubTitle>
            <ItalicText2>
              Please enter your Email address, we will send you a password
              recovery email
            </ItalicText2>
            <InputGroup>
              <Icon
                name="mail-outline"
                type="ionicon"
                color={Colors.grey}
                size={30}
              />

              <Input
                type="text"
                  placeholder="Email address"
                  placeholderTextColor={Colors.grey}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
              />
            </InputGroup>
            <ErrorMessage
              name="email"
              component={Text}
              style={{ color: "red", paddingLeft:40 }}
            />
            <SendButton onPress={handleSubmit}>
              <BlueButtonText>Send</BlueButtonText>
            </SendButton>
          </NonScrollForm>
          </WhiteKeyboard>
        )}
      </Formik>
    </BlueContainer>
  );
}
export default ForgetPasswordPage;
