"use client";
import "./SideBar.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { filterOptionsState } from "@/app/recoil/atoms";
import {
  createPriceRangeFromString,
  createPiecesRangeFromString,
} from "@/app/utils/utils";

interface SideBarProps {
  mobileSize: boolean;
  isFilterOpen: boolean;
}

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

const SideBar: React.FC<SideBarProps> = ({ mobileSize, isFilterOpen }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedPieceCounts, setSelectedPieceCounts] = useState<string[]>([]);
  const [_, setFilterOptions] =
    useRecoilState<FilterOptions>(filterOptionsState);

  const categories: string[] = [
    "Animals",
    "Fantasy",
    "Birds",
    "People",
    "Other",
  ];
  const ages: string[] = ["2+", "6+", "10+", "12+", "15+"];
  const prices: string[] = ["£10-£50", "£50-£100", "£100+"];
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
        <Link href="/">
          <button className="sidebar-show-button">Show products</button>
        </Link>
      )}
    </div>
  );
};

export default SideBar;
