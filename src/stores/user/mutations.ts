import { MutationTree } from 'vuex';
import { UserStore, UserData } from './user.types';
import { USER_DATA_INITIAL, USER_STATUS_OUT, USER_STATUS_IN } from './constants';

const mutations: MutationTree<UserStore> = {
  loginUser(state: UserStore, data: UserData) {
    const newState = {
      userData: data,
      userStatus: USER_STATUS_IN
    };
    Object.assign(state, newState);
  },
  logoutUser(state: UserStore) {
    const newState = {
      userData: USER_DATA_INITIAL,
      userStatus: USER_STATUS_OUT
    };
    Object.assign(state, newState);
  }
};

export default mutations;
