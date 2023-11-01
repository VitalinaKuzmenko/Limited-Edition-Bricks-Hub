import { PriceRange, PiecesRange } from "../shop/components/SideBar/SideBar";

export const createPriceRangeFromString = (
  priceString: string
): PriceRange | null => {
  const match = priceString.match(/£(\d+)(?:-£(\d+))?/);

  if (match) {
    const minPrice = parseInt(match[1]);
    const maxPrice = match[2] ? parseInt(match[2]) : minPrice;

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
    return { minPieces: 1000, maxPieces: 1000 };
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
