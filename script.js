// XAXI — chuyển ngôn ngữ VI/EN, nhớ lựa chọn.
(function () {
  function pick() {
    try { var s = localStorage.getItem('xaxi_lang'); if (s === 'vi' || s === 'en') return s; } catch (e) {}
    var n = (navigator.language || 'vi').toLowerCase();
    return n.indexOf('en') === 0 ? 'en' : 'vi';
  }
  function apply(l) {
    var root = document.documentElement;
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l);
    try { localStorage.setItem('xaxi_lang', l); } catch (e) {}
    var btns = document.querySelectorAll('[data-langbtn]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('active', btns[i].getAttribute('data-langbtn') === l);
    }
    var b = document.body;
    if (b) {
      var t = b.getAttribute('data-title-' + l);
      if (t) document.title = t;
    }
  }
  // chạy sớm để tránh nháy
  apply(pick());
  document.addEventListener('DOMContentLoaded', function () {
    apply(document.documentElement.getAttribute('data-lang') || pick());
    var btns = document.querySelectorAll('[data-langbtn]');
    for (var i = 0; i < btns.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function () { apply(btn.getAttribute('data-langbtn')); });
      })(btns[i]);
    }
  });
})();

// Hiện version bản mới nhất từ GitHub Releases (tự cập nhật mỗi lần release).
(function () {
  try {
    fetch('https://api.github.com/repos/mittohoa/xaxi-app/releases/latest')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        var el = document.getElementById('latest-ver');
        if (el && d && d.tag_name) el.textContent = d.tag_name;
      })
      .catch(function () {});
  } catch (e) {}
})();
