"use client";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import items from "../../fakeData/fakeShopFeaturedItems.json";
import { ShopItemObject } from "../components/FeaturedItems/FeaturedItems";
import { useState, useEffect } from "react";
import BagItem from "./components/BagItem/BagItem";
import "./checkout.css";
import { useRecoilState } from "recoil";
import { bagItemsState } from "../recoil/atoms";

const Checkout = () => {
  const [bagItems, setBagItems] = useRecoilState(bagItemsState);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const handleIncrement = (itemId: string) => {
    setBagItems((prevBagItems) => {
      if (prevBagItems) {
        return prevBagItems.map((item) => {
          if (item.item.id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      // Return the previous bagItems if it's undefined
      return prevBagItems;
    });
  };

  const handleDecrement = (itemId: string) => {
    setBagItems((prevBagItems) => {
      return (prevBagItems || []).map((item) => {
        if (item.item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const calculateTotalQuantity = (bagItems: BagItem[] | undefined): number => {
    if (!bagItems) return 0;

    return bagItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalCost = (bagItems: BagItem[] | undefined): number => {
    if (!bagItems) return 0;

    return bagItems.reduce(
      (total, item) => total + item.item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    const quantity = calculateTotalQuantity(bagItems);
    const cost = Number(calculateTotalCost(bagItems).toFixed(2));
    setTotalQuantity(quantity);
    setTotalCost(cost);
  }, [bagItems]);

  useEffect(() => {
    // setBagItems(items);
  }, []);

  console.log("bag items", bagItems);

  return (
    <>
      <Header />
      <main className="checkout-container">
        <h2>My bag</h2>
        <div className="summary-container">
          <p>Subtotal: £{totalCost}</p>
          <p>Amount: {totalQuantity} items</p>
          <button>Pre-order items</button>
        </div>
        <div className="bag-items-container">
          {bagItems && bagItems.length > 0 ? (
            bagItems.map((item, index) => (
              <BagItem
                key={index}
                item={item}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            ))
          ) : (
            <p className="bag-error">There are no items in your bag.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
