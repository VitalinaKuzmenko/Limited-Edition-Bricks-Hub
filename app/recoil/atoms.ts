import { atom } from "recoil";
import { FilterOptions } from "../shop/components/SideBar/SideBar";
import {
  BagItem,
  ShopItemObject,
} from "../components/FeaturedItems/FeaturedItems";
import { User } from "../dashboard/components/PersonalDetails/PersonalDetails";

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

//dashboard
export const selectedDesktopOptionState = atom<number>({
  key: "selectedDesktopOptionState",
  default: 0,
});

//sign in
export const currentUserState = atom<User | undefined>({
  key: "currentUserState",
  default: undefined,
});

//dashboard and featured items and shop
export const wishlistItemsState = atom<ShopItemObject[] | undefined>({
  key: "wishlistItemsState",
  default: undefined,
});

//checkout
export const bagItemsState = atom<BagItem[] | undefined>({
  key: "bagItemsState",
  default: undefined,
});

//checkout
export const isPopupPreorderOpenState = atom<boolean>({
  key: "isPopupPreorderOpenState",
  default: false,
});
