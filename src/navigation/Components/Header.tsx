import { Text, View } from "native-base";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";

function HeaderLeft() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert("exit app");
        }}
      >
        <Text color={theme.colors.black[600]}>Back</Text>
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
