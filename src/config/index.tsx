import Config from 'react-native-config';

export const config = {
  AUTH_API_URL: `${Config.BASE_URL}/auth/v1/`,
  USER_PROFILE_API_URL: `${Config.BASE_URL}/account/v1/accounts/`,
  GROUP_API_URL: `${Config.BASE_URL}/group/v1/`,
  CONTENT_API_URL: `${Config.BASE_URL}/content/v1/`,
  NEWSFEED_API_URL: `${Config.BASE_URL}/newsfeed/v1/`,
  COMMENT_API_URL: `${Config.BASE_URL}/reaction/v1/reactions/`,
  EVENTS_API_URL: `${Config.BASE_URL}/event/v1/`,
  RELATIONSHIP_API_URL: `${Config.BASE_URL}/relationship/v1/`,
  CONTENT_MODERATION_API_URL: `https://moderation.bravvox.com/services/admin/v1/`,
  BUSINESS_PAGE_API_URL: `${Config.BASE_URL}/businessPage/v1/`,
  NOTIFICATION_PAGE_API_URL: `${Config.BASE_URL}/notification/v1/`,
  GROUP_PROFILE_DETAIL_API_URL: `${Config.BASE_URL}/group/v1/`,
  UPDATE_ACCOUNT_API_URL: `${Config.BASE_URL}/account/v1/accounts/update`,
  UPLOAD_PROFILE_PHOTO: `${Config.BASE_URL}/account/v1/accounts/uploadphoto`,
  UPLOAD_COVER_PHOTO: `${Config.BASE_URL}/account/v1/accounts/uploadcoverphoto`,
  UPDATE_USER_DETAIL: `${Config.BASE_URL}/account/v1/accounts/updateuserdetails`,
  GROUP_LIKE_API_URL: `${Config.BASE_URL}/group/v1/group/`,
};

export const APP_BASE_URL = Config.BASE_URL;
