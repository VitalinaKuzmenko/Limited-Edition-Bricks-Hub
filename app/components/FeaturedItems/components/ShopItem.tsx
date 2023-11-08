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
import { useRecoilValue } from "recoil";
import { currentUserState } from "@/app/recoil/atoms";

interface ShopItemProps {
  shopItem: ShopItemObject;
  wishlistItems: any;
  addToWishlist: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => void;
  removeFromWishlist: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => void;
}

const ShopItem: React.FC<ShopItemProps> = ({
  shopItem,
  wishlistItems,
  addToWishlist,
  removeFromWishlist,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const currentUser = useRecoilValue(currentUserState);
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

  useEffect(() => {
    if (wishlistItems) {
      console.log("wishlists", wishlistItems);
      const favorite = wishlistItems.some(
        (favItem: ShopItemObject) => favItem.id === shopItem.id
      );
      setIsFavorite(favorite);
      console.log("favorite is", favorite);
    }
  }, [wishlistItems]);

  const handleLikeClick = () => {};

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

  const addItemToList = (userId: string, shopItemId: string) => {
    console.log("userid", userId);
    console.log("id", shopItemId, typeof shopItemId);
    addToWishlist({
      variables: { userId, shopItemId },
    });
  };

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

        <div className="like-icon-container" onClick={handleLikeClick}>
          {currentUser && (
            <button
              onClick={() =>
                isFavorite
                  ? removeFromWishlist({
                      variables: { userId: currentUser.uid, shopItemId: id },
                    })
                  : addItemToList(currentUser.uid, id)
              }
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          )}

          {/* <Image
            className="like-icon"
            src="/icons/empty-heart-icon.svg"
            width={30}
            height={30}
            alt="empty heart"
          /> */}
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
      <button className="add-to-bag-button">Add to bag</button>
    </div>
  );
};

export default ShopItem;
