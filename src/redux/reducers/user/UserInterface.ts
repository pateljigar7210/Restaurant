import {UserTypes} from './UserTypes';

interface ISignUp {
  type: UserTypes.SIGNUP;
}

interface ISignUpRequest {
  type: UserTypes.SIGNUP_PENDING;
}

interface ISignUpSuccess {
  type: UserTypes.SIGNUP_FULFILLED;
  payload: ISignUpResponse;
}

interface ISignUpError {
  type: UserTypes.SIGNUP_REJECTED;
}
interface ILogin {
  payload: any;
  type: UserTypes.LOGIN;
}
interface ILoginRequest {
  type: UserTypes.LOGIN_PENDING;
}
interface ILoginSuccess {
  type: UserTypes.LOGIN_FULFILLED;
  payload: {data: {token: string; documentId: string; username: string}};
}
interface ILoginError {
  type: UserTypes.LOGIN_REJECTED;
}
interface IGetProfile {
  payload: any;
  type: UserTypes.GET_PROFILE;
}

interface IGetProfileRequest {
  type: UserTypes.GET_PROFILE_PENDING;
}
interface IGetProfileSuccess {
  type: UserTypes.GET_PROFILE_FULFILLED;
  payload: {data: IUserData[]};
}
interface IGetProfileError {
  type: UserTypes.GET_PROFILE_REJECTED;
}

interface IUpdateProfilePic {
  payload: {profilePic: string};
  type: UserTypes.UPDATE_PROFILE_PIC;
}
interface IUpdateCoverPic {
  payload: {coverPic: string};
  type: UserTypes.UPDATE_COVER_PIC;
}
interface IUpdateUsername {
  payload: {userName: string | undefined; name: string | undefined};
  type: UserTypes.UPDATE_USER_NAME;
}
interface ILogout {
  type: UserTypes.LOGOUT;
}

interface IReset {
  type: UserTypes.RESET;
}

interface IResetRequest {
  type: UserTypes.RESET_PENDING;
}

interface IResetSuccess {
  type: UserTypes.RESET_FULFILLED;
  payload: IResetData;
}

interface IResetError {
  type: UserTypes.RESET_REJECTED;
}

interface IForget {
  type: UserTypes.FORGET_PASSWORD;
}

interface IForgetRequest {
  type: UserTypes.FORGET_PASSWORD_PENDING;
}

interface IForgetSuccess {
  type: UserTypes.FORGET_PASSWORD_FULFILLED;
  // payload: IForgetData;
}

interface IForgetError {
  type: UserTypes.FORGET_PASSWORD_REJECTED;
}

interface IUpdateAccount {
  type: UserTypes.UPDATE_PROFILE_ACCOUNT;
  payload: {
    name: string;
    website: string;
    bio: string;
    location: string;
    profileTagline: string;
    facebookAccount: string;
    twitterAccount: string;
  };
}

export type IUserActions =
  | ISignUp
  | ISignUpRequest
  | ISignUpSuccess
  | ISignUpError
  | ILogin
  | ILoginRequest
  | ILoginSuccess
  | ILoginError
  | IGetProfile
  | IGetProfileRequest
  | IGetProfileSuccess
  | IGetProfileError
  | IGetProfile
  | IGetProfileRequest
  | IGetProfileSuccess
  | IGetProfileError
  | IUpdateProfilePic
  | IUpdateUsername
  | ILogout
  | IReset
  | IResetRequest
  | IResetSuccess
  | IResetError
  | IForget
  | IForgetRequest
  | IForgetSuccess
  | IUpdateAccount
  | IUpdateCoverPic
  | IForgetError;

export interface ISignUpResponse {
  documentId: string;
  username: string;
}

export interface ILoginRequestData {
  Username: string;
  password: string;
}

export interface IResetState {
  loading: boolean;
  ResetPwdResponse: IResetData;
}

export interface IResetData {
  password: string;
  token: any;
}

export interface IForgetState {
  loading: boolean;
  forgetPwdResponse: IForgetData;
}

export interface IForgetData {
  username: string;
}

export interface IUserState {
  loading: boolean;
  isLoggedIn: boolean;
  token: string | null;
  documentId: string | null;
  username: string | null;
  verifyingEmail: boolean;
  user: IUserData;
}

export type RelationShip =
  | 'self'
  | 'requested'
  | 'none'
  | 'follower'
  | 'following me'
  | 'following'
  | 'approve follower'
  | 'follow back';
export interface IUserData {
  aboveThirteen: boolean;
  bio: string;
  city: string;
  college: string;
  coverPic: string;
  dob: string;
  documentId: string;
  education: string;
  email: string;
  emailVerificationCount: number;
  gender: string;
  homeTown: string;
  isVerified: boolean;
  isVerifiedTemp: boolean;
  location: string;
  name: string;
  notificationPreference: string;
  phone: string;
  profilePic: string;
  profilePicThumb: string;
  profileTagline: string;
  relationshipInfo: {
    FollowedCount: number;
    FollowingCount: number;
    Relationship: RelationShip;
  };
  setFollower: boolean;
  setSubscriber: boolean;
  status: string;
  tempEmail: string;
  tncAccepted: boolean;
  updatedAt: string;
  userName: string;
  verifiedUsing: string;
  website: string;
  facebookAccount: string;
  twitterAccount: string;
}

export interface ISignUpRequestData {
  name: string;
  username: string;
  email: string;
  password: string;
  aboveThirteen: boolean;
  tncAccepted: boolean;
  referralCode?: string;
  isContentCreator?: boolean;
  isVerified?: boolean;
}

export interface IUpdateAccountRequestData {
  name: string;
  website: string;
  bio: string;
  location: string;
  profileTagline: string;
  facebookAccount: string;
  twitterAccount: string;
}
export interface IUpdateProfilePhoto {
  data: string;
  canvasData: string;
  cropBoxData: string;
  minZoom: string;
  zoom: string;
  originalFile: any;
  croppedFile: any;
}
