import gql from "graphql-tag";

const typeDefs = gql`
  type ShopItem {
    id: ID!
    imagePath: String!
    alternativeText: String!
    name: String!
    price: Float!
    stars: Int!
    age: Int!
    pieces: Int!
    category: String!
  }

  input PriceRangeInput {
    minPrice: Float
    maxPrice: Float
  }

  input PieceRangeInput {
    minPieces: Int
    maxPieces: Int
  }

  type Query {
    getShopItem(name: String!): ShopItem
    getAllShopItems(
      category: [String]
      age: [Int]
      priceRange: [PriceRangeInput]
      pieceRange: [PieceRangeInput]
    ): [ShopItem]
    getTopRatedShopItems(limit: Int): [ShopItem]
  }
`;

export default typeDefs;
