import "./ThemePosition.css";
import { ThemePositionObject } from "../../Themes";
import Image from "next/image";

interface ThemePositionProps {
  theme: ThemePositionObject;
}

const ThemePosition: React.FC<ThemePositionProps> = ({ theme }) => {
  const { name, imagePath, altText } = theme;
  return (
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
  );
};

export default ThemePosition;
