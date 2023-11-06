/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "./SideBar.css";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryFromThemeState,
  filterOptionsState,
  isFilterOpenState,
  mobileSizeState,
} from "@/app/recoil/atoms";
import {
  createPriceRangeFromString,
  createPiecesRangeFromString,
} from "@/app/utils/utils";

export interface PriceRange {
  minPrice: number;
  maxPrice: number;
}

export interface PiecesRange {
  minPieces: number;
  maxPieces: number;
}

export interface FilterOptions {
  category: string[];
  age: number[];
  priceRange: PriceRange[];
  piecesRange: PiecesRange[];
}

const SideBar = () => {
  const mobileSize = useRecoilValue(mobileSizeState);
  const [isFilterOpen, setIsFilterOpen] = useRecoilState(isFilterOpenState);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedPieceCounts, setSelectedPieceCounts] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] =
    useRecoilState<FilterOptions>(filterOptionsState);
  const [areSelectedFilters, setAreSelectedFilters] = useState<boolean>(false);
  const [categoryFromTheme, setCategoryFromTheme] = useRecoilState(
    categoryFromThemeState
  );

  const categories: string[] = [
    "Animals",
    "Fantasy",
    "Birds",
    "People",
    "Other",
  ];
  const ages: string[] = ["2+", "6+", "10+", "12+", "15+"];
  const prices: string[] = ["£10-£49", "£50-£99", "£100+"];
  const pieceCounts: string[] = ["3-99", "100-499", "500-999", "1000+"];

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAgeCheckboxChange = (age: string) => {
    if (selectedAges.includes(age)) {
      setSelectedAges(selectedAges.filter((a) => a !== age));
    } else {
      setSelectedAges([...selectedAges, age]);
    }
  };

  const handlePriceCheckboxChange = (price: string) => {
    if (selectedPrices.includes(price)) {
      setSelectedPrices(selectedPrices.filter((p) => p !== price));
    } else {
      setSelectedPrices([...selectedPrices, price]);
    }
  };

  const handlePieceCountCheckboxChange = (pieceCount: string) => {
    if (selectedPieceCounts.includes(pieceCount)) {
      setSelectedPieceCounts(
        selectedPieceCounts.filter((pc) => pc !== pieceCount)
      );
    } else {
      setSelectedPieceCounts([...selectedPieceCounts, pieceCount]);
    }
  };

  const onMobileCategoryClick = () => {
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    const newOption: FilterOptions = {
      category: [],
      age: [],
      priceRange: [],
      piecesRange: [],
    };
    setSelectedCategories([]);
    setSelectedAges([]);
    setSelectedPrices([]);
    setSelectedPieceCounts([]);
    setFilterOptions(newOption);
  };

  useEffect(() => {
    if (categoryFromTheme.length > 0) {
      handleCategoryChange(categoryFromTheme);
      setCategoryFromTheme("");
    }
  }, []);

  //set filterOptions for backEnd
  useEffect(() => {
    const arrayWithNumAge = selectedAges.map((age) => Number(age.slice(0, -1)));
    const priceRangeArray: PriceRange[] = selectedPrices
      .map((price) => createPriceRangeFromString(price))
      .filter((priceObject): priceObject is PriceRange => priceObject !== null);
    const piecesRangeArray: PiecesRange[] = selectedPieceCounts
      .map((piece) => createPiecesRangeFromString(piece))
      .filter(
        (piecesObject): piecesObject is PiecesRange => piecesObject !== null
      );

    const newOption: FilterOptions = {
      category: selectedCategories,
      age: arrayWithNumAge,
      priceRange: priceRangeArray,
      piecesRange: piecesRangeArray,
    };
    setFilterOptions(newOption);

    //check if any filters were chosen
    const allEmpty = Object.values(newOption).every((arr) => arr.length === 0);
    allEmpty ? setAreSelectedFilters(false) : setAreSelectedFilters(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedAges, selectedPrices, selectedPieceCounts]);

  return (
    <div
      className={
        !mobileSize
          ? "sidebar-section"
          : "sidebar-section sidebar-hidden " +
            (isFilterOpen ? "sidebar-open" : "sidebar-closed")
      }
    >
      {areSelectedFilters && (
        <div className="sidebar-item">
          <button className="clear-filters-button" onClick={handleClearFilters}>
            Clear all filters
          </button>
        </div>
      )}
      <div className="sidebar-item">
        <label htmlFor="category" className="main-label">
          Category
        </label>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <label>
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-item">
        <label htmlFor="age" className="main-label">
          Age
        </label>
        <ul>
          {ages.map((age) => (
            <li key={age}>
              <label>
                <input
                  type="checkbox"
                  id={`age-${age}`}
                  value={age}
                  checked={selectedAges.includes(age)}
                  onChange={() => handleAgeCheckboxChange(age)}
                />
                {age}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-item">
        <label htmlFor="price" className="main-label">
          Price
        </label>
        <ul>
          {prices.map((price) => (
            <li key={price}>
              <label>
                <input
                  type="checkbox"
                  id={`price-${price}`}
                  value={price}
                  checked={selectedPrices.includes(price)}
                  onChange={() => handlePriceCheckboxChange(price)}
                />
                {price}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-item">
        <label htmlFor="piece-count" className="main-label">
          Piece Count
        </label>
        <ul>
          {pieceCounts.map((pieceCount) => (
            <li key={pieceCount}>
              <label>
                <input
                  type="checkbox"
                  id={`piece-count-${pieceCount}`}
                  value={pieceCount}
                  checked={selectedPieceCounts.includes(pieceCount)}
                  onChange={() => handlePieceCountCheckboxChange(pieceCount)}
                />
                {pieceCount}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {mobileSize && (
        <button className="sidebar-show-button" onClick={onMobileCategoryClick}>
          Show products
        </button>
      )}
    </div>
  );
};

export default SideBar;
