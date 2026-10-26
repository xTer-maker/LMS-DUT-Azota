const AIProviders = {
  async openai(key, model, prompt) {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({ model: model, messages: [{ role: 'user', content: prompt }], temperature: 0 })
    });
    const j = await r.json();
    if (j.error) throw new Error(j.error.message);
    return j.choices[0].message.content;
  },

  async gemini(key, model, prompt) {
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + key, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const j = await r.json();
    if (j.error) throw new Error(j.error.message);
    return j.candidates[0].content.parts[0].text;
  },

  async anthropic(key, model, prompt) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({ model: model, max_tokens: 1024, messages: [{ role: 'user', content: prompt }] })
    });
    const j = await r.json();
    if (j.error) throw new Error(j.error.message);
    return j.content[0].text;
  },

  async ask(question, choices, isMulti = false) {
    const cfg = await chrome.storage.sync.get(['provider', 'apiKey', 'model']);
    if (!cfg.apiKey) throw new Error('Chua cau hinh API key');
    
    const list = choices.map(function (c, i) { return i + '. ' + c; }).join('\n');
    const prompt = isMulti
      ? 'Chon TAT CA dap an dung (co the nhieu hon 1). CHI tra ve JSON: {"answers":[<cac index dung>]}.\nCau hoi: ' + question + '\nDap an:\n' + list
      : 'Chon dap an dung. CHI tra ve JSON: {"answers":[<index dung>]}.\nCau hoi: ' + question + '\nDap an:\n' + list;

    let raw;
    if (cfg.provider === 'openai') raw = await AIProviders.openai(cfg.apiKey, cfg.model, prompt);
    else if (cfg.provider === 'gemini') raw = await AIProviders.gemini(cfg.apiKey, cfg.model, prompt);
    else if (cfg.provider === 'anthropic') raw = await AIProviders.anthropic(cfg.apiKey, cfg.model, prompt);
    else throw new Error('Chua chon provider');

    const m = raw.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(m ? m[0] : raw);
    
    if (parsed.answers) return parsed.answers;
    if (typeof parsed.index === 'number') return [parsed.index];
    throw new Error('AI tra ve sai format');
  }
};