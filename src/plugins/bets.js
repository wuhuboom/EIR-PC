const err1 = '选择号码错误，请重新确认号码';
//const err2 = "您好，为了防止恶意套取充值赠送，每个位置最多购买8个号码";
export default {
  //三星直选：直选复式
  chose1(baiWei, shiWei, geWei) {
    // 确保每个位的数字是数组
    if (
      !Array.isArray(baiWei) ||
      !Array.isArray(shiWei) ||
      !Array.isArray(geWei)
    ) {
      return {
        err: err1,
      };
    }
    // 确保每个位至少有一个号码
    if (baiWei.length === 0 || shiWei.length === 0 || geWei.length === 0) {
      return {
        err: err1,
      };
    }
    // 计算总注数
    const totalBets = baiWei.length * shiWei.length * geWei.length;
    const lengths = [baiWei.length, shiWei.length, geWei.length];
    const count8 = lengths.filter((len) => len === 8).length;

    // 统一条件判断
    if (lengths.some((len) => len > 8) || count8 >= 3) {
      return {
        err: lengths.some((len) => len > 8)
          ? '您好，为了防止恶意套取充值赠送，每个位置最多购买8个号码'
          : '三个位置不能同时选择8个号码，至少有一个位置少于8个号码',
        totalBets: totalBets,
      };
    }

    return totalBets;
  },
  //三星直选：直选和值
  chose2(valueArray) {
    if (valueArray.length === 0) {
      return {
        err: err1,
      };
    }
    // 每个和值对应的注数（键值对）
    const sumToCombination = {
      0: 1,
      1: 3,
      2: 6,
      3: 10,
      4: 15,
      5: 21,
      6: 28,
      7: 36,
      8: 45,
      9: 55,
      10: 63,
      11: 69,
      12: 73,
      13: 75,
      14: 75,
      15: 73,
      16: 69,
      17: 63,
      18: 55,
      19: 45,
      20: 36,
      21: 28,
      22: 21,
      23: 15,
      24: 10,
      25: 6,
      26: 3,
      27: 1,
    };

    // 计算总注数
    let totalBets = 0;
    valueArray.forEach((value) => {
      if (sumToCombination[value] !== undefined) {
        totalBets += sumToCombination[value];
      } else {
        console.error(`Invalid value: ${value}`);
      }
    });
    //选择号码错误，注数不能超过：425注
    if (totalBets > 425) {
      return {
        err: '选择号码错误，注数不能超过：425注',
        totalBets: totalBets,
      };
    }
    return totalBets;
  },
  //三星组选：组三复式
  chose3(numbers) {
    // 至少需要选择两个数字
    if (numbers.length < 2) {
      return {
        err: err1,
      };
    }

    // 计算注数：n * (n - 1)
    const n = numbers.length;
    const totalBets = n * (n - 1);

    return totalBets;
  },
  //三星组选：组三胆拖
  chose4(danMa, tuoMa) {
    if (!danMa.length) {
      return {
        err: err1,
      };
    }

    // 检查拖码中是否包含胆码
    if (!tuoMa.length) {
      return {
        err: err1,
      };
    }

    // 计算注数：拖码个数 * 2
    const totalBets = tuoMa.length * 2;

    return totalBets;
  },
  //三星组选：组六复式
  chose5(numbers) {
    // 至少需要选择 3 个数字
    if (numbers.length < 3) {
      return {
        err: err1,
      };
    }

    // 计算注数：C(n, 3)
    const n = numbers.length;
    const totalBets = (n * (n - 1) * (n - 2)) / 6;
    if (totalBets > 56) {
      return {
        err: '选择号码错误，注数不能超过：56注',
        totalBets: totalBets,
      };
    }
    return totalBets;
  },
  //三星组选：组六胆拖
  chose6(danMa, tuoMa) {
    function factorial(num) {
      if (num <= 1) return 1;
      return num * factorial(num - 1);
    }
    if (!danMa.length || !tuoMa.length) {
      return {
        err: err1,
      };
    }
    if ([...danMa, ...tuoMa].length < 3) {
      return {
        err: err1,
      };
    }
    // if (danMa.length < 2 || tuoMa.length < 2) {
    //   return {
    //     err: err1,
    //   };
    // }

    // 计算注数：C(拖码个数, 3 - 胆码个数)
    const r = 3 - danMa.length; // 需要从拖码中选的数字数量
    const n = tuoMa.length; // 拖码的数字个数
    const totalBets = factorial(n) / (factorial(r) * factorial(n - r));

    return totalBets;
  },
  //三星组选:组选和值
  chose7(sumArray) {
    // 组选和值与注数对应关系
    const sumToBets = {
      1: 1,
      2: 2,
      3: 2,
      4: 4,
      5: 5,
      6: 6,
      7: 8,
      8: 10,
      9: 11,
      10: 13,
      11: 14,
      12: 14,
      13: 15,
      14: 15,
      15: 14,
      16: 14,
      17: 13,
      18: 11,
      19: 10,
      20: 8,
      21: 6,
      22: 5,
      23: 4,
      24: 2,
      25: 2,
      26: 1,
    };

    // 确保输入为数组
    if (!sumArray.length) {
      return {
        err: err1,
      };
    }

    // 校验和值范围并计算总注数
    let totalBets = 0;

    sumArray.forEach((sum) => {
      if (typeof sum !== 'number' || isNaN(sum)) {
        throw new Error(`和值必须是数字，非法输入: ${sum}`);
      }
      if (sum < 1 || sum > 26) {
        throw new Error(`和值必须在 1 到 26 之间，非法和值: ${sum}`);
      }
      totalBets += sumToBets[sum] || 0;
    });
    if (totalBets > 90) {
      return {
        err: '选择号码错误，注数不能超过：90注',
        totalBets,
      };
    }
    return totalBets;
  },
  // 三星直选：直选单式
  chose8(qianWei, baiWei, shiWei, geWei) {
    // 验证输入是否有效
    if (
      !Array.isArray(geWei) ||
      !Array.isArray(shiWei) ||
      !Array.isArray(baiWei) ||
      !Array.isArray(qianWei)
    ) {
      return {
        err: err1,
      };
    }
    if (
      geWei.length === 0 ||
      shiWei.length === 0 ||
      baiWei.length === 0 ||
      qianWei.length === 0
    ) {
      return {
        err: err1,
      };
    }
    // 计算注数
    const betCount =
      geWei.length * shiWei.length * baiWei.length * qianWei.length;

    return betCount;
  },
  chose9(selection) {
    if (selection.length < 3 || selection.length > 8) {
      return {
        err: '从0-9中任意选择3个或3个以上号码，最多8个号码。',
      };
    }
    // 计算阶乘
    function factorial(n) {
      return n <= 1 ? 1 : n * factorial(n - 1);
    }

    // 计算排列数 P(n, r) = n! / (n - r)!
    function permutation(n, r) {
      if (n < r) return 0; // 如果选择的数字少于r，返回0
      return factorial(n) / factorial(n - r);
    }
    const n = selection.length; // 已选数字个数
    if (n < 3) return 0; // 至少需要3个数字
    return permutation(n, 3); // 计算排列数
  },
  chose10(selection) {
    if (!selection.length) {
      return {
        err: '从0-9中至少选一个号码。',
      };
    }
    return selection.length;
  },
  chose11(selection) {
    const n = selection.length;
    if (n < 2) {
      return {
        err: '从0-9中至少选两个个号码。',
      };
    }
    return (n * (n - 1)) / 2;
  },
  chose12(baiWei, shiWei) {
    if (baiWei.length === 0 || shiWei.length === 0) {
      return {
        err: '每位至少选一个号码',
      };
    }
    const totalBets = baiWei.length * shiWei.length;
    return totalBets;
  },
  chose13(selection) {
    if (selection.length < 2) {
      return {
        err: '至少选两个号码。',
      };
    }
    return selection.length;
  },
  chose14(danMa, tuoMa) {
    if (!(danMa.length && tuoMa.length >= 2)) {
      return {
        err: '胆至少选一个，拖至少选两个',
      };
    }
    // 计算注数：拖码个数 * 2
    const totalBets = tuoMa.length * 2;

    return totalBets;
  },
  chose15(selection) {
    if (!selection.length) {
      return {
        err: '至少选1个号码。',
      };
    }
    return selection.length;
  },
  chose16(selection) {
    if (selection.length < 4) {
      return {
        err: '至少选4个号码。',
      };
    }
    return selection.length;
  },
};
