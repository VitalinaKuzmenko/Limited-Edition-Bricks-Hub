"use client";
import Link from "next/link";
import "./PopupSignin.css";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { isSigninPopupOpenState } from "@/app/recoil/atoms";

const PopupSignin = () => {
  const [isSigninPopupOpen, setIsSigninPopupOpenState] = useRecoilState(
    isSigninPopupOpenState
  );

  const handleClosePopup = () => {
    setIsSigninPopupOpenState(false);
  };

  return (
    <>
      {isSigninPopupOpen && (
        <div className="popup-signin">
          <div className="logo_x">
            <h2>
              Limited Edition
              <br />
              Bricks Hub
            </h2>
            <Image
              src="/icons/xmark-icon.svg"
              alt="Close"
              width={20}
              height={20}
              onClick={handleClosePopup}
            />
          </div>

          <p>Sing In to your Limited Edition Bricks Hub account</p>

          <Link href="/signin">
            <button>Sign In</button>
          </Link>
          <div className="small-text">
            <p>
              Don&apos;t have an account?
              <Link href="/register">Register</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupSignin;
