import {useNavigation} from '@react-navigation/native';
import {View} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerNavigationType, RootNavigationType} from '../../screens/Home';
import {theme} from '../../theme';

function HeaderLeft() {
  const navigation = useNavigation<DrawerNavigationType>();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={20} />
      </TouchableOpacity>
    </View>
  );
}

function HeaderRight() {
  const navigation = useNavigation<RootNavigationType>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Notifications');
        }}>
        <View style={styles.badge} />
        <Feather name="bell" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatIcon}>
        <View style={styles.badge} />
        <MaterialCommunityIcons name="chat-outline" size={23} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatIcon}>
        <Feather name="search" size={20} />
      </TouchableOpacity>
    </View>
  );
}

export const headerLeft = (/* props: headerLeftProps */) => <HeaderLeft /* {...props} */ />;
export const headerRight = (/* props: headerRightProps */) => <HeaderRight /* {...props} */ />;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  chatIcon: {
    marginLeft: 15,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    borderRadius: 100,
    padding: 2.5,
    backgroundColor: theme.colors.red[900],
  },
});
