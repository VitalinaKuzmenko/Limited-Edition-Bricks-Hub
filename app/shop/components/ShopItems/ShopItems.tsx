import "./ShopItems.css";
import { ShopItemObject } from "@/app/components/FeaturedItems/FeaturedItems";
import ShopItem from "@/app/components/FeaturedItems/components/ShopItem";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useRecoilState, useRecoilValue } from "recoil";
import { filterOptionsState, productsNumberState } from "@/app/recoil/atoms";
import { use, useEffect, useState } from "react";
import { PriceRange, PiecesRange } from "../SideBar/SideBar";
import { FilterOptions } from "../SideBar/SideBar";
import { createPriceRangeFromString } from "@/app/utils/utils";

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
  const [_, setProductsNumber] = useRecoilState<number>(productsNumberState);
  const { loading, error, data } = useQuery(GET_ALL_SHOP_ITEMS);
  const filterOptions: FilterOptions = useRecoilValue(filterOptionsState);

  useEffect(() => {
    if (serverShopItems && serverShopItems.length > 0) {
      let filteredItems = serverShopItems;
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

      setShopItems(filteredItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]);

  //fetch shop items from db
  useEffect(() => {
    if (!loading && !error && data) {
      const products: ShopItemObject[] = data.getAllShopItems;
      setServerShopItems(products);
    }
  }, [loading, error, data, setProductsNumber]);

  //set shopItems array which we display
  useEffect(() => {
    setShopItems(serverShopItems);
  }, [serverShopItems]);

  //set number of products
  useEffect(() => {
    if (shopItems && shopItems?.length > 0)
      setProductsNumber(shopItems?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopItems]);

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <div className="shop-items">
      {shopItems &&
        shopItems.map((item, index) => (
          <ShopItem key={index} shopItem={item} />
        ))}
    </div>
  );
};

export default ShopItems;
