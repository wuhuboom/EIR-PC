import Des1 from "@/assets/img/ios/des1.jpg";
import Des2 from "@/assets/img/ios/des2.png";
import Des31 from "@/assets/img/ios/des3.1.png";
import Des32 from "@/assets/img/ios/des3.2.png";
import Des33 from "@/assets/img/ios/des3.3.png";
import Des41 from "@/assets/img/ios/des4.1.png";
import Des42 from "@/assets/img/ios/des4.2.jpg";

export const iosIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABiCAMAAAD5lgRDAAABoVBMVEUAAACuX//ARv7CQ/6vXf+uX/+uX/+vXv+uX/+uX/+4Uf+uX/+uX//CQv3DQP3EQP2uX//EQP6uX/+vXv/IO/3BRP64Uf/JOf3DQf2uX/+uX//EQP27TP6uX//RLfywW//KOP2vXf+uX//QL/zPMPzFPv2uX//EP/2uX//FPv2uX//GPP3GPf3EQP2uX/+uX/+uX/+uX/+uX//OMf3DQP2uX//IOv20V//DQf6uX/+5UP6vXv+uX/+uX//CQ/3FPv22VP+uX//QMPy+SP7JOf3SK/yuX/+4Uf62VP7CQ/2uX/+uX/+uX//FPv26Tf7KN/3EQP3KOP3EQP3ARv68S/7SLfy1VP65T/7LNf28S/7BRP3BRP3DQf3RLvzKN/3KOP2zWP/QL/y/R/6zV//ARf7SLfzCQv2uX//QL/y0Vv69Sv7MNP29Sf66Tv63Uv7SLPzSLfy1VP6uX/+xW/+9Sv65UP63Uv6vXf+1VP6zV//CQ/2/R/66Tv67TP6yWf+0Vv/ARf7NM/3RLvzKOP3PMfzDQf3HO/3IOv3LNv3GPf3SLPw20M4UAAAAcnRSTlMA8g5sB/XmfU83Cvvex8CmjF5ZPSMeGBb27dLRwKuUVDQqBfXu1726uK2Rj315eHZwa19WTklGREIvJyIeFPnt5NjTzcnHwbSysrChnIJ9bFtLOxL4+Pf39fHt49/f3MC+vLu6qKSemIeGgoFzY1YyKx7KVZr3AAACvElEQVRo3t3V51vaUBTH8WNwMGSJIg6me6OAFMVR97Z27713qbUt3dTW1r+6SincHALykF9e1O/b5Plww03uoeOfFPLMz2PJF572/YMkIPny3n66c40405PK1AZbaf1M6l/XUOZWWyrbLZAZSgk9xJi+XbFRiNnYJprtBGlmV8wDMTe/yfJB0HaZOQcxn8gXWg9BL/4S64OY9u9i1wnSDRmKeXjjnmhuEaQTe0IhwrT5M9uUj0D1Z82eMwRDf/+t4xThWj8UXT3ln0xj9r6uuY4Wi3VgVMpuVJd1PZwbSo3hfqulJX3P6RLEBp35R66pHntD/o/qulzCPVf7uMvJ+8m8LDqneKjqzMm8zOEi5sBkUqnJZZ3PmB57dqsrqdhyQ6FJaUkW7nKL2XylyHWX8mth/6quuwqm7oPabkNMXiszn24jmnXKDqFtTI8F03gJQp7dEFfa+gnRrOxdffYRkXybpAtvAC2SrA2EyV+naYC5w+ZBdAfQc5K3BDAXmVl5/p36XjE0CjCXiPXoi/q8HL3zXn0SR6fVmzeJ91l9NcR7rT6vFqhDC9SvBTpOvLfq82uBGoiXUJ9eC7RGC7RbC7SqkqMmgBrhaC0AXeVoNwA1GRlqSwDqZWhdAtGYHB2HoM35O4X/ANYSkOpkqBdB8hNAgpB8rd0o9UEghw4mUNVG2EuFacUhZdSFBLDhDKoHmqY4ZWpCcPwjCEI8fl5X4Raaq1eDhZIThA7yoxo/AStNCHREgwHQSbxm9egE8QyQXeLZMGMKO6ziiqgfcjrxhlSYbipUZ9lmU6AgGqguF41R4ZwV5ZlRKpYB8nnyImWYQ3RUfoX/9eRqUO8wGBzeGrfCVT0d3UQn29heg3ic6d1s1seopIarhUUGjcSKreWmj8kWoBIz1rmrKw5qtjmUH2Zk5fB608JQnP7j/gCJWZJvwuQU9wAAAABJRU5ErkJggg==";

export type TInstallDescript = {
  desc: string;
  imgs: string[];
};

export const InstallDescArr: TInstallDescript[] = [
  {
    desc: " 1. 点击上方下载APP按钮，然后点击提示弹窗的安装按钮，即可开始下载并安装问鼎娱乐APP。 ",
    imgs: [Des1],
  },
  {
    desc: "2. 回到手机桌面打开问鼎娱乐后，如若出现以下提示：",
    imgs: [Des2],
  },
  {
    desc: "3. 则打开手机设置功能，依次进入：通用-设备管理，选择 相应的企业级APP。",
    imgs: [Des31, Des32, Des33],
  },
  {
    desc: " 4. 点击进入相应的企业级应用后，点击信任此应用，再在接 下来弹窗点击信任，返回桌面后即可正常使用APP。 ",
    imgs: [Des41, Des42],
  },
];

// 防拦截下载链接
export const specialDownurl = "/downloads/app-android.apk";

// 下载连接
export const downurl = "/downloads/app-android.apk";
