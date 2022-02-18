import { Dispatch } from "redux";
import { UserTypes } from "./UserTypes";
import { ILoginRequestData, IUserActions } from "./UserInterface";

export const userLogout = () => {
  return async (dispatch: Dispatch<IUserActions>) => {
    dispatch({ type: UserTypes.LOGOUT });
  };
};

export const userLogin = (data: ILoginRequestData) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    return dispatch({
      type: UserTypes.LOGIN,
      payload: data,
    });
  };
};