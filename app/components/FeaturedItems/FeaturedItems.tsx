/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "./FeaturedItems.css";
import ShopItem from "./components/ShopItem";
import Line from "../Line/Line";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import ReactLoading from "react-loading";
import { useState, useEffect } from "react";

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
  price: number;
  stars: number;
  age: number;
  pieces: number;
  category: string;
}

const FeaturedItems = () => {
  const [shopLoading, setShopLoading] = useState<boolean>(false);
  const [featuredShopItems, setFeaturesShopItems] = useState<
    ShopItemObject[] | undefined
  >(undefined);

  const limit = 3;
  const { loading, error, data } = useQuery(GET_TOP_RATED_SHOP_ITEMS, {
    variables: { limit },
  });

  //fetch shop items from db
  useEffect(() => {
    if (!loading && !error && data) {
      const products: ShopItemObject[] = data.getTopRatedShopItems;
      setFeaturesShopItems(products);
    }
    setShopLoading(loading);
  }, [loading, error, data]);

  if (error) return `Error: ${error.message}`;

  return (
    <section className="featured-items">
      <h2>Featured items</h2>
      <Line />
      <div className="featured-items-container">
        {featuredShopItems && !shopLoading ? (
          featuredShopItems.map((shopItem) => (
            <ShopItem key={shopItem.id} shopItem={shopItem} />
          ))
        ) : (
          <ReactLoading
            type="bubbles"
            color="var(--blue)"
            height={100}
            width={100}
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedItems;
