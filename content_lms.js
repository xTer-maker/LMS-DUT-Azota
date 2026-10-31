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

      const state = root.querySelector('.state')?.innerText.trim() || '';
      const isReview = state === 'Correct' || state === 'Incorrect' || state === 'Đúng' || state === 'Sai';
      
      // Nếu là review và câu đó đã Đúng, bỏ qua
      if (isReview && (state.includes('Correct') || state.includes('Đúng'))) return;

      const choices = [];
      const answerBlocks = root.querySelectorAll('.answer .r0, .answer .r1');
      
      answerBlocks.forEach((block, i) => {
        const input = block.querySelector('input[type="radio"], input[type="checkbox"]');
        const text = block.querySelector('.flex-fill')?.innerText.trim() || block.innerText.trim();
        choices.push({ text, input });
      });

      const isMulti = root.querySelectorAll('input[type="checkbox"]').length >= 2;
      qDataList.push({ root, qText, choices, isMulti, isReview });
    });

    let allSuccess = true;

    for (let q of qDataList) {
      try {
        const indices = await AIProviders.ask(q.qText, q.choices.map(c => c.text), q.isMulti);
        
        if (!indices || indices.length === 0) {
           allSuccess = false;
           continue;
        }

        indices.forEach(idx => {
          if (q.choices[idx] && q.choices[idx].input) {
            const input = q.choices[idx].input;
            input.click();
            input.dispatchEvent(new Event('change', { bubbles: true }));
            input.checked = true;
          }
        });

        q.success = true;

        if (!q.isReview) {
           await new Promise(r => setTimeout(r, ANSWER_WAIT)); 
        } else {
           await new Promise(r => setTimeout(r, 1500)); // Review chạy nhanh hơn
        }
        
      } catch (e) { 
        console.error('AI Error:', e); 
        allSuccess = false;
      }
    }

    const isSubmitted = document.querySelector('.state')?.innerText.includes('Correct') || document.querySelector('.state')?.innerText.includes('Incorrect');
    
    if (!isSubmitted) {
      if (!allSuccess) {
        console.warn('Hủy Next: Lỗi AI hoặc không tìm thấy đáp án.');
        return;
      }

      const allQuestions = document.querySelectorAll('.que');
      let allAnswered = true;
      for (let q of allQuestions) {
        if (q.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked').length === 0) {
           allAnswered = false;
           break;
        }
      }

      if (!allAnswered) {
        console.warn('Hủy Next: Phát hiện câu hỏi chưa có đáp án được chọn.');
        return;
      }

      await new Promise(r => setTimeout(r, NEXT_WAIT));
      
      const nextBtn = document.querySelector('input[name="next"]');
      if (nextBtn) {
         nextBtn.click();
         nextBtn.dispatchEvent(new Event('click', { bubbles: true }));
      }
    }
  }

  setTimeout(solvePage, 2000);
})();