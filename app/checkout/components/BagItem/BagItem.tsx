"use client";
import { useState } from "react";
import "./BagItem.css";
import Image from "next/image";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useEffect } from "react";
import { ShopItemObject } from "@/app/components/FeaturedItems/FeaturedItems";

interface ShopItemBagProps {
  item: ShopItemObject;
}

const BagItem: React.FC<ShopItemBagProps> = ({ item }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    name,
    price,
    stars,
    age,
    pieces,
    imagePath,
    alternativeText,
    category,
  } = item;

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
      <div className="image_info_container">
        <div className="image-container">
          {imageUrl.length > 0 && (
            <Image
              src={imageUrl}
              width={1000}
              height={1000}
              alt={alternativeText}
            />
          )}
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

          <div className="amount-container">
            <button className="sign">-</button>
            <p className="number">1</p>
            <button className="sign">+</button>
          </div>
        </div>
      </div>

      <div className="remove-icon-container">
        <Image
          className="remove-icon"
          src="/icons/trash-icon.svg"
          width={30}
          height={30}
          alt="remove item"
        />
      </div>
    </div>
  );
};

export default BagItem;
