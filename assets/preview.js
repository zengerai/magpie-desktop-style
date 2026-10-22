// Offline demonstration only. No network calls or application configuration.
const root = document.querySelector('#preview');
const sources = [
  { name: '团队资料库', sub: '共享文档 · 128 个文件', mode: '双向同步', icon: 'cloud', on: true },
  { name: '设计归档', sub: '设计资源 · 64 个文件', mode: '仅上传', icon: 'box', on: true },
  { name: '项目交付与长期保留的参考资料', sub: '长名称示例 · 32 个文件', mode: '手动同步', icon: 'box', on: false }
];
const modes = ['双向同步', '仅上传', '仅下载', '手动同步'];
const icon = name => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;
const field = (i, suffix) => `<button class="mg-field demo-select" data-picker="${i}" aria-label="${sources[i].name}的同步方式${suffix || ''}" aria-haspopup="dialog" aria-expanded="false"><span class="mg-value">${sources[i].mode}</span>${icon('arrow')}</button>`;
document.querySelector('#main-list').innerHTML = sources.map((s,i) => `<div class="mg-row">${icon(s.icon)}<div class="mg-who"><div class="mg-name" title="${s.name}">${s.name}</div><div class="mg-sub">${s.sub}</div></div>${field(i)}<button class="mg-switch" role="switch" aria-label="启用${s.name}" aria-checked="${s.on}" data-switch="${i}"><i></i></button></div>`).join('');
document.querySelector('#panel-list').innerHTML = sources.map((s,i) => `<details class="mg-detail"><summary>${icon(s.icon)}<span class="mg-name" title="${s.name}">${s.name}</span><span class="mg-summary-value" data-summary="${i}">${s.mode} ›</span></summary><div class="mg-expanded"><label>同步方式</label>${field(i,'（面板）')}<span class="mg-sub">${s.sub}</span></div></details>`).join('');
function message(text, state = 'ok') {
  document.querySelectorAll('.mg-status').forEach(el => { el.textContent = text; el.dataset.state = state; });
}
document.querySelector('#theme').onclick = e => {
  const dark = root.dataset.theme !== 'dark'; root.dataset.theme = dark ? 'dark' : 'light';
  e.currentTarget.textContent = dark ? '切换浅色' : '切换深色';
};
document.querySelectorAll('[data-switch]').forEach(b => b.onclick = () => {
  const i = +b.dataset.switch; sources[i].on = !sources[i].on;
  b.setAttribute('aria-checked', String(sources[i].on));
  message(sources[i].on ? '已启用 · 示例' : '已暂停 · 示例');
});
document.querySelectorAll('[data-refresh]').forEach(b => b.onclick = () => message('已刷新示例'));
let feedbackIndex = 0;
document.querySelector('#feedback').onclick = () => {
  const all = [['操作完成 · 示例','ok'], ['等待连接 · 示例','warn'], ['同步失败，可重试 · 示例','error']];
  message(...all[feedbackIndex++ % all.length]);
};
document.querySelector('#open-window').onclick = () => {
  const w = document.querySelector('#main-window'); w.scrollIntoView({block:'center',behavior:'auto'}); w.focus({preventScroll:true});
};
const tabs = [...document.querySelectorAll('[data-tab]')];
function activateTab(name, focus = false) {
  tabs.forEach(t => {
    const on = t.dataset.tab === name; t.setAttribute('aria-selected',String(on)); t.tabIndex = on ? 0 : -1;
    document.querySelector('#'+t.dataset.tab).hidden = !on;
    if (on && focus) t.focus();
  });
}
tabs.forEach((t,i) => {
  t.onclick = () => activateTab(t.dataset.tab);
  t.onkeydown = e => {
    let target;
    if (e.key === 'ArrowRight') target = (i+1)%tabs.length;
    if (e.key === 'ArrowLeft') target = (i+tabs.length-1)%tabs.length;
    if (e.key === 'Home') target = 0;
    if (e.key === 'End') target = tabs.length-1;
    if (target !== undefined) { e.preventDefault(); activateTab(tabs[target].dataset.tab,true); }
  };
});
document.querySelectorAll('[data-tray]').forEach(b => b.onclick = () => activateTab('capacity',true));
const picker = document.querySelector('#picker'), search = document.querySelector('#search'), options = document.querySelector('#options');
let anchor, activeSource = 0;
function renderOptions() {
  options.replaceChildren();
  modes.filter(m => m.includes(search.value.trim())).forEach(m => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'mg-option';
    b.setAttribute('role','option'); b.setAttribute('aria-selected',String(sources[activeSource].mode === m)); b.textContent = m;
    b.onclick = () => {
      sources[activeSource].mode = m;
      document.querySelectorAll(`[data-picker="${activeSource}"] .mg-value`).forEach(v => v.textContent = m);
      document.querySelector(`[data-summary="${activeSource}"]`).textContent = m+' ›';
      picker.hidePopover(); anchor.focus(); message('选择已保存 · 示例');
    };
    options.append(b);
  });
  if (!options.children.length) { const p = document.createElement('div'); p.className = 'mg-no-results'; p.textContent = '没有匹配的同步方式'; options.append(p); }
}
function positionPicker() {
  if (!anchor || !picker.matches(':popover-open')) return;
  const r = anchor.getBoundingClientRect(), box = picker.getBoundingClientRect();
  picker.style.left = Math.max(8,Math.min(r.left,innerWidth-box.width-8))+'px';
  picker.style.top = Math.max(8, r.bottom+6+box.height <= innerHeight-8 ? r.bottom+6 : r.top-box.height-6)+'px';
}
document.querySelectorAll('[data-picker]').forEach(b => b.onclick = () => {
  if (picker.matches(':popover-open')) picker.hidePopover();
  document.querySelectorAll('[data-picker]').forEach(t => t.setAttribute('aria-expanded','false'));
  anchor = b; activeSource = +b.dataset.picker; search.value = ''; renderOptions();
  picker.showPopover(); b.setAttribute('aria-expanded','true'); positionPicker(); search.focus();
});
search.oninput = () => { renderOptions(); positionPicker(); };
picker.addEventListener('toggle', e => { if (e.newState === 'closed') document.querySelectorAll('[data-picker]').forEach(t => t.setAttribute('aria-expanded','false')); });
picker.addEventListener('keydown', e => {
  if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); picker.hidePopover(); anchor.focus(); return; }
  const buttons = [...options.querySelectorAll('button')], index = buttons.indexOf(document.activeElement);
  if (!buttons.length) return;
  let at;
  if (e.key === 'ArrowDown') at = (index+1)%buttons.length;
  if (e.key === 'ArrowUp') at = index <= 0 ? buttons.length-1 : index-1;
  if (e.key === 'Home' && index >= 0) at = 0;
  if (e.key === 'End' && index >= 0) at = buttons.length-1;
  if (at !== undefined) { e.preventDefault(); buttons[at].focus(); }
});
window.addEventListener('resize',positionPicker);
document.addEventListener('scroll',positionPicker,true);
