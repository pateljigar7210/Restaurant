import {IUserState, IUserActions, IUserData} from './UserInterface';
import {UserTypes} from './UserTypes';

const initialState: IUserState = {
  loading: false,
  isLoggedIn: false,
  token: null,
  documentId: null,
  username: null,
  verifyingEmail: false,
  user: {} as IUserData,
};

const userReducer = (state: IUserState = initialState, action: IUserActions) => {
  switch (action.type) {
    case UserTypes.SIGNUP_PENDING:
      return {
        ...state,
        loading: true,
      };
    case UserTypes.SIGNUP_FULFILLED:
      return {
        ...state,
        loading: false,
      };
    case UserTypes.SIGNUP_REJECTED:
      return {
        ...state,
        loading: false,
      };
    case UserTypes.LOGIN_PENDING:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    case UserTypes.LOGIN_FULFILLED:
      return {
        ...state,
        // loading: false,
        // isLoggedIn: true,
        token: action.payload.data.token,
        documentId: action.payload.data.documentId,
        username: action.payload.data.username,
      };
    case UserTypes.LOGIN_REJECTED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };
    case UserTypes.GET_PROFILE_PENDING:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    case UserTypes.GET_PROFILE_FULFILLED:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload.data[0],
      };
    case UserTypes.GET_PROFILE_REJECTED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };
    case UserTypes.UPDATE_PROFILE_PIC:
      return {
        ...state,
        user: {...state.user, profilePic: action.payload.profilePic},
      };
    case UserTypes.UPDATE_COVER_PIC:
      return {
        ...state,
        user: {...state.user, coverPic: action.payload.coverPic},
      };
    case UserTypes.UPDATE_USER_NAME:
      return {
        ...state,
        user: {...state.user, userName: action.payload.userName, name: action.payload.name},
      };
    case UserTypes.FORGET_PASSWORD_PENDING:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    case UserTypes.FORGET_PASSWORD_FULFILLED:
      return {
        ...state,
        loading: false,
      };
    case UserTypes.FORGET_PASSWORD_REJECTED:
      return {
        ...state,
        loading: false,
      };
    case UserTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        loading: false,
        documentId: null,
        username: null,
        verifyingEmail: false,
        user: {} as IUserData,
      };
    case UserTypes.UPDATE_PROFILE_ACCOUNT:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          name: action.payload.name,
          website: action.payload.website,
          bio: action.payload.bio,
          location: action.payload.location,
          profileTagline: action.payload.profileTagline,
          facebookAccount: action.payload.facebookAccount,
          twitterAccount: action.payload.twitterAccount,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
