export default {
  parseFourStarInput(input) {
    if (!input) return '';
    // 按 '/' 分割多组记录
    const records = input.split('/');

    // 解析每组记录
    const parsedData = records.map((record) => {
      record = record.trim(); // 去掉首尾空格

      // 按空格分割为名称和数据部分
      const parts = record.split(' ');
      if (parts.length < 3) {
        throw new Error('输入格式错误，无法解析');
      }

      const name = parts[0]; // 名称部分
      const positionsString = parts[1]; // 位置信息部分
      const multiplier = parseInt(parts[2], 10); // 倍数
      const quantity = parts.length > 3 ? parseInt(parts[3], 10) : 0; // 数量，默认 0
      const price = parts.length > 4 ? parseFloat(parts[4]) : 2; // 价格，默认 2

      // 按 '|' 拆分每个位，并进一步按 ',' 拆分
      const positions = positionsString
        .split('|')
        .map((pos) =>
          pos.split(',').map((value) => (isNaN(value) ? value : Number(value)))
        );
      // 移除排序逻辑以保留原始顺序
      // positions.forEach((item) => {
      //   item.sort((a, b) => a - b);
      // });

      return {
        name,
        positions,
        multiplier,
        quantity,
        price,
      };
    });

    return parsedData;
  },
  saveJson(responseData = {}, name = 'data') {
    // 创建一个Blob对象，用于保存JSON数据
    const blob = new Blob([JSON.stringify(responseData, null, 2)], {
      type: 'application/json',
    });

    // 创建一个下载链接
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${name}.json`;

    // 将链接添加到文档中，并模拟点击下载
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 清理下载链接
    document.body.removeChild(downloadLink);
  },
  detectDevice() {
    const isIos = /ios|iPhone|Macintosh|iPad|iPod/gi.test(navigator.userAgent);
    return isIos ? 1 : 0;
  },
  regUserName: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
  regPassword: /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{6,16}$/,
  regUserNameFn(rule, value, callback) {
    let lent = value.length;
    const hasChinese = /[\u4e00-\u9fa5]/.test(value);
    const chineseArr = value.match(/[\u4e00-\u9fa5]/g);
    if (hasChinese) {
      // 中文用户名，限制 2 到 8 个字符
      if ((lent < 2 || lent > 8) && chineseArr.length < 2) {
        callback(
          new Error('中文,数字,字母组成,用户名含中文至少2个中文最多8个字符')
        );
      } else {
        callback();
      }
    } else {
      // 非中文用户名，限制 5 到 16 个字母和数字
      if (!/^[a-zA-Z0-9]{5,16}$/.test(value)) {
        callback(new Error('数字,字母组成5-16个字符'));
      } else {
        callback();
      }
    }
  },
  toPercent(value1, value2, decimalPlaces = 0) {
    if (typeof value1 !== 'number' || typeof value2 !== 'number') {
      throw new Error('输入值必须是数字');
    }
    if (value2 === 0) {
      throw new Error('除数不能为零');
    }

    // 计算比例
    const ratio = value1 / value2;

    // 转换为百分比并保留指定小数位
    const percentage = (ratio * 100).toFixed(decimalPlaces);

    return `${percentage}%`;
  },
  drawLines({
    container,
    highlights,
    skipIndexes = [],
    color = 'blue',
    lineWidth = 2,
  }) {
    if (!container || !highlights || highlights.length === 0) {
      console.warn('Container or highlights are missing.');
      return;
    }

    // 创建 Canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    canvas.style.pointerEvents = 'none'; // 防止遮挡点击事件
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    // 获取每个元素的边界信息
    const points = Array.from(highlights).map((el) => {
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // 计算上下左右中点
      const top = {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top - containerRect.top,
      };
      const bottom = {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.bottom - containerRect.top,
      };
      const left = {
        x: rect.left - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
      const right = {
        x: rect.right - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };

      return { top, bottom, left, right };
    });

    // 绘制连接线
    ctx.beginPath();
    for (let i = 0; i < points.length - 1; i++) {
      if (skipIndexes.includes(i) || skipIndexes.includes(i + 1)) {
        continue; // 跳过需要跳过的点
      }

      const current = points[i];
      const next = points[i + 1];

      // 计算当前点和下一个点最短距离的连线
      const options = [
        { from: current.top, to: next.top },
        { from: current.top, to: next.bottom },
        { from: current.top, to: next.left },
        { from: current.top, to: next.right },
        { from: current.bottom, to: next.top },
        { from: current.bottom, to: next.bottom },
        { from: current.bottom, to: next.left },
        { from: current.bottom, to: next.right },
        { from: current.left, to: next.top },
        { from: current.left, to: next.bottom },
        { from: current.left, to: next.left },
        { from: current.left, to: next.right },
        { from: current.right, to: next.top },
        { from: current.right, to: next.bottom },
        { from: current.right, to: next.left },
        { from: current.right, to: next.right },
      ];

      // 找到最短路径
      const shortest = options.reduce(
        (min, option) => {
          const distance = Math.hypot(
            option.to.x - option.from.x,
            option.to.y - option.from.y
          );
          return distance < min.distance
            ? { distance, from: option.from, to: option.to }
            : min;
        },
        { distance: Infinity }
      );

      // 绘制线段
      ctx.moveTo(shortest.from.x, shortest.from.y);
      ctx.lineTo(shortest.to.x, shortest.to.y);
    }

    ctx.stroke();
  },
};
