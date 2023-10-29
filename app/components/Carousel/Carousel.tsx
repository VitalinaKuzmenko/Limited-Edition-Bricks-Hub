"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // this has to be after the css imports above to override the defaults
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import Link from "next/link";

const Carousel = () => {
  const carouselImages: string[] = [
    "/carousel-images/lego-carousel_1.webp",
    "/carousel-images/lego-carousel_2.webp",
    "/carousel-images/lego-carousel_3.webp",
  ];

  const settings = {
    dots: true, // Display dots at the bottom indicating image count
    arrows: true, // Display navigation arrows
    autoplay: true, // Automatically transition to the next image
    autoplaySpeed: 4000, // Delay between image transitions (in milliseconds)
    nextArrow: <MdArrowForwardIos />,
    prevArrow: <MdArrowBackIos />,
  };
  return (
    <section className="home-hero-section">
      <Slider {...settings}>
        {carouselImages &&
          carouselImages.map((imageLink, index) => {
            if (index === 0) {
              return (
                <div className="slide-container">
                  <div className="carousel-cloud-container">
                    <img
                      src="/other/carousel_cloud_with_text.webp"
                      alt="cloud"
                    />
                  </div>
                  <div className="slide-image-container">
                    <img src={imageLink} alt={`Carousel image ${index}`} />
                  </div>
                  <Link href="/shop">
                    <button className="carousel-shop-button">
                      Pre-order now
                    </button>
                  </Link>
                </div>
              );
            } else {
              return (
                <div className="slide-container">
                  <div className="slide-image-container">
                    <img src={imageLink} alt={`Carousel image ${index}`} />
                  </div>
                </div>
              );
            }
          })}
      </Slider>
    </section>
  );
};

export default Carousel;
