importScripts('ai_bridge.js');

const BLOCK_PATTERNS = [
  '*://*/api/*proctor*',
  '*://*/api/*anticheat*',
  '*://*/api/*anti-cheat*',
  '*://*/log*tab*',
  '*://*/track*visibility*',
  '*://lms.dut.udn.vn/mod/quiz/*monitor*',
  '*://lms.dut.udn.vn/lib/ajax/*log*'
];

const rules = BLOCK_PATTERNS.map(function (p, i) {
  return {
    id: i + 1, priority: 1,
    action: { type: 'block' },
    condition: { urlFilter: p, resourceTypes: ['xmlhttprequest', 'ping', 'other'] }
  };
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: rules.map(r => r.id), addRules: rules });
});