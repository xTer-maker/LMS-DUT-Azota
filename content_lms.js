(function () {
  async function solvePage() {
    const questions = document.querySelectorAll('.que');
    if (questions.length === 0) return;

    const cfg = await chrome.storage.sync.get(['delays']);
    const ANSWER_WAIT = cfg.delays ? cfg.delays.answer : 15000;
    const NEXT_WAIT = cfg.delays ? cfg.delays.next : 60000;

    const qDataList = [];
    
    questions.forEach((root) => {
      const qText = root.querySelector('.qtext')?.innerText.trim();
      if (!qText) return;

      // Kiểm tra xem đã làm bài chưa (có class 'correct' hoặc 'incorrect' không)
      const state = root.querySelector('.state')?.innerText.trim() || '';
      const isReview = state === 'Correct' || state === 'Incorrect' || state === 'Đúng' || state === 'Sai';

      // Nếu đang ở chế độ Review VÀ câu trả lời đã Đúng thì bỏ qua
      if (isReview && (state.includes('Correct') || state.includes('Đúng'))) return;

      const choices = [];
      const answerBlocks = root.querySelectorAll('.answer .r0, .answer .r1');
      
      answerBlocks.forEach((block, i) => {
        const input = block.querySelector('input[type="radio"], input[type="checkbox"]');
        const text = block.querySelector('.flex-fill')?.innerText.trim() || block.innerText.trim();
        choices.push({ text, input });
      });

      const isMulti = root.querySelectorAll('input[type="checkbox"]').length >= 2;
      
      // Đưa vào danh sách xử lý (cả lúc làm bài và lúc review sai)
      qDataList.push({ root, qText, choices, isMulti, isReview });
    });

    for (let q of qDataList) {
      try {
        const indices = await AIProviders.ask(q.qText, q.choices.map(c => c.text), q.isMulti);
        
        // 1. Tự động click đáp án ngầm (không thông báo, không đổi UI)
        indices.forEach(idx => {
          if (q.choices[idx] && q.choices[idx].input) {
            // Click trực tiếp vào input để web ghi nhận
            q.choices[idx].input.click();
            q.choices[idx].input.checked = true;
          }
        });

        // 2. Chờ thời gian đã cài đặt
        if (q.isReview) {
           await new Promise(r => setTimeout(r, 1500)); // Review thì chờ 1.5s rồi làm câu tiếp
        } else {
           await new Promise(r => setTimeout(r, ANSWER_WAIT)); // Lúc làm bài thì chờ theo thanh trượt
        }
        
      } catch (e) { console.error('AI Error:', e); }
    }

    // Chỉ bấm Next nếu đang trong lúc làm bài (không phải lúc review)
    const isSubmitted = document.querySelector('.state')?.innerText.includes('Correct') || document.querySelector('.state')?.innerText.includes('Incorrect');
    if (!isSubmitted) {
      await new Promise(r => setTimeout(r, NEXT_WAIT));
      const nextBtn = document.querySelector('input[name="next"]');
      if (nextBtn) nextBtn.click();
    }
  }

  setTimeout(solvePage, 2000);
})();