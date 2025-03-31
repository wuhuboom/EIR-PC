import { useEffect, useState } from "react";
import Wx from "./components/Wx";
import Ios from "./components/Ios";
import Android from "./components/Android";
import downKefu from "@/assets/img/android/downKefu.png";

function App() {
  const [isWechat, setIsWechat] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [kefuUrl, setKefuUrl] = useState(""); // 存储动态获取的 kefu_url

  // 获取 config.json 数据
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json", {
          cache: "no-store", // 避免缓存，确保获取最新数据
        });
        const data = await response.json();
        setKefuUrl(data.kefu_url || ""); // 设置 kefu_url，兜底为空字符串
      } catch (error) {
        console.error("Failed to fetch config.json:", error);
        setKefuUrl(""); // 失败时设为空字符串
      }
    };

    fetchConfig();
  }, []); // 仅在组件挂载时执行

  // 检查用户代理
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsWechat(userAgent.includes("micromessenger"));
    setIsIos(/iphone|ipod|ipad/.test(userAgent));
  }, []);

  const handleClick = () => {
    if (kefuUrl) {
      window.location.href = kefuUrl;
    } else {
      console.warn("kefu_url 未加载成功");
    }
  };

  return (
    <>
      {isWechat ? <Wx /> : isIos ? <Ios /> : <Android />}

      {isWechat ? (
        <></>
      ) : (
        <div
          className="fixed right-0 top-44 pl-24 py-3 pr-6 min-h-16 bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${downKefu})` }}
          onClick={handleClick}
        ></div>
      )}
    </>
  );
}

export default App;
