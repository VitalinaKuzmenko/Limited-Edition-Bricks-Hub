import "./ShopItems.css";
import { ShopItemObject } from "@/app/components/FeaturedItems/FeaturedItems";
import ShopItem from "@/app/components/FeaturedItems/components/ShopItem";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useRecoilState, useRecoilValue } from "recoil";
import { filterOptionsState, productsNumberState } from "@/app/recoil/atoms";
import { useEffect, useState } from "react";
import { PriceRange, PiecesRange } from "../SideBar/SideBar";
import { FilterOptions } from "../SideBar/SideBar";

// const GET_ALL_SHOP_ITEMS = gql`
//   query GetAllShopItems {
//     getAllShopItems {
//       id
//       imagePath
//       alternativeText
//       name
//       price
//       stars
//       age
//       pieces
//       category
//     }
//   }
// `;

const GET_SHOP_ITEMS = gql`
  query GetAllShopItems(
    $category: [String]
    $age: [Int]
    $priceRange: [PriceRangeInput]
    $pieceRange: [PieceRangeInput]
  ) {
    getAllShopItems(
      category: $category
      age: $age
      priceRange: $priceRange
      pieceRange: $pieceRange
    ) {
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
  const [shopItems, setShopItems] = useState<ShopItemObject[] | undefined>(
    undefined
  );
  const filterOptions = useRecoilValue<FilterOptions>(filterOptionsState);
  const [_, setProductsNumber] = useRecoilState<number>(productsNumberState);
  // const { loading, error, data } = useQuery(GET_SHOP_ITEMS);
  const { loading, error, data } = useQuery(GET_SHOP_ITEMS, {
    variables: {
      category: filterOptions.category,
      age: filterOptions.age,
      priceRange: filterOptions.priceRange,
      pieceRange: filterOptions.piecesRange,
    },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      const products: ShopItemObject[] = data.getAllShopItems;
      setShopItems(products);
      setProductsNumber(products.length);
    }
  }, [loading, error, data, setProductsNumber]);

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
