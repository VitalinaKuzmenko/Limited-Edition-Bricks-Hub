"use client";
import { useState } from "react";
import "./ShopItem.css";
import { ShopItemObject } from "../FeaturedItems";
import Image from "next/image";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useEffect } from "react";
import {
  MutationFunctionOptions,
  OperationVariables,
  DefaultContext,
  ApolloCache,
} from "@apollo/client";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  bagItemsState,
  currentUserState,
  wishlistItemsState,
} from "@/app/recoil/atoms";
import { BagItem } from "../FeaturedItems";

interface ShopItemProps {
  shopItem: ShopItemObject;
  allShopItems?: ShopItemObject[] | undefined;
  // wishlistItems: any;
  // addToWishlist: (
  //   options?:
  //     | MutationFunctionOptions<
  //         any,
  //         OperationVariables,
  //         DefaultContext,
  //         ApolloCache<any>
  //       >
  //     | undefined
  // ) => void;
  // removeFromWishlist: (
  //   options?:
  //     | MutationFunctionOptions<
  //         any,
  //         OperationVariables,
  //         DefaultContext,
  //         ApolloCache<any>
  //       >
  //     | undefined
  // ) => void;
}

const ShopItem: React.FC<ShopItemProps> = ({ shopItem, allShopItems }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const currentUser = useRecoilValue(currentUserState);
  const [wishlistItems, setWishlistItems] = useRecoilState(wishlistItemsState);
  const [bagItems, setBagItems] = useRecoilState(bagItemsState);

  const {
    id,
    name,
    price,
    stars,
    age,
    pieces,
    imagePath,
    alternativeText,
    category,
  } = shopItem;

  const starsArray = [];

  for (let i = 0; i < 5; i++) {
    if (i < stars) {
      starsArray.push(<img src="/icons/star-icon.svg" alt="Full Star" />);
    } else {
      starsArray.push(
        <img src="/icons/empty-star-icon.svg" alt="Empty Star" />
      );
    }
  }

  const addToWishlist = (shopItemId: string) => {
    if (currentUser && allShopItems) {
      const foundItem = allShopItems.find((item) => item.id === shopItemId);

      if (foundItem) {
        // Check if the item is already in the wishlist
        const isItemInWishlist = wishlistItems?.some(
          (item) => item.id === shopItemId
        );

        if (!isItemInWishlist) {
          // If not, add it to the wishlist
          setWishlistItems((prevItems) => [...(prevItems || []), foundItem]);
        } else {
          console.log("Item is already in the wishlist.");
        }
      } else {
        console.error("Item not found in shop items.");
      }
    }
  };

  const removeFromWishlist = (shopItemId: string) => {
    if (currentUser && wishlistItems) {
      // Check if the item is in the wishlist
      const isItemInWishlist = wishlistItems.some(
        (item) => item.id === shopItemId
      );

      if (isItemInWishlist) {
        // If it is, remove it from the wishlist
        const updatedWishlist = wishlistItems.filter(
          (item) => item.id !== shopItemId
        );
        setWishlistItems(updatedWishlist);
      } else {
        console.log("Item not found in the wishlist.");
      }
    }
  };

  const handleLikeClick = (shopItemId: string) => {
    if (currentUser) {
      // isFavorite
      //   ? removeFromWishlist({
      //       variables: { userId: currentUser.uid, shopItemId: id },
      //     })
      //   : addItemToList(currentUser.uid, id);

      isFavorite ? removeFromWishlist(shopItemId) : addToWishlist(shopItemId);
    }
  };

  const addToBag = (shopItem: ShopItemObject) => {
    setBagItems((prevBagItems) => {
      const updatedBagItems: BagItem[] = [...(prevBagItems || [])];
      const existingItemIndex = updatedBagItems.findIndex(
        (item) => item.item.id === shopItem.id
      );

      if (existingItemIndex !== -1) {
        // Create a new object with the updated quantity
        const updatedItem = {
          ...updatedBagItems[existingItemIndex],
          quantity: updatedBagItems[existingItemIndex].quantity + 1,
        };

        // Replace the existing item with the updated one
        updatedBagItems[existingItemIndex] = updatedItem;
      } else {
        // Add a new item to the bag
        updatedBagItems.push({ item: shopItem, quantity: 1 });
      }

      return updatedBagItems;
    });
  };

  //define what items are liked
  useEffect(() => {
    if (wishlistItems) {
      const favorite = wishlistItems.some(
        (favItem: ShopItemObject) => favItem.id === id
      );
      setIsFavorite(favorite);
    }
  }, [wishlistItems]);

  //download image from firebase storage
  useEffect(() => {
    const downloadImage = async () => {
      try {
        const url = await getDownloadURL(ref(storage, imagePath));
        setImageUrl(url);
        return imageUrl;
      } catch (error) {
        console.error("Error downloading image:", error);
        return "";
      }
    };

    downloadImage();
  }, [imagePath]);

  return (
    <div className="shop-item-container">
      <div className="image-container">
        {imageUrl.length > 0 && (
          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            alt={alternativeText}
          />
        )}

        <div
          className="like-icon-container"
          onClick={() => handleLikeClick(id)}
        >
          {isFavorite ? (
            <Image
              className="like-icon"
              src="/icons/full-heart-icon.svg"
              width={30}
              height={30}
              alt="empty heart"
            />
          ) : (
            <Image
              className="like-icon"
              src="/icons/empty-heart-icon.svg"
              width={30}
              height={30}
              alt="empty heart"
            />
          )}
        </div>
      </div>
      <div className="shop-items-details">
        <h2 className="name">{name}</h2>
        <p className="price">£{price}</p>

        <div className="stars">
          {starsArray.length > 0 && starsArray.map((star) => star)}
        </div>

        <div className="small-container">
          <div className="age-container">
            <img src="/icons/cake-icon.svg" alt="cake" />
            <p>{age}+</p>
          </div>
          <div className="pieces-container">
            <img src="/icons/puzzle-icon.svg" alt="puzzle" />
            <p>{pieces}</p>
          </div>
          <div className="category-container">
            <img src="/icons/category-icon.svg" alt="category" />
            <p>{category}</p>
          </div>
        </div>
      </div>
      <button className="add-to-bag-button" onClick={() => addToBag(shopItem)}>
        Add to bag
      </button>
    </div>
  );
};

export default ShopItem;
