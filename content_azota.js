(function () {
  const getQuestion = () => {
    var qText = document.querySelector('.question-content, .question-title, [class*="question"]')?.innerText || '';
    if (!qText) return null;
    var options = [];
    document.querySelectorAll('.answer-item, .answer-content, [class*="answer"] label').forEach(el => {
      var t = el.innerText?.trim();
      if (t && t.length < 500 && options.indexOf(t) === -1) options.push(t);
    });
    return { question: qText, choices: options };
  };

  const solveAzota = async () => {
    var q = getQuestion();
    if (!q || q.choices.length < 2) return;
    
    const cfg = await chrome.storage.sync.get(['delays']);
    const ANSWER_WAIT = cfg.delays ? cfg.delays.answer : 15000;
    const NEXT_WAIT = cfg.delays ? cfg.delays.next : 60000;

    try {
      var indices = await AIProviders.ask(q.question, q.choices, false);
      if (!indices || indices.length === 0) return;

      var idx = indices[0];
      
      var labels = document.querySelectorAll('.answer-item, .answer-content label, [class*="answer"] label');
      if (labels[idx]) {
        labels[idx].click();
        var input = labels[idx].querySelector('input');
        if (input) {
            input.click();
            input.checked = true;
            input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } else {
        return; 
      }
      
      await new Promise(r => setTimeout(r, ANSWER_WAIT));
      await new Promise(r => setTimeout(r, NEXT_WAIT));
      
      var btns = document.querySelectorAll('button, a');
      for (var i = 0; i < btns.length; i++) {
        var t = (btns[i].innerText || '').toLowerCase();
        if ((t.includes('cau tiep') || t.includes('tiếp theo') || t.includes('next')) && !btns[i].disabled) {
          btns[i].click();
          break;
        }
      }
    } catch (e) { console.error(e); }
  }

  var lastQ = '';
  setInterval(() => {
    var q = getQuestion();
    if (q && q.question !== lastQ) {
      lastQ = q.question;
      solveAzota();
    }
  }, 2000);
})();