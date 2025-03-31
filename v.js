const fs = require('fs');

// 匹配 CSS 的 [data-v-xxxxx] 和 HTML 中的 data-v-xxxxx=""
const cssRegex = /\[data-v-[^\]]*\]/g;
const htmlRegex = /\s*data-v-[a-f0-9]{8}=""/g;

// 获取文件路径参数
const filePath = process.argv[2];

if (!filePath) {
  console.error('请提供文件路径作为参数，例如：node remove.js <file-path>');
  process.exit(1);
}

// 检查文件是否存在
if (!fs.existsSync(filePath)) {
  console.error(`文件不存在: ${filePath}`);
  process.exit(1);
}

// 读取和处理文件
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`无法读取文件: ${filePath}`, err);
    return;
  }

  // 替换 CSS 和 HTML 中的 data-v 标识
  const newData = data.replace(cssRegex, '').replace(htmlRegex, '');

  // 写回文件
  fs.writeFile(filePath, newData, 'utf8', (err) => {
    if (err) {
      console.error(`无法写入文件: ${filePath}`, err);
    } else {
      console.log(`已处理文件: ${filePath}`);
    }
  });
});
