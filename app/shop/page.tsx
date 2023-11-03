"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import Line from "../components/Line/Line";
import ShopItems from "./components/ShopItems/ShopItems";
import SideBar from "./components/SideBar/SideBar";
import "./shop.css";
import { useState, useEffect, ChangeEvent } from "react";
import { productsNumberState, sortOptionValueState } from "../recoil/atoms";

const ShopPage = () => {
  const [mobileSize, setMobileSize] = useState<boolean>(false);
  const sortOptions: string[] = [
    "Rating",
    "Price low to high",
    "Price high to low",
    "A-Z",
  ];
  const [sortOptionValue, setSortOptionValue] =
    useRecoilState(sortOptionValueState);
  const [isSortOptionsOpen, setIsSortOptionsOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const numberOfShopItems = useRecoilValue(productsNumberState);

  const handleSortOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOptionValue(event.target.value);
  };

  const handleMobileSortClick = () => {
    setIsSortOptionsOpen(!isSortOptionsOpen);
    isSortOptionsOpen
      ? document.body.classList.add("disable-scroll")
      : document.body.classList.remove("disable-scroll");
  };

  const handleMobileFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
    isFilterOpen
      ? document.body.classList.add("disable-scroll")
      : document.body.classList.remove("disable-scroll");
  };

  //handleSortClickOutside
  useEffect(() => {
    const handleSortClickOutside = (event: MouseEvent) => {
      const target = event.target;
      const selectMenu = document.querySelector(".select-opened");
      const selectLabel = document.querySelector(".select-label");

      if (target !== selectMenu && target !== selectLabel) {
        setIsSortOptionsOpen(false);
      }
    };

    document.addEventListener("click", handleSortClickOutside);

    return () => {
      document.removeEventListener("click", handleSortClickOutside);
    };
  }, []);

  //handleFilterClickOutside
  useEffect(() => {
    const handleFilterClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const sidebar = document.querySelector(".sidebar-open");
      const filterLabel = document.querySelector(".filter-label");

      if (
        target !== sidebar &&
        target !== filterLabel &&
        !sidebar?.contains(target)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("click", handleFilterClickOutside);

    return () => {
      document.removeEventListener("click", handleFilterClickOutside);
    };
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
    <div className="shop-page">
      <h2>Pre-order Limited Edition</h2>
      <div className="shop-page-header">
        <p className="number-of-products">
          Showing {numberOfShopItems} products
        </p>
        <div className="sort-select">
          <p className="select-label" onClick={handleMobileSortClick}>
            Sort by
          </p>
          <select
            id="sort"
            name="sort"
            value={sortOptionValue}
            className={
              !mobileSize
                ? "select-visible"
                : isSortOptionsOpen
                ? "select-opened"
                : "select-closed"
            }
            onChange={handleSortOptionChange}
          >
            {sortOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {mobileSize && (
            <p className="filter-label" onClick={handleMobileFilterClick}>
              Filter
            </p>
          )}
        </div>
      </div>
      <Line />
      <div className="sidebar-items-container">
        <div className="shop-section">
          <SideBar mobileSize={mobileSize} isFilterOpen={isFilterOpen} />
        </div>
        <ShopItems />
      </div>
    </div>
  );
};

export default ShopPage;
