import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Carousel.module.css";
import "swiper/css";
import Swiper from "swiper";
import "./Carousel.css";

export const CarouselContext = createContext(0);

const Carousel = ({ children }: PropsWithChildren) => {
  const ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const swiperEl = new Swiper(".swiper", {
      slidesPerView: "auto",
      centeredSlides: true,
    });
    swiperEl.init();
    const changeSlideIndex = () => (
      setActiveSlide(swiperEl.activeIndex), console.log("change")
    );
    setTimeout(() => {
      swiperEl.on("slideChange", changeSlideIndex);
    }, 200);
    return () => swiperEl.off("slideChange", changeSlideIndex);
  }, []);
  return (
    <div ref={ref} className={`swiper ${styles.swiperFix}`}>
      <div className="swiper-wrapper">
        <CarouselContext.Provider value={activeSlide}>
          {children}
        </CarouselContext.Provider>
      </div>
    </div>
  );
};

export const CarouselItem = ({ children }: PropsWithChildren) => {
  return (
    <div className="swiper-slide" style={{ width: "80%", overflow: "visible" }}>
      <div className={styles.slideContainer}>{children}</div>
    </div>
  );
};
export default Carousel;
