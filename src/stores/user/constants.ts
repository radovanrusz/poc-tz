import { UserData, UserStatus } from './user.types';

export const USER_DATA_INITIAL: UserData = {
  id: '',
  name: '',
  email: '',
  role: ''
};

export const USER_STATUS_IN: UserStatus = 'loggedIn';
export const USER_STATUS_OUT: UserStatus = 'loggedOut';
export const USER_STATUS_INITIAL: UserStatus = 'initial';
