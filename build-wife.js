// index.html から奥様用 wife.html を生成する（manifest等をHTMLに固定で埋める）
// 使い方: node build-wife.js   ← index.html を変更したら毎回実行してからコミット
const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');
const reps = [
  ['<link rel="manifest" href="manifest.json">', '<link rel="manifest" href="manifest-wife.json">'],
  ['<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">', '<meta name="apple-mobile-web-app-status-bar-style" content="default">'],
  ['<meta name="apple-mobile-web-app-title" content="買い物・タスク">', '<meta name="apple-mobile-web-app-title" content="おかいものメモ">'],
  ['<meta name="theme-color" content="#121212">', '<meta name="theme-color" content="#fbf6ee">'],
];
for (const [a, b] of reps) {
  if (!h.includes(a)) { console.error('NOT FOUND:', a); process.exit(1); }
  h = h.replace(a, b);
}
// <title> も差し替え
h = h.replace(/<title>[^<]*<\/title>/, '<title>おかいものメモ</title>');
fs.writeFileSync('wife.html', h);
console.log('wife.html generated', h.length, 'bytes');
