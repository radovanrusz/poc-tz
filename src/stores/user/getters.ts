import { GetterTree } from 'vuex';
import { UserStore, UserData, UserStatus } from './user.types';
import { RootState } from '../types';

const getters: GetterTree<UserStore, RootState> = {
  userStatus(state: UserStore): UserStatus | string {
    return state.userStatus;
  },
  userData(state: UserStore): UserData {
    debugger;
    return state.userData;
  },
  accessToken(state: UserStore): String {
    debugger;
    return state.accessToken;
  }
};

export default getters;
