"use client";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import items from "../../fakeData/fakeShopFeaturedItems.json";
import { ShopItemObject } from "../components/FeaturedItems/FeaturedItems";
import { useState, useEffect } from "react";
import BagItem from "./components/BagItem/BagItem";
import "./checkout.css";

const Checkout = () => {
  const [bagItems, setBagItems] = useState<ShopItemObject[] | undefined>(
    undefined
  );

  useEffect(() => {
    setBagItems(items);
  }, []);

  return (
    <>
      <Header />
      <main className="checkout-container">
        <h2>My bag</h2>
        <div className="summary-container">
          <p>Subtotal: £123.95</p>
          <p>Amount: 5 items</p>
          <button>Pre-order items</button>
        </div>
        <div className="bag-items-container">
          {bagItems &&
            bagItems.map((item) => <BagItem key={item.id} item={item} />)}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
