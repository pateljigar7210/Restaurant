export enum UserTypes {
  SIGNUP = 'SIGNUP',
  SIGNUP_PENDING = 'SIGNUP_PENDING',
  SIGNUP_FULFILLED = 'SIGNUP_FULFILLED',
  SIGNUP_REJECTED = 'SIGNUP_REJECTED',

  LOGIN = 'LOGIN',
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGIN_FULFILLED = 'LOGIN_FULFILLED',
  LOGIN_REJECTED = 'LOGIN_REJECTED',

  GET_PROFILE = 'GET_PROFILE',
  GET_PROFILE_PENDING = 'GET_PROFILE_PENDING',
  GET_PROFILE_FULFILLED = 'GET_PROFILE_FULFILLED',
  GET_PROFILE_REJECTED = 'GET_PROFILE_REJECTED',

  UPDATE_PROFILE_PIC = 'UPDATE_PROFILE_PIC',
  UPDATE_COVER_PIC = 'UPDATE_COVER_PIC',
  UPDATE_PROFILE_ACCOUNT = 'UPDATE_PROFILE_ACCOUNT',

  UPDATE_USER_NAME = 'UPDATE_USER_NAME',

  RESET = 'RESET',
  RESET_PENDING = 'RESET_PENDING',
  RESET_FULFILLED = 'RESET_FULFILLED',
  RESET_REJECTED = 'RESET_REJECTED',

  FORGET_PASSWORD = 'FORGET_PASSWORD',
  FORGET_PASSWORD_PENDING = 'FORGET_PASSWORD_PENDING',
  FORGET_PASSWORD_FULFILLED = 'FORGET_PASSWORD_FULFILLED',
  FORGET_PASSWORD_REJECTED = 'FORGET_PASSWORD_REJECTED',

  LOGOUT = 'LOGOUT',
}
