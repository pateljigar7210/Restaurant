import {Dispatch} from 'redux';
import {IUpdateAccountRequestData, IUserActions} from './UserInterface';
import {UserTypes} from './UserTypes';

export const userLoginRequest = () => {
  return (dispatch: Dispatch<IUserActions>) => {
    dispatch({
      type: UserTypes.LOGIN_PENDING,
    });
  };
};

export const userLoginSuccess = (token: string) => {
  return (dispatch: Dispatch<IUserActions>) => {
    dispatch({
      type: UserTypes.LOGIN_FULFILLED,
      payload: {token},
    });
  };
};

export const userLoginError = () => {
  return (dispatch: Dispatch<IUserActions>) => {
    dispatch({
      type: UserTypes.LOGIN_REJECTED,
    });
  };
};

export const userLogout = () => {
  return (dispatch: Dispatch<IUserActions>) => {
    dispatch({
      type: UserTypes.LOGOUT,
    });
  };
};

export const userUpdate = (data: IUpdateAccountRequestData) => {
  return (dispatch: Dispatch<IUserActions>) => {
    dispatch({
      type: UserTypes.UPDATE_PROFILE_ACCOUNT,
      payload: data,
    });
  };
};
