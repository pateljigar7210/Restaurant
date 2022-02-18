/**
 * @format
 */
import React, { useCallback } from "react";
import { useScrollToTop, useNavigation } from "@react-navigation/native";

import { Button, FlatList, ListRenderItem } from "react-native";

import { IFeedData } from "./types/FeedInterface";
import FeedLayout from "./FeedLayout";
import { useNewsFeed } from "./useNewsFeed";

function Home({ navigation }: any) {
  // const navigation = useNavigation<RootNavigationType>();
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const { feedList, isLoading, refetch, isFetchingNextPage } = useNewsFeed();

  const renderItem: ListRenderItem<IFeedData> = ({ item }) => (
    <FeedLayout feed={item} navigation={navigation} />
  );

  const keyExtractor = useCallback(
    (item: IFeedData, index: number) => `key-${index}-${item.id}`,
    []
  );

  const img = [
    {
      id: 13,
      main_id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkAhadf5VCMhdtC9HD0C2cBzoYY-nDhIv5aI5stOxseVZBabsujhROvhSEWV4B7oM09ls&usqp=CAU",
      created_at: null,
      updated_at: null,
    },
  ];

  const item = {
    id: 1,
    title: "title",
    phone_no: 9638366453,
    description: "string",
    rating: 5,
    address: "ass",
    city: "string",
    state: "string",
    country: "string",
    pincode: 39604,
    long: "72.8311",
    lat: "21.1702",
    created_at: null,
    updated_at: null,
    img: img,
  };

  return (
    // <FlatList
    //   keyboardShouldPersistTaps="handled"
    //   ref={ref}
    //   refreshing={isLoading}
    //   onRefresh={refetch}
    //   showsVerticalScrollIndicator={false}
    //   data={feedList}
    //   keyExtractor={keyExtractor}
    //   renderItem={renderItem}
    //   onEndReachedThreshold={0.5}
    //   // onEndReached={onEndReached}
    //   ListHeaderComponent={isLoading ? <Spinner mt={20} mb={20} /> : null}
    //   ListFooterComponent={
    //     isFetchingNextPage ? <Spinner mt={20} mb={20} /> : null
    //   }
    // />

    <FeedLayout feed={item} navigation={navigation} />
  );
}

export default Home;
