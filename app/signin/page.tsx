/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "./signin.css";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { currentUserState, isSigninPopupOpenState } from "../recoil/atoms";
import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { User } from "../dashboard/components/PersonalDetails/PersonalDetails";
import { useQuery } from "@apollo/client";

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

const SigninPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState<string>("");
  const router = useRouter();
  const [_, setIsSigninPopupOpenState] = useRecoilState(isSigninPopupOpenState);
  const client = useApolloClient();

  const fetchUser = async (uid: string) => {
    try {
      const { data } = await client.query({
        query: GET_USER_BY_UID,
        variables: {
          uid: uid,
        },
      });

      const userExists = data.getUserByUid;

      if (userExists) {
        return true;
      }
    } catch (error) {
      console.error("Error querying user by UID:", error);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user && user.email) {
        let name = "";
        let surname = "";
        if (user.displayName !== null) {
          const nameParts = user.displayName.split(" ");
          name = nameParts[0];
          surname = nameParts[1];
        }

        const input = {
          uid: user.uid,
          name: name,
          surname: surname,
          email: user.email,
          avatarPath: "avatar",
        };
        const userExists = await fetchUser(input.uid);

        if (!userExists) {
          client
            .mutate({
              mutation: ADD_NEW_USER,
              variables: { input },
            })
            .then((result) => {
              console.log("New User was Added:", result.data.addUser);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      }
      router.push("/dashboard");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(error.message);
      console.error(errorCode, errorMessage);
    }
  };

  useEffect(() => {
    setIsSigninPopupOpenState(false);
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      if (user && user.email) {
        let name = "";
        let surname = "";
        if (user.displayName !== null) {
          const nameParts = user.displayName.split(" ");
          name = nameParts[0];
          surname = nameParts[1];
        }

        const input = {
          uid: user.uid,
          name: name,
          surname: surname,
          email: user.email,
          avatarPath: "avatar",
        };

        const userExists = await fetchUser(input.uid);

        if (!userExists) {
          client
            .mutate({
              mutation: ADD_NEW_USER,
              variables: { input },
            })
            .then((result) => {
              console.log("New User was Added:", result.data.addUser);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      }
      router.push("/dashboard");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(error.message);
      console.error(errorCode, errorMessage);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      if (user && user.email) {
        let name = "";
        let surname = "";
        if (user.displayName !== null) {
          const nameParts = user.displayName.split(" ");
          name = nameParts[0];
          surname = nameParts[1];
        }

        const input = {
          uid: user.uid,
          name: name,
          surname: surname,
          email: user.email,
          avatarPath: "avatar",
        };

        client
          .mutate({
            mutation: ADD_NEW_USER,
            variables: { input },
          })
          .then((result) => {
            console.log("New User was Added:", result.data.addUser);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      router.push("/dashboard");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(error.message);
      console.error(errorCode, errorMessage);
    }
  };

  return (
    <div className="signin-page">
      <form className="singin-form" onSubmit={handleSignIn}>
        <div className="signin-header">
          <h2>
            Limited Edition
            <br />
            Bricks Hub
          </h2>
          <h3>Sign in</h3>
          {msg && <p style={{ color: "red" }}>{msg}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="email"
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              placeholder="password"
              onChange={handlePasswordChange}
            />
            <p
              onClick={handleTogglePasswordVisibility}
              className="password-toggle-button"
            >
              {passwordVisible ? "Hide" : "Show"}
            </p>
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
      <div className="register-section">
        <h3> New user</h3>
        <Link href="/register">
          <button>Create account</button>
        </Link>
      </div>
      <div className="social-options">
        {/* <div className="signin-facebook-div" onClick={handleFacebookSignIn}>
          <p>Continue with Facebook</p>
          <FiChevronRight />
        </div> */}

        <div onClick={handleGoogleSignIn}>
          <p>Continue with Google</p>
          <FiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
