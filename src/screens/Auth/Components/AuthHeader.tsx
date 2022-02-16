import {Text, View} from 'native-base';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {theme} from '../../../theme';

function AuthHeader(props: IViewProps) {
  return (
    <View flexDirection="row" alignItems="center" {...props}>
      <SimpleLineIcons name="fire" size={26} color="#ea0000" />
      <Text
        ml={3}
        fontSize="3xl"
        fontFamily="heading"
        color={theme.colors.white}
        letterSpacing={6}
        fontWeight="500">
        BRAVVOX
      </Text>
    </View>
  );
}

export default AuthHeader;
