import { PropsWithChildren, useEffect, useRef } from "react";
import styles from "./Carousel.module.css";
import "swiper/css";
import Swiper from "swiper";
import "./Carousel.css";

const Carousel = ({ children }: PropsWithChildren) => {
  const ref = useRef(null);

  useEffect(() => {
    const swiperEl = new Swiper(".swiper", {
      slidesPerView: "auto",
      centeredSlides:true,
    });
    swiperEl.init()

  }, []);
  return (
    <div ref={ref} className={`swiper ${styles.swiperFix}`}>
      <div className="swiper-wrapper">{children}</div>
    </div>
  );
};

export const CarouselItem = ({ children }: PropsWithChildren) => {
  return (
    <div className="swiper-slide" style={{ width: "80%", overflow: "visible"}}>
      <div className={styles.slideContainer}>{children}</div>
    </div>
  );
};
export default Carousel;