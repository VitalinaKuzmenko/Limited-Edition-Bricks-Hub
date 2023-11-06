"use client";
import "./PersonalDetails.css";
import { useState } from "react";

export interface PersonalDetails {
  name: string;
  surname: string;
  email: string;
  password: string;
  avatarPath: string;
}

const fakeUser: PersonalDetails = {
  name: "Vitalina",
  surname: "Kuzmenko",
  email: "pyshokvi@gmail.com",
  password: "********",
  avatarPath: "avatar.svg",
};

interface EditingStatus {
  name: boolean;
  surname: boolean;
  email: boolean;
  password: boolean;
  avatarPath: boolean;
}

const PersonalDetails = () => {
  const [user, setUser] = useState(fakeUser);
  const [initialUser, setInitialUser] = useState<PersonalDetails>(fakeUser);
  const [isEditing, setIsEditing] = useState<EditingStatus>({
    name: false,
    surname: false,
    email: false,
    password: false,
    avatarPath: false,
  });

  const handleEditClick = (field: keyof PersonalDetails) => {
    const updatedEditing = { ...isEditing };
    updatedEditing[field] = true;
    setIsEditing(updatedEditing);
  };

  const handleCancelClick = (field: keyof PersonalDetails) => {
    const updatedEditing = { ...isEditing };
    updatedEditing[field] = false;
    setIsEditing(updatedEditing);

    const updatedUser = { ...initialUser };
    updatedUser[field] = user[field];
    setInitialUser(updatedUser);
  };

  const handleDoneClick = (field: keyof PersonalDetails) => {
    const updatedEditing = { ...isEditing };
    updatedEditing[field] = false;
    setIsEditing(updatedEditing);
    const updatedUser = { ...user };
    updatedUser[field] = initialUser[field];
    setUser(updatedUser);
  };

  const handleInputChange = (
    field: keyof PersonalDetails,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedUser = { ...initialUser };
    updatedUser[field] = e.target.value;
    setInitialUser(updatedUser);
  };

  const renderField = (field: keyof PersonalDetails) => {
    return isEditing[field] ? (
      <div>
        <input
          type="text"
          value={initialUser[field]}
          onChange={(e) => handleInputChange(field, e)}
        />
        <button onClick={() => handleCancelClick(field)}>Cancel</button>
        <button onClick={() => handleDoneClick(field)}>Done</button>
      </div>
    ) : (
      <p>{user[field]}</p>
    );
  };

  return (
    <div className="personal-details">
      <div className="details-container">
        <div className="details-small-container">
          <p className="name">Name</p>
          <p className="change" onClick={() => handleEditClick("name")}>
            Change
          </p>
        </div>
        {renderField("name")}
      </div>
      <div className="details-container">
        <div className="details-small-container">
          <p className="name">Surname</p>
          <p className="change" onClick={() => handleEditClick("surname")}>
            Change
          </p>
        </div>
        {renderField("surname")}
      </div>
      <div className="details-container">
        <div className="details-small-container">
          <p className="name">Email</p>
          <p className="change" onClick={() => handleEditClick("email")}>
            Change
          </p>
        </div>
        {renderField("email")}
      </div>
      <div className="details-container">
        <div className="details-small-container">
          <p className="name">Password</p>
          <p className="change" onClick={() => handleEditClick("password")}>
            Change
          </p>
        </div>
        {renderField("password")}
      </div>
      <div className="details-container">
        <div className="details-small-container">
          <p className="name">Avatar</p>
          <p className="change" onClick={() => handleEditClick("avatarPath")}>
            Change
          </p>
        </div>
        {renderField("avatarPath")}
      </div>
    </div>
  );
};

export default PersonalDetails;
