import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Auth/Login";

import { navTheme } from "../theme";
import HomeTabs from "./HomeTabs";

import useUserInfo from "../hooks/useUserInfo";
import { navigationRef } from "./navigationRef";

export type RootStackParamList = {
  HomeTabs: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function NavContainer() {
  const { isLoggedIn } = useUserInfo();
  return (
    <NavigationContainer theme={navTheme} independent ref={navigationRef} >
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;
