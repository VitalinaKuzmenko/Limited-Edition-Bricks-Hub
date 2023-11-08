import "./LogOut.css";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  bagItemsState,
  currentUserState,
  isUserLoginState,
  selectedDesktopOptionState,
  wishlistItemsState,
} from "@/app/recoil/atoms";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const [_, setIsUserLogin] = useRecoilState(isUserLoginState);
  const setWishListItems = useSetRecoilState(wishlistItemsState);
  const setBagItems = useSetRecoilState(bagItemsState);
  const setSelectedDesktopOption = useSetRecoilState(
    selectedDesktopOptionState
  );
  const setCurrentUser = useSetRecoilState(currentUserState);
  const router = useRouter();

  const handleLogOut = () => {
    signOut(auth);
    setIsUserLogin(false);
    setWishListItems(undefined);
    setBagItems(undefined);
    setSelectedDesktopOption(0);
    setCurrentUser(undefined);
    router.push("/");
  };

  return (
    <div className="logout-container">
      <h1>
        Are you sure you want
        <br /> to log out?
      </h1>
      <button className="logout-button" onClick={handleLogOut}>
        Yes
      </button>
    </div>
  );
};

export default LogOut;
