"use client";
import React, { useState } from "react";
import "./Footer.css";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubscribed(true);

    setTimeout(() => setIsSubscribed(false), 4000);
    setEmail("");
  };

  return (
    <footer>
      <h4 className="footer-title">Limited Edition Bricks Hub</h4>
      <div className="footer-columns-container">
        <div className="footer-nav">
          <Link href="/">home</Link>
          <Link href="/shop">shop</Link>
          <Link href="/about">about</Link>
          <Link href="/contact">contact</Link>
        </div>
        <div className="footer-icons">
          <img src="/icons/facebook-icon.svg" alt="facebook-icon" />
          <img src="/icons/instagram-icon.svg" alt="instagram-icon" />
          <img src="/icons/pinterest-icon.svg" alt="pinterest-icon" />
        </div>
        <div className="footer-extra-nav">
          <Link href="/">shipping & returns</Link>
          <Link href="/">store policy</Link>
          <Link href="/">payment methods</Link>
          <Link href="/">returns</Link>
        </div>
      </div>

      <form className="footer-subscribe-container" onSubmit={handleSubmit}>
        <label htmlFor="footer-email">Join Our Mailing List</label>
        <div className="footer-input-button">
          <input
            type="email"
            id="footer-email"
            name="footer-email"
            value={email}
            placeholder="Enter your email here*"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
          <button className="subscribe-button " type="submit">
            Subscribe Now
          </button>
        </div>
        <p className="footer-subscribe-text">
          {isSubscribed && "Thank you for subscribing!"}
        </p>
      </form>
      <p className="footer-bottom-text">
        Made with 💙
        <br /> This website was created for strictly educational purposes.
      </p>
    </footer>
  );
};

export default Footer;
