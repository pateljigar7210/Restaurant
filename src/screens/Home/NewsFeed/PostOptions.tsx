/**
 * @format
 */

import React, {forwardRef, useImperativeHandle, useMemo} from 'react';
import {View, Actionsheet, useDisclose, Text} from 'native-base';
import Clipboard from '@react-native-clipboard/clipboard';
import {Keyboard, Share} from 'react-native';

import {useUserProfile} from '../../Profile/Queries/useUserProfile';
import {IUserInfo} from '../types/NewsFeedInterface';
import {useFollowActions} from './useFollowActions';
import useUserInfo from '../../../hooks/useUserInfo';
import {showSnackbar} from '../../../utils/SnackBar';

type FollowOptionType = 'follow' | 'cancel_follow_request' | 'unfollow';

export type PostOption = FollowOptionType | 'share' | 'copy_link' | 'report_abuse';

interface IPickerProps {
  onSelectAbuse: () => void;
  onSelectEdit?: () => void;
  onSelectDelete?: () => void;
  userInfo: IUserInfo;
}

type IPressHandler = {
  onPickerSelect: (type?: PostOption) => void;
};

const PostOptions = forwardRef<IPressHandler, IPickerProps>((props: IPickerProps, ref) => {
  useImperativeHandle(ref, () => ({onPickerSelect: onOpenPostOptions}));

  const {isOpen, onOpen, onClose} = useDisclose();

  const {documentId} = useUserInfo();

  const {userInfo, onSelectAbuse, onSelectEdit, onSelectDelete} = props;

  const {isLoading, data: userData, isError, refetch} = useUserProfile(userInfo?.userName, false);

  const onOpenPostOptions = () => {
    Keyboard.dismiss();
    refetch();
    onOpen();
  };

  const {followUser: follow, cancelRequest, unfollow} = useFollowActions(userInfo?.documentId);

  const sleep = (time: number | undefined) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const share = async () => {
    onClose();
    try {
      await sleep(500);
      const result = await Share.share({
        message: 'Checkout this amazing post on Bravvox',
        url: 'https://dev.bravvox.com/posts/:documentId',
        title: 'post_title',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('shared using', result.activityType);
        } else {
          // shared
          console.log('shared using', result.action);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('shared dismissed');
      }
    } catch (error) {
      // alert(error.message);
      console.log(error);
    }
  };

  const copyLink = () => {
    // TODO: add link format dynamic
    Clipboard.setString('https://dev.bravvox.com/posts/:documentId');
    showSnackbar({message: 'Post Link Copied', type: 'info'});
    onClose();
  };

  const editPost = () => {
    onClose();
    if (onSelectEdit) {
      onSelectEdit();
    }
  };

  const deletePost = () => {
    onClose();
    if (onSelectDelete) {
      onSelectDelete();
    }
  };

  const abuse = () => {
    onClose();
    if (typeof onSelectAbuse === 'function') {
      onSelectAbuse();
    }
  };
  // const isSelf = Boolean(documentId === userInfo?.documentId);
  const {text, followAction, isSelf} = useMemo(() => {
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
    let bIsSelf = false;

    if (userData) {
      const {relationshipInfo} = userData;
      if (relationshipInfo) {
        const {Relationship} = relationshipInfo;

        if (Relationship === 'self') {
          bIsSelf = true;
        }

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
      isSelf: bIsSelf,
    };
  }, [cancelRequest, follow, onClose, refetch, unfollow, userData]);

  if (!userInfo || isLoading || isError) {
    return null;
  }

  return (
    <View ref={ref} width={0} height={0}>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {!isSelf ? (
            <Actionsheet.Item py="3" onPress={followAction} flexDirection="row" display="flex">
              <Text fontFamily="heading" fontSize="17" color="black.900">
                {text} <Text bold>{`@${userInfo.userName}`}</Text>
              </Text>
            </Actionsheet.Item>
          ) : null}
          {isSelf ? (
            <Actionsheet.Item py="3" onPress={editPost}>
              Edit
            </Actionsheet.Item>
          ) : null}
          {isSelf ? (
            <Actionsheet.Item py="3" onPress={deletePost}>
              Delete
            </Actionsheet.Item>
          ) : null}
          <Actionsheet.Item py="3" onPress={copyLink}>
            Copy Link
          </Actionsheet.Item>
          <Actionsheet.Item py="3" onPress={share}>
            Share
          </Actionsheet.Item>
          {!isSelf ? (
            <Actionsheet.Item py="3" onPress={abuse}>
              Report Abuse
            </Actionsheet.Item>
          ) : null}
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
});
PostOptions.defaultProps = {
  onSelectDelete: () => null,
  onSelectEdit: () => null,
};
export type PickerHandle = React.ElementRef<typeof PostOptions>;
export default PostOptions;
