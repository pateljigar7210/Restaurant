/**
 * @format
 */
import React, {useState} from 'react';
import {Box, HStack, theme, View} from 'native-base';
import {Linking, StyleSheet} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import {IComments} from '../types/NewsFeedInterface';
import {SubTitle, Title} from '../../../components/Typography';
import {FromType, Like, Unlike} from './Interactions';
import {timeDiffCalc} from '../../../utils';
import {OptionIcon} from '../../../components/Common';
import WriteComment from './WriteComment';
import SafeTouchable from '../../../components/SafeTouchable';
import UserAvatar from '../../../components/UserAvatar';
import CommentOptions, {CommentPickerHandle} from './CommentOption';

interface ILinkProps {
  openCommentatorProfile: (comments: IComments) => void;
}
interface ICommentsProps extends ILinkProps {
  documentId: string;
  comments: IComments[];
  from: FromType;
  id: string;
  isMember?: boolean;
}

export interface ICommentProps extends ILinkProps {
  comment: IComments;
  isMember?: boolean;
  from: FromType;
  documentId: string;
  id: string;
  setIsSelectedComment: (isEdit: boolean) => void;
  setSelectedCommment: (selected: string) => void;
  selectedComment: string;
}

export function CommentItem(props: ICommentProps) {
  const {
    comment,
    isMember,
    from,
    documentId,
    id,
    openCommentatorProfile,
    setIsSelectedComment,
    setSelectedCommment,
    selectedComment,
  } = props;
  const {
    userInfo,
    documentId: commentId,
    commentText,
    commentLikeCount,
    createdAt,
    userId,
  } = comment;
  const {name, profilePic} = userInfo;
  const commentOptions = React.useRef<CommentPickerHandle>(null);
  const onOptionsClick = () => commentOptions.current?.onPickerSelect();
  const onProfilePress = () => openCommentatorProfile(comment);
  const handleEdit = (selected: string) => {
    setSelectedCommment(selected);
    if (selected) setIsSelectedComment(true);
    else setIsSelectedComment(false);
  };
  const handleUrlPress = (url: string) => {
    Linking.openURL(url);
  };
  return (
    <HStack mt="2" justifyContent="space-between">
      {selectedComment === commentId ? (
        <WriteComment
          documentId={documentId}
          from={from}
          id={id}
          value={commentText || ''}
          isEdit={true || undefined}
          setSelectedCommment={handleEdit}
          commentId={commentId}
        />
      ) : (
        <HStack flex="1" pr="3">
          <SafeTouchable onPress={onProfilePress}>
            <UserAvatar profilePic={profilePic} mt="0.5" />
          </SafeTouchable>
          <View ml={2}>
            <HStack>
              <SafeTouchable onPress={onProfilePress} style={styles.profileWidth}>
                <Title numberOfLines={1}>{name}</Title>
              </SafeTouchable>
            </HStack>
            <View flexDirection="row">
              <ParsedText
                style={styles.container}
                parse={[{type: 'url', style: styles.url, onPress: handleUrlPress}]}
                childrenProps={{allowFontScaling: false}}>
                {/* TODO: come up with a better solution for this */}
                {commentText ? commentText.replace(/(<([^>]+)>)/gi, '') : ''}
              </ParsedText>
            </View>
            <HStack mt="1">
              <SubTitle mr="1">{timeDiffCalc(createdAt)}</SubTitle>
              <Like liked={false} likesCount={commentLikeCount} showZeroCount />
              <Unlike disliked={false} unLikesCount={0} showZeroCount />
              <SubTitle ml="1">Reply</SubTitle>
            </HStack>
          </View>
          {!isMember && from === 'group' ? null : <OptionIcon onOpen={onOptionsClick} size={12} />}

          <CommentOptions
            key={`option-${comment.documentId}-${userInfo.documentId}-${createdAt}`}
            ref={commentOptions}
            userInfo={{...userInfo, userId}}
            comment={comment}
            documentId={documentId}
            commentId={commentId}
            handleEdit={handleEdit}
            from={from}
            id={id}
          />
        </HStack>
      )}
    </HStack>
  );
}

CommentItem.defaultProps = {
  isMember: true,
};

export default function Comments(props: ICommentsProps) {
  const {comments, openCommentatorProfile, documentId, from, id, isMember} = props;
  const [isSelectedComment, setIsSelectedComment] = useState(false);
  const [selectedComment, setSelectedCommment] = useState('');

  const displayComment =
    comments?.length > 0 ? comments.slice(comments.length - 2, comments.length) : [];

  return (
    <Box px="5" mt="2">
      {displayComment.map(c => {
        return (
          <CommentItem
            key={c.documentId}
            comment={c}
            from={from}
            isMember={isMember}
            id={id}
            openCommentatorProfile={openCommentatorProfile}
            documentId={documentId}
            setIsSelectedComment={setIsSelectedComment}
            setSelectedCommment={setSelectedCommment}
            selectedComment={selectedComment}
          />
        );
      })}
      <WriteComment
        documentId={documentId}
        from={from}
        id={id}
        isSelectedComment={isSelectedComment}
      />
    </Box>
  );
}
Comments.defaultProps = {
  isMember: true,
};
const styles = StyleSheet.create({
  profileWidth: {width: '90%'},
  container: {
    flex: 1,
    color: theme.colors.black[1000],
    flexWrap: 'wrap',
    marginVertical: 5,
    fontSize: 14,
    fontFamily: 'DMSANS-Regular',
  },
  url: {
    color: theme.colors.blue[600],
    textDecorationLine: 'underline',
    fontFamily: 'DMSANS-Regular',
    fontSize: 14,
  },
});
Comments.defaultProps = {};
