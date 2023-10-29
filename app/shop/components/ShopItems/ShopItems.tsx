import "./ShopItems.css";
import fakeShopItems from "../../../../fakeData/fakeShopItems.json";
import { ShopItemObject } from "@/app/components/FeaturedItems/FeaturedItems";
import ShopItem from "@/app/components/FeaturedItems/components/ShopItem";

const ShopItems = () => {
  const shopItems: ShopItemObject[] = fakeShopItems;

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
