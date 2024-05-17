import { Box } from "@mui/material";
import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import slide1 from "../assets/images/slide1.png";
import slide2 from "../assets/images/slide2.png";
import slide3 from "../assets/images/slide3.png";
import slide4 from "../assets/images/slide4.png";

export default function Slider() {
  return (
    <Splide
      aria-label="My Favorite Images"
      options={{
        type: "loop",
        autoplay: true,
        interval: 2000,
        arrows: false,
      }}
    >
      <SplideSlide>
        <Box>
          <img src={slide1} alt="slide 1" />
        </Box>
      </SplideSlide>
      <SplideSlide>
        <Box>
          <img src={slide2} alt="slide 2" />
        </Box>
      </SplideSlide>

      <SplideSlide>
        <Box>
          <img src={slide3} alt="slide 3" />
        </Box>
      </SplideSlide>
      <SplideSlide>
        <Box>
          <img src={slide4} alt="slide 4" />
        </Box>
      </SplideSlide>
    </Splide>
  );
}
