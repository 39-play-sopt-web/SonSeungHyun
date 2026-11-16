import { redirect } from 'react-router';
import { AUTH_CODE_KEY } from '../constants/storage';

export const AUTH_REQUIRED_MESSAGE = '먼저 파트를 선택하고 코드를 발급받아 주세요.';

export const hasAuthCode = () => localStorage.getItem(AUTH_CODE_KEY) !== null;

export const requireAuthLoader = () => {
  if (!hasAuthCode()) {
    alert(AUTH_REQUIRED_MESSAGE);
    return redirect('/');
  }
  return null;
};