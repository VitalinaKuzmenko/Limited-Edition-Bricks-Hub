import "./ThemePosition.css";
import { ThemePositionObject } from "../../Themes";

interface ThemePositionProps {
  theme: ThemePositionObject;
}

const ThemePosition: React.FC<ThemePositionProps> = ({ theme }) => {
  const { name, imagePath, altText } = theme;
  return (
    <div className="theme-container">
      <p>{name}</p>
      <img src={imagePath} alt={altText} />
    </div>
  );
};

export default ThemePosition;
