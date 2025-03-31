import Tab1 from "@/assets/img/android/tab1.png";
import Tab1_A from "@/assets/img/android/tab1_a.png";
import Hua1 from "@/assets/img/android/hua1.png";
import Hua2 from "@/assets/img/android/hua2.png";
import Hua3 from "@/assets/img/android/hua3.png";
import Hua4 from "@/assets/img/android/hua4.png";

import Tab2 from "@/assets/img/android/tab2.png";
import Tab2_A from "@/assets/img/android/tab2_a.png";
import Mi1 from "@/assets/img/android/mi1.png";
import Mi2 from "@/assets/img/android/mi2.png";
import Mi3 from "@/assets/img/android/mi3.png";
import Mi4 from "@/assets/img/android/mi4.png";

import Tab3 from "@/assets/img/android/tab3.png";
import Tab3_A from "@/assets/img/android/tab3_a.png";
import Vivo1 from "@/assets/img/android/vivo1.png";
import Vivo2 from "@/assets/img/android/vivo2.png";
import Vivo3 from "@/assets/img/android/vivo3.png";
import Vivo4 from "@/assets/img/android/vivo4.png";

import Tab4 from "@/assets/img/android/tab4.png";
import Tab4_A from "@/assets/img/android/tab4_a.png";
import Oppo1 from "@/assets/img/android/oppo1.png";
import Oppo2 from "@/assets/img/android/oppo2.png";
import Oppo3 from "@/assets/img/android/oppo3.png";
import Oppo4 from "@/assets/img/android/oppo4.png";

export type TIphoneItem = {
  name: string;
  logo: string;
  logo_active: string;
  tips: string[];
  description_imgs: string[];
};

export const ipehonArr: TIphoneItem[] = [
  {
    name: "华为",
    logo: Tab1,
    logo_active: Tab1_A,
    tips: [
      " 1. 下载APK包后，安装时若有风险提示请忽略提示， 选择“继续安装”；",
      " 2. 若APK包不可安装，则前往系统自带“安全管家”， 点击“病毒查杀”。 ",
      " 3. 找到对应应用，点击该应用。 ",
      " 4. 并对该应用进行“解除管控”，之后再重新安装即可。 ",
    ],
    description_imgs: [Hua1, Hua2, Hua3, Hua4],
  },
  {
    name: "小米",
    logo: Tab2,
    logo_active: Tab2_A,
    tips: [
      " 1. 下载APK包后，安装时若有风险提示请忽略提示， 选择“继续安装”；",
      " 2. 进入“病毒扫描”。 ",
      " 3. 点击该APK应用名。 ",
      " 4. 点击忽略，再回去重新安装APK包即可。 ",
    ],
    description_imgs: [Mi1, Mi2, Mi3, Mi4],
  },
  {
    name: "Vivo",
    logo: Tab3,
    logo_active: Tab3_A,
    tips: [
      " 1. 若APK包不可安装，则先到找到系统的“i管家” 并点击进入； ",
      " 2. 进入“病毒扫描”，再点击该APK应用名。 ",
      " 3. 进入详情后点击右上角，再点击“加入白名单”。 ",
      " 4. 点击确定，再回去重新安装APK包即可。 ",
    ],
    description_imgs: [Vivo1, Vivo2, Vivo3, Vivo4],
  },
  {
    name: "OPPO",
    logo: Tab4,
    logo_active: Tab4_A,
    tips: [
      " 1. 安装应用前先找到手机系统的“手机管家”； ",
      " 2. 找到“病毒扫描”入口。 ",
      " 3. 找到下载的安卓包，点击该项。 ",
      " 4. 点击“加入白名单”后，便可正常安装。 ",
    ],
    description_imgs: [Oppo1, Oppo2, Oppo3, Oppo4],
  },
];

export const SliderSettings = {
  dots: true,
  infinite: true,
  arrows: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export type TDownurl = {
  name: string;
  url: string;
};

// 初始化为空数组
export const DownurlArr: TDownurl[] = [];

// 默认结构
const defaultDownurlArr: TDownurl[] = [];

// 自执行函数动态填充 DownurlArr
(async () => {
  try {
    const response = await fetch("/config.json", {
      cache: "no-store", // 避免缓存，确保获取最新数据
    });
    const data = await response.json();
    // 获取 android_download_urls
    const androidUrls = data.android_download_urls;

    // 清空并填充 DownurlArr
    DownurlArr.length = 0;
    androidUrls.forEach((item: { name: string; url: string }) => {
      DownurlArr.push({
        name: item.name,
        url: item.url,
      });
    });
  } catch (error) {
    console.error("Failed to fetch config.json:", error);
    // 失败时使用默认值填充
    DownurlArr.length = 0;
    DownurlArr.push(...defaultDownurlArr);
  }
})();

// 防拦截下载地址
export const specialDownurl = "/downloads/yw_250305.apk";
