"use client";
import "../../../components/PopupSignin/PopupSignin.css";
import { useRecoilState } from "recoil";
import { isPopupRegisterOpenState } from "@/app/recoil/atoms";

const PopupRegister = () => {
  const [isPopupRegisterOpen, setIsPopupRegisterOpen] = useRecoilState<boolean>(
    isPopupRegisterOpenState
  );

  return (
    <>
      {isPopupRegisterOpen && (
        <div className="popup-signin">
          <div className="logo_x">
            <h2>
              Limited Edition
              <br />
              Bricks Hub
            </h2>
          </div>

          <p>
            Congratulations! Your registration was successful. Now, please
            proceed to sign in to your page.
          </p>
        </div>
      )}
    </>
  );
};

export default PopupRegister;
