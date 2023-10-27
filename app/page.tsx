import Carousel from "./components/Carousel/Carousel";
import FeaturedItems from "./components/FeaturedItems/FeaturedItems";

const HomePage = () => {
  return (
    <div className="home-page">
      <Carousel />
      <FeaturedItems />
    </div>
  );
};

export default HomePage;
