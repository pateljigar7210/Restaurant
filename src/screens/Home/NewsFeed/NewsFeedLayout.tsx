/**
 * @format
 */
import React, {useCallback} from 'react';
import {StyleSheet, Linking, TouchableOpacity} from 'react-native';
import {View, Text, useDisclose, theme} from 'native-base';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ParsedText from 'react-native-parsed-text';
import {
  IComments,
  ILikeDisLikeGroupRequestData,
  INewsFeedData,
  IReportAbuseRequestData,
  ReactionType,
} from '../types/NewsFeedInterface';
import Heading from './Heading';
import ImageVideo from './ImageVideo';
import Comments from './Comments';
import {RootStackParamList} from '../../../navigation';
import {FromType, Interactions} from './Interactions';
import {useFeedActions} from './useToggleLike';
import ReportAbuseDialog from './ReportAbuseDialog';

interface NewsFeedProps {
  newsFeed: INewsFeedData;
  navigation:
    | NativeStackNavigationProp<RootStackParamList, 'GroupProfile'>
    | NativeStackNavigationProp<RootStackParamList, 'Profile'>
    | NativeStackNavigationProp<RootStackParamList, 'BusinessProfile'>;
  from: FromType;
  id?: string;
  isMember: boolean;
  businessId?: string;
}

const styleProps: IViewProps = {flex: 1, py: 2.5, width: '100%', mt: 2.5};

export default function NewsFeedLayout(props: NewsFeedProps) {
  const {newsFeed, navigation, from, id, isMember} = props;

  const {
    userInfo,
    contentStatus,
    createdAt,
    textContent,
    documentId,
    comments,
    userId,
    isLiked,
    isDisLiked,
  } = newsFeed;

  const {toggleLikePost, postReportAbuse} = useFeedActions();

  const {isOpen: isOpenDialog, onToggle: toggleAbuseDialog} = useDisclose();

  const openProfile = useCallback(() => {
    const {userName} = userInfo;
    navigation.push('Profile', {userName, userId});
  }, [navigation, userId, userInfo]);

  const openCommentatorProfile = useCallback(
    (comment: IComments) => {
      const {userName} = comment.userInfo;
      const {userId: commentUserId} = comment;
      navigation.push('Profile', {userName, userId: commentUserId});
    },
    [navigation],
  );

  const toggleLikeHandler = async (type: ReactionType) => {
    const data: ILikeDisLikeGroupRequestData = {
      id: id || '',
      contentId: documentId || '',
      isLike: type === 'like',
      reaction: isLiked ? 'like' : isDisLiked ? 'dislike' : 'nil',
      isLikeReaction: type === 'like' ? !isLiked : false,
      isDisLikeReaction: type === 'dislike' ? !isDisLiked : false,
      like: type === 'like' ? !isLiked : false,
      dislike: type === 'dislike' ? !isDisLiked : false,
    };
    toggleLikePost(data, from);
    
  };

  const handleReportAbuse = async (reason: string) => {
    try {
      const data: IReportAbuseRequestData = {
        contentId: newsFeed?.documentId,
        contentType: newsFeed?.contentDataType,
        reason,
      };
      await postReportAbuse(data);

      toggleAbuseDialog();
    } catch (error) {
      toggleAbuseDialog();
    }
  };

  const onSelectAbuse = () => {
    toggleAbuseDialog();
  };

  const handleUrlPress = (url: string) => {
    Linking.openURL(url);
  };

  const openSinglePostView = () => {
    navigation.navigate('SinglePost');
  };

  return (
    <View {...styleProps} bg={theme.colors.white}>
      <ReportAbuseDialog
        open={isOpenDialog}
        handleClose={toggleAbuseDialog}
        handleSubmit={handleReportAbuse}
      />
      <Heading
        newsFeed={newsFeed}
        userInfo={userInfo}
        createdAt={createdAt}
        from={from}
        navigation={navigation}
        isMember={isMember}
        openProfile={openProfile}
        onSelectAbuse={onSelectAbuse}
      />
      {contentStatus === 'SUSPENDED' ? (
        <Text mt="1.5" mx="5" color="red.900">
          This post has been suspended as it has violated our terms of service
        </Text>
      ) : (
        <>
          {textContent ? (
            <ParsedText
              style={styles.container}
              parse={[{type: 'url', style: styles.url, onPress: handleUrlPress}]}
              childrenProps={{allowFontScaling: false}}
              onPress={openSinglePostView}>
              {textContent}
            </ParsedText>
          ) : null}
          <TouchableOpacity onPress={openSinglePostView} activeOpacity={0.6}>
            <ImageVideo newsFeed={newsFeed} />
          </TouchableOpacity>
          <Interactions
            newsFeed={newsFeed}
            toggleLike={(type: string) => toggleLikeHandler(type as ReactionType)}
            navigation={navigation}
            from={from}
            isMember={isMember}
            id={id || ''}
          />
          {(from === 'group' || 'business') && !isMember ? null : (
            <Comments
              documentId={documentId}
              comments={comments}
              from={from}
              id={id || ''}
              openCommentatorProfile={openCommentatorProfile}
              isMember={isMember}
            />
          )}
        </>
      )}
    </View>
  );
}

NewsFeedLayout.defaultProps = {
  businessId: '',
  id: '',
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 8,
    fontFamily: 'DMSANS-Regular',
    fontSize: 14,
  },
  url: {
    color: theme.colors.blue[600],
    textDecorationLine: 'underline',
    fontFamily: 'DMSANS-Regular',
    fontSize: 14,
  },
});
