import { Text, View } from "native-base";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/reducers/user/UserActions";
import { theme } from "../../theme";

function HeaderLeft() {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          await dispatch(userLogout());
        }}
      >
        <Text color={theme.colors.white}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export const headerLeft = (/* props: headerLeftProps */) => (
  <HeaderLeft /* {...props} */ />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-around",
  },
});
