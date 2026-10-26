(function () {
  const CFG = { autoAnswer: true, autoNext: true, nextDelayMs: 3000 };
  chrome.storage.sync.get(['lmsCfg'], function (s) { 
    if (s.lmsCfg) Object.assign(CFG, s.lmsCfg); 
  });

  async function solvePage() {
    // 1. Tìm tất cả câu hỏi trên trang hiện tại (Dựa theo HTML LMS DUT)
    const questions = document.querySelectorAll('.que');
    if (questions.length === 0) return;

    const qDataList = [];
    
    // 2. Trích xuất dữ liệu
    questions.forEach((root, index) => {
      const qText = root.querySelector('.qtext')?.innerText.trim();
      if (!qText) return;

      const choices = [];
      const answerBlocks = root.querySelectorAll('.answer .r0, .answer .r1');
      
      answerBlocks.forEach((block, i) => {
        const input = block.querySelector('input[type="radio"], input[type="checkbox"]');
        const text = block.querySelector('.flex-fill')?.innerText.trim() || block.innerText.trim();
        choices.push({ text, input });
      });

      const isMulti = root.querySelectorAll('input[type="checkbox"]').length >= 2;
      qDataList.push({ root, qText, choices, isMulti });
    });

    // 3. Gửi AI và click
    for (let q of qDataList) {
      try {
        const indices = await AIProviders.ask(q.qText, q.choices.map(c => c.text), q.isMulti);
        
        // Auto click đáp án đúng
        if (CFG.autoAnswer) {
          indices.forEach(idx => {
            if (q.choices[idx] && q.choices[idx].input) {
              q.choices[idx].input.click();
              q.choices[idx].input.checked = true;
            }
          });
        }
      } catch (e) { console.error('AI Error:', e); }
    }

    // 4. Tự động Next
    if (CFG.autoNext) {
      setTimeout(() => {
        const nextBtn = document.querySelector('input[name="next"]');
        if (nextBtn) nextBtn.click();
      }, CFG.nextDelayMs);
    }
  }

  // Chạy tự động khi load trang
  setTimeout(solvePage, 1500);
  
  // Hỗ trợ phím tắt
  window.addEventListener('keydown', function(e) {
    if (e.altKey && e.key.toLowerCase() === 's') solvePage();
  });
})();