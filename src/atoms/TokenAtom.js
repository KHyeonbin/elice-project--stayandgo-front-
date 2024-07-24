import { atom, selector } from "recoil";

export const TokenAttom = atom({
  key: "TokenAtom",
  default: undefined,
});

// 로그인 여부 확인 selector
export const isLoginSelector = selector({
  key: "isLoginSelector",
  // TokenAttom 값이 있다면 true로 아니면 false로 리턴
  get: ({ get }) => !!get(TokenAttom),
});
