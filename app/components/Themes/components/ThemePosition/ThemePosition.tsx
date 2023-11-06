"use client";
import "./ThemePosition.css";
import { ThemePositionObject } from "../../Themes";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { categoryFromThemeState } from "@/app/recoil/atoms";
import Link from "next/link";

interface ThemePositionProps {
  theme: ThemePositionObject;
}

const ThemePosition: React.FC<ThemePositionProps> = ({ theme }) => {
  const { name, imagePath, altText } = theme;
  const [_, setCategoryFromTheme] = useRecoilState(categoryFromThemeState);
  // const router = useRouter();

  const handleThemeClick = (name: string) => {
    setCategoryFromTheme(name);
    // router.push("/shop");
  };
  return (
    <Link href="/shop" onClick={() => handleThemeClick(name)}>
      <div className="theme-container">
        <p>{name}</p>
        <Image
          className={name !== "People" ? "big-container" : "small-container"}
          src={imagePath}
          width={1000}
          height={1000}
          alt={altText}
        />
      </div>
    </Link>
  );
};

export default ThemePosition;
