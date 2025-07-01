// ✅ 現在と1つ前のセクションを記憶
let currentSection = "mainMenu";
let previousSection = "";

// 🔄 セクションを表示切り替え（履歴を記憶しつつ表示を制御）
function showSection(id) {
  const allSections = [
    "mainMenu", "hifuka", "biyouhifuka", "biyougeka",
    "skincare", "others", "brandSelect", "purposeSelect", "result"
  ];

  const current = document.getElementById(currentSection);
  const next = document.getElementById(id);

  if (current && current !== next) {
    previousSection = currentSection;
    current.style.display = "none";
  }

  if (next) {
    next.style.display = "block";
    currentSection = id;
  }
}

// ⬅️ 戻るボタン（ひとつ前のセクションへ）
function goBackAuto() {
  if (previousSection && previousSection !== currentSection) {
    showSection(previousSection);
  }
}

// 🧠 自由入力チャット → 自動返信（AI風）
function handleInput() {
  const input = document.getElementById("userInput").value.toLowerCase();
  let response = "";

  if (input.includes("しみ") || input.includes("美白")) {
    response = "しみ・美白ケアについてはこちら✨\n→ https://example.com/shimi";
  } else if (input.includes("脱毛")) {
    response = "医療脱毛の詳細はこちらです🪒\n→ https://example.com/datsumou";
  } else if (input.includes("予約")) {
    response = "ご予約はこちらからどうぞ📅\n→ https://example.com/yoyaku";
  } else if (input.includes("しわ") || input.includes("たるみ")) {
    response = "たるみ・エイジングケアについてのご案内はこちらです💡\n→ https://example.com/shiwa";
  } else {
    response = "ご質問ありがとうございます！お電話または受付でご案内いたします📞";
  }

  document.getElementById("resultText").innerText = response;
  showSection("result");
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

// ✅ 追加：biyouData を元に要約→詳細を表示する構成（要 data_biyou.js の読み込み）
function showSummary(type) {
  const item = biyouData[type];
  if (!item) return;

  const resultArea = document.getElementById("resultText");
  resultArea.innerText = item.summary;

  const moreBtn = document.createElement("button");
  moreBtn.innerText = "もっと詳しく";
  moreBtn.onclick = () => showDetailExpanded(type);

  resultArea.appendChild(document.createElement("br"));
  resultArea.appendChild(moreBtn);

  showSection("result");
}

function showDetailExpanded(type) {
  const item = biyouData[type];
  if (!item) return;

  const resultArea = document.getElementById("resultText");
  resultArea.innerText = item.detail;

  const backBtn = document.createElement("button");
  backBtn.innerText = "← 要約にもどる";
  backBtn.onclick = () => showSummary(type);

  resultArea.appendChild(document.createElement("br"));
  resultArea.appendChild(backBtn);
}

// 🔁 最初に戻る（状態も初期化）
function resetChat() {
  currentSection = "mainMenu";
  previousSection = "";
  document.getElementById("resultText").innerText = "";
  const input = document.getElementById("userInput");
  if (input) input.value = "";
  showSection("mainMenu");
}

// 🌐 外部リンクに遷移
function openLink(url) {
  window.location.href = url;
}
