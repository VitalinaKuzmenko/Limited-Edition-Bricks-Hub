"use client";
import Link from "next/link";
import "./PopupPreorder.css";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { isPopupPreorderOpenState } from "@/app/recoil/atoms";

const PopupPreorder = () => {
  const [isPopupPreorderOpen, setIsPopupPreorderOpen] = useRecoilState<boolean>(
    isPopupPreorderOpenState
  );

  const handleClosePopup = () => {
    setIsPopupPreorderOpen(false);
  };

  return (
    <>
      {isPopupPreorderOpen && (
        <div className="popup-signin">
          <div className="logo_x">
            <h2>
              Limited Edition
              <br />
              Bricks Hub
            </h2>
          </div>

          <p>
            Thank you for placing your pre-order for Lego sets on our Limited
            Edition Bricks Hub! You&apos;ll receive an email notification once
            your order is ready and on its way to you. Have a fantastic day!
          </p>
        </div>
      )}
    </>
  );
};

export default PopupPreorder;
