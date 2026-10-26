(function () {
  const CFG = { autoAnswer: true, autoNext: true, answerDelayMs: 1500, nextDelayMs: 1000 };
  chrome.storage.sync.get(CFG, function (s) { Object.assign(CFG, s); });

  function getQuestion() {
    var qText = '';
    var qEl = document.querySelector('.question-content, .question-title, [class*="question"]');
    if (qEl) qText = qEl.innerText || '';
    if (!qText) return null;
    var options = [];
    document.querySelectorAll('.answer-item, .answer-content, [class*="answer"] label').forEach(function (el) {
      var t = el.innerText ? el.innerText.trim() : '';
      if (t && t.length < 500 && options.indexOf(t) === -1) options.push(t);
    });
    return { question: qText, choices: options };
  }

  async function solveAzota() {
    var q = getQuestion();
    if (!q || q.choices.length < 2) return;
    
    try {
      var indices = await AIProviders.ask(q.question, q.choices, false);
      var idx = indices[0];
      
      await new Promise(r => setTimeout(r, CFG.answerDelayMs));
      
      if (CFG.autoAnswer) {
        var labels = document.querySelectorAll('.answer-item, .answer-content label, [class*="answer"] label');
        if (labels[idx]) {
          labels[idx].click();
          var input = labels[idx].querySelector('input');
          if (input) input.checked = true;
        }
      }
      
      if (CFG.autoNext) {
        await new Promise(r => setTimeout(r, CFG.nextDelayMs));
        var btns = document.querySelectorAll('button, a');
        for (var i = 0; i < btns.length; i++) {
          var t = (btns[i].innerText || '').toLowerCase();
          if ((t.indexOf('cau tiep') !== -1 || t.indexOf('tiếp theo') !== -1 || t.indexOf('next') !== -1) && !btns[i].disabled) {
            btns[i].click();
            break;
          }
        }
      }
    } catch (e) { console.error(e); }
  }

  var lastQ = '';
  setInterval(function() {
    var q = getQuestion();
    if (q && q.question !== lastQ) {
      lastQ = q.question;
      solveAzota();
    }
  }, 2000);
})();