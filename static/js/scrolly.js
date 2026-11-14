(function () {
  function renderMath(el) {
    if (window.renderMathInElement) {
      window.renderMathInElement(el, {
        delimiters: [{ left: "$", right: "$", display: false }],
        throwOnError: false
      });
    }
  }

  function initScrolly(root) {
    var steps = Array.prototype.slice.call(root.querySelectorAll(".scrolly__step"));
    var panels = Array.prototype.slice.call(root.querySelectorAll(".scrolly__panel"));
    var label = root.querySelector(".scrolly__hud-label");
    var formula = root.querySelector(".scrolly__hud-formula");
    var count = root.querySelector(".scrolly__hud-count");
    var progress = root.querySelector(".scrolly__progress");
    progress.innerHTML = steps.map(function () { return "<span></span>"; }).join("");
    var bars = Array.prototype.slice.call(progress.children);
    var current = -1;
    var currentPanel = null;

    function activate(i) {
      if (i === current) return;
      current = i;
      var step = steps[i];
      steps.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
      bars.forEach(function (b, k) { b.classList.toggle("is-done", k <= i); });

      var pid = step.getAttribute("data-panel");
      panels.forEach(function (p) {
        var on = p.getAttribute("data-panel") === pid;
        p.classList.toggle("is-active", on);
        if (on && pid !== currentPanel) {
          p.dispatchEvent(new CustomEvent("panel:enter"));
        }
      });
      currentPanel = pid;

      label.textContent = "Step " + (i + 1) + " of " + steps.length + " · " + step.getAttribute("data-label");
      formula.textContent = "$" + step.getAttribute("data-formula") + "$";
      count.textContent = step.getAttribute("data-count");
      renderMath(formula);
    }

    // Activate the step whose center is closest to the middle of the visible
    // reading area (below the sticky graphic when it's stacked on top, on phones).
    var graphic = root.querySelector(".scrolly__graphic");
    function onScroll() {
      var top = 0;
      if (window.matchMedia("(max-width: 700px)").matches) {
        top = Math.max(0, graphic.getBoundingClientRect().bottom);
      }
      var mid = top + (window.innerHeight - top) * 0.4;
      var best = 0, bestDist = Infinity;
      steps.forEach(function (s, k) {
        var r = s.getBoundingClientRect();
        var d = Math.abs((r.top + r.bottom) / 2 - mid);
        if (d < bestDist) { bestDist = d; best = k; }
      });
      activate(best);
    }

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { onScroll(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    // KaTeX loads with `defer`; re-render the HUD formula once it's ready.
    var tries = 0;
    (function waitForKatex() {
      if (window.renderMathInElement) { renderMath(formula); return; }
      if (tries++ < 60) setTimeout(waitForKatex, 100);
    })();
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll(".scrolly"), initScrolly);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
