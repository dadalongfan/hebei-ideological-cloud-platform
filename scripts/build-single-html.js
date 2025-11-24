const fs = require('fs');
const path = require('path');

// 读取HTML文件并内联所有资源
async function createSingleHtml() {
  const outDir = path.join(__dirname, '../out');
  const indexPath = path.join(outDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('请先运行 npm run build 生成静态文件');
    return;
  }

  let htmlContent = fs.readFileSync(indexPath, 'utf8');

  // 读取所有CSS文件并内联
  const cssFiles = [];
  const cssRegex = /<link[^>]+href="([^"]+\.css)"[^>]*>/g;
  let match;

  while ((match = cssRegex.exec(htmlContent)) !== null) {
    const cssPath = path.join(outDir, match[1]);
    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      cssFiles.push(cssContent);
      // 移除原始link标签
      htmlContent = htmlContent.replace(match[0], '');
    }
  }

  // 读取所有JS文件并内联
  const jsFiles = [];
  const jsRegex = /<script[^>]+src="([^"]+\.js)"[^>]*><\/script>/g;

  while ((match = jsRegex.exec(htmlContent)) !== null) {
    const jsPath = path.join(outDir, match[1]);
    if (fs.existsSync(jsPath)) {
      const jsContent = fs.readFileSync(jsPath, 'utf8');
      jsFiles.push(jsContent);
      // 移除原始script标签
      htmlContent = htmlContent.replace(match[0], '');
    }
  }

  // 插入内联CSS
  if (cssFiles.length > 0) {
    const cssBlock = `<style>\n${cssFiles.join('\n')}\n</style>`;
    htmlContent = htmlContent.replace('</head>', `${cssBlock}\n</head>`);
  }

  // 插入内联JS
  if (jsFiles.length > 0) {
    const jsBlock = `<script>\n${jsFiles.join('\n')}\n</script>`;
    htmlContent = htmlContent.replace('</body>', `${jsBlock}\n</body>`);
  }

  // 处理base64图片（如果有的话）
  const imageRegex = /src="\/([^"]+\.(png|jpg|jpeg|gif|svg))"/g;
  htmlContent = htmlContent.replace(imageRegex, (match, imagePath) => {
    const fullImagePath = path.join(outDir, imagePath);
    if (fs.existsSync(fullImagePath)) {
      const imageBuffer = fs.readFileSync(fullImagePath);
      const base64Image = imageBuffer.toString('base64');
      const ext = path.extname(imagePath).slice(1);
      return `src="data:image/${ext};base64,${base64Image}"`;
    }
    return match;
  });

  // 生成单HTML文件
  const singleHtmlPath = path.join(outDir, 'single.html');
  fs.writeFileSync(singleHtmlPath, htmlContent);

  console.log('✅ 单HTML文件已生成:', singleHtmlPath);
  console.log('📊 文件大小:', (fs.statSync(singleHtmlPath).size / 1024 / 1024).toFixed(2), 'MB');
}

createSingleHtml().catch(console.error);