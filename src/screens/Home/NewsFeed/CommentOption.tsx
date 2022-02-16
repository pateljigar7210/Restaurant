/**
 * @format
 */

import React, {forwardRef, useImperativeHandle, useMemo} from 'react';
import {View, Actionsheet, useDisclose, Text} from 'native-base';
import { Keyboard } from 'react-native';
import {useUserProfile} from '../../Profile/Queries/useUserProfile';
import {IComments, IReportComment, IUserInfo} from '../types/NewsFeedInterface';
import {useFollowActions} from './useFollowActions';
import useUserInfo from '../../../hooks/useUserInfo';
import {useComment} from '../useComment';
import ReportAbuseDialog from './ReportAbuseDialog';
import {useConfirmModal} from '../../../components/CofirmationModel';
import {Title} from '../../../components/Typography';
import {FromType} from './Interactions';

type FollowOptionType = 'follow' | 'cancel_follow_request' | 'unfollow';

export type CommentOption = FollowOptionType | 'report_abuse';

interface ICommentUserInfo extends IUserInfo {
  userId: string;
}

interface IPickerProps {
  userInfo: ICommentUserInfo;
  comment: IComments;
  documentId: string;
  commentId:string;
  handleEdit: (comment: string) => void;
  from: FromType;
  id: string;
}

type IPressHandler = {
  onPickerSelect: (type?: CommentOption) => void;
};

const CommentOptions = forwardRef<IPressHandler, IPickerProps>((props: IPickerProps, ref) => {
  useImperativeHandle(ref, () => ({
    onPickerSelect: onOpenCommentOptions,
  }));

  const {isOpen, onOpen, onClose} = useDisclose();
  const {isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose} = useDisclose();

  const {documentId: userId} = useUserInfo();

  const {userInfo, comment, handleEdit, commentId,from,id} = props;
  const confirm = useConfirmModal();
  const {commentReportAbuse, deleteComment} = useComment();


  const {isLoading, data: userData, isError, refetch} = useUserProfile(userInfo?.userName, false);

  const onOpenCommentOptions = () => {
    Keyboard.dismiss();
    refetch();
    onOpen();
  };
  const {followUser: follow, cancelRequest, unfollow} = useFollowActions(userInfo?.userId);

  // const {onSelectOption} = props;
  const editPost = () => {
    onClose();
    handleEdit(commentId);
  };

  const deletePost = () => {
    onClose();
    confirm?.show?.({
      title: <Title fontSize={18}>Delete Comment</Title>,
      message: (
        <Text>
          <Text>Are you sure you want to delete your comment?</Text>
        </Text>
      ),
      onConfirm: () => {
        deleteComment({contentId: comment.contentId, commentId: comment.documentId}, from, id);
        onClose();
      },
      submitLabel: 'Delete',
      cancelLabel: 'Cancel',
    });
  };

  const handleReportAbuse = async (reason: string) => {
    try {
      const data: IReportComment = {
        commentId: comment?.documentId,
        contentId: comment?.contentId,
        contentType: 'text',
        reason,
      };
      await commentReportAbuse(data);
      onReportClose();
    } catch (error) {
      onReportClose();
    }
  };

  const abuse = () => {
    onClose();
    onReportOpen();
  };
  const isSelf = Boolean(userId === userInfo?.userId);

  const {text, followAction} = useMemo(() => {
    const followUser = async () => {
      onClose();
      await follow();
      refetch();
    };
    const unfollowUser = async () => {
      onClose();
      await unfollow();
      refetch();
    };

    const followBackUser = async () => {
      onClose();
      await follow();
      refetch();
    };
    const cancelFollowRequest = async () => {
      onClose();
      await cancelRequest();
      refetch();
    };

    let btext = 'Follow';
    let bfollowAction = followUser;

    if (userData) {
      const {relationshipInfo} = userData;
      if (relationshipInfo) {
        const {Relationship} = relationshipInfo;

        if (Relationship === 'requested') {
          btext = 'Cancel Request';
          bfollowAction = cancelFollowRequest;
        }

        if (Relationship === 'follower') {
          btext = 'Follow Back';
          bfollowAction = followBackUser;
        }

        if (Relationship === 'following') {
          btext = 'Unfollow';
          bfollowAction = unfollowUser;
        }

        if (Relationship === 'following me') {
          btext = 'Unfollow';
          bfollowAction = unfollowUser;
        }
      }
    }

    return {
      text: btext,
      followAction: bfollowAction,
    };
  }, [cancelRequest, follow, onClose, refetch, unfollow, userData]);

  if (!userInfo || isLoading || isError) {
    return null;
  }
  const handleClose = () => {
    onClose();
    onReportClose();
  };

  return (
    <View ref={ref} width={0} height={0}>
      <ReportAbuseDialog
        open={isReportOpen}
        handleClose={handleClose}
        handleSubmit={handleReportAbuse}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {isSelf === true ? (
            <>
              <Actionsheet.Item py="3" onPress={editPost}>
                Edit
              </Actionsheet.Item>
              <Actionsheet.Item py="3" onPress={deletePost}>
                Delete
              </Actionsheet.Item>
            </>
          ) : (
            <>
              <Actionsheet.Item py="3" onPress={followAction} flexDirection="row" display="flex">
                <Text fontFamily="heading" fontSize="17" color="black.900">
                  {text} <Text bold>{`@${userInfo.userName}`}</Text>
                </Text>
              </Actionsheet.Item>
              <Actionsheet.Item py="3" onPress={abuse}>
                Report Abuse
              </Actionsheet.Item>
            </>
          )}
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
});

export type CommentPickerHandle = React.ElementRef<typeof CommentOptions>;
export default CommentOptions;
