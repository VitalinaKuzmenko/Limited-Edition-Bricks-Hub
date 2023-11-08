"use client";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useState, useEffect } from "react";
import BagItem from "./components/BagItem/BagItem";
import "./checkout.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { bagItemsState, isPopupPreorderOpenState } from "../recoil/atoms";
import PopupPreorder from "./components/PopupPreorder/PopupPreorder";

const Checkout = () => {
  const [bagItems, setBagItems] = useRecoilState(bagItemsState);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const setIsPopupPreorderOpen = useSetRecoilState(isPopupPreorderOpenState);

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

  const handlePreorder = () => {
    setIsPopupPreorderOpen(true);
    setTimeout(function () {
      setIsPopupPreorderOpen(false);
      setBagItems(undefined);
    }, 7000);
  };

  useEffect(() => {
    const quantity = calculateTotalQuantity(bagItems);
    const cost = Number(calculateTotalCost(bagItems).toFixed(2));
    setTotalQuantity(quantity);
    setTotalCost(cost);
  }, [bagItems]);

  return (
    <>
      <Header />
      <main className="checkout-container">
        <h2>My bag</h2>
        {bagItems && bagItems?.length > 0 && (
          <div className="summary-container">
            <p>Subtotal: £{totalCost}</p>
            <p>Amount: {totalQuantity} items</p>
            <button onClick={handlePreorder}>Pre-order items</button>
          </div>
        )}

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
        <PopupPreorder />
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
