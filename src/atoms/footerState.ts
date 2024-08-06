import { atom } from "recoil";

const footerState = atom({
    key: 'menu',
    default: {
        menuArr: ["둘러보기","여행","등록숙소","프로필"],
        menu: "둘러보기"
    }
});

export default footerState;