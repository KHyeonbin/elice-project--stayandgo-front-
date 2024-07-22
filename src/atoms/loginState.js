import { atom } from "recoil";

const loginState = atom({
    key: 'user',
    default: {
        nickName: '',
        email: '',
        is_admin: false,
        is_logined: false
    }
});

export default loginState;