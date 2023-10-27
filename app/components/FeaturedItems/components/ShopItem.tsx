import "./ShopItem.css";
import { ShopItemObject } from "../FeaturedItems";

interface ShopItemProps {
  shopItem: ShopItemObject;
}

const ShopItem: React.FC<ShopItemProps> = ({ shopItem }) => {
  const { name, price, stars, age, pieces, imagePath, alternativeText } =
    shopItem;
  return (
    <div className="shop-item-container">
      <div className="image-container">
        <img src={imagePath} alt={alternativeText} />
        <img
          className="like-icon"
          src="/icons/empty-heart-icon.svg"
          alt="empty heart"
        />
      </div>
      <div className="shop-items-details">
        <h2 className="name">{name}</h2>
        <p className="price">£{price}</p>
        <p className="stars">{stars}</p>
        <div className="small-container">
          <div className="age-container">
            <img src="/icons/cake-icon.svg" alt="cake" />
            <p>{age}+</p>
          </div>
          <div className="pieces-container">
            <img src="/icons/puzzle-icon.svg" alt="puzzle" />
            <p>{pieces}</p>
          </div>
        </div>
      </div>
      <button className="add-to-bag-button">Add to bag</button>
    </div>
  );
};

export default ShopItem;
