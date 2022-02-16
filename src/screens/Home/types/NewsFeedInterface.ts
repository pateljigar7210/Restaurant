/**
 * @format
 */
export interface IUserInfo {
  documentId?: string;
  name: string;
  profilePic: string;
  userName: string;
  profilePicThumb: string;
  setting: {privacy: string};
  status: string;
}

export interface IComments {
  userInfo: IUserInfo;
  commentLikeCount: number;
  commentText: string;
  commentsDeleted: null;
  contentId: string;
  createdAt: string;
  documentId: string;
  replies: null;
  type: string;
  updatedAt: string;
  userId: string;
}

type ContentDataType = 'video' | 'image';
type ContentStatusType = 'SUSPENDED' | '' | null;

export interface INewsFeedData {
  caption: string;
  contentStatus: ContentStatusType;
  comments: IComments[];
  commentsCount: number;
  contentDataType: ContentDataType;
  createdAt: string;
  documentId: string;
  isDisLiked: boolean;
  isLiked: boolean;
  likesCount: number;
  imageContentLink: IImageContentLink[];
  videoContentLink: IVideoContentLink[];
  shareCount: number;
  shareWith: string;
  tags: string;
  textContent: string;
  unLikesCount: number;
  updatedAt: string;
  userId: string;
  userInfo: IUserInfo;
}

export interface IState {
  loading: boolean;
  isCommentLoading: boolean;
  isContentCreationLoading: boolean;
  isPopularNowLoading: boolean;
  isReportAbuseLoading: boolean;
  newsFeedPage: number;
  newsFeedData: INewsFeedData[];
  loadNextPage: boolean;
  initialLoad: boolean;
  popularNowData: IPopularNowData[];
}

export interface IContentCreationRequestData {
  mediaContent: string | Blob | null;
  tags: string;
  contentDataType: string;
  textContent: string;
  shareWith: string;
}

export interface INewsFeedPayload {
  data: INewsFeedData[];
  pageNumber: number;
  loadNextPage: boolean;
}

export interface INewsFeedResponseData {
  data: INewsFeedData[];
  error: boolean;
  isFromCache: boolean;
  message: string;
  pageNo: number;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Key: string]: any;
}

export interface IPopularNowData {
  commentsCount: number;
  contentDataType: string;
  createdAt: string;
  documentId: string;
  likesCount: number;
  shareCount: number;
  shareWith: string;
  tags: string;
  textContent: string;
  unLikesCount: number;
  updatedAt: string;
  userId: string;
  userInfo: IUserInfo;
  imageContentLink: IImageContentLink[];
  videoContentLink: IVideoContentLink[];
}

export interface IImageContentLink {
  high?: string;
  imageSize?: number;
  original?: string;
  small?: string;
  overlay?: string;
}

type EncodedStatusType = 'complete' | '' | null;

export interface IVideoContentLink {
  VideoPath?: string;
  VideoSize?: number;
  displayImageLink?: string;
  displayImageSize?: number;
  videoEncodeStatus?: EncodedStatusType;
}

export interface IPopularNowResponseData {
  data: IPopularNowData[];
  error: boolean;
  message: string;
  status: number;
}

export interface ICommentCreateRequestData {
  contentId: string;
  comment: string;
  commentId: string;
}

export interface IReportComment {
  commentId: string;
  contentId: string;
  contentType: string;
  reason: string;
}

export interface ICommentUpdateRequestData {
  contentId: string;
  commentId: string;
  comment: string;
}

export interface ICommentDeleteRequestData {
  contentId: string;
  commentId: string;
}

export type ReactionType = 'nil' | 'like' | 'dislike';

export interface ILikeDisLikeRequestData {
  contentId: string;
  like: boolean;
  dislike: boolean;
  reaction: ReactionType;
}
export interface ILikeDisLikeGroupRequestData {
  id: string;
  contentId: string;
  isLike: boolean;
  isLikeReaction: boolean;
  isDisLikeReaction: boolean;
  like: boolean;
  dislike: boolean;
  reaction: ReactionType;
}

export interface IFollowings {
  documentId: string;
  name: string;
  profilePicThumb: string;
  relationship: string;
  userId: number;
  userName: string;
}

export interface IReportAbuseRequestData {
  reason: string;
  contentType: ContentDataType;
  contentId: string;
}
