/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Line from "../components/Line/Line";
import "./dashboard.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentUserState,
  selectedDesktopOptionState,
  wishlistItemsState,
} from "../recoil/atoms";
import { useEffect, useState, ChangeEvent } from "react";
import items from "../../fakeData/fakeShopFeaturedItems.json";
import ShopItemBag from "./components/ShopItemBag/ShopItemBag";
import PersonalDetails from "./components/PersonalDetails/PersonalDetails";
import LogOut from "./components/LogOut/LogOut";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import PopupSignin from "../components/PopupSignin/PopupSignin";

const Dashboard = () => {
  const [wishlistItems, setWishListItems] = useRecoilState(wishlistItemsState);
  const [mobileSize, setMobileSize] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedDesktopOption, setSelectedDesktopOption] = useRecoilState(
    selectedDesktopOptionState
  );
  const dashboardOptions: string[] = [
    "Personal details",
    "Wishlist",
    "Log out",
  ];
  const currentUser = useRecoilValue(currentUserState);

  console.log("dashoboard wishlist", wishlistItems);

  const handleMobileOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "personal-details") {
      setSelectedDesktopOption(0);
    } else if (event.target.value === "wishlist") {
      setSelectedDesktopOption(1);
    } else if (event.target.value === "logout") {
      setSelectedDesktopOption(2);
    }
  };

  const handleOptionClick = (index: number) => {
    setSelectedDesktopOption(index);
  };

  //define which size of screen is now
  useEffect(() => {
    window.innerWidth >= 767 ? setMobileSize(false) : setMobileSize(true);
  }, []);

  //handle resize of screen
  useEffect(() => {
    const handleResize = () => {
      window.innerWidth >= 767 ? setMobileSize(false) : setMobileSize(true);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="dashboard-page">
        <div className="dashboard-header">
          {currentUser && (
            <h1>{`Welcome, ${currentUser.name} ${currentUser.surname}!`}</h1>
          )}

          <Line />
        </div>
        <div className="dashboard-main">
          {mobileSize ? (
            <div className="dashboard-left-mobile">
              <select
                className="account-menu"
                onChange={handleMobileOptions}
                value={selectedOption}
              >
                <option value="personal-details">Personal details</option>
                <option value="wishlist">Wishlist</option>
                <option value="logout">Log out</option>
              </select>
            </div>
          ) : (
            <div className="dashboard-left-desktop">
              {dashboardOptions.map((option, index) => (
                <p
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={
                    index === selectedDesktopOption
                      ? "active-account-option"
                      : ""
                  }
                >
                  {option}
                </p>
              ))}
            </div>
          )}

          <div className="wishlist-container">
            {selectedDesktopOption === 0 ? (
              <PersonalDetails />
            ) : selectedDesktopOption === 1 ? (
              wishlistItems && wishlistItems.length > 0 ? (
                wishlistItems.map((item, index) => (
                  <ShopItemBag key={index} item={item} />
                ))
              ) : (
                <div className="wishlist-error">
                  <p>Currently there are no items in your wishlist.</p>
                  <p>Click on heart icon on image to add item to a wishlist.</p>
                </div>
              )
            ) : (
              <LogOut />
            )}
          </div>
        </div>
      </main>
      <Footer />
      <PopupSignin />
    </>
  );
};

export default Dashboard;
