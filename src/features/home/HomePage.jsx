import React from "react";
import MainInputBox from "../../components/home/MainInputBox";
import Banner1 from "../../components/home/Banner1";
import ImageQRCodeBanner from "../../components/home/ImageQRCodeBanner";
import HelpBoxes from "../../components/home/HelpBoxes";
import QatarVisitBanner from "../../components/home/QatarVisitBanner";
import ManSeeBanner from "../../components/home/ManSeeBanner";

const HomePage = () => {
  return (
    <div>
      <MainInputBox />
      <Banner1 />
      <ImageQRCodeBanner />
      <HelpBoxes />
      <QatarVisitBanner />
      <ManSeeBanner />
    </div>
  );
};

export default HomePage;
