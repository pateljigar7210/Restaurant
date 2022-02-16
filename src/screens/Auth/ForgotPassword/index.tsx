import React from 'react';
import {Text, Button, Divider, View} from 'native-base';
import {ImageBackground, Platform, StyleSheet} from 'react-native';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {connect, useDispatch} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import AuthHeader from '../Components/AuthHeader';
import {Caption} from '../../../components/Typography';
import {RootStackParamList} from '../../../navigation';
import {forgotPassword} from '../../../redux/reducers/user/UserServices';
import FloatingInput from '../../../components/FloatingInput';
import {showSnackbar} from '../../../utils/SnackBar';
import images from '../../../assets/images';
import {theme} from '../../../theme';

const schema = Yup.object().shape({
  username: Yup.string().email('Enter valid Email Address'),
});

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

interface WithReduxProps extends Props {
  isLoading: boolean | undefined;
}

interface ReduxState {
  user: {
    loading: boolean;
  };
}

interface MyFormValues {
  username: string;
}

function ForgotPassword(props: WithReduxProps) {
  const {navigation, isLoading} = props;
  const dispatch = useDispatch();

  const onSubmit = async (values: MyFormValues, helpers: FormikHelpers<MyFormValues>) => {
    try {
      const newValues: MyFormValues = {
        ...values,
        username: values.username.toLowerCase(),
      };
      await dispatch(forgotPassword(newValues));
      helpers.resetForm();
    } catch (error: any) {
      showSnackbar({message: error.message, type: 'danger'});
    }
  };

  const userIcon = (iconData: {color: string}) => {
    return (
      <SimpleLineIcons name="user" size={18} color={iconData.color} style={styles.iconStyle} />
    );
  };

  return (
    <ImageBackground
      source={images.REGISTER_BACKGROUND}
      style={styles.backgroundImageStyle}
      blurRadius={2}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <AuthHeader />
            <Text
              mt={10}
              fontSize="2xl"
              fontFamily="heading"
              fontWeight="400"
              color={theme.colors.white}>
              Password Assistance
            </Text>
            <View>
              <Caption mt={5} color={theme.colors.white}>
                Please enter the email address associated with your Bravvox account.
              </Caption>
            </View>
            <Formik
              initialValues={{username: ''}}
              onSubmit={onSubmit}
              validationSchema={schema}
              validateOnChange={false}>
              {({handleChange, handleSubmit, handleBlur, touched, values, errors}) => {
                const submit = () => handleSubmit();
                return (
                  <View width="100%">
                    <View mt={5}>
                      <FloatingInput
                        label="Email Address"
                        lowerCaseOnly
                        keyboardType="email-address"
                        autoComplete="email"
                        value={values.username}
                        onChangeText={handleChange('username')}
                        error={touched.username ? errors.username : ''}
                        returnKeyType="done"
                        viewStyle={styles.viewStyle}
                        inputStyles={styles.inputStyles}
                        containerStyles={styles.containerStyles}
                        labelStyles={styles.labelStyles}
                        leftIcon={(iconData: {color: string}) => userIcon(iconData)}
                        onBlur={handleBlur('username')}
                        onSubmitEditing={submit}
                      />
                    </View>
                    <View>
                      <Button
                        mt="5"
                        style={styles.buttonStyle}
                        isLoading={isLoading}
                        isDisabled={isLoading || !values.username || values.username.trim() === ''}
                        onPress={submit}>
                        Reset Password
                      </Button>
                      <Button style={styles.buttonStyle} mt="5" onPress={navigation.goBack}>
                        Back
                      </Button>
                    </View>
                    <Divider my={3} />
                    <View style={styles.footer}>
                      <Text fontSize="sm" color={theme.colors.white}>
                        Has your email address changed?
                      </Text>
                      <Caption mt={4} color={theme.colors.white}>
                        If you have no longer have access to the email address associated with your
                        Bravvox account and need assistance, please contact{' '}
                        <Text color={theme.colors.white} style={styles.bottomLink}>
                          Customer Service
                        </Text>
                      </Caption>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImageStyle: {
    flexGrow: 1,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.transparentGray[100],
  },
  container: {
    flex: 1,
    padding: 25,
  },
  bottomLink: {
    textDecorationLine: 'underline',
  },
  footer: {
    justifyContent: 'center',
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
  inputStyles: {
    minHeight: 28,
    color: theme.colors.white,
    flex: 1,
    zIndex: 0,
    paddingHorizontal: 0,
  },
  containerStyles: {
    paddingHorizontal: 0,
    paddingTop: 30,
  },
  labelStyles: {
    marginLeft: -5,
  },
  buttonStyle: {
    borderRadius: 40,
    height: 45,
  },
  iconStyle: {
    marginBottom: Platform.OS === 'android' ? 15 : 4,
  },
});

ForgotPassword.propTypes = {};

ForgotPassword.defaultProps = {};

const mapStateToProps = (state: ReduxState) => ({
  isLoading: state.user.loading,
});

export default connect(mapStateToProps)(ForgotPassword);
