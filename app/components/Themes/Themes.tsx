import "./Themes.css";
import ThemePosition from "./components/ThemePosition/ThemePosition";

export interface ThemePositionObject {
  name: string;
  imagePath: string;
  altText: string;
}

const Themes = () => {
  const themesPosition: ThemePositionObject[] = [
    {
      name: "Animals",
      imagePath: "/theme-images/theme-animals.webp",
      altText: "animals",
    },
    {
      name: "Fantasy",
      imagePath: "/theme-images/theme-fantasy.webp",
      altText: "fantasy",
    },
    {
      name: "Birds",
      imagePath: "/theme-images/theme-birds.webp",
      altText: "birds",
    },
    {
      name: "People",
      imagePath: "/theme-images/theme-people.webp",
      altText: "people",
    },
    {
      name: "Other",
      imagePath: "/theme-images/theme-other.webp",
      altText: "other",
    },
  ];
  return (
    <section className="themes-container">
      <div className="themes-flex-container">
        {themesPosition &&
          themesPosition.map((theme, index) => (
            <ThemePosition key={index} theme={theme} />
          ))}
      </div>
    </section>
  );
};

export default Themes;
