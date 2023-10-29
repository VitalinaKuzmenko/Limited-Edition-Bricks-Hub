import gql from "graphql-tag";

const typeDefs = gql`
  type ShopItem {
    id: ID!
    imagePath: String!
    alternativeText: String!
    name: String!
    price: String!
    stars: Int!
    age: Int!
    pieces: Int!
    category: String!
  }

  type Query {
    getShopItem(name: String!): ShopItem
    getAllShopItems: [ShopItem]
  }
`;

export default typeDefs;
