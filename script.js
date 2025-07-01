// ✅ セクション履歴をスタックで記録（前に戻る操作が可能に）
let currentSection = "mainMenu";
let sectionHistory = [currentSection];

// 🔄 セクションを表示切り替え（履歴をスタックに追加）
function showSection(id) {
  const current = document.getElementById(currentSection);
  const next = document.getElementById(id);

  if (current && current !== next) {
    current.style.display = "none";
    sectionHistory.push(id); // 履歴を追加
  }

  if (next) {
    next.style.display = "block";
    currentSection = id;
  }
}

// ⬅️ 戻るボタン（履歴から1つ前のセクションへ）
function goBackAuto() {
  if (sectionHistory.length > 1) {
    sectionHistory.pop(); // 今の画面を除外
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
    // ✅ DoctorQubeの予約リンクを埋め込む
    text = `🕒まだご予約がお済みでないようですね。<br>ご予約は <a href="https://ssc8.doctorqube.com/takeoka-clinic/" target="_blank">こちら</a> からどうぞ📅`;
  }

  document.getElementById("resultText").innerHTML = text;
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
  sectionHistory = [currentSection];

  document.getElementById("result").style.display = "none";

  const resultText = document.getElementById("resultText");
  while (resultText.firstChild) {
    resultText.removeChild(resultText.firstChild);
  }

  const input = document.getElementById("userInput");
  if (input) input.value = "";

  showSection("mainMenu");
}

// 🌐 外部リンクに遷移
function openLink(url) {
  window.location.href = url;
}
