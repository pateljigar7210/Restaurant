/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @format
 */
import {useQueryClient} from 'react-query';
import {config} from '../../config';
import client from '../../utils/ApiClient';
import {
  IComments,
  ICommentCreateRequestData,
  IReportComment,
  ICommentDeleteRequestData,
} from './types/NewsFeedInterface';
import {showSnackbar} from '../../utils/SnackBar';
import {QueryKeys, QueryKeysType} from '../../utils/QueryKeys';
import {IFeedPages} from './useNewsFeed';
import {FromType} from './NewsFeed/Interactions';

export interface ICommentResponse {
  data: IComments;
  error: boolean;
  message: string;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Key: string]: any;
}

interface IReportCommentResponse {
  data: {contentId: string; documentId: string};
  error: boolean;
  message: string;
  status: number;
}
const useComment = () => {
  const queryClient = useQueryClient();

  const addCommentToCache = async (
    contentId: string,
    data: IComments,
    key: QueryKeysType,
    cacheId: string | undefined = undefined,
    commentId: string,
  ) => {
    const cacheKey: string[] = [key];
    if (cacheId) {
      cacheKey.push(cacheId);
    }
    const feed = await queryClient.getQueryData<IFeedPages>(cacheKey);
    if (feed) {
      const {pages} = feed;
      const updatedPages = pages.map(c => {
        const {data: posts, ...rest} = c;
        const updatedPosts = posts.map(post => {
          if (post.documentId === contentId) {
            const {comments, commentsCount, ...others} = post;
            let updComments: IComments[] = [];
            let updCount = 0;
            if (commentId !== '') {
              comments.map(com => {
                if (com.documentId === commentId) {
                  com.commentText = data.commentText;
                }
                return com;
              });
              updComments = comments;
              updCount = commentsCount;
            } else {
              updComments = comments ? [...comments, data] : [data];
              updCount = commentsCount + 1;
            }
            return {comments: updComments, commentsCount: updCount, ...others};
          }
          return post;
        });
        return {...rest, data: updatedPosts};
      });
      const updateFeed = {...feed, pages: updatedPages};
      queryClient.setQueryData<IFeedPages>(cacheKey, {...updateFeed});
    }
  };

  const deleteCommentFromCache = async (
    contentId: string,
    commnetId: string,
    key: QueryKeysType,
    cacheId: string | undefined = undefined,
  ) => {
    const cacheKey: string[] = [key];
    if (cacheId) {
      cacheKey.push(cacheId);
    }
    const feed = await queryClient.getQueryData<IFeedPages>(cacheKey);
    if (feed) {
      const {pages} = feed;
      const updatedPages = pages.map(c => {
        const {data: posts, ...rest} = c;
        const updatedPosts = posts.map(post => {
          if (post.documentId === contentId) {
            const {comments, commentsCount, ...others} = post;
            const updComments = comments.filter(comment => comment.documentId !== commnetId);
            const updCount = commentsCount - 1;
            return {comments: updComments, commentsCount: updCount, ...others};
          }
          return post;
        });
        return {...rest, data: updatedPosts};
      });
      const updateFeed = {...feed, pages: updatedPages};
      queryClient.setQueryData<IFeedPages>(cacheKey, {...updateFeed});
    }
  };

  const createComment = async (data: ICommentCreateRequestData, from: FromType, id = '') => {
    try {
      let url = '';
      let reqData;
      let queryKeyType: QueryKeysType = 'homeFeed';
      let cacheId;
      switch (from) {
        case 'home':
          url = `${config.COMMENT_API_URL}createcomment`;
          reqData = data;
          queryKeyType = 'homeFeed';
          break;
        case 'profile':
          url = `${config.COMMENT_API_URL}createcomment`;
          reqData = data;
          queryKeyType = 'userFeed';
          cacheId = id
          break;
        case 'group':
          url = `${config.GROUP_API_URL}group/${id}/post/${data.contentId}/comment`;
          reqData = {textContent: data.comment};
          queryKeyType = 'groupFeed';
          cacheId = id;
          break;
        case 'business':
          url = `${config.BUSINESS_PAGE_API_URL}businessPage/${id}/post/${data.contentId}/comment`;
          reqData = {textContent: data.comment};
          queryKeyType = 'businessFeed';
          cacheId = id;
          break;
        default:
          break;
      }
      const response: ICommentResponse = await client.post(url, reqData);
      if (response.status === 200) {
        addCommentToCache(data.contentId, response.data, queryKeyType, cacheId, '');
        queryClient.invalidateQueries(QueryKeys.comments);
      } else if (response.error) {
        showSnackbar({message: response.message, type: 'danger'});
      }
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
    }
    return null;
  };

  const updateComment = async (data: ICommentCreateRequestData, from: FromType, id = '') => {
    try {
      let url = '';
      let reqData;
      let queryKeyType: QueryKeysType = 'homeFeed';
      let cacheId;
      switch (from) {
        case 'home':
          url = `${config.COMMENT_API_URL}updatecomment`;
          reqData = data;
          queryKeyType = 'homeFeed';
          break;
          case 'profile':
            url = `${config.COMMENT_API_URL}updatecomment`;
            reqData = data;
            queryKeyType = 'userFeed';
            cacheId = id
            break;
        case 'group':
          url = `${config.GROUP_API_URL}group/${id}/post/${data.contentId}/comment/${data.commentId}`;
          reqData = {textContent: data.comment};
          queryKeyType = 'groupFeed';
          cacheId = id;
          break;
        case 'business':
          url = `${config.BUSINESS_PAGE_API_URL}businessPage/${id}/post/${data.contentId}/comment/${data.commentId}`;
          reqData = {textContent: data.comment};
          queryKeyType = 'businessFeed';
          cacheId = id;
          break;
        default:
          break;
      }
      const response: ICommentResponse = await client.put(url, reqData);
      if (response.status === 200) {
        addCommentToCache(data.contentId, response.data, queryKeyType, cacheId, data.commentId);
        queryClient.invalidateQueries(QueryKeys.comments);
      } else if (response.error) {
        showSnackbar({message: response.message, type: 'danger'});
      }
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
    }
    return null;
  };

  const commentReportAbuse = async (data: IReportComment) => {
    try {
      const url = `${config.CONTENT_MODERATION_API_URL}contentmoderation/reportcomment`;
      const {message}: IReportCommentResponse = await client.post(url, data);
      showSnackbar({message, duration: 4000});
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
    }
    return null;
  };

  const deleteComment = async (data: ICommentDeleteRequestData, from: FromType, id = '') => {
    try {
      let url = '';
      let reqData;
      let queryKeyType: QueryKeysType = 'homeFeed';
      let cacheId;
      switch (from) {
        case 'home':
          url = `${config.COMMENT_API_URL}deletecomment`;
          reqData = data;
          queryKeyType = 'homeFeed';
          break;
          case 'profile':
            url = `${config.COMMENT_API_URL}deletecomment`;
            reqData = data;
            queryKeyType = 'userFeed';
            cacheId = id;
            break;
        case 'group':
          url = `${config.GROUP_API_URL}group/${id}/post/${data.contentId}/comment/${data.commentId}`;
          queryKeyType = 'groupFeed';
          cacheId = id;
          break;
        case 'business':
          url = `${config.BUSINESS_PAGE_API_URL}businessPage/${id}/post/${data.contentId}/comment/${data.commentId}`;
          queryKeyType = 'businessFeed';
          cacheId = id;
          break;
        default:
          break;
      }
      const response: ICommentResponse = await client.delete(url, {data: reqData});

      if (response.status === 200) {
        deleteCommentFromCache(data.contentId, data.commentId, queryKeyType, cacheId);
        queryClient.invalidateQueries(QueryKeys.comments);
      } else if (response.error) {
        showSnackbar({message: response.message, type: 'danger'});
      }
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
    }
    return null;
  };
  return {
    createComment,
    updateComment,
    commentReportAbuse,
    deleteComment,
  };
};

export {useComment};
