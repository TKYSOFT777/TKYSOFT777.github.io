/* ==========================================================
   作品ごとの公開状態
   ----------------------------------------------------------
   審査が通って App Store に並んだら、そのゲームの status を
   "live" に書き換えるだけで、サイト全体が「配信中」に切り替わります。
     live   … NOW ON APP STORE のバッジ + App Store ボタン（作品一覧の先頭へ）
     review … IN REVIEW のバッジ +「審査中・まもなく公開」
     soon   … COMING SOON のバッジ +「近日公開予定」
   appId は App Store Connect の「Apple ID」（数字）。ストアのリンクはここから作ります。
   ========================================================== */
window.TKY_GAMES = {
  palettebullet: { status: "live",   appId: "6831254343", support: "https://tkysoft777.github.io/palettebullet/" },
  brawlerone:    { status: "live",   appId: "6834494429", support: "https://tkysoft777.github.io/brawlerone/" },
  barcraft:      { status: "review", appId: "6834939196", support: "https://tkysoft777.github.io/barcraft/" },
  supernova:     { status: "soon",   appId: "",           support: "" },
  displazma:     { status: "soon",   appId: "",           support: "" },
};

(() => {
  const G = window.TKY_GAMES;
  const T = k => (window.TKY_I18N ? window.TKY_I18N.t(k) : k);
  const ORDER = { live: 0, review: 1, soon: 2 };
  const track = document.querySelector('.works__track');
  if (!track) return;
  const cards = [...track.querySelectorAll('.work[data-game]')];

  const badge = s => s === 'live'
    ? '<span class="live-badge mono"><i></i>NOW ON APP STORE</span>'
    : s === 'review'
      ? '<span class="review-badge mono"><i></i>IN REVIEW</span>'
      : '<span class="soon-badge mono"><i></i>COMING SOON</span>';
  const support = g => g.support ? `<a class="btn btn--ghost" href="${g.support}" data-i18n="support">${T('support')}</a>` : '';
  const links = g => g.status === 'live'
    ? `<a class="btn btn--store" data-store="${g.appId}" href="https://apps.apple.com/app/id${g.appId}" target="_blank" rel="noopener" data-magnet><span data-i18n="store">${T('store')}</span> <i>↗</i></a>${support(g)}`
    : g.status === 'review'
      ? `<span class="btn btn--soon" data-i18n="review">${T('review')}</span>${support(g)}`
      : `<span class="btn btn--soon" data-i18n="soon">${T('soon')}</span>`;

  cards.forEach(c => {
    const g = G[c.dataset.game] || { status: 'soon' };
    c.classList.toggle('work--soon', g.status !== 'live');
    c.querySelector('.work__badge').innerHTML = badge(g.status);
    c.querySelector('.work__links').innerHTML = links(g);
  });

  // 配信中 → 審査中 → 近日公開 の順に並べ替え、番号を振り直す
  const end = track.querySelector('.work-end');
  cards.map((c, i) => [c, i])
    .sort((a, b) => (ORDER[(G[a[0].dataset.game] || {}).status] ?? 2) - (ORDER[(G[b[0].dataset.game] || {}).status] ?? 2) || a[1] - b[1])
    .forEach(([c], i) => { track.insertBefore(c, end); c.querySelector('.work__index').textContent = String(i + 1).padStart(2, '0'); });
  const total = document.querySelector('.works__total');
  if (total) total.textContent = String(cards.length).padStart(2, '0');

  // フッター：配信中のゲームだけ App Store へのリンクを並べる
  const foot = document.querySelector('.footer__links');
  if (foot) {
    foot.innerHTML = cards.filter(c => (G[c.dataset.game] || {}).status === 'live').map(c => {
      const g = G[c.dataset.game], name = c.querySelector('.work__name').textContent;
      return `<a data-store="${g.appId}" href="https://apps.apple.com/app/id${g.appId}" target="_blank" rel="noopener">${name} <span aria-hidden="true">↗</span></a>`;
    }).join('');
  }
  if (window.TKY_I18N) window.TKY_I18N.refreshStore();
})();
