import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
// import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import CustomTabBar from "./Components/CustomTabBar";

import Home from "../screens/Home";
import { headerLeft } from "./Components/Header";

import Map from "../screens/Map";

export type HomeTabParamList = {
  Home: undefined;
  Events: undefined;
  Groups: undefined;
  BusinessPages: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const options = {
  title: "Restorent",
  headerTitleAlign: "center",
  headerLeft,

  style: {
    backgroundColor: "red",
  },
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarHideOnKeyboard: true, ...options }}
      tabBar={renderTabBar}

    >
      <Tab.Screen name="Home" component={Home} />

      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
}

export default HomeTabs;
