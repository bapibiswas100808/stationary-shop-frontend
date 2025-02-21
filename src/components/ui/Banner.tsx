import React from "react";
import bannerDefaultImage from "../../assets/images/slideshow-pattern.webp";
import bannerImage from "../../assets/images/bannerImg.webp";
import { Button } from "antd";

const Banner = () => {
  const contentStyle: React.CSSProperties = {
    backgroundColor: "rgb(245, 230, 224)",
    backgroundImage: `url(${bannerDefaultImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div className="h-[300px] md:h-[400px] lg:h-[80vh]" style={contentStyle}>
      <div className="flex justify-center items-center h-full gap-20">
        <div className="flex flex-col items-center justify-center lg:justify-start lg:items-start">
          <span className="text-red-400 text-center text-lg">New Trending</span>
          <h3 className="text-xl md:text-5xl font-bold text-black mb-10">
            Creating Passion For Your Style
          </h3>
          <Button style={{ marginTop: "30px", fontWeight: "600" }}>
            See All Products
          </Button>
        </div>
        <div className="hidden lg:block h-full overflow-hidden">
          <img className="bg-cover bg-center" src={bannerImage} alt="Banner" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
