/**
 * @format
 */
import React, {useCallback} from 'react';
import {useScrollToTop, useNavigation} from '@react-navigation/native';

import {Spinner} from 'native-base';
import {FlatList, ListRenderItem} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootStackParamList} from '../../navigation';
import {INewsFeedData} from './types/NewsFeedInterface';
import NewsFeedLayout from './NewsFeed/NewsFeedLayout';
import {useNewsFeed} from './useNewsFeed';
import {DrawerParamList} from '../../navigation/DrawerMenu';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RootNavigationType = NativeStackNavigationProp<RootStackParamList, any>;
export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;

function Home() {
  const navigation = useNavigation<RootNavigationType>();

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const {feedList, isLoading, refetch, isFetchingNextPage, onEndReached} = useNewsFeed();

  const renderItem: ListRenderItem<INewsFeedData> = ({item}) => (
    <NewsFeedLayout key={item.documentId} newsFeed={item} navigation={navigation} from="home" isMember  />
  );

  const keyExtractor = useCallback(
    (item: INewsFeedData, index: number) => `key-${index}-${item.documentId}`,
    [],
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
      onEndReached={onEndReached}
      ListHeaderComponent={isLoading ? <Spinner mt={20} mb={20} /> : null}
      ListFooterComponent={isFetchingNextPage ? <Spinner mt={20} mb={20} /> : null}
    />
  );
}

export default Home;
