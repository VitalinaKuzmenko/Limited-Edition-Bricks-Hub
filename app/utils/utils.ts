import { PriceRange, PiecesRange } from "../shop/components/SideBar/SideBar";

export const createPriceRangeFromString = (
  priceString: string
): PriceRange | null => {
  if (priceString === "£100+") {
    return { minPrice: 100, maxPrice: 10000 };
  }

  const match = priceString.match(/£(\d+)-£(\d+)/);

  if (match) {
    const minPrice = parseInt(match[1]);
    const maxPrice = parseInt(match[2]);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      return { minPrice, maxPrice };
    }
  }

  return null;
};

export const createPiecesRangeFromString = (
  piecesString: string
): PiecesRange | null => {
  if (piecesString === "1000+") {
    return { minPieces: 1000, maxPieces: 100000 };
  }

  const match = piecesString.match(/(\d+)-(\d+)/);

  if (match) {
    const minPieces = parseInt(match[1]);
    const maxPieces = parseInt(match[2]);

    if (!isNaN(minPieces) && !isNaN(maxPieces)) {
      return { minPieces, maxPieces };
    }
  }

  return null;
};
