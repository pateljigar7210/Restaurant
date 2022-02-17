import { IUserState, IUserActions } from "./UserInterface";
import { UserTypes } from "./UserTypes";

const initialState: IUserState = {
  loading: false,
  isLoggedIn: false,
  username: "",
  password: "",
};

const userReducer = (
  state: IUserState = initialState,
  action: IUserActions
) => {
  console.log("action", action);
  switch (action.type) {
    case UserTypes.LOGIN:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        isLoggedIn: true,
      };

    case UserTypes.LOGOUT:
      return {
        ...state,
        username: "",
        password: "",
      };
    default:
      return state;
  }
};

export default userReducer;
