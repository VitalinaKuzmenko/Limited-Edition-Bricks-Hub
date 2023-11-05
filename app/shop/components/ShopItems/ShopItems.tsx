/* eslint-disable react-hooks/exhaustive-deps */
import "./ShopItems.css";
import { ShopItemObject } from "@/app/components/FeaturedItems/FeaturedItems";
import ShopItem from "@/app/components/FeaturedItems/components/ShopItem";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  filterOptionsState,
  productsNumberState,
  sortOptionValueState,
} from "@/app/recoil/atoms";
import { useEffect, useState } from "react";
import { FilterOptions } from "../SideBar/SideBar";
import ReactLoading from "react-loading";

const GET_ALL_SHOP_ITEMS = gql`
  query GetAllShopItems {
    getAllShopItems {
      id
      imagePath
      alternativeText
      name
      price
      stars
      age
      pieces
      category
    }
  }
`;

const ShopItems = () => {
  const [serverShopItems, setServerShopItems] = useState<
    ShopItemObject[] | undefined
  >(undefined);
  const [shopItems, setShopItems] = useState<ShopItemObject[] | undefined>(
    undefined
  );
  const [shopError, setShopError] = useState<string>("");
  const [_, setProductsNumber] = useRecoilState<number>(productsNumberState);
  const { loading, error, data } = useQuery(GET_ALL_SHOP_ITEMS);
  const filterOptions: FilterOptions = useRecoilValue(filterOptionsState);
  const sortOption: string = useRecoilValue(sortOptionValueState);
  const [shopLoading, setShopLoading] = useState<boolean>(false);

  //filter and sort the list
  useEffect(() => {
    if (serverShopItems && serverShopItems.length > 0) {
      let filteredItems = [...serverShopItems];

      if (filterOptions.category.length > 0) {
        filteredItems = filteredItems.filter((item) => {
          const categoryFilter = filterOptions.category.includes(item.category);
          return categoryFilter;
        });
      }
      if (filterOptions.age.length > 0) {
        filteredItems = filteredItems.filter((item) =>
          filterOptions.age.includes(item.age)
        );
      }
      if (filterOptions.priceRange.length > 0) {
        filteredItems = filteredItems.filter((item) => {
          const priceFilter = filterOptions.priceRange.some(
            (range) =>
              item.price >= range.minPrice && item.price <= range.maxPrice
          );
          return priceFilter;
        });
      }
      if (filterOptions.piecesRange.length > 0) {
        filteredItems = filteredItems.filter((item) => {
          const piecesFilter = filterOptions.piecesRange.some(
            (range) =>
              item.pieces >= range.minPieces && item.pieces <= range.maxPieces
          );
          return piecesFilter;
        });
      }
      if (
        filterOptions.category.length === 0 &&
        filterOptions.age.length === 0 &&
        filterOptions.priceRange.length === 0 &&
        filterOptions.piecesRange.length === 0
      ) {
      }

      // Sort the filtered items based on the selected sorting option
      if (sortOption === "Price low to high") {
        filteredItems.sort((a, b) => a.price - b.price);
      } else if (sortOption === "Price high to low") {
        filteredItems.sort((a, b) => b.price - a.price);
      } else if (sortOption === "Rating") {
        filteredItems.sort((a, b) => b.stars - a.stars);
      } else if (sortOption === "A-Z") {
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
      }

      setShopItems(filteredItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions, sortOption]);

  //fetch shop items from db
  useEffect(() => {
    if (!loading && !error && data) {
      const products: ShopItemObject[] = data.getAllShopItems;
      setServerShopItems(products);
    }
  }, [loading, error, data, setProductsNumber]);

  //set shopItems array which we display
  useEffect(() => {
    if (serverShopItems && serverShopItems.length > 0) {
      let sortedItems = [...serverShopItems];

      // Sort the filtered items based on the selected sorting option
      if (sortOption === "Price low to high") {
        sortedItems.sort((a, b) => a.price - b.price);
      } else if (sortOption === "Price high to low") {
        sortedItems.sort((a, b) => b.price - a.price);
      } else if (sortOption === "Rating") {
        sortedItems.sort((a, b) => b.stars - a.stars);
      } else if (sortOption === "A-Z") {
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
      }
      setShopItems(sortedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverShopItems]);

  //set number of products
  useEffect(() => {
    if (shopItems) setProductsNumber(shopItems?.length);
    shopItems?.length === 0
      ? setShopError("Sorry, no items were found")
      : setShopError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopItems]);

  useEffect(() => {
    setShopLoading(loading);
  }, [loading]);

  if (error) return `Error: ${error.message}`;

  return (
    <div
      className={shopLoading ? "shop-items shop-items-loading" : "shop-items"}
    >
      {shopItems && !shopLoading ? (
        shopItems.map((item, index) => <ShopItem key={index} shopItem={item} />)
      ) : (
        <ReactLoading
          type="bubbles"
          color="var(--blue)"
          height={100}
          width={100}
        />
      )}
      {shopError.length > 0 && <p>{shopError}</p>}
    </div>
  );
};

export default ShopItems;
