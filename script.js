(() => {
  //console.clear();
  const nav = document.querySelector("nav:where(header *)");
  if (!nav) return;
  const breakpoint = window.getComputedStyle(nav).getPropertyValue("--less-than") || "500";
  const mobileMQ = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
  const iconClose = "M18 6L6 18M6 6l12 12";
  const iconMenu = "M4 12h16M4 6h16M4 18h16";
  const svg = (d) => `<svg viewBox="0 0 24 24" width="24" height="24">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="${d}"></path>
  </svg>`;

  const btn = document.createElement("button");
  btn.setAttribute("aria-expanded", false);
  btn.setAttribute("aria-label", "Vis menu");
  btn.innerHTML = svg(iconMenu);
  nav.prepend(btn);

  btn.addEventListener("click", clickHandler);

  function clickHandler() {
    let expanded = this.getAttribute("aria-expanded") === "true" || false;

    this.setAttribute("aria-expanded", !expanded);
    this.setAttribute("aria-label", !expanded ? "Skjul menu" : "Vis menu");

    this.innerHTML = svg(!expanded ? iconClose : iconMenu);
  }

  const handleMobileChange = ({ matches }) => {
    btn.hidden = matches ? false : true;
    nav.dataset.menuBtnShown = matches ? true : false;
  };

  mobileMQ.addListener(handleMobileChange);

  handleMobileChange(mobileMQ);

  const injectCSS = (css) => {
    const style = document.createElement("style");
    style.innerText = css;
    document.head.appendChild(style);
    return style;
  };
  injectCSS(`\
    [hidden] {display: none !important;}\
    [aria-expanded="false"]:not([hidden]) + ul { display: none; }\
    header { flex-wrap: wrap; }\
    nav[data-menu-btn-shown="true"] { display: contents; }\
    nav:only-child, nav:only-child button { margin-inline-start: auto; }\
    [aria-expanded="true"]:not([hidden]) + ul { flex-flow: column; flex-basis: 100%; }\
    button[aria-expanded] {\
      background: unset;\
      border: 2px solid var(--burger-border, #e2e1e4);\
      box-sizing: border-box;\
      border-radius: 6px;\
      inline-size: 2.25rem;\
      block-size: 2.25rem;\
      padding: .25rem;\
      cursor: pointer;\
      color: var(--burger-lines, currentColor);\
    }\
    svg {\
      display: block;\
      inline-size: 100%;\
      block-size: 100%;\
      color: currentColor;
    }\
  `);
})();
