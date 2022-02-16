import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChevronLeftIcon, Spacer, Text, View} from 'native-base';
import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../../../assets/images';
import {Caption} from '../../../components/Typography';
import {RootStackParamList} from '../../../navigation';
import {resendCheckEmail} from '../../../redux/reducers/user/UserServices';
import {theme} from '../../../theme';
import {showSnackbar} from '../../../utils/SnackBar';
import AuthHeader from '../Components/AuthHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'CheckEmail'>;

function CheckEmail(props: Props) {
  const {route, navigation} = props;
  const {email} = route?.params || {};

  const resendMail = async () => {
    if (email) {
      const res = await resendCheckEmail(email);
      showSnackbar({message: res.message, type: res.error ? 'danger' : 'info', duration: 7000});
    }
  };

  return (
    <ImageBackground
      source={images.REGISTER_BACKGROUND}
      style={styles.backgroundImageStyle}
      blurRadius={2}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.9} onPress={navigation.goBack}>
            <ChevronLeftIcon size="8" />
          </TouchableOpacity>
          <AuthHeader mt={5} />
          <Text
            mt={10}
            fontSize="2xl"
            fontFamily="heading"
            fontWeight="400"
            color={theme.colors.white}>
            Check your email!
          </Text>
          <Caption mt="5" color={theme.colors.white}>
            We've sent an email to{' '}
          </Caption>
          <Text fontSize="sm" fontWeight="bold" color={theme.colors.white}>
            {email}
          </Text>
          <Caption mt={3} color={theme.colors.white}>
            Click the link in the email to confirm your address and activate your account.
          </Caption>
          <Text fontSize="sm" mt="12" fontWeight="bold" color={theme.colors.white}>
            Didn't get the email?
          </Text>
          <Caption mt={3} color={theme.colors.white}>
            Check your spam folder or{' '}
            <Text onPress={resendMail} color="blue.500">
              resend the email
            </Text>
          </Caption>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

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
  },
});

export default CheckEmail;
