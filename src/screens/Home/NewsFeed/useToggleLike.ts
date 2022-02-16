/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @format
 */
import {useQueryClient} from 'react-query';

import {config} from '../../../config';
import client from '../../../utils/ApiClient';
import {
  ILikeDisLikeGroupRequestData,
  ILikeDisLikeRequestData,
  IReportAbuseRequestData,
} from '../types/NewsFeedInterface';
import {showSnackbar} from '../../../utils/SnackBar';
import {IResponseData} from '../../../constants/types';
import {QueryKeys, QueryKeysType} from '../../../utils/QueryKeys';
import {IFeedPages} from '../useNewsFeed';
import {IFeedGroupPages} from '../../GroupProfile/Queries/useGroupNewsFeed';
import {FromType} from './Interactions';

const useFeedActions = () => {
  const queryClient = useQueryClient();

  const updateHomeLikeToCache = async (
    contentId: string,
    data: ILikeDisLikeRequestData,
    key: QueryKeysType,
  ) => {
    const feed = await queryClient.getQueryData<IFeedPages>(key);
    if (feed) {
      const {pages} = feed;
      const updatedPages = pages.map(c => {
        const {data: posts, ...rest} = c;
        const updatedPosts = posts.map(post => {
          if (post.documentId === contentId) {
            const {likesCount, unLikesCount, isLiked, isDisLiked} = post;
            let updLikeCount = likesCount;
            let updUnlikeCount = unLikesCount;
            if (isLiked && !data.like) {
              updLikeCount -= 1;
            } else if (!isLiked && data.like) {
              updLikeCount += 1;
            }
            if (isDisLiked && !data.dislike) {
              updUnlikeCount -= 1;
            } else if (!isDisLiked && data.dislike) {
              updUnlikeCount += 1;
            }
            return {
              ...post,
              isLiked: data.like,
              isDisLiked: data.dislike,
              likesCount: updLikeCount,
              unLikesCount: updUnlikeCount,
            };
          }
          return post;
        });
        return {...rest, data: updatedPosts};
      });
      const updateFeed = {...feed, pages: updatedPages};
      queryClient.setQueryData<IFeedPages>(key, {...updateFeed});
    }
  };

  /**
   * Update GroupLike  cache logic here.
   */
  const updateLikeToCache = async (
    id: string,
    contentId: string,
    data: ILikeDisLikeGroupRequestData,
    key: string[],
  ) => {
    const feed = await queryClient.getQueryData<IFeedGroupPages>(key);
    if (feed) {
      const {pages} = feed;
      const updatedPages = pages.map(c => {
        const {data: posts, ...rest} = c;
        const updatedPosts = posts.map(post => {
          if (post.documentId === contentId) {
            const {likesCount, unLikesCount, isLiked, isDisLiked} = post;
            let updLikeCount = likesCount;
            let updUnlikeCount = unLikesCount;
            if (isLiked && (!data.isLikeReaction || data.isLikeReaction)) {
              updLikeCount -= 1;
            } else if (!isLiked && data.isLikeReaction) {
              updLikeCount += 1;
            }
            if (isDisLiked && (!data.isDisLikeReaction || data.isDisLikeReaction)) {
              updUnlikeCount -= 1;
            } else if (!isDisLiked && data.isDisLikeReaction) {
              updUnlikeCount += 1;
            }
            return {
              ...post,
              isLiked: data.isLikeReaction,
              isDisLiked: data.isDisLikeReaction,
              likesCount: updLikeCount,
              unLikesCount: updUnlikeCount,
            };
          }
          return post;
        });
        return {...rest, data: updatedPosts};
      });
      const updateFeed = {...feed, pages: updatedPages};
      queryClient.setQueryData<IFeedGroupPages>(key, {...updateFeed});
    }
  };
  const toggleLikePost = async (data: ILikeDisLikeGroupRequestData, from: FromType) => {
    try {
      let url = '';
      let cacheKey: string[] = [];
      switch (from) {
        case 'home':
          url = `${config.COMMENT_API_URL}likes`;
          break;
        case 'group':
          url = `${config.GROUP_LIKE_API_URL}${data.id}/post/${data.contentId}/like`;
          cacheKey = [QueryKeys.groupFeed, data.id];
          break;
        case 'business':
          url = `${config.BUSINESS_PAGE_API_URL}businessPage/${data.id}/post/${data.contentId}/like`;
          cacheKey = [QueryKeys.businessFeed, data.id];
          break;
        default:
          break;
      }
      const response: IResponseData = await client.post(url, data);
      if (response.status === 200) {
        switch (from) {
          case 'home':
            updateHomeLikeToCache(data.contentId, data, 'homeFeed');
            break;
          case 'group':
          case 'business':
            updateLikeToCache(data.id, data.contentId, data, cacheKey);
            break;
          default:
            break;
        }
      } else if (response.error) {
        showSnackbar({message: response.message, type: 'danger'});
      }
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
    }
    return null;
  };


  const postReportAbuse = async (data: IReportAbuseRequestData) => {
    try {
      const url = `${config.CONTENT_MODERATION_API_URL}contentmoderation/reportcontent`;
      const {message}: IResponseData = await client.post(url, data);
      showSnackbar({message, duration: 4000});
    } catch (error: any) {
      const message = error?.message || 'Something went wrong!';
      showSnackbar({message, type: 'danger'});
    }
    return null;
  };

  return {
    toggleLikePost,
    postReportAbuse,
  };
};

export {useFeedActions};
