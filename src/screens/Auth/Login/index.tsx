import React, { useRef } from "react";
import { Button, View } from "native-base";
import {
  StyleSheet,
  Platform,
  TextInput
} from "react-native";
import * as Yup from "yup";
import { FormikProps, useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { RootStackParamList } from "../../../navigation";
import FloatingInput from "../../../components/FloatingInput";
import { theme } from "../../../theme";
import useUserInfo from "../../../hooks/useUserInfo";
import { UserTypes } from "../../../redux/reducers/user/UserTypes";
import { showSnackbar } from "../../../utils/SnackBar";

interface MyFormValues {
  Username: string;
  password: string;
}

const schema = Yup.object().shape({
  Username: Yup.string().required("Please enter valid email"),
  password: Yup.string().required(
    "Please enter valid password and long text of error and long text of error"
  ),
});

const staticUserName = "jigar";
const staticPassWord = "Jigar#1122";

function Login() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useUserInfo();

  const passwordRef = useRef<TextInput>(null);

  const user = useUserInfo();
  const { loading, username, password } = user;

  const onSubmit = React.useCallback(
    async (values: MyFormValues) => {
      try {
        const Username = values.Username?.trim().toLowerCase();
        // get form value when api hit
        // const newValues: MyFormValues = {...values, Username};
        if (staticUserName.trim().toLowerCase() !== Username) {
          showSnackbar({ message: "wrong user name", type: "danger" });
          return;
        }
        if (values.password !== staticPassWord) {
          showSnackbar({ message: "wrong password", type: "danger" });
          return;
        }
        showSnackbar({ message: "user login successfuly", type: "success" });
        const data = {
          username: Username,
          password: values.password,
        };
        // pass data to api response store to redux
        // await dispatch(userLogin(data));
        await dispatch({
          type: UserTypes.LOGIN,
          payload: data,
        });
        // eslint-disable-next-line no-empty
      } catch (error) {}
    },
    [dispatch]
  );

  const focusPassword = () => passwordRef.current?.focus();

  const initialValues = { Username: "", password: "" };

  const formik: FormikProps<MyFormValues> = useFormik<MyFormValues>({
    initialValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit,
  });

  const lockIcon = (iconData: { color: string }) => {
    return (
      <SimpleLineIcons
        name="lock"
        size={18}
        color={iconData.color}
        style={styles.iconStyle}
      />
    );
  };

  const userIcon = (iconData: { color: string }) => {
    return (
      <SimpleLineIcons
        name="user"
        size={18}
        color={iconData.color}
        style={styles.iconStyle}
      />
    );
  };

  const { handleChange, handleSubmit, values, errors, resetForm } = formik;

  React.useEffect(() => {
    if (username) {
      resetForm();
    }
  }, [username, isLoggedIn, dispatch, resetForm]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View width="100%" mt={12}>
            <View mt={5}>
              <FloatingInput
                label="Email/ Username"
                lowerCaseOnly
                keyboardType="email-address"
                autoComplete="email"
                value={values.Username}
                onChangeText={handleChange("Username")}
                error={errors.Username}
                returnKeyType="next"
                onSubmitEditing={focusPassword}
                viewStyle={styles.viewStyle}
                inputStyles={styles.inputStyles}
                containerStyles={styles.containerStyles}
                labelStyles={styles.labelStyles}
                leftIcon={(iconData: { color: string }) => userIcon(iconData)}
              />
            </View>
            <View mt={4}>
              <FloatingInput
                ref={passwordRef}
                label="Password"
                autoComplete="password"
                value={values.password}
                onChangeText={handleChange("password")}
                isPassword
                error={errors.password}
                returnKeyType="done"
                onSubmitEditing={() => handleSubmit()}
                viewStyle={styles.viewStyle}
                inputStyles={styles.inputStyles}
                containerStyles={styles.containerStyles}
                labelStyles={styles.labelStyles}
                leftIcon={(iconData: { color: string }) => lockIcon(iconData)}
              />
            </View>
            <View mt={4} style={styles.forgotPassword}></View>
            <View mt={4}>
              <Button
                mt="5"
                style={styles.buttonStyle}
                onPress={() => handleSubmit()}
                isLoading={loading}
                isLoadingText="Logging In"
              >
                Sign In
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  backgroundImageStyle: {
    flexGrow: 1,
  },
  safeAreaView: {
    flexGrow: 1,
    backgroundColor: theme.colors.black[600],
  },
  container: {
    flexGrow: 1,
    padding: 25,
    marginTop: 40,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPassword: {
    alignItems: "flex-end",
    color: theme.colors.primary,
  },
  viewStyle: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRadius: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    flex: 1,
    marginStart: 10,
  },
  iconStyle: {
    marginBottom: Platform.OS === "android" ? 15 : 4,
  },
  inputStyles: {
    minHeight: 28,
    color: theme.colors.white,
    flex: 1,
    zIndex: 0,
    paddingHorizontal: 0,
  },
  labelStyles: {
    marginLeft: -5,
  },
  containerStyles: {
    paddingHorizontal: 0,
    paddingTop: 30,
  },
  buttonStyle: {
    borderRadius: 40,
    height: 45,
    backgroundColor:theme.colors.green[600]
  },
  registerTextStyle: {
    flexDirection: "row",
  },
  headerStyle: { alignItems: "center" },
});
