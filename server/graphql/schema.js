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

  input PersonalDetailsInput {
    uid: String!
    name: String!
    surname: String!
    email: String!
    avatarPath: String!
  }

  type User {
    id: ID!
    uid: String!
    name: String!
    surname: String!
    email: String!
    avatarPath: String!
  }

  type Query {
    getShopItem(name: String!): ShopItem
    getAllShopItems: [ShopItem]
    getTopRatedShopItems(limit: Int): [ShopItem]
    getUserByUid(uid: String!): User
    getWishlistItems(userId: ID!): [ShopItem]
  }

  type Mutation {
    addUser(input: PersonalDetailsInput!): User
    updateUserByUid(
      uid: String!
      name: String
      surname: String
      avatarPath: String
    ): User
    addToWishlist(userId: ID!, shopItemId: ID!): User
    removeFromWishlist(userId: ID!, shopItemId: ID!): User
  }
`;

export default typeDefs;
