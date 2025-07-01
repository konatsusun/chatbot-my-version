// ✅ セクション履歴をスタックで記録（前に戻る操作が可能に）
let currentSection = "mainMenu";
let sectionHistory = [currentSection];

// 🔄 セクションを表示切り替え（履歴をスタックに追加）
function showSection(id) {
  const current = document.getElementById(currentSection);
  const next = document.getElementById(id);

  if (current && current !== next) {
    current.style.display = "none";

    // ✅ 現在のセクションを履歴として積む
    sectionHistory.push(id);
  }

  if (next) {
    next.style.display = "block";
    currentSection = id;
  }
}

// ⬅️ 戻るボタン（履歴から1つ前のセクションへ）
function goBackAuto() {
  if (sectionHistory.length > 1) {
    // 現在のセクションをpopし、前のセクションを表示
    sectionHistory.pop(); // 今のページを除外
    const previousId = sectionHistory[sectionHistory.length - 1];
    showSection(previousId);
  }
}

// 🩺 順番予約チェック → 結果表示へ
function showResult(type) {
  let text = "";
  if (type === "yoyaku-ari") {
    text = "📋順番確認ページへご案内します。\n来院時間をご確認ください。";
  } else {
    text = "🕒予約ページへご案内します。\n受付時間内に窓口へお越しください。";
  }

  document.getElementById("resultText").innerText = text;
  showSection("result");
}

// 📋 固定選択肢からの案内（旧タイプ）
function showDetail(type) {
  const responses = {
    spots: "【しみ・くすみ】フォトフェイシャルや美白成分の導入がおすすめです。",
    pores: "【毛穴ケア】ピーリングやビタミンCイオン導入でつるんと肌に！",
    mole: "【ほくろ除去】レーザーまたは切除による対応が可能です。",
    scar: "【キズあと】形成処置やフラクショナルレーザーをご案内します。",
    serum1: "【保湿美容液】肌のバリア機能をサポートする人気アイテム✨",
    uv1: "【日焼け止め】SPF50+、PA++++でしっかりUVカット！",
    qa: "よくあるご質問は、公式サイトFAQをご覧ください♪",
    access: "アクセス・診療時間は医院案内ページへどうぞ🚗"
  };

  const text = responses[type] || "ご案内情報が見つかりませんでした。";
  document.getElementById("resultText").innerText = text;
  showSection("result");
}

// ✅ biyouData から詳細を直接表示（※要約は表示しない）
function showSummary(type) {
  const item = biyouData[type];
  if (!item) return;

  const resultArea = document.getElementById("resultText");
  resultArea.innerText = item.detail;

  showSection("result");
}

// 🔁 最初に戻る（状態も初期化）※ resultText 内のボタンもクリア！
function resetChat() {
  currentSection = "mainMenu";
  sectionHistory = [currentSection]; // ✅ 履歴を初期化

  // 結果セクションを非表示に
  document.getElementById("result").style.display = "none";

  // テキストと子要素すべてクリア
  const resultText = document.getElementById("resultText");
  while (resultText.firstChild) {
    resultText.removeChild(resultText.firstChild);
  }

  // 入力欄リセット（もし使っている場合）
  const input = document.getElementById("userInput");
  if (input) input.value = "";

  // 最初のセクションを表示
  showSection("mainMenu");
}

// 🌐 外部リンクに遷移
function openLink(url) {
  window.location.href = url;
}
