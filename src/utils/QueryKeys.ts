/**
 * @format
 */
const QueryKeys = {
  homeFeed: 'homeFeed',
  userFeed: 'userFeed',
  userMedia: 'userMedia',
  userFollowing: 'userFollowing',
  userProfileDetails: 'userProfileDetails',
  useFollowers: 'useFollowers',
  useFollowBackUser: 'useFollowBackUser',
  groupsList: 'groupsList',
  notifications: 'notifications',
  viewNotifications: 'viewNotifications',
  groupProfileDetails: 'groupProfileDetails',
  groupFeed: 'groupFeed',
  groupMedia: 'groupMedia',
  groupMemberCheck: 'groupMemberCheck',
  groupMembers: 'groupMembers',
  comments: 'comments',
  settingKey: 'settingKey',
  groupMakeAdmin: 'groupMakeAdmin',
  groupRemoveAdmin: 'groupRemoveAdmin',
  businessList: 'businessList',
  businessProfile: 'businessProfile',
  businessProfileDetails:'businessProfileDetails',
  businessFeed:'businessFeed',
  businessDetails: 'businessDetails',
  businessMemberCheck: 'businessMemberCheck',
  businessMedia: 'businessMedia',
  businessMembers: 'businessMembers',
  businessPageMembers: 'businessPageMembers',
  eventList: 'eventList',
  eventProfileDetails: 'eventProfileDetails',
  eventMemberCheck: 'eventMemberCheck',
};

export type QueryKeysType = keyof typeof QueryKeys;

export {QueryKeys};
