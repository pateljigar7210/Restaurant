/**
 * @format
 */
import React from 'react';
import {View, HStack, Text} from 'native-base';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {INewsFeedData, IUserInfo} from '../types/NewsFeedInterface';
import {timeDiffCalc} from '../../../utils';
import {Title, SubTitle} from '../../../components/Typography';
import {OptionIcon} from '../../../components/Common';

import SafeTouchable from '../../../components/SafeTouchable';
import UserAvatar from '../../../components/UserAvatar';
import PostOptions, {PickerHandle} from './PostOptions';
import {PostCreationTypeFrom, RootStackParamList} from '../../../navigation';
import {useConfirmModal} from '../../../components/CofirmationModel';
import {useDeletePost} from './Queries/useDeletePost';
import {IUserData} from '../../../redux/reducers/user/UserInterface';

interface IHeadingProps {
  userInfo: IUserInfo;
  createdAt: string;
  openProfile: ((event: GestureResponderEvent) => void) | undefined;
  onSelectAbuse: () => void;
  from: string;
  isMember?: boolean;
  navigation: NativeStackNavigationProp<RootStackParamList, any>;
  newsFeed: INewsFeedData;
}

export default function Heading(props: IHeadingProps) {
  const {userInfo, navigation, createdAt, newsFeed, openProfile, onSelectAbuse, isMember, from} =
    props;
  const {name, profilePic} = userInfo;
  const postOptions = React.useRef<PickerHandle>(null);
  const screenName = from as PostCreationTypeFrom;
  const confirm = useConfirmModal();
  const onOptionsClick = () => postOptions.current?.onPickerSelect();

  const onSelectEdit = () =>
    navigation.navigate('EditPost', {
      from: screenName,
      id: newsFeed.documentId,
      title: 'Edit Post',
      newsFeed: newsFeed as INewsFeedData,
    });

  const {deleteData} = useDeletePost({from: screenName, id: newsFeed.documentId});

  const onSelectDelete = () => {
    confirm?.show?.({
      title: <Title fontSize={18}>Delete Post</Title>,
      message: (
        <Text>
          <Text>Are you sure you want to Delete Post?</Text>
        </Text>
      ),
      onConfirm: () => deleteData(),
      submitLabel: 'YES',
      cancelLabel: 'CANCEL',
    });
  };

  return (
    <HStack px="5" justifyContent="space-between" flexDirection="row">
      <SafeTouchable onPress={openProfile} style={styles.profileWidth}>
        <HStack alignItems="center">
          <UserAvatar profilePic={profilePic} />
          <View ml="3">
            <Title numberOfLines={1}>{name}</Title>
            <SubTitle mt="1">{timeDiffCalc(createdAt)}</SubTitle>
          </View>
        </HStack>
      </SafeTouchable>
      {!isMember && (from === 'group' || from === 'business') ? null : (
        <View alignItems="flex-end">
          <>
            <OptionIcon onOpen={onOptionsClick} size={15} />
            <PostOptions
              ref={postOptions}
              userInfo={userInfo}
              onSelectAbuse={onSelectAbuse}
              onSelectEdit={onSelectEdit}
              onSelectDelete={onSelectDelete}
            />
          </>
        </View>
      )}
    </HStack>
  );
}
Heading.defaultProps = {
  isMember: true,
};
const styles = StyleSheet.create({profileWidth: {width: '80%'}});
