"use client";
import "./PersonalDetails.css";
import { useState } from "react";

export interface PersonalDetails {
  uid: string;
  name: string;
  surname: string;
  email: string;
  avatarPath: string;
}

const fakeUser: PersonalDetails = {
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
  const [user, setUser] = useState(fakeUser);
  const [initialUser, setInitialUser] = useState<PersonalDetails>(fakeUser);
  const [isEditing, setIsEditing] = useState<EditingStatus>({
    name: false,
    surname: false,
    email: false,
    avatarPath: false,
  });

  const handleEditClick = (field: keyof EditingStatus) => {
    const updatedEditing = { ...isEditing };
    updatedEditing[field] = true;
    setIsEditing(updatedEditing);
  };

  const handleCancelClick = (field: keyof EditingStatus) => {
    const updatedEditing = { ...isEditing };
    updatedEditing[field] = false;
    setIsEditing(updatedEditing);

    const updatedUser = { ...initialUser };
    updatedUser[field] = user[field];
    setInitialUser(updatedUser);
  };

  const handleDoneClick = (field: keyof EditingStatus) => {
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

  const renderField = (field: keyof EditingStatus) => {
    return isEditing[field] ? (
      <div className="input-field">
        <input
          type="text"
          value={initialUser[field]}
          onChange={(e) => handleInputChange(field, e)}
        />
        <div className="input-buttons">
          <button onClick={() => handleCancelClick(field)}>Cancel</button>
          <button onClick={() => handleDoneClick(field)}>Done</button>
        </div>
      </div>
    ) : (
      <p>{user[field]}</p>
    );
  };

  const resetPassword = () => {};

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
        </div>
        <p className="reset-password" onClick={resetPassword}>
          Reset a password
        </p>
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
