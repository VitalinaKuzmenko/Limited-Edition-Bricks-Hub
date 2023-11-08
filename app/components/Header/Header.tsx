/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  bagItemsState,
  currentUserState,
  isSigninPopupOpenState,
  isUserLoginState,
  selectedDesktopOptionState,
} from "@/app/recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import { BagItem } from "../FeaturedItems/FeaturedItems";

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
  const [mobileSize, setMobileSize] = useState<boolean>(false);
  const [mobileSearchSize, setMobileSearchSize] = useState<boolean>(false);
  const [mobileSearchExpanded, setMobileSearchExpanded] =
    useState<boolean>(false);
  const searchFormRef = useRef<HTMLFormElement | null>(null);
  const [_, setIsSigninPopupOpenState] = useRecoilState(isSigninPopupOpenState);
  const [isUserLogin, setIsUserLogin] = useRecoilState(isUserLoginState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [__, setSelectedDesktopOption] = useRecoilState(
    selectedDesktopOptionState
  );
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const bagItems = useRecoilValue(bagItemsState);
  const router = useRouter();

  const handleSearchClick = () => {
    const form = document.querySelector(".search");
    const searchInput = document.querySelector(".search__input");
    const mobileForm = document.querySelector(".mobile-search");
    const mobileSearchInput = document.querySelector(".mobile-search-input");
    if (mobileSearchSize && !mobileSearchExpanded) {
      setMobileSearchExpanded(true);
      if (form && searchInput) {
        form.classList.add("mobile-search");
        searchInput.classList.add("mobile-search-input");
      }
    } else if (mobileSize && mobileSearchExpanded) {
      setMobileSearchExpanded(false);
      if (mobileForm) {
        mobileForm.classList.remove("mobile-search");
        setMobileSearchExpanded(false);
      }
      if (mobileSearchInput) {
        mobileSearchInput.classList.remove("mobile-search-input");
      }
    } else {
      if (mobileForm) {
        mobileForm.classList.remove("mobile-search");
        setMobileSearchExpanded(false);
      }
      if (mobileSearchInput) {
        mobileSearchInput.classList.remove("mobile-search-input");
      }
    }
  };

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

  const calculateTotalQuantity = (bagItems: BagItem[] | undefined): number => {
    if (!bagItems) return 0;

    return bagItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogin = () => {
    if (isUserLogin) {
      setSelectedDesktopOption(0);
      router.push("/dashboard");
    } else {
      setIsSigninPopupOpenState(true);
    }
  };

  const handleWishListClick = () => {
    if (isUserLogin) {
      setSelectedDesktopOption(1);
      router.push("/dashboard");
    } else {
      setIsSigninPopupOpenState(true);
    }
  };

  const handleCartClick = () => {
    if (isUserLogin) {
      router.push("/checkout");
    } else {
      setIsSigninPopupOpenState(true);
    }
  };

  useEffect(() => {
    const quantity = calculateTotalQuantity(bagItems);
    setTotalQuantity(quantity);
  }, [bagItems]);

  //handle searchClickOutside
  useEffect(() => {
    const handleSearchClickOutside = (event: MouseEvent) => {
      const target = event.target;
      const mobileForm = document.querySelector(".mobile-search");
      const mobileSearchInput = document.querySelector(".mobile-search-input");
      const searchIcon = document.getElementById("search-icon");

      if (
        target !== mobileForm &&
        target !== mobileSearchInput &&
        target !== searchIcon
      ) {
        // Click occurred outside the form, so remove classes
        if (mobileForm) {
          mobileForm.classList.remove("mobile-search");
        }

        if (mobileSearchInput) {
          mobileSearchInput.classList.remove("mobile-search-input");
        }

        setMobileSearchExpanded(false);
      }
    };

    document.addEventListener("click", handleSearchClickOutside);

    return () => {
      document.removeEventListener("click", handleSearchClickOutside);
    };
  }, []);

  //handle header text animation change
  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the current index, looping back to 0 when it reaches the end
      setCurrentInfoIndex((prevIndex) =>
        prevIndex === infoTexts.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => {
      // Clean up the interval on unmount
      clearInterval(interval);
    };
  }, [infoTexts.length]);

  //define which size of screen is now
  useEffect(() => {
    const newMobileSize = window.innerWidth <= 767;
    const newMobileSearchSize = newMobileSize || window.innerWidth <= 1024;

    if (newMobileSize !== mobileSize) {
      setMobileSize(newMobileSize);
    }

    if (newMobileSearchSize !== mobileSearchSize) {
      setMobileSearchSize(newMobileSearchSize);
    }

    if (newMobileSize) {
      closeNavbar();
      setIsNavigationClosing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //handle resize of screen
  useEffect(() => {
    const handleResize = () => {
      const newMobileSize = window.innerWidth <= 767;
      const newMobileSearchSize = newMobileSize || window.innerWidth <= 1024;

      if (newMobileSize !== mobileSize) {
        setMobileSize(newMobileSize);
      }

      if (newMobileSearchSize !== mobileSearchSize) {
        setMobileSearchSize(newMobileSearchSize);
      }

      if (newMobileSize) {
        closeNavbar();
        setIsNavigationClosing(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //check if user is logged in
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("user logged in", user);
        console.log("uid", user.uid);
        setIsUserLogin(true);

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
          setCurrentUser(input);
        }
      } else {
        setIsUserLogin(false);
        console.log("there is no user");
      }
    });
  }, []);

  return (
    <header>
      <div className="header-change-info">
        <p>{infoTexts[currentInfoIndex]}</p>
      </div>
      <div className="header-container">
        <div className="header-subcontainer">
          <div className="left-part-header">
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
                        className={`navigation-link ${
                          isActive ? "active" : ""
                        }`}
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

          <div className="header-icons-container">
            <form className="search" ref={searchFormRef}>
              <input
                type="text"
                id="search"
                className="search__input text-white"
                placeholder="Search...."
              />
              <button
                type="button"
                className="search__button"
                onClick={handleSearchClick}
              >
                <img
                  id="search-icon"
                  src="/icons/magnifying-glass-icon.svg"
                  alt="search"
                />
              </button>
            </form>
            <div className="login-link-container" onClick={handleLogin}>
              <img src="/icons/login-icon.svg" alt="login" />

              <p className={mobileSize ? "hidden" : ""}>
                {isUserLogin ? currentUser?.name : "Log in"}
              </p>
            </div>
            <div className="wishlist-header-icon" onClick={handleWishListClick}>
              <img src="/icons/empty-heart-icon.svg" alt="wishlist" />
            </div>
            <div className="cart-header-icon" onClick={handleCartClick}>
              <img src="/icons/cart-icon.svg" alt="cart" />
              <p>({totalQuantity})</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
