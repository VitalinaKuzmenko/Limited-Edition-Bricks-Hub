"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // this has to be after the css imports above to override the defaults
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

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
                <div key={index} className="slide-container">
                  <div className="carousel-cloud-container">
                    <Image
                      src={"/other/carousel_cloud_with_text.webp"}
                      width={1000}
                      height={1000}
                      alt="cloud"
                    />
                  </div>
                  <div className="slide-image-container">
                    <Image
                      src={imageLink}
                      width={2000}
                      height={2000}
                      alt={`Carousel image ${index}`}
                    />
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
                <div key={index} className="slide-container">
                  <div className="slide-image-container">
                    <Image
                      src={imageLink}
                      width={2000}
                      height={2000}
                      alt={`Carousel image ${index}`}
                    />
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
