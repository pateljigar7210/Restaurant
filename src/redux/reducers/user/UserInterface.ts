import { UserTypes } from "./UserTypes";

interface ILogin {
  payload: any;
  type: UserTypes.LOGIN;
}
interface ILogout {
  type: UserTypes.LOGOUT;
}

export type IUserActions = ILogin | ILogout;

export interface ILoginRequestData {
  username: string;
  password: string;
}

export interface IUserState {
  loading: boolean;
  isLoggedIn: boolean;
  username: string | null;
  password: string | null;
}
