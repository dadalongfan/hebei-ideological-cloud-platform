const fs = require('fs');
const path = require('path');

// 简单的HTML内联脚本
function createSimpleSingleHtml() {
  console.log('🚀 开始生成单HTML文件...');

  const outDir = path.join(__dirname, '../out');

  // 如果out目录不存在，先构建
  if (!fs.existsSync(outDir)) {
    console.log('📁 out目录不存在，请先运行 npm run build');
    return;
  }

  // 查找index.html文件
  const indexPath = path.join(outDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.log('❌ 未找到 index.html 文件');
    return;
  }

  console.log('📖 读取原始HTML文件...');
  let htmlContent = fs.readFileSync(indexPath, 'utf8');

  // 查找所有CSS和JS文件
  const cssRegex = /<link[^>]+href="([^"]+\.css)"[^>]*>/g;
  const jsRegex = /<script[^>]+src="([^"]+\.js)"[^>]*><\/script>/g;

  // 收集CSS文件
  const cssContents = [];
  let cssMatch;
  while ((cssMatch = cssRegex.exec(htmlContent)) !== null) {
    const cssPath = path.join(outDir, cssMatch[1]);
    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      cssContents.push(cssContent);
      // 移除原始link标签
      htmlContent = htmlContent.replace(cssMatch[0], '');
      console.log(`✅ 内联CSS文件: ${cssMatch[1]}`);
    }
  }

  // 收集JS文件
  const jsContents = [];
  let jsMatch;
  while ((jsMatch = jsRegex.exec(htmlContent)) !== null) {
    const jsPath = path.join(outDir, jsMatch[1]);
    if (fs.existsSync(jsPath)) {
      const jsContent = fs.readFileSync(jsPath, 'utf8');
      jsContents.push(jsContent);
      // 移除原始script标签
      htmlContent = htmlContent.replace(jsMatch[0], '');
      console.log(`✅ 内联JS文件: ${jsMatch[1]}`);
    }
  }

  // 插入内联CSS
  if (cssContents.length > 0) {
    const cssBlock = `<style>\n${cssContents.join('\n\n')}\n</style>`;
    htmlContent = htmlContent.replace('</head>', `${cssBlock}\n</head>`);
    console.log(`🎨 已内联 ${cssContents.length} 个CSS文件`);
  }

  // 插入内联JS
  if (jsContents.length > 0) {
    const jsBlock = `<script>\n${jsContents.join('\n\n')}\n</script>`;
    htmlContent = htmlContent.replace('</body>', `${jsBlock}\n</body>`);
    console.log(`📜 已内联 ${jsContents.length} 个JS文件`);
  }

  // 生成单HTML文件
  const singleHtmlPath = path.join(outDir, 'single.html');
  fs.writeFileSync(singleHtmlPath, htmlContent);

  const fileSize = (fs.statSync(singleHtmlPath).size / 1024 / 1024).toFixed(2);
  console.log(`🎉 单HTML文件生成成功!`);
  console.log(`📂 文件路径: ${singleHtmlPath}`);
  console.log(`📊 文件大小: ${fileSize} MB`);
}

createSimpleSingleHtml();