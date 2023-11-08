import { gql } from "@apollo/client";

export const GET_ALL_SHOP_ITEMS = gql`
  query GetAllShopItems {
    getAllShopItems {
      id
      imagePath
      alternativeText
      name
      price
      stars
      age
      pieces
      category
    }
  }
`;

export const GET_TOP_RATED_SHOP_ITEMS = gql`
  query GetTopRatedShopItems($limit: Int!) {
    getTopRatedShopItems(limit: $limit) {
      id
      imagePath
      alternativeText
      name
      price
      stars
      age
      pieces
      category
    }
  }
`;

export const GET_USER_BY_UID = gql`
  query GetUserByUid($uid: String!) {
    getUserByUid(uid: $uid) {
      id
      uid
      name
      surname
      email
      avatarPath
    }
  }
`;

export const GET_WISHLIST_ITEMS = gql`
  query GetWishlistItems($userId: ID!) {
    getWishlistItems(userId: $userId) {
      id
      imagePath
      alternativeText
      name
      price
      stars
      age
      pieces
      category
    }
  }
`;

export const ADD_NEW_USER = gql`
  mutation addUser($input: PersonalDetailsInput!) {
    addUser(input: $input) {
      id
      uid
      name
      surname
      email
      avatarPath
    }
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($userId: ID!, $shopItemId: ID!) {
    addToWishlist(userId: $userId, shopItemId: $shopItemId) {
      id
      wishlist {
        id
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation RemoveFromWishlist($userId: ID!, $shopItemId: ID!) {
    removeFromWishlist(userId: $userId, shopItemId: $shopItemId) {
      id
      wishlist {
        id
      }
    }
  }
`;
