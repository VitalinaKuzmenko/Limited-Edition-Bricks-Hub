"use client";
import "./FeaturedItems.css";
import ShopItem from "./components/ShopItem";
import Line from "../Line/Line";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const GET_TOP_RATED_SHOP_ITEMS = gql`
  query GetTopRatedShopItems($limit: Int!) {
    getTopRatedShopItems(limit: $limit) {
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

export interface ShopItemObject {
  id: number;
  imagePath: string;
  alternativeText: string;
  name: string;
  price: string;
  stars: number;
  age: number;
  pieces: number;
  category: string;
}

const FeaturedItems = () => {
  const limit = 3;
  const { loading, error, data } = useQuery(GET_TOP_RATED_SHOP_ITEMS, {
    variables: { limit },
  });

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const shopItems: ShopItemObject[] = data.getTopRatedShopItems;

  return (
    <section className="featured-items">
      <h2>Featured items</h2>
      <Line />
      <div className="featured-items-container">
        {shopItems &&
          shopItems.map((shopItem) => (
            <ShopItem key={shopItem.id} shopItem={shopItem} />
          ))}
      </div>
    </section>
  );
};

export default FeaturedItems;
