import "./FeaturedItems.css";
import ShopItem from "./components/ShopItem";
import fakeShopData from "../../../fakeData/fakeShopFeaturedItems.json";
import Line from "../Line/Line";

export interface ShopItemObject {
  id: number;
  imagePath: string;
  alternativeText: string;
  name: string;
  price: string;
  stars: number;
  age: number;
  pieces: number;
}

const FeaturedItems = () => {
  const fakeShopItems: ShopItemObject[] = fakeShopData;
  return (
    <section className="featured-items">
      <h2>Featured items</h2>
      <Line />
      <div className="featured-items-container">
        {fakeShopItems &&
          fakeShopItems.map((shopItem) => (
            <ShopItem key={shopItem.id} shopItem={shopItem} />
          ))}
      </div>
    </section>
  );
};

export default FeaturedItems;
