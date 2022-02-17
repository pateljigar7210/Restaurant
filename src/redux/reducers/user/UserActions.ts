import { Dispatch } from "redux";
import { IUserActions } from "./UserInterface";
import { UserTypes } from "./UserTypes";

export const userLogout = () => {
  return (dispatch: Dispatch<IUserActions>) => {
    dispatch({
      type: UserTypes.LOGOUT,
    });
  };
};
