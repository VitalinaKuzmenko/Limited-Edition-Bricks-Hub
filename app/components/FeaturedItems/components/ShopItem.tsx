import "./ShopItem.css";
import { ShopItemObject } from "../FeaturedItems";

interface ShopItemProps {
  shopItem: ShopItemObject;
}

const ShopItem: React.FC<ShopItemProps> = ({ shopItem }) => {
  const {
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
