/**
 * @format
 */
import React from 'react';
import {View, HStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {INewsFeedData} from '../types/NewsFeedInterface';
import {formatCount} from '../../../utils';
import {SubTitle} from '../../../components/Typography';
import {RootStackParamList} from '../../../navigation';

export type FromType = 'group' | 'home' | 'profile' | 'business';

interface IInteractionProps {
  newsFeed: INewsFeedData;
  toggleLike: (type: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NativeStackNavigationProp<RootStackParamList, any>;
  from: FromType;
  id: string;
  isMember?: boolean;
}

interface IWriteComment {
  disabled: boolean;
  size: number;
  onPress: () => void;
}

interface ILikeProps {
  liked: boolean;
  likesCount: number;
  onPress?: () => void;
  showZeroCount?: boolean;
  isMember?: boolean;
  from?: string;
}

interface IUnlikeProps {
  disliked: boolean;
  unLikesCount: number;
  onPress?: () => void;
  showZeroCount?: boolean;
  isMember?: boolean;
  from?: string;
}

interface ICommentCountProps {
  commentsCount: number;
  onPress: () => void;
}

interface IShareProps {
  shareCount: number;
}

export function Container(props: IViewProps) {
  const {children, ...rest} = props;
  return (
    <View minW="8" flexDir="row" alignItems="center" {...rest}>
      {children}
    </View>
  );
}

export function Like(props: ILikeProps) {
  const {liked, likesCount, showZeroCount, onPress, isMember, from} = props;
  const backgroundColor = liked ? '#EA452F' : 'white';
  const borderColor = liked ? '#EA452F' : '#959699';
  const likeText = formatCount(likesCount);
  const displayText = likesCount > 0 ? likeText : showZeroCount ? '0' : '';
  const iconName = liked ? 'ios-flame' : 'ios-flame-outline';
  const iconColor = liked ? 'white' : '#959699';

  return (
    <Container>
      <TouchableOpacity
        disabled={(from === 'group' || 'business') && !isMember ? true : !onPress}
        style={[styles.likeWrapper, {borderColor, backgroundColor}]}
        onPress={onPress}>
        <Ionicons name={iconName} size={15} color={iconColor} />
      </TouchableOpacity>
      {displayText !== '' && <SubTitle ml="2">{likeText}</SubTitle>}
    </Container>
  );
}

Like.defaultProps = {
  showZeroCount: false,
  onPress: null,
  isMember: true,
  from: '',
};

export function Unlike(props: IUnlikeProps) {
  const {disliked, unLikesCount, showZeroCount, onPress, isMember, from} = props;
  const backgroundColor = disliked ? '#EA452F' : 'white';
  const color = disliked ? 'white' : '#959699';
  const borderColor = disliked ? '#EA452F' : '#959699';
  const unlikeText = formatCount(unLikesCount);
  const displayText = unLikesCount > 0 ? unlikeText : showZeroCount ? '0' : '';

  return (
    <Container>
      <TouchableOpacity
        disabled={(from === 'group' || 'business') && !isMember ? true : !onPress}
        style={[styles.dislikeWrapper, {borderColor, backgroundColor}]}
        onPress={onPress}>
        <Feather name="minus" size={15} color={color} />
      </TouchableOpacity>
      {displayText !== '' && <SubTitle ml="2">{unlikeText}</SubTitle>}
    </Container>
  );
}

Unlike.defaultProps = {
  showZeroCount: false,
  onPress: null,
  isMember: true,
  from: '',
};

function CommentsCount({commentsCount, onPress}: ICommentCountProps) {
  const countText = formatCount(commentsCount);
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Container justifyContent="flex-end" mr="1">
        <Ionicons name="chatbubble-outline" size={20} color="#959699" />
        {commentsCount > 0 && <SubTitle ml="2">{countText}</SubTitle>}
      </Container>
    </TouchableOpacity>
  );
}
 
export function SendIcon(props: IWriteComment) {
  const {onPress, disabled, size} = props;
  return (
    <TouchableOpacity disabled={disabled} style={styles.sendButton} onPress={onPress}>
      <Ionicons name="send" size={size} color="#959699" />
    </TouchableOpacity>
  );
}

function Shares({shareCount}: IShareProps) {
  const countText = formatCount(shareCount);
  return (
    <Container justifyContent="flex-end">
      <Ionicons name="ios-arrow-redo-outline" size={20} color="#959699" />
      {shareCount > 0 && <SubTitle ml="2">{countText}</SubTitle>}
    </Container>
  );
}

export function Interactions(props: IInteractionProps) {
  const {newsFeed, navigation, from, id, isMember, toggleLike} = props;

  return (
    <HStack px="5" mt="2" flexDirection="row" justifyContent="space-between">
      <HStack alignItems="center">
        <Like
          liked={newsFeed.isLiked}
          likesCount={newsFeed.likesCount}
          isMember={isMember}
          from={from}
          onPress={() => toggleLike('like')}
        />
        <Unlike
          disliked={newsFeed.isDisLiked}
          unLikesCount={newsFeed.unLikesCount}
          isMember={isMember}
          from={from}
          onPress={() => toggleLike('dislike')}
        />
      </HStack>
      <HStack alignItems="center">
        <CommentsCount
          commentsCount={newsFeed.commentsCount}
          onPress={() => {
            navigation.push('Comments', {
              documentId: newsFeed.documentId,
              from,
              id,
              isMember,
            });
          }}
        />
        <Shares shareCount={newsFeed.shareCount} />
      </HStack>
    </HStack>
  );
}

Interactions.defaultProps = {
  isMember: true,
};

const styles = StyleSheet.create({
  likeWrapper: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dislikeWrapper: {
    marginLeft: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    justifyContent: 'center',
  },
});
