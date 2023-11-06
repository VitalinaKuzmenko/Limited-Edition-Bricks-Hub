/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Line from "../components/Line/Line";
import "./dashboard.css";
import { useRecoilState } from "recoil";
import { wishlistItemsState } from "../recoil/atoms";
import { useEffect, useState, ChangeEvent } from "react";
import items from "../../fakeData/fakeShopFeaturedItems.json";
import ShopItemBag from "./components/ShopItemBag/ShopItemBag";
import PersonalDetails from "./components/PersonalDetails/PersonalDetails";
import LogOut from "./components/LogOut/LogOut";

const Dashboard = () => {
  const [wishlistItems, setWishListItems] = useRecoilState(wishlistItemsState);
  const [mobileSize, setMobileSize] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedDesktopOption, setSelectedDesktopOption] = useState<number>(0);
  const dashboardOptions: string[] = [
    "Personal details",
    "Wishlist",
    "Log out",
  ];

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

  useEffect(() => {
    setWishListItems(items);
  }, []);

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
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, Vitalina!</h1>
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
                  index === selectedDesktopOption ? "active-account-option" : ""
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
            wishlistItems &&
            wishlistItems.map((item, index) => (
              <ShopItemBag key={index} item={item} />
            ))
          ) : (
            <LogOut />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
