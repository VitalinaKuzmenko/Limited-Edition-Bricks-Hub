import Carousel from "./components/Carousel/Carousel";
import FeaturedItems from "./components/FeaturedItems/FeaturedItems";
import Themes from "./components/Themes/Themes";

const HomePage = () => {
  return (
    <div className="home-page">
      <Carousel />
      <FeaturedItems />
      <Themes />
    </div>
  );
};

export default HomePage;
