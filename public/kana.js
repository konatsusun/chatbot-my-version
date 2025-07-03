document.querySelectorAll('[data-kana]').forEach(button => {
  button.addEventListener('click', () => {
    const kana = button.dataset.kana;
    const sectionId = `kana-${kana}`;
    showSection(sectionId); // ← ここが表示を切り替える！
  });
});

