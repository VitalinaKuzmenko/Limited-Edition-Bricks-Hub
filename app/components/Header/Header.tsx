"use client";
import "./Header.css";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  id: number;
  link: string;
  name: string;
}

const Header = () => {
  const currentRoute = usePathname();
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);
  const [isNavigationClosing, setIsNavigationClosing] =
    useState<boolean>(false);
  const navLinks: NavLink[] = [
    { id: 1, link: "/", name: "home" },
    { id: 2, link: "/shop", name: "shop" },
    { id: 3, link: "/about", name: "about" },
    { id: 4, link: "/contact", name: "contact" },
  ];
  const infoTexts: string[] = [
    "Celebrate the Extraordinary with Every Brick.",
    "Where Rarity Meets Creativity, Brick by Brick.",
    "Preserve the Future of LEGO Collectibles with Preorders.",
  ];
  const [currentInfoIndex, setCurrentInfoIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the current index, looping back to 0 when it reaches the end
      setCurrentInfoIndex((prevIndex) =>
        prevIndex === infoTexts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      // Clean up the interval on unmount
      clearInterval(interval);
    };
  }, [infoTexts]);

  const showNavbar = () => {
    setIsNavigationOpen(true);
    document.body.classList.add("disable-scroll");
  };

  const closeNavbar = () => {
    document.body.classList.remove("disable-scroll");
    setIsNavigationOpen(false);
    setIsNavigationClosing(true);

    setTimeout(() => {
      setIsNavigationClosing(false);
    }, 1000); // Wait for the animation to complete before removing the classes
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        closeNavbar();
        setIsNavigationClosing(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      <div className="header-change-info">
        <p>{infoTexts[currentInfoIndex]}</p>
      </div>
      <div className="header-subcontainer">
        <Link href="/" className="header-logo-container">
          <h2 className="header-logo-title">
            Limited Edition
            <br />
            Bricks Hub
          </h2>
        </Link>
        <nav
          className={`${isNavigationOpen ? "navigation-open" : ""} ${
            isNavigationClosing ? "navigation-closing" : ""
          }`}
        >
          <ul>
            {navLinks.map((navLink) => {
              const isActive = currentRoute === navLink.link;
              return (
                <li key={navLink.id}>
                  <Link
                    href={navLink.link}
                    className={`navigation-link ${isActive ? "active" : ""}`}
                    onClick={closeNavbar}
                  >
                    {navLink.name}
                  </Link>
                  <div className="navigation-link-star">
                    <img src="/icons/star-icon.svg" alt="small star" />
                  </div>
                </li>
              );
            })}
          </ul>
          <button
            className="navigation-menu-button navigation-menu-button-close"
            onClick={closeNavbar}
          >
            <FaTimes className="navigation-menu-button-icon-close" />
          </button>
        </nav>
        <button className="navigation-menu-button" onClick={showNavbar}>
          <FaBars className="navigation-menu-button-icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;
