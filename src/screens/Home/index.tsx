/**
 * @format
 */
import React, { useCallback } from "react";
import { useScrollToTop, useNavigation } from "@react-navigation/native";

import { Spinner } from "native-base";
import { FlatList, ListRenderItem } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation";
import { IFeedData } from "./types/FeedInterface";
import FeedLayout from "./FeedLayout";
import { useNewsFeed } from "./useNewsFeed";

function Home() {
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const { feedList, isLoading, refetch, isFetchingNextPage } =
    useNewsFeed();

  const renderItem: ListRenderItem<IFeedData> = ({ item }) => <FeedLayout feed={item}/>;

  const keyExtractor = useCallback(
    (item: IFeedData, index: number) => `key-${index}-${item.id}`,
    []
  );

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      ref={ref}
      refreshing={isLoading}
      onRefresh={refetch}
      showsVerticalScrollIndicator={false}
      data={feedList}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      // onEndReached={onEndReached}
      ListHeaderComponent={isLoading ? <Spinner mt={20} mb={20} /> : null}
      ListFooterComponent={
        isFetchingNextPage ? <Spinner mt={20} mb={20} /> : null
      }
    />
  );
}

export default Home;
