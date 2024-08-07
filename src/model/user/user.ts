/** ChangePassword.tsx */
export interface UserInfo {
    email: string;
    password: string;
    passwordCheck: string;
}

export interface Errors {
    passwordCheckError: string;
    passwordError: string;
    passwordError2: string;
}

/** Join.tsx */
export interface JoinUserInfo extends UserInfo {
    name: string;
    phone: string;
    code: string;
    nickName: string;
}

export type JoinErrors = Errors;