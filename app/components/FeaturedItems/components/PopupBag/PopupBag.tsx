"use client";
import "./PopupBag.css";
import { useRecoilState } from "recoil";
import { isPopupBagOpenState } from "@/app/recoil/atoms";
import { useRouter } from "next/navigation";

const PopupBag = () => {
  const [isPopupBagOpen, setIsPopupBagOpen] =
    useRecoilState<boolean>(isPopupBagOpenState);
  const router = useRouter();

  const handleCheckoutClick = () => {
    setIsPopupBagOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      {isPopupBagOpen && (
        <div className="popup-signin">
          <div className="logo_x">
            <h2>
              Limited Edition
              <br />
              Bricks Hub
            </h2>
          </div>

          <p>Item was added to your bag.</p>
          <div className="bag-buttons">
            <button onClick={() => setIsPopupBagOpen(false)}>
              Continue shopping
            </button>

            <button onClick={handleCheckoutClick}>Go to your bag</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupBag;
