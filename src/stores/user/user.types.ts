export interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
}

export type UserStatus = 'initial'|'loggedIn'|'loggedOut';

export interface UserStore {
    userData: UserData;
    userStatus: UserStatus;
}
