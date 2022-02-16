import {
  CustomLabelProps,
  FloatingLabelInput,
  FloatingLabelProps,
} from 'react-native-floating-label-input';
import React, {useState} from 'react';
import {styles} from 'react-native-floating-label-input/src/styles';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  TextInput,
  ColorValue,
  ImageStyle,
  ViewStyle,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'native-base';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import {theme} from '../theme';

export interface FloatingInputProps extends FloatingLabelProps, TextInputProps {
  error: string | undefined;
  lowerCaseOnly?: boolean;
  viewStyle?: ViewStyle;
  leftIcon?: (iconData: {color: string}) => void;
  errorViewStyle?: IViewProps;
}

interface RenderErrorProps extends IViewProps {
  error: string | undefined;
}

export function RenderError(props: RenderErrorProps) {
  const {error, ...rest} = props;
  if (error) {
    return (
      <View {...rest}>
        <Text color={theme.colors.red[400]}>{error}</Text>
      </View>
    );
  }
  return null;
}

const FloatingInput = React.forwardRef<TextInput, FloatingInputProps>(
  (props: FloatingInputProps, ref) => {
    const {onFocus, onBlur, error, errorViewStyle, viewStyle, leftIcon, ...rest} = props;
    const [focused, setFocused] = useState(false);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const containerStyle = {...styles.container, borderWidth: 0};
    const inputStyles = {...styles.input, paddingLeft: 5, marginTop: 5};

    const borderColor: ColorValue = error ? theme.colors.red[400] : focused ? '#86b7fe' : '#e8e8e8';
    const rightIconColor: ImageStyle = focused
      ? customStyles.focusRightIcon
      : customStyles.rightIcon;
    const mainContainerStyle: ViewStyle = leftIcon ? customStyles.innerContainer : {};
    const errorMargin: number = leftIcon ? 7 : 3;
    const labelStyle: CustomLabelProps = leftIcon
      ? {
          colorFocused: error ? theme.colors.red[400] : focused ? '#86b7fe' : '#e8e8e8',
          colorBlurred: error ? theme.colors.red[400] : focused ? '#86b7fe' : '#e8e8e8',
        }
      : {};

    return (
      <>
        <View style={mainContainerStyle}>
          {leftIcon && leftIcon({color: borderColor})}
          <View style={[customStyles.container, {borderColor}, viewStyle]}>
            <FloatingLabelInput
              ref={ref}
              autoCapitalize="none"
              autoCorrect={false}
              isFocused={focused}
              containerStyles={containerStyle}
              inputStyles={inputStyles}
              selectionColor={borderColor}
              onFocus={handleFocus}
              onBlur={handleBlur}
              showPasswordImageStyles={rightIconColor}
              customLabelStyles={labelStyle}
              defaultValue=""
              {...rest}
              customShowPasswordComponent={
                <MaterialCommunityIcons
                  name="eye-off-outline"
                  size={18}
                  color={borderColor}
                  style={customStyles.iconStyle}
                />
              }
              customHidePasswordComponent={
                <MaterialCommunityIcons
                  name="eye-outline"
                  size={18}
                  color={borderColor}
                  style={customStyles.iconStyle}
                />
              }
            />
          </View>
        </View>
        <RenderError ml={errorMargin} {...errorViewStyle} error={error} />
      </>
    );
  },
);

const customStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 3,
  },
  rightIcon: {
    tintColor: theme.colors.white,
  },
  focusRightIcon: {
    tintColor: theme.colors.primary[400],
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconStyle: {
    marginBottom: Platform.OS === 'android' ? 14 : 4,
  },
});

FloatingInput.defaultProps = {
  lowerCaseOnly: false,
  viewStyle: {},
  leftIcon: undefined,
};

export default FloatingInput;
