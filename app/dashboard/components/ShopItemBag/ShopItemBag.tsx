"use client";
import "./ShopItemBag.css";
import { ShopItemObject } from "@/app/components/FeaturedItems/FeaturedItems";
import ShopItem from "@/app/components/FeaturedItems/components/ShopItem";

interface ShopItemBagProps {
  item: ShopItemObject;
}

const ShopItemBag: React.FC<ShopItemBagProps> = ({ item }) => {
  return (
    <>
      <ShopItem shopItem={item} />
    </>
  );
};

export default ShopItemBag;
