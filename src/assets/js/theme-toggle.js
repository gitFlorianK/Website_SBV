(function () {
  var btn = document.querySelector('.theme-toggle');
  var icon = btn && btn.querySelector('.theme-toggle__icon');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function updateIcon() {
    if (!icon) return;
    icon.textContent = getTheme() === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateIcon();
  }

  // Initial icon update (theme already set by inline script)
  updateIcon();

  // Toggle on click
  if (btn) {
    btn.addEventListener('click', function () {
      var next = getTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // Listen for OS theme changes (only if no manual override)
  prefersDark.addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
