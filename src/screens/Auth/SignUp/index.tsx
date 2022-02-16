import {Button, Checkbox, CheckIcon, Divider, Spinner, Text, View} from 'native-base';
import React, {useMemo, useState, useRef, useEffect} from 'react';
import {StyleSheet, Platform, TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as Yup from 'yup';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch} from 'react-redux';
import FloatingInput, {RenderError} from '../../../components/FloatingInput';
import AuthHeader from '../Components/AuthHeader';
import {RootStackParamList} from '../../../navigation';
import {checkUsernameIsValid, userSignUp} from '../../../redux/reducers/user/UserServices';
import useUserInfo from '../../../hooks/useUserInfo';
import images from '../../../assets/images';
import {theme} from '../../../theme';
import {PASS_REGEX} from '../../../constants/common';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

interface formProps extends Props {
  formikProps: FormikProps<MyFormValues>;
}

interface MyFormValues {
  email: string;
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
  aboveThirteen: boolean;
  tncAccepted: boolean;
  validUsername?: boolean;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Enter a valid email address.').required('Please enter valid email'),
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters long.')
    .max(72, 'Username has a maximum of 72 characters.')
    .matches(/^(\S+$)/, 'Username may not contain any spaces.')
    .required('Please enter valid username'),
  name: Yup.string()
    .min(2, 'Display name must be at least 2 characters long.')
    .max(72, 'Display name should be 2 to 72 characters long.')
    .required('Please enter valid display name'),
  password: Yup.string()
    .required('Please enter valid password')
    .max(72, 'Display name should be 8 to 128 characters long.')
    .matches(
      PASS_REGEX,
      'Password must contain: 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character, a minimum of 8 characters',
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Password and Confirm Password should match.',
  ),
  aboveThirteen: Yup.mixed().test(
    'test',
    'Please confirm that you are 13+ years old.',
    value => value,
  ),
  tncAccepted: Yup.mixed().test(
    'test',
    'Please confirm that you agree with the Terms & Conditions.',
    value => value,
  ),
});

function RenderForm(props: formProps) {
  const {navigation, formikProps} = props;

  const {values, errors, setFieldValue, validateField, setFieldError, handleChange, handleSubmit} =
    formikProps;
  const [active, setActive] = useState(true);
  const usernameRef = useRef<TextInput>(null);
  const displayName = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const cnfpasswordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const {loading} = useUserInfo();

  const [validatingUsername, setValidatingUsername] = useState(false);
  const userIcon = (iconData: {color: string}) => {
    return (
      <SimpleLineIcons name="user" size={18} color={iconData.color} style={styles.iconStyle} />
    );
  };
  const lockIcon = (iconData: {color: string}) => {
    return (
      <SimpleLineIcons name="lock" size={18} color={iconData.color} style={styles.iconStyle} />
    );
  };
  const emailIcon = (iconData: {color: string}) => {
    return <Fontisto name="email" size={18} color={iconData.color} style={styles.iconStyle} />;
  };
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    errors.email && active && focusEmail();
  }, [active, errors.email]);
  const isValidData = useMemo(() => {
    return (
      values.email &&
      values.password &&
      values.username &&
      values.name &&
      values.confirmPassword &&
      values.aboveThirteen &&
      values.tncAccepted
    );
  }, [values]);

  const validateUserName = async () => {
    setValidatingUsername(true);
    if (!values.username) {
      setFieldError('username', undefined);
      return;
    }
    validateField('username');
    const isValid = await checkUsernameIsValid(values.username);
    if (isValid) {
      setFieldValue('validUsername', true);
    } else {
      setFieldError('username', 'Username already in use, please select another.');
    }
    setValidatingUsername(false);
  };
  // eslint-disable-next-line no-unused-expressions
  Platform.OS === 'android' ? AndroidKeyboardAdjust.setAdjustResize() : null;

  const focusUsername = () => usernameRef.current?.focus();
  const focusDisplay = () => displayName.current?.focus();
  const focusPassword = () => passwordRef.current?.focus();
  const focusConfirmPassword = () => cnfpasswordRef.current?.focus();
  const focusEmail = () => emailRef.current?.focus();
  return (
    <>
      <View mt={5}>
        <FloatingInput
          ref={emailRef}
          label="Email Address"
          lowerCaseOnly
          keyboardType="email-address"
          autoComplete="email"
          value={values.email}
          onChangeText={handleChange('email')}
          error={errors.email}
          onSubmitEditing={focusUsername}
          onBlur={() => {
            if (errors.email) {
              setActive(false);
              // eslint-disable-next-line no-unused-expressions
              emailRef.current?.clear;
            }
          }}
          returnKeyType="next"
          viewStyle={styles.viewStyle}
          inputStyles={styles.inputStyles}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          leftIcon={(iconData: {color: string}) => emailIcon(iconData)}
        />
        {/* {errors.email && active && focusEmail()} */}
      </View>
      <View mt={0}>
        <FloatingInput
          ref={usernameRef}
          label="User Name"
          autoComplete="username"
          value={values.username}
          lowerCaseOnly
          onChangeText={handleChange('username')}
          onBlur={validateUserName}
          error={errors.username}
          rightComponent={
            validatingUsername ? (
              values.username !== '' ? (
                <Spinner accessibilityLabel="Validating username" />
              ) : undefined
            ) : !errors.username && values.validUsername ? (
              <CheckIcon size="5" color="green.500" mt={2} />
            ) : undefined
          }
          onSubmitEditing={focusDisplay}
          returnKeyType="next"
          viewStyle={styles.viewStyle}
          inputStyles={styles.inputStyles}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          leftIcon={(iconData: {color: string}) => userIcon(iconData)}
        />
      </View>
      <View mt={0}>
        <FloatingInput
          ref={displayName}
          label="Display Name"
          autoComplete="name"
          value={values.name}
          onChangeText={handleChange('name')}
          error={errors.name}
          onSubmitEditing={focusPassword}
          returnKeyType="next"
          viewStyle={styles.viewStyle}
          inputStyles={styles.inputStyles}
          labelStyles={styles.labelStyles}
          containerStyles={styles.containerStyles}
          leftIcon={(iconData: {color: string}) => userIcon(iconData)}
        />
      </View>
      <View mt={0}>
        <FloatingInput
          ref={passwordRef}
          label="Password"
          value={values.password}
          isPassword
          onChangeText={handleChange('password')}
          error={errors.password}
          onSubmitEditing={focusConfirmPassword}
          returnKeyType="next"
          viewStyle={styles.viewStyle}
          inputStyles={styles.inputStyles}
          containerStyles={styles.containerStyles}
          labelStyles={styles.labelStyles}
          leftIcon={(iconData: {color: string}) => lockIcon(iconData)}
        />
      </View>
      <View mt={0}>
        <FloatingInput
          ref={cnfpasswordRef}
          label="Confirm Password"
          value={values.confirmPassword}
          isPassword
          onChangeText={handleChange('confirmPassword')}
          error={errors.confirmPassword}
          returnKeyType="done"
          viewStyle={styles.viewStyle}
          inputStyles={styles.inputStyles}
          containerStyles={styles.containerStyles}
          labelStyles={styles.labelStyles}
          leftIcon={(iconData: {color: string}) => lockIcon(iconData)}
        />
      </View>

      <View mt={5} ml={3}>
        <Checkbox
          value="danger"
          colorScheme="danger"
          // isInvalid
          isChecked={values.aboveThirteen}
          onChange={() => setFieldValue('aboveThirteen', !values.aboveThirteen)}>
          <Text ml={2} fontSize="sm" color={theme.colors.white}>
            I'm 13 years old or older
          </Text>
        </Checkbox>
        <RenderError mt={1} error={errors.aboveThirteen} />
      </View>
      <View my={5} ml={3}>
        <Checkbox
          value="danger"
          colorScheme="danger"
          // isInvalid
          isChecked={values.tncAccepted}
          onChange={() => setFieldValue('tncAccepted', !values.tncAccepted)}>
          <Text ml={2} fontSize="sm" color={theme.colors.white}>
            I agree to <Text color={theme.colors.blue[300]}>Terms and Conditions</Text>
          </Text>
        </Checkbox>
        <RenderError mt={1} error={errors.tncAccepted} />
      </View>
      <View my={5}>
        <Button
          isLoading={loading}
          isLoadingText="Registering"
          backgroundColor="#4496f3"
          _text={{color: 'white'}}
          isDisabled={!isValidData}
          style={styles.buttonStyle}
          onPress={() => {
            handleSubmit();
            setActive(true);
          }}>
          Register
        </Button>
      </View>
      <Divider my={3} />
      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={1} style={styles.loginTextStyle}>
          <Text color={theme.colors.white}>Already have an Account? </Text>
          <TouchableOpacity onPress={navigation.goBack}>
            <Text color={theme.colors.blue[300]}>Sign in</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </>
  );
}

function SignUp(props: Props) {
  const {navigation} = props;
  const dispatch = useDispatch();

  const onSubmit = async (values: MyFormValues, helpers: FormikHelpers<MyFormValues>) => {
    delete values?.validUsername;

    const newValues: MyFormValues = {
      ...values,
      email: values.email.toLowerCase(),
      username: values.username.toLowerCase(),
    };

    await dispatch(userSignUp(newValues));
    helpers.resetForm();
    navigation.navigate('CheckEmail', {email: values.email.toLowerCase()});
  };

  return (
    <ImageBackground source={images.REGISTER_BACKGROUND} style={styles.safeAreaView} blurRadius={2}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          enableOnAndroid
          bounces={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.headerStyle}>
              <AuthHeader />
            </View>
            <Text
              mt={10}
              fontSize="2xl"
              fontFamily="heading"
              fontWeight="400"
              color={theme.colors.white}>
              Register for Bravvox
            </Text>
            <Formik
              initialValues={{
                email: '',
                username: '',
                name: '',
                password: '',
                confirmPassword: '',
                tncAccepted: false,
                aboveThirteen: false,
              }}
              validateOnChange={false}
              validationSchema={schema}
              onSubmit={onSubmit}>
              {formikProps => <RenderForm {...props} {...{formikProps}} />}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
    backgroundColor: theme.colors.transparentGray[100],
  },
  container: {
    flexGrow: 1,
    padding: 25,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStyle: {
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRadius: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    flex: 1,
    marginStart: 10,
  },
  iconStyle: {
    marginBottom: Platform.OS === 'android' ? 14 : 4,
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
  loginTextStyle: {
    flexDirection: 'row',
  },
  headerStyle: {alignItems: 'center'},
});

export default SignUp;
