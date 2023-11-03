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

  type Query {
    getShopItem(name: String!): ShopItem
    getAllShopItems: [ShopItem]
    getTopRatedShopItems(limit: Int): [ShopItem]
  }
`;

export default typeDefs;
