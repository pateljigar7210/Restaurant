import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Platform} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import CustomTabBar from './Components/CustomTabBar';
import Events from '../screens/Events';
import Groups from '../screens/Groups';
import Home from '../screens/Home';
import {headerLeft, headerRight} from './Components/Header';
import BusinessPages from '../screens/BusinessPage';

export type HomeTabParamList = {
  Home: undefined;
  Events: undefined;
  Groups: undefined;
  BusinessPages: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const options = {
  title: 'BRAVVOX',
  headerTitleAlign: 'center',
  headerLeft,
  headerRight,
  drawerLabel: () => null,
  drawerItemStyle: {height: 0},
};

function HomeTabs() {
  // eslint-disable-next-line no-unused-expressions
  Platform.OS === 'android' ? AndroidKeyboardAdjust.setAdjustPan() : null;
  return (
    <Tab.Navigator screenOptions={{tabBarHideOnKeyboard: true, ...options}} tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="BusinessPages" component={BusinessPages} />
    </Tab.Navigator>
  );
}

export default HomeTabs;
