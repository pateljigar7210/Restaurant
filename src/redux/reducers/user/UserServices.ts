import {Dispatch} from 'redux';
import {Platform} from 'react-native';
import {UserTypes} from './UserTypes';
import {
  ILoginRequestData,
  IUserActions,
  IForgetData,
  ISignUpRequestData,
  IUpdateAccountRequestData,
  IUpdateProfilePhoto,
} from './UserInterface';
import {IResponseData} from '../../../constants/types';
import client from '../../../utils/ApiClient';
import {config} from '../../../config';
import {showSnackbar} from '../../../utils/SnackBar';
import {randomName} from '../../../utils';

export const checkUsernameIsValid = async (username: string) => {
  try {
    const {data: res}: IResponseData = await client.get(
      `${config.AUTH_API_URL}check-username?username=${username}`,
    );
    return !res.error;
  } catch (err: any) {
    return !err.error;
  }
};

export const resendCheckEmail = async (email: string) => {
  try {
    const res: IResponseData = await client.get(
      `${config.AUTH_API_URL}resend-verification-email?email=${email}`,
    );
    return res;
  } catch (err: any) {
    return err;
  }
};

export const userLogout = () => {
  return async (dispatch: Dispatch<IUserActions>) => {
    dispatch({type: UserTypes.LOGOUT});
  };
};

export const updateProfilePic = (profilePic: string) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    dispatch({type: UserTypes.UPDATE_PROFILE_PIC, payload: {profilePic}});
  };
};
export const updateUsername = (data: {userName: string | undefined; name: string | undefined}) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    dispatch({type: UserTypes.UPDATE_USER_NAME, payload: data});
  };
};

export const updateCoverPic = (coverPic: string) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    dispatch({type: UserTypes.UPDATE_COVER_PIC, payload: {coverPic}});
  };
};

export const forgotPassword = (data: IForgetData) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    return dispatch({
      type: UserTypes.FORGET_PASSWORD,
      payload: async () => {
        try {
          const response: IResponseData = await client.post(
            `${config.AUTH_API_URL}forgot-password`,
            data,
          );
          if (response) {
            showSnackbar({
              message: response.message,
              type: response.error ? 'danger' : 'success',
            });
          }
          return Promise.resolve(response);
        } catch (error: any) {
          showSnackbar({
            message: error?.message || 'Something went wrong!',
            type: 'danger',
          });
          return Promise.reject(error);
        }
      },
    });
  };
};

export const userSignUp = (data: ISignUpRequestData) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    return dispatch({
      type: UserTypes.SIGNUP,
      payload: async () => {
        try {
          const res: IResponseData = await client.post(`${config.AUTH_API_URL}register`, data);
          showSnackbar({message: res?.message});
          return Promise.resolve(res);
        } catch (error: any) {
          showSnackbar({
            message: error?.message || 'Something went wrong!',
            type: 'danger',
          });
          return Promise.reject(error);
        }
      },
    });
  };
};

export const userLogin = (data: ILoginRequestData) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    return dispatch({
      type: UserTypes.LOGIN,
      payload: async () => {
        try {
          const response: IResponseData = await client.post(`${config.AUTH_API_URL}login`, data);
          return Promise.resolve(response);
        } catch (error: any) {
          showSnackbar({message: error.message, type: 'danger'});
          return Promise.reject(error);
        }
      },
    });
  };
};

export const getUserProfile = (userId: string) => {
  return async (dispatch: Dispatch<IUserActions>) => {
    return dispatch({
      type: UserTypes.GET_PROFILE,
      payload: async () => {
        try {
          const url = `${config.USER_PROFILE_API_URL}userdetails/${userId}`;
          const response: IResponseData = await client.get(url);
          return Promise.resolve(response);
        } catch (error: any) {
          showSnackbar({message: error.message, type: 'danger'});
          return Promise.reject(error);
        }
      },
    });
  };
};

export const updateAccount = async (data: IUpdateAccountRequestData) => {
  try {
    const url = config.UPDATE_ACCOUNT_API_URL;
    const response: IResponseData = await client.put(url, data);
    return Promise.resolve(response);
  } catch (error: any) {
    showSnackbar({message: error.message, type: 'danger'});
    return Promise.reject(error);
  }
};
export const updateUserDetail = async (data: IUpdateAccountRequestData) => {
  try {
    const url = config.UPDATE_USER_DETAIL;
    const response: IResponseData = await client.put(url, data);
    return Promise.resolve(response);
  } catch (error: any) {
    showSnackbar({message: error.message, type: 'danger'});
    return Promise.reject(error);
  }
};

export const uploadProfile = async (data: IUpdateProfilePhoto) => {
  try {
    const url = config.UPLOAD_PROFILE_PHOTO;
    const formData = new FormData();
    formData.append('data', data.data);
    formData.append('canvasData', data.canvasData);
    formData.append('cropBoxData', data.cropBoxData);
    formData.append('minZoom', data.minZoom);
    formData.append('zoom', data.zoom);
    const originalFileName = data.originalFile.name ?? `${randomName(8)}.jpg`;
    const originalFile = {
      uri: data.originalFile.uri,
      type: 'image/*',
      name: originalFileName,
    };

    const croppedFileName = data.croppedFile.name ?? `${randomName(8)}.jpg`;
    const croppedFile = {
      uri: data.croppedFile.uri,
      type: 'image/*',
      name: croppedFileName,
    };
    formData.append('originalFile', Platform.OS === 'ios' ? originalFile : croppedFile);
    formData.append('croppedFile', croppedFile);
    const headers = {'Content-Type': 'multipart/form-data'};
    const response: IResponseData = await client.put(url, formData, {headers});
    return Promise.resolve(response);
  } catch (error: any) {
    showSnackbar({message: error.message, type: 'danger'});
    return Promise.reject(error);
  }
};

export const uploadCoverPhoto = async (data: IUpdateProfilePhoto) => {
  try {
    const url = config.UPLOAD_COVER_PHOTO;
    const formData = new FormData();
    formData.append('data', data.data);
    formData.append('canvasData', data.canvasData);
    formData.append('cropBoxData', data.cropBoxData);
    formData.append('minZoom', data.minZoom);
    formData.append('zoom', data.zoom);
    const originalFileName = data.originalFile.name ?? `${randomName(8)}.jpg`;
    const originalFile = {
      uri: data.originalFile.uri,
      type: 'image/*',
      name: originalFileName,
    };

    const croppedFileName = data.croppedFile.name ?? `${randomName(8)}.jpg`;
    const croppedFile = {uri: data.croppedFile.uri, type: 'image/*', name: croppedFileName};
    formData.append('croppedFile', croppedFile);
    formData.append('originalFile', Platform.OS === 'ios' ? originalFile : croppedFile);
    const headers = {'Content-Type': 'multipart/form-data'};
    const response: IResponseData = await client.put(url, formData, {headers});
    return Promise.resolve(response);
  } catch (error: any) {
    showSnackbar({message: error.message, type: 'danger'});
    return Promise.reject(error);
  }
};
