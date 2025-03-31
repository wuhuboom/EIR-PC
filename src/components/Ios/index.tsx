import { useState, useEffect } from "react";
import DownSpecial from "@/assets/img/down_special.png";
import { InstallDescArr, iosIcon } from "@/data/ios";
import Logo from "@/assets/img/ios/downLoadLogo.png";
import BigTitle from "@/assets/img/ios/bigTittle.png";
import SmallTitle from "@/assets/img/ios/smallTittle.png";
import IosDes from "@/assets/img/ios/iosdes.png";

// 定义下载地址的类型
type DownloadUrl = {
  name: string;
  url: string;
};

const Ios = () => {
  const [iosDownloadUrls, setIosDownloadUrls] = useState<DownloadUrl[]>([]); // 显式指定类型

  // 获取 config.json 数据
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json", {
          cache: "no-store", // 避免缓存，确保获取最新数据
        });
        const data = await response.json();
        const urls = data.ios_download_urls || [];
        setIosDownloadUrls(urls);
      } catch (error) {
        console.error("Failed to fetch config.json:", error);
        // 失败时设置默认值
        setIosDownloadUrls([
          { name: "下载地址1", url: "www.google.com" },
          { name: "下载地址2", url: "www.google.com" },
        ]);
      }
    };

    fetchConfig();
  }, []);

  const handleClick = (url: string) => {
    window.location.href = url;
  };

  // 获取第一个和第二个 url，带兜底值
  const firstUrl = iosDownloadUrls[0]?.url || "www.google.com"; // 第一个元素的 url
  const secondUrl = iosDownloadUrls[1]?.url || "www.google.com"; // 第二个元素的 url

  return (
    <div>
      <div className="bg-[url('/downBg.jpg')] bg-cover p-4 pt-0">
        <div
          className="w-full flex flex-col justify-center items-center space-y-4"
          onClick={() => handleClick(firstUrl)} // 使用第一个 url
        >
          <img src={DownSpecial} alt="" className="w-full" />
          <img src={Logo} alt="" className="size-24" />
          <img src={BigTitle} alt="" className="w-[80%]" />
          <img src={SmallTitle} alt="" className="w-[60%]" />
          <button className="btn" onClick={() => handleClick(secondUrl)}>
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
    </div>
  );
};

export default Ios;
