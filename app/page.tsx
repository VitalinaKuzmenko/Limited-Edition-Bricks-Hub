import Carousel from "./components/Carousel/Carousel";
import FeaturedItems from "./components/FeaturedItems/FeaturedItems";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PopupSignin from "./components/PopupSignin/PopupSignin";
import Questions from "./components/Questions/Questions";
import Themes from "./components/Themes/Themes";

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="home-page">
        <Carousel />
        <FeaturedItems />
        <Themes />
        <Questions />
        <PopupSignin />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
