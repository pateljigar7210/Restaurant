import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import CustomTabBar from "./Components/CustomTabBar";
import Home from "../screens/Home";
import { headerLeft } from "./Components/Header";
import Map from "../screens/Map";
import { theme } from "../theme";

export type HomeTabParamList = {
  Home: undefined;
  Map: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const options = {
  title: "Restorent",
  headerTitleAlign: "center",
  headerLeft,
  headerStyle: {
    backgroundColor: theme.colors.primary[50],
  },
  headerTintColor: theme.colors.white,
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
