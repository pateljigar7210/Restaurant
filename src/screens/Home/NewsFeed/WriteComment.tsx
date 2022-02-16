import React, {useRef} from 'react';
import {
  TextInput as TextField,
  InteractionManager,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {CloseIcon, HStack, View} from 'native-base';
import {Formik, FormikHelpers} from 'formik';
import emojis from 'emojis-list';
import {emojisData} from '../../../utils';
import {ICommentCreateRequestData} from '../types/NewsFeedInterface';
import {useComment} from '../useComment';
import {FromType, SendIcon} from './Interactions';
import UserAvatar from '../../../components/UserAvatar';
import {theme} from '../../../theme';
import useUserInfo from '../../../hooks/useUserInfo';
import SafeTouchable from '../../../components/SafeTouchable';

interface MyFormValues {
  comment: string;
}
interface IWriteComment {
  documentId: string;
  from: FromType;
  id: string; // this can be postId, businessId or eventId
  value?: string | undefined;
  isEdit?: boolean | undefined;
  setSelectedCommment?: (comment: string) => void;
  commentId?: string | undefined;
  // eslint-disable-next-line react/require-default-props
  isSelectedComment?: boolean | undefined;
}

interface IEmojisData {
  title: string;
  code: number;
}

export function WriteComment(props: IWriteComment) {
  const {documentId, commentId, from, id, value, isEdit, isSelectedComment, setSelectedCommment} =
    props;

  const {user} = useUserInfo();
  const {profilePic} = user;
  const [spinnerLoader, setSpinnerLoader] = React.useState<boolean>(false);
  const {createComment, updateComment} = useComment();
  const inputRef = useRef<TextField>(null);

  React.useEffect(() => {
    if (commentId) {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
      });
    }
  }, [commentId]);

  const onSubmit = async (values: MyFormValues, {resetForm}: FormikHelpers<MyFormValues>) => {
    setSpinnerLoader(true);
    try {
      const data: ICommentCreateRequestData = {
        contentId: documentId || '',
        comment: values.comment,
        commentId: commentId || '',
      };
      if (isEdit) {
        await updateComment(data, from, id);
      } else {
        await createComment(data, from, id);
      }
      handleClose();
      resetForm();
      setSpinnerLoader(false);
    } catch (error) {
      resetForm();
      setSpinnerLoader(false);
    }
  };
  const emojisList = (selectEmojis: string) => {
    let newValue = selectEmojis;

    emojisData.map((item: IEmojisData) => {
      const isAvailable: string[] = item.title.split(',');
      const temp: {length: number; idx: number}[] = [];

      isAvailable.filter((i: string) => {
        const index = selectEmojis.indexOf(i);
        if (index !== -1) temp.push({length: i.length, idx: index});
        return false;
      });

      if (temp && temp.length > 0) {
        temp.map((i: {length: number; idx: number}) => {
          const findEmojis = emojis.find((_: string, index: number) => index === item.code);
          newValue = newValue.slice(0, i.idx) + findEmojis + newValue.slice(i.idx + i.length);
          return i;
        });
      }

      return item;
    });
    return newValue;
  };

  const handleClose = () => {
    if (setSelectedCommment) setSelectedCommment('');
  };

  return (
    <Formik initialValues={{comment: value || ''}} onSubmit={onSubmit}>
      {({values, setFieldValue, handleSubmit}) => (
        <HStack space={3} alignItems="center" mt="2">
          <UserAvatar profilePic={profilePic} />
          <View style={styles.inputContainer}>
            <TextField
              ref={inputRef}
              style={[styles.inputStyle, isEdit ? styles.inputEditPadding : styles.inputPadding]}
              placeholder="Write a comment"
              placeholderTextColor="#A4A4A4"
              value={values.comment}
              editable={!isSelectedComment}
              maxLength={1000}
              onChangeText={text => {
                const result: string = emojisList(text);
                setFieldValue('comment', result);
              }}
              multiline
            />
            {spinnerLoader ? (
              <View justifyContent="center">
                <ActivityIndicator size={15} color="#959699" />
              </View>
            ) : (
              <SendIcon
                disabled={values.comment.trim().length === 0}
                size={isEdit ? 13 : 15}
                onPress={handleSubmit}
              />
            )}
            {isEdit && (
              <SafeTouchable style={styles.closeButton} onPress={handleClose}>
                <CloseIcon size={11} color="#959699" />
              </SafeTouchable>
            )}
          </View>
        </HStack>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '87%',
    height: 37,
    backgroundColor: theme.colors.appWhite[700],
    borderRadius: 45,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    width: '90%',
    fontSize: 13,
    alignSelf: 'center',
    color: theme.colors.black[1000],
  },
  inputEditPadding: {paddingLeft: 15},
  inputPadding: {paddingLeft: 10},
  closeButton: {marginLeft: 10, marginRight: 5},
});

WriteComment.defaultProps = {
  isEdit: false,
  value: '',
  commentId: '',
  setSelectedCommment: () => {
    //
  },
};

export default WriteComment;
