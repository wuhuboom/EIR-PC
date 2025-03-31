import { useState, useEffect } from "react";
import DownSpecial from "@/assets/img/down_special.png";
import { InstallDescArr, iosIcon } from "@/data/ios";
import Logo from "@/assets/img/ios/downLoadLogo.png";
import BigTitle from "@/assets/img/ios/bigTittle.png";
import SmallTitle from "@/assets/img/ios/smallTittle.png";
import IosDes from "@/assets/img/ios/iosdes.png";
import mrl from "@/assets/img/ios/mrl.png";

type DownloadUrl = {
  name: string;
  url: string;
};

const Ios = () => {
  const [iosDownloadUrls, setIosDownloadUrls] = useState<DownloadUrl[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSafariAlert, setShowSafariAlert] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json", {
          cache: "no-store",
        });
        const data = await response.json();
        const urls = data.ios_download_urls || [];
        setIosDownloadUrls(urls);
      } catch (error) {
        console.error("Failed to fetch config.json:", error);
        setIosDownloadUrls([
          { name: "点击下载", url: "https://www.google.com" },
          { name: "主线下载", url: "https://www.google.com" },
          { name: "下载地址1", url: "https://www.google.com" },
          { name: "下载地址2", url: "https://www.google.com" },
        ]);
      }
    };

    fetchConfig();
  }, []);

  // 改进的Safari检测函数
  const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafariBrowser =
      ua.includes("safari") &&
      !ua.includes("crios") && // 排除 iOS 版 Chrome
      !ua.includes("fxios") && // 排除 iOS 版 Firefox
      !ua.includes("opr") && // 排除 Opera
      !ua.includes("edg") && // 排除 Edge
      !ua.includes("ucbrowser") && // 排除 UC 浏览器
      !ua.includes("telegram"); // 排除 Telegram 内置浏览器
    const isAppleDevice =
      navigator.platform.startsWith("Mac") || // macOS
      /iphone|ipad|ipod/.test(ua); // iOS 设备
    return isSafariBrowser && isAppleDevice && ua.includes("version/");
  };

  const handleClick = (url: string) => {
    console.log("User Agent:", navigator.userAgent);
    console.log("Is Safari:", isSafari());
    if (isSafari()) {
      window.location.href = url;
    } else {
      setShowSafariAlert(true);
      setIsModalOpen(false); // 同时关闭下载模态框
    }
  };

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowSafariAlert(false);
  };

  const firstUrl = iosDownloadUrls[0]?.url || "https://www.google.com";
  const secondUrl = iosDownloadUrls[1]?.url || "https://www.google.com";
  const thirdUrl = iosDownloadUrls[2]?.url || "https://www.google.com";
  const fordUrl = iosDownloadUrls[3]?.url || "https://www.google.com";

  return (
    <div className="relative">
      <div className="bg-[url('/downBg.jpg')] bg-cover p-4 pt-0">
        <div
          className="w-full flex flex-col justify-center items-center space-y-4"
          onClick={() => handleClick(firstUrl)}
        >
          <img src={DownSpecial} alt="" className="w-full" />
          <img src={Logo} alt="" className="size-24" />
          <img src={BigTitle} alt="" className="w-[80%]" />
          <img src={SmallTitle} alt="" className="w-[60%]" />
          <button className="btn" onClick={openModal}>
            APP下载
          </button>
          <img src={iosIcon} alt="" className="w-8" />
          <img src={IosDes} alt="" className="w-[60%]" />
        </div>
      </div>
      <div className="p-4 flex flex-col space-y-4">
        {InstallDescArr.map((item, index) => (
          <div key={index}>
            <span className="text-xs">{item.desc}</span>
            {item.imgs.map((imgUrl, i) => (
              <img key={i} src={imgUrl} alt="" className="my-2" />
            ))}
          </div>
        ))}
      </div>

      {/* 下载模态框 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white w-[90%] h-auto max-h-[80%] rounded-[1.2rem] flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-[#a134f1] scrollbar-track-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="topArea flex flex-col items-center pb-6">
              <div className="line w-[10.96rem] h-[0.4rem] bg-[#a134f1]"></div>
              <div className="tittle text-[1.28rem] font-medium text-[#0b1028] mt-[1.6rem] mb-[2rem]">
                下载路线
              </div>
              <div
                className="item w-[17.2rem] h-[3.6rem] leading-[3.6rem] bg-[#f15257] rounded-[1.84rem] text-center text-[1.28rem] font-medium text-white mt-[0.96rem] cursor-pointer"
                onClick={() => handleClick(secondUrl)}
              >
                主线下载（推荐）
              </div>
              <div
                className="item w-[17.2rem] h-[3.6rem] leading-[3.6rem] bg-[#f15257] rounded-[1.84rem] text-center text-[1.28rem] font-medium text-white mt-[0.96rem] cursor-pointer"
                onClick={() => handleClick(thirdUrl)}
              >
                备用下载（一）
              </div>
              <div
                className="item w-[17.2rem] h-[3.6rem] leading-[3.6rem] bg-[#f15257] rounded-[1.84rem] text-center text-[1.28rem] font-medium text-white mt-[0.96rem] cursor-pointer"
                onClick={() => handleClick(fordUrl)}
              >
                备用下载（二）
              </div>
            </div>
            <div className="tipsArea flex items-center justify-center pb-4">
              <img
                src="https://wswds3.shranshen.com/h5_static/wd/img/ICON3.fafe1f2a.png"
                alt=""
                className="w-[2rem] h-[2rem]"
              />
              <span className="text-[.75rem] text-[#0b1028]">
                必须使用【
                <span className="text-blue-500 font-bold">safari浏览器</span>
                】打开并进行下载
              </span>
            </div>
            <div className="cancle h-[4.4rem] leading-[4.4rem] border-t border-[#e1e1e1] text-center text-[1.28rem] font-bold text-[#0b1028] cursor-pointer bg-[#eef0f8]">
              <button onClick={closeModal}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* 非Safari浏览器提示改为图片并添加遮罩层 */}
      {showSafariAlert && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-70 z-40"
          onClick={() => setShowSafariAlert(false)}
        >
          <div className="fixed top-0 right-0 z-50 p-4  h-[200px] w-[80%]">
            <img
              src={mrl}
              alt="Safari提示"
              className="w-[20rem] h-auto cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // 阻止事件冒泡
                setShowSafariAlert(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Ios;
