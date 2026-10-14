/* Collapsible side panels: a toggle button next to "Contents" and "On this page".
   State is kept in localStorage so it survives page changes. */
(function () {
  var KEY = "cen-panels";
  var ICON = {
    left:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><line x1="9" y1="4" x2="9" y2="20"/></svg>',
    right: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><line x1="15" y1="4" x2="15" y2="20"/></svg>'
  };

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; }
  }
  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }

  var state = load();
  var root = document.documentElement;

  function apply() {
    root.classList.toggle("cen-left-collapsed", !!state.left);
    root.classList.toggle("cen-right-collapsed", !!state.right);
  }

  function build(sidebarSelector, label, side) {
    var inner = document.querySelector(sidebarSelector + " .md-sidebar__inner");
    if (!inner || inner.querySelector(".cen-panel-head")) return;

    var head = document.createElement("div");
    head.className = "cen-panel-head";

    var title = document.createElement("span");
    title.className = "cen-panel-title";
    title.textContent = label;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cen-panel-toggle";
    btn.innerHTML = ICON[side];
    btn.title = "Collapse / expand " + label;
    btn.setAttribute("aria-label", "Collapse or expand " + label);
    btn.setAttribute("aria-expanded", String(!state[side]));
    btn.addEventListener("click", function () {
      state[side] = !state[side];
      save(state);
      apply();
      btn.setAttribute("aria-expanded", String(!state[side]));
    });

    head.appendChild(title);
    head.appendChild(btn);
    inner.insertBefore(head, inner.firstChild);
  }

  build(".md-sidebar--primary", "Contents", "left");
  build(".md-sidebar--secondary", "On this page", "right");
  apply();
})();
