import { atom } from "recoil";
import { FilterOptions } from "../shop/components/SideBar/SideBar";

//shop page
export const productsNumberState = atom<number>({
  key: "productsNumberState",
  default: 0,
});

export const filterOptionsState = atom<FilterOptions>({
  key: "filterOptionsState",
  default: {
    category: [],
    age: [],
    priceRange: [],
    piecesRange: [],
  },
});

export const sortOptionValueState = atom<string>({
  key: "sortOptionValueState",
  default: "Rating",
});

//shop/page.tsx
export const mobileSizeState = atom<boolean>({
  key: "mobileSizeState",
  default: false,
});

export const isFilterOpenState = atom<boolean>({
  key: "isFilterOpenState",
  default: false,
});

//signin popup
export const isSigninPopupOpenState = atom<boolean>({
  key: "isSigninPopupOpenState",
  default: false,
});

export const isUserLoginState = atom<boolean>({
  key: "isUserLoginState",
  default: false,
});

//home page
export const categoryFromThemeState = atom<string>({
  key: "categoryFromThemeState",
  default: "",
});
