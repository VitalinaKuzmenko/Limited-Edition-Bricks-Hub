/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "./FeaturedItems.css";
import ShopItem from "./components/ShopItem";
import Line from "../Line/Line";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useMutation } from "@apollo/client";
import ReactLoading from "react-loading";
import { useState, useEffect } from "react";
import {
  GET_TOP_RATED_SHOP_ITEMS,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST_ITEMS,
} from "@/app/graphql/frontendSchema";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/app/recoil/atoms";

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
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [wishlistItems, setWishListItems] = useState<
    ShopItemObject[] | undefined
  >(undefined);

  const limit = 3;
  const {
    loading: shopItemsLoading,
    error: shopItemsError,
    data: shopItemsData,
  } = useQuery(GET_TOP_RATED_SHOP_ITEMS, {
    variables: { limit },
  });

  const {
    loading: wishlistLoading,
    error: wishlistError,
    data: wishlistData,
  } = useQuery(GET_WISHLIST_ITEMS, {
    variables: {
      userId: currentUser?.uid,
    },
  });

  const [addToWishlist] = useMutation(ADD_TO_WISHLIST);
  const [removeFromWishlist] = useMutation(REMOVE_FROM_WISHLIST);

  //fetch shop items from db
  useEffect(() => {
    if (!shopItemsLoading && !shopItemsError && shopItemsData) {
      const products: ShopItemObject[] = shopItemsData.getTopRatedShopItems;
      setFeaturesShopItems(products);
    }
    setShopLoading(shopItemsLoading);
  }, [shopItemsLoading, shopItemsError, shopItemsData]);

  useEffect(() => {
    if (!wishlistLoading && !wishlistError && wishlistData) {
      const products: ShopItemObject[] = wishlistData.getWishlistItems;
      setWishListItems(products);
    }
    setShopLoading(wishlistLoading);
  }, [wishlistLoading, shopItemsError, shopItemsData]);

  if (shopItemsError) return `Error: ${shopItemsError.message}`;

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
              wishlistItems={wishlistItems}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
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
