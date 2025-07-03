let currentSection = "mainMenu";
let sectionHistory = [currentSection];

function showSection(id) {
  const current = document.getElementById(currentSection);
  const next = document.getElementById(id);

  if (current && current !== next) {
    current.style.display = "none";
    sectionHistory.push(id);
  }

  if (next) {
    next.style.display = "block";
    currentSection = id;
  }

  // ← 戻るボタンの表示制御
  const backBtn = document.querySelector(".back-button");
  if (backBtn) {
    backBtn.style.display = (id === "mainMenu") ? "none" : "inline";
  }
}

function goBackAuto() {
  if (sectionHistory.length > 1) {
    sectionHistory.pop();
    const previousId = sectionHistory[sectionHistory.length - 1];
    showSection(previousId);
  }
}

function showResult(type) {
  const resultText = document.getElementById("resultText");
  let html = "";

  if (type === "yoyaku-ari") {
    html = `
      <p>
        ありがとうございます。<br>
        本日来院される目安については、<a href="https://ssc8.doctorqube.com/takeoka-clinic/" target="_blank" rel="noopener noreferrer">コチラ</a>から「院内でお待ちの方」「まだご来院されていない方」の番号を参考にお願いいたします。
      </p>
      <p>
        WEB問診がお済でない方は、<a href="https://symview.me/medical_interview_flows/takeoka-clinic/public/?url_kind=1" target="_blank" rel="noopener noreferrer">コチラ</a>から事前にお願いいたします。
      </p>
    `;
  } else if (type === "yoyaku-nashi") {
    html = `
      <p>
        当日ご来院の方のみ 
        <a href="https://ssc8.doctorqube.com/takeoka-clinic/" target="_blank" rel="noopener noreferrer">コチラ</a> 
        から順番予約を取ることができます。<br>
        午前 8:30～11:30　／　午後 14:30～17:30<br>
        （土曜日）午前 8:30～11:30　／　午後 14:30～16:30
      </p>
      <p>
        WEB問診も事前に済まされていると受付がスムーズです。
        <a href="https://symview.me/medical_interview_flows/takeoka-clinic/public/?url_kind=1" target="_blank" rel="noopener noreferrer">コチラ</a>
        からお願いいたします。
      </p>
    `;
  }

  resultText.innerHTML = html;
  showSection("result");
}

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
  document.getElementById("resultText").innerHTML = text;
  showSection("result");
}

function showSummary(type) {
  if (typeof biyouData === "undefined") return;

  const item = biyouData[type];
  if (!item) return;

  const resultArea = document.getElementById("resultText");
  resultArea.innerHTML = item.detail;
  showSection("result");
}

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

function openLink(url) {
  window.location.href = url;
}

// 初期ロード時に戻るボタンを非表示にする
document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.querySelector(".back-button");
  if (backBtn) backBtn.style.display = "none";
});
