"use client";
import "./PersonalDetails.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/app/recoil/atoms";
import { auth } from "@/firebaseConfig";

export interface User {
  uid: string;
  name: string;
  surname: string;
  email: string;
  avatarPath: string;
}

const fakeUser: User = {
  uid: "ouQvjAEIsAZdQdWgJqpxGQLb93N2",
  name: "Vitalina",
  surname: "Kuzmenko",
  email: "pyshokvi@gmail.com",
  avatarPath: "avatar.svg",
};

interface EditingStatus {
  name: boolean;
  surname: boolean;
  email: boolean;
  avatarPath: boolean;
}

const PersonalDetails = () => {
  const [user, setUser] = useRecoilState(currentUserState);
  const [initialUser, setInitialUser] = useState<User>(fakeUser);
  const [isEditing, setIsEditing] = useState<EditingStatus>({
    name: false,
    surname: false,
    email: false,
    avatarPath: false,
  });

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("user logged in", user);
        console.log("uid", user.uid);
      } else {
        console.log("there is no user");
      }
    });
  }, []);

  const handleCancelClick = (field: keyof EditingStatus) => {
    const updatedEditing = { ...isEditing };
    updatedEditing[field] = false;
    setIsEditing(updatedEditing);

    if (user) {
      const updatedUser = { ...initialUser };
      updatedUser[field] = user[field];
      setInitialUser(updatedUser);
    }
  };

  const handleDoneClick = (field: keyof EditingStatus) => {
    console.log("user, user");
    const updatedEditing = { ...isEditing };
    updatedEditing[field] = false;
    setIsEditing(updatedEditing);
  };

  const handleInputChange = (
    field: keyof User,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedUser = { ...initialUser };
    updatedUser[field] = e.target.value;
    setInitialUser(updatedUser);
  };

  const renderField = (field: keyof EditingStatus) => {
    return (
      user &&
      (isEditing[field] ? (
        <div className="input-field">
          <input
            type="text"
            value={user[field]}
            onChange={(e) => handleInputChange(field, e)}
          />
          <div className="input-buttons">
            <button onClick={() => handleCancelClick(field)}>Cancel</button>
            <button onClick={() => handleDoneClick(field)}>Done</button>
          </div>
        </div>
      ) : (
        <p>{user[field]}</p>
      ))
    );
  };

  const resetPassword = () => {};

  return (
    <div className="personal-details">
      <div className="details-container">
        <div className="details-small-container">
          <p className="name">Name</p>
        </div>
        {renderField("name")}
      </div>
      <div className="details-container">
        <div className="details-small-container">
          <p className="name">Surname</p>
        </div>
        {renderField("surname")}
      </div>
      <div className="details-container">
        <div className="details-small-container">
          <p className="name">Email</p>
        </div>
        {renderField("email")}
      </div>
      <div className="details-container">
        <div className="details-small-container">
          <p className="name">Password</p>
        </div>
        <p className="reset-password" onClick={resetPassword}>
          Reset a password
        </p>
      </div>
    </div>
  );
};

export default PersonalDetails;
