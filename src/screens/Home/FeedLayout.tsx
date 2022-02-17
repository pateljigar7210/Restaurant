/**
 * @format
 */
import React from "react";
import { View, Text, Image } from "native-base";
import StarRating from "react-native-star-rating";
import { theme } from "../../theme";
import { IFeedData } from "./types/FeedInterface";
import { TouchableOpacity } from "react-native-gesture-handler";
import EvilIcons from "react-native-vector-icons/EvilIcons";
interface IFeedLayout {
  feed: IFeedData;
}

function FeedLayout(props: IFeedLayout) {
  const { feed } = props;
  console.log("feed", feed);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
        marginHorizontal: 15,
        marginTop: 15,
        elevation: 6,
        padding: 10,
        flexDirection: "row",
        borderRadius: 10,
      }}
    >
      <Image
        height={20}
        width={20}
        source={{ uri: feed.img[0].image }}
        style={{ borderRadius: 6 }}
      />
      <View style={{ margin: 20, justifyContent: "center", flex: 1 }}>
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
    </View>
  );
}

export default FeedLayout;
