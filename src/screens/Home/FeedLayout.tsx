/**
 * @format
 */
import React from "react";
import { View, Text, Image } from "native-base";
import StarRating from "react-native-star-rating";
import { theme } from "../../theme";
import { IFeedData } from "./types/FeedInterface";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { StyleSheet, TouchableOpacity } from "react-native";

interface IFeedLayout {
  feed: IFeedData;
  navigation: NativeStackNavigationProp<RootStackParamList, "HomeTabs">;
}

function FeedLayout(props: IFeedLayout) {
  const { feed, navigation } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation?.navigate("Map", {
          latitude: feed.lat,
          longitude: feed.long,
        });
      }}
    >
      <Image
        height={20}
        width={20}
        source={{ uri: feed.img[0].image }}
        style={styles.image}
        alt="restorent"
      />
      <View style={styles.startView}>
        <Text color={"back"}>{feed.title}</Text>
        <View height={2} />
        <StarRating
          disabled
          maxStars={5}
          rating={4}
          starSize={18}
          fullStarColor={"#ffc700"}
          emptyStarColor={"#ffc700"}
        />
      </View>

      <TouchableOpacity>
        <EvilIcons name="location" size={15} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    marginHorizontal: 15,
    marginTop: 15,
    elevation: 6,
    padding: 10,
    flexDirection: "row",
    borderRadius: 10,
  },
  image: { borderRadius: 6 },
  startView: { margin: 20, justifyContent: "center", flex: 1 },
});

export default FeedLayout;
