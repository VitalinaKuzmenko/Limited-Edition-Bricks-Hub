/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "./FeaturedItems.css";
import ShopItem from "./components/ShopItem";
import Line from "../Line/Line";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import ReactLoading from "react-loading";
import { useState, useEffect } from "react";
import { GET_TOP_RATED_SHOP_ITEMS } from "@/app/graphql/frontendSchema";
import { useRecoilState } from "recoil";
import { currentUserState, wishlistItemsState } from "@/app/recoil/atoms";

export interface ShopItemObject {
  id: string;
  imagePath: string;
  alternativeText: string;
  name: string;
  price: number;
  stars: number;
  age: number;
  pieces: number;
  category: string;
}

export interface BagItem {
  item: ShopItemObject;
  quantity: number;
}

const FeaturedItems = () => {
  const [shopLoading, setShopLoading] = useState<boolean>(false);
  const [featuredShopItems, setFeaturesShopItems] = useState<
    ShopItemObject[] | undefined
  >(undefined);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [wishlistItems, setWishListItems] = useRecoilState(wishlistItemsState);

  const limit = 3;
  const {
    loading: shopItemsLoading,
    error: shopItemsError,
    data: shopItemsData,
  } = useQuery(GET_TOP_RATED_SHOP_ITEMS, {
    variables: { limit },
  });

  useEffect(() => {
    if (currentUser) {
      //
    }
  }, [currentUser]);

  //fetch shop items from db
  useEffect(() => {
    if (!shopItemsLoading && !shopItemsError && shopItemsData) {
      const products: ShopItemObject[] = shopItemsData.getTopRatedShopItems;
      setFeaturesShopItems(products);
    }
    setShopLoading(shopItemsLoading);
  }, [shopItemsLoading, shopItemsError, shopItemsData]);

  if (shopItemsError) return `Error: ${shopItemsError.message}`;
  console.log("home wishlist", wishlistItems);

  return (
    <section className="featured-items">
      <h2>Featured items</h2>
      <Line />
      <div className="featured-items-container">
        {featuredShopItems && !shopLoading ? (
          featuredShopItems.map((shopItem, index) => (
            <ShopItem
              key={index}
              shopItem={shopItem}
              allShopItems={featuredShopItems}
            />
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
