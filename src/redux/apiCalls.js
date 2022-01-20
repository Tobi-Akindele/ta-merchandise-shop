import { publicRequest } from '../requestMethods';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
} from './loginRedux';
import { addUserStart, addUserSuccess, addUserFailure } from './userRedux';

export const login = async (dispath, user) => {
  dispath(loginStart());
  const res = await publicRequest.post('/auth/signin', user);
  res ? dispath(loginSuccess(res.data)) : dispath(loginFailure());
};

export const logout = async (dispath, navigate) => {
  try {
    dispath(logoutSuccess());
    navigate('/');
  } catch (error) {
    dispath(logoutFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  const res = await publicRequest.post(`/auth/register`, user);
  res ? dispatch(addUserSuccess(res.data)) : dispatch(addUserFailure());
};
