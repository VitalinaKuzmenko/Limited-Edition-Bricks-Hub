import Carousel from "./components/Carousel/Carousel";
import FeaturedItems from "./components/FeaturedItems/FeaturedItems";
import Questions from "./components/Questions/Questions";
import Themes from "./components/Themes/Themes";

const HomePage = () => {
  return (
    <div className="home-page">
      <Carousel />
      <FeaturedItems />
      <Themes />
      <Questions />
    </div>
  );
};

export default HomePage;
