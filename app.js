const express = require('express');
const path = require('path');
const app = express();

// テンプレートエンジンを EJS に設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静的ファイル（CSS・JS・画像など）を public フォルダから提供
app.use(express.static(path.join(__dirname, 'public')));

// "/" にアクセスされたときに index.ejs を表示
app.get('/', (req, res) => {
  res.render('index');
});

// ポート設定（Renderでも使えるように環境変数優先）
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 サーバーがポート${PORT}で起動しました`);
});
