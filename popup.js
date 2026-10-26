document.addEventListener('DOMContentLoaded', async function () {
  const cfg = await chrome.storage.sync.get(['provider', 'apiKey', 'model', 'lmsCfg']);
  
  document.getElementById('provider').value = cfg.provider || 'gemini';
  document.getElementById('apiKey').value = cfg.apiKey || '';
  document.getElementById('model').value = cfg.model || 'gemini-1.5-flash';
  
  if (cfg.lmsCfg && cfg.lmsCfg.nextDelayMs) {
    document.getElementById('nextDelayMs').value = cfg.lmsCfg.nextDelayMs;
    document.getElementById('delayValue').textContent = cfg.lmsCfg.nextDelayMs;
  }
});

document.getElementById('nextDelayMs').addEventListener('input', function() {
  document.getElementById('delayValue').textContent = this.value;
});

function showStatus(text, ok) {
  const s = document.getElementById('status');
  s.style.display = 'block';
  s.className = 'status ' + (ok ? 'ok' : 'err');
  s.textContent = text;
}

document.getElementById('testBtn').addEventListener('click', async function () {
  const provider = document.getElementById('provider').value;
  const key = document.getElementById('apiKey').value.trim();
  const model = document.getElementById('model').value.trim();

  if (!key) return showStatus('Vui lòng nhập API Key', false);
  if (!model) return showStatus('Vui lòng nhập Model', false);

  showStatus('Đang test...', true);

  try {
    let url, opts, answer;
    if (provider === 'gemini') {
      url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      opts = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: '2+2=?' }] }] }) };
    } else if (provider === 'openai') {
      url = 'https://api.openai.com/v1/chat/completions';
      opts = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` }, body: JSON.stringify({ model: model, messages: [{ role: 'user', content: '2+2=?' }] }) };
    } else {
      url = 'https://api.anthropic.com/v1/messages';
      opts = { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' }, body: JSON.stringify({ model: model, max_tokens: 50, messages: [{ role: 'user', content: '2+2=?' }] }) };
    }

    const r = await fetch(url, opts);
    const j = await r.json();
    if (j.error) return showStatus('LỖI: ' + j.error.message, false);

    if (provider === 'gemini') answer = j.candidates[0].content.parts[0].text;
    else if (provider === 'anthropic') answer = j.content[0].text;
    else answer = j.choices[0].message.content;

    showStatus('Kết nối OK: ' + answer.trim(), true);
  } catch (e) {
    showStatus('LỖI: ' + e.message, false);
  }
});

document.getElementById('save').addEventListener('click', function () {
  const provider = document.getElementById('provider').value;
  const apiKey = document.getElementById('apiKey').value.trim();
  const model = document.getElementById('model').value.trim();
  const nextDelayMs = parseInt(document.getElementById('nextDelayMs').value);

  if (!apiKey) return showStatus('API Key bắt buộc', false);
  if (!model) return showStatus('Model bắt buộc', false);

  const data = {
    provider: provider,
    apiKey: apiKey,
    model: model,
    lmsCfg: {
      autoAnswer: true,
      autoNext: true,
      nextDelayMs: nextDelayMs
    }
  };
  
  chrome.storage.sync.set(data, function () {
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(t => chrome.tabs.sendMessage(t.id, { type: 'config', data: data }).catch(() => {}));
    });
    showStatus('Đã lưu cấu hình', true);
  });
});