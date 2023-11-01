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
