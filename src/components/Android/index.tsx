import { ipehonArr, SliderSettings, specialDownurl } from "@/data/android";
import { useState, useEffect, useRef } from "react";
import DownSpecial from "@/assets/img/down_special.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LeftArrow from "@/assets/img/android/left_arrow.png";
import RightArrow from "@/assets/img/android/right_arrow.png";

// 定义下载地址的类型
type DownloadUrl = {
  name: string;
  url: string;
};

const Android = () => {
  const [activeIphone, setActiveIphone] = useState(ipehonArr[0]);
  const [downloadUrls, setDownloadUrls] = useState<DownloadUrl[]>([]); // 显式指定类型
  const sliderRef = useRef<Slider | null>(null);

  // 在组件内获取 config.json 数据
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json", {
          cache: "no-store", // 避免缓存
        });
        const data = await response.json();
        const androidUrls = data.android_download_urls || [];
        setDownloadUrls(androidUrls); // 直接设置获取到的数据
      } catch (error) {
        console.error("Failed to fetch config.json:", error);
        // 失败时使用默认值
        setDownloadUrls([
          { name: "下载地址（一）", url: "/downloads/yw_250305.apk" },
          { name: "下载地址（二）", url: "/downloads/yw_250305.apk" },
          { name: "下载地址（三）", url: "/downloads/yw_250305.apk" },
        ]);
      }
    };

    fetchConfig();
  }, []);

  const handleClick = (url: string) => {
    window.location.href = url;
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  // 分割 downloadUrls
  const firstUrl = downloadUrls[0]?.url || specialDownurl; // 第一个 url，兜底使用 specialDownurl
  const remainingUrls = downloadUrls.slice(1); // 剩余 url

  return (
    <div
      className="w-full min-h-screen bg-white bg-[url('/bg.png')]"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
      }}
    >
      <div className="w-full p-2 h-16 text-gray-600 text-xl flex justify-center items-center">
        <span>APP下载</span>
      </div>
      <div className="flex justify-between items-center w-full px-4">
        {ipehonArr.map((item) => (
          <img
            key={item.name}
            src={activeIphone.name === item.name ? item.logo_active : item.logo}
            alt={item.name}
            className="w-16"
            onClick={() => setActiveIphone(item)}
          />
        ))}
      </div>
      <div className="p-2 my-1 relative">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-no-repeat bg-center bg-contain z-10 w-10 h-10"
          style={{
            backgroundImage: `url(${LeftArrow})`,
            width: "12px",
            height: "24px",
            padding: "0 10px",
          }}
        />
        <div className="w-[90%] mx-auto">
          <Slider {...SliderSettings} ref={sliderRef} className="h-full">
            {activeIphone.description_imgs.map((item, index) => (
              <div className="relative h-full bg-white rounded-lg" key={index}>
                <div className="absolute top-0 w-[50%] bg-purple-700 h-1 rounded-full left-1/2 transform -translate-x-1/2"></div>
                <div className="text-[1rem] leading-[4rem] font-['PingFang_SC'] font-medium text-[#424653] mx-auto mt-[0.66667rem] text-center">
                  安装说明
                </div>
                <div
                  className="text-[12px] font-bold leading-[1rem] font-[PingFang SC] font-medium text-[#7e88ad] leading-[0.48rem]"
                  style={{
                    padding: "0 12px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  {activeIphone.tips[index]}
                </div>
                <img
                  src={item}
                  alt=""
                  className="w-full h-full object-cover pl-2 pr-2 mb-2"
                />
              </div>
            ))}
          </Slider>
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-no-repeat bg-center bg-contain z-10 w-10 h-10"
          style={{
            backgroundImage: `url(${RightArrow})`,
            width: "12px",
            height: "24px",
            padding: "0 10px",
          }}
        />
      </div>
      {/* 使用第一个 url */}
      <div className="px-4 w-full mt-3" onClick={() => handleClick(firstUrl)}>
        <img
          src={DownSpecial}
          alt=""
          className="w-full object-contain filter brightness-110 contrast-125"
        />
      </div>
      {/* 使用剩余 url */}
      <div className="flex justify-around items-center space-x-2 p-2">
        {remainingUrls.map((item) => (
          <button
            key={item.name}
            className="btn"
            onClick={() => handleClick(item.url)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <span className="text-gray-400 my-2 text-xs">
          为了您的隐私安全，请勿与"国家反诈中心"APP同设备使用
        </span>
      </div>
    </div>
  );
};

export default Android;
