import { configureAuth } from 'react-query-auth';
import {
  getUserProfile,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  AuthResponse,
} from 'service/authApi';
import { storage } from 'utils/storage';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  first_name: string;
  last_name: string;
  grade: number | null;
  grade_letter: string;
  major1: string;
  major2: string;
  password: string;
  group: number | null;
};
async function handleUserResponse(data: AuthResponse): Promise<AuthResponse> {
  storage.setToken(data);
  return data;
}

async function userFn(): Promise<any> {
  if (!storage.getToken()) {
    return null;
  }
  const user = await getUserProfile();
  return user;
}

async function loginFn(data: LoginCredentials): Promise<AuthResponse> {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentials): Promise<any> {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn(): Promise<void> {
  storage.clearToken();
  window.location.replace('/');
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } = configureAuth({
  userFn,
  loginFn,
  registerFn,
  logoutFn,
});
