"use client";
import "./register.css";
import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  birthdate: string;
}

interface RegisterErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  age: string;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "Select Country",
    birthdate: "",
  });
  const [errorMessages, setErrorMessages] = useState<RegisterErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    age: "",
  });
  const countries = [
    "Select Country",
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "India",
    "Other",
  ];
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = (data: typeof formData) => {
    const errors: any = {};

    if (data.firstName.length < 4) {
      errors.firstName = "Oops! Your first name needs more bricks, at least 4!";
    }

    if (data.lastName.length < 4) {
      errors.lastName =
        "More bricks needed in your last name! Should be at least 4 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      errors.email =
        "Brick-by-brick, we build our email addresses. Yours seems a bit wobbly!";
    }

    if (data.password.length < 8) {
      errors.password =
        "Build a stronger password, like a brick fortress! At least 8 characters!";
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)/;
    if (!passwordPattern.test(data.password)) {
      errors.password =
        'Add some "bricktastic" strength! Include one capital letter and one number.';
    }

    if (data.country === "Select Country") {
      errors.country =
        "Let's choose a country, like picking your favorite brick color!";
    }

    const currentDate = new Date();
    const birthDate = new Date(data.birthdate);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      errors.age =
        'Sorry, you must be at least 18 years old to enter our "bricktopia"!';
    }

    setErrorMessages(errors);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation for the changed field
    validateForm({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateForm(formData);

    const errorsExist = Object.keys(errorMessages).length > 0;

    if (errorsExist) {
      console.log("Form has validation errors, please correct them.");
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;
        console.log("user", user);
        router.push("/signin");
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(error.message);
        console.error(errorCode, errorMessage);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-section">
        <div className="register-header">
          <h2>
            Limited Edition
            <br />
            Bricks Hub
          </h2>
          <h3>Create your adult account</h3>
          <p className="small-text">Already have an account?</p>
          <Link href="/signin">Sign in</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                placeholder="Write your first name"
                onChange={handleChange}
              />
              {errorMessages.firstName && (
                <div className="error">{errorMessages.firstName}</div>
              )}
            </div>

            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                placeholder="Write your last name"
                onChange={handleChange}
              />
              {errorMessages.lastName && (
                <div className="error">{errorMessages.lastName}</div>
              )}
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Write your email"
                onChange={handleChange}
              />
              {errorMessages.email && (
                <div className="error">{errorMessages.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <div className="password-input-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder="********"
                  onChange={handleChange}
                />
                <p
                  onClick={handleTogglePasswordVisibility}
                  className="password-toggle-button"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </p>
              </div>
              {errorMessages.password && (
                <div className="error">{errorMessages.password}</div>
              )}
            </div>

            <div>
              <label htmlFor="country">Country:</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errorMessages.country && (
                <div className="error">{errorMessages.country}</div>
              )}
            </div>

            <div>
              <label htmlFor="birthdate">Birthdate:</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
              {errorMessages.age && (
                <div className="error">{errorMessages.age}</div>
              )}
            </div>
          </fieldset>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Yes, create account!</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
