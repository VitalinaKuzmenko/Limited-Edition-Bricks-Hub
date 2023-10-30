import "./ShopItems.css";
import { ShopItemObject } from "@/app/components/FeaturedItems/FeaturedItems";
import ShopItem from "@/app/components/FeaturedItems/components/ShopItem";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const GET_ALL_SHOP_ITEMS = gql`
  query GetAllShopItems {
    getAllShopItems {
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

const ShopItems = () => {
  const { loading, error, data } = useQuery(GET_ALL_SHOP_ITEMS);

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const shopItems: ShopItemObject[] = data.getAllShopItems;

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
