import { gql } from "@apollo/client";

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
