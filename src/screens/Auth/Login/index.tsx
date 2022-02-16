import React, {useRef} from 'react';
import {Text, Button, View} from 'native-base';
import {StyleSheet, TouchableOpacity, Platform, TextInput, ImageBackground} from 'react-native';
import * as Yup from 'yup';
import {FormikProps, useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import images from '../../../assets/images';
import {Caption} from '../../../components/Typography';
import AuthHeader from '../Components/AuthHeader';
import {RootStackParamList} from '../../../navigation';
import {userLogin, getUserProfile} from '../../../redux/reducers/user/UserServices';
import FloatingInput from '../../../components/FloatingInput';
import {theme} from '../../../theme';
import useUserInfo from '../../../hooks/useUserInfo';

interface MyFormValues {
  Username: string;
  password: string;
}

const schema = Yup.object().shape({
  Username: Yup.string().required('Please enter valid email'),
  password: Yup.string().required(
    'Please enter valid password and long text of error and long text of error',
  ),
});

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login(props: Props) {
  const {navigation} = props;
  const dispatch = useDispatch();

  const passwordRef = useRef<TextInput>(null);

  const user = useUserInfo();
  const {loading, documentId} = user;

  const onSubmit = React.useCallback(
    async (values: MyFormValues) => {
      try {
        const Username = values.Username?.toLowerCase();
        const newValues: MyFormValues = {...values, Username};
        await dispatch(userLogin(newValues));
        // eslint-disable-next-line no-empty
      } catch (error) {}
    },
    [dispatch],
  );

  const lockIcon = (iconData: {color: string}) => {
    return (
      <SimpleLineIcons name="lock" size={18} color={iconData.color} style={styles.iconStyle} />
    );
  };

  const userIcon = (iconData: {color: string}) => {
    return (
      <SimpleLineIcons name="user" size={18} color={iconData.color} style={styles.iconStyle} />
    );
  };
  // eslint-disable-next-line no-unused-expressions
  Platform.OS === 'android' ? AndroidKeyboardAdjust.setAdjustResize() : null;

  const focusPassword = () => passwordRef.current?.focus();

  const initialValues = {Username: '', password: ''};

  const formik: FormikProps<MyFormValues> = useFormik<MyFormValues>({
    initialValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit,
  });

  const {handleChange, handleSubmit, values, errors, resetForm} = formik;

  React.useEffect(() => {
    if (documentId) {
      dispatch(getUserProfile(documentId));
      resetForm();
    }
  }, [documentId, dispatch, resetForm]);

  return (
    <ImageBackground
      source={images.LOGIN_BACKGROUND}
      style={styles.backgroundImageStyle}
      blurRadius={2}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            {/* <View>
              <Caption mt={5} color={theme.colors.white} fontSize={16}>
                “Whoever would overthrow the liberty of a nation must begin by subduing the freeness
                of speech.” - Benjamin Franklin.
              </Caption>
            </View> */}
            <View style={styles.headerStyle}>
              <AuthHeader />
            </View>
            <View width="100%" mt={12}>
              <View mt={5}>
                <FloatingInput
                  label="Email/ Username"
                  lowerCaseOnly
                  keyboardType="email-address"
                  autoComplete="email"
                  value={values.Username}
                  onChangeText={handleChange('Username')}
                  error={errors.Username}
                  returnKeyType="next"
                  onSubmitEditing={focusPassword}
                  viewStyle={styles.viewStyle}
                  inputStyles={styles.inputStyles}
                  containerStyles={styles.containerStyles}
                  labelStyles={styles.labelStyles}
                  leftIcon={(iconData: {color: string}) => userIcon(iconData)}
                />
              </View>
              <View mt={4}>
                <FloatingInput
                  ref={passwordRef}
                  label="Password"
                  autoComplete="password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  isPassword
                  error={errors.password}
                  returnKeyType="done"
                  onSubmitEditing={() => handleSubmit()}
                  viewStyle={styles.viewStyle}
                  inputStyles={styles.inputStyles}
                  containerStyles={styles.containerStyles}
                  labelStyles={styles.labelStyles}
                  leftIcon={(iconData: {color: string}) => lockIcon(iconData)}
                />
              </View>
              <View mt={4} style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text color={theme.colors.blue[300]}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <View mt={4}>
                <Button
                  mt="5"
                  style={styles.buttonStyle}
                  onPress={() => handleSubmit()}
                  isLoading={loading}
                  isLoadingText="Logging In">
                  Sign In
                </Button>
              </View>

              <View style={styles.footer} mt={5}>
                <TouchableOpacity activeOpacity={1} style={styles.registerTextStyle}>
                  <Text color={theme.colors.white}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text color={theme.colors.blue[300]}>Register</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Login;

const styles = StyleSheet.create({
  backgroundImageStyle: {
    flexGrow: 1,
  },
  safeAreaView: {
    flexGrow: 1,
    backgroundColor: theme.colors.transparentGray[100],
  },
  container: {
    flexGrow: 1,
    padding: 25,
    marginTop: 40,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    color: theme.colors.primary,
  },
  viewStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRadius: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    flex: 1,
    marginStart: 10,
  },
  iconStyle: {
    marginBottom: Platform.OS === 'android' ? 15 : 4,
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
  },
  registerTextStyle: {
    flexDirection: 'row',
  },
  headerStyle: {alignItems: 'center'},
});
