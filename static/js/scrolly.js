(function () {
  function renderMath(el) {
    if (window.renderMathInElement) {
      window.renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  }

  function initScrolly(root) {
    var steps = Array.prototype.slice.call(root.querySelectorAll(".scrolly__step"));
    var imgs = Array.prototype.slice.call(root.querySelectorAll(".scrolly__frame img"));
    var bars = Array.prototype.slice.call(root.querySelectorAll(".scrolly__progress span"));
    var label = root.querySelector(".scrolly__hud-label");
    var formula = root.querySelector(".scrolly__hud-formula");
    var count = root.querySelector(".scrolly__hud-count");
    var current = -1;

    function activate(i) {
      if (i === current || i < 0) return;
      current = i;
      var step = steps[i];
      steps.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
      var imgIdx = step.getAttribute("data-img");
      imgs.forEach(function (img) { img.classList.toggle("is-active", img.getAttribute("data-img") === imgIdx); });
      bars.forEach(function (b, k) { b.classList.toggle("is-done", k <= i); });
      label.textContent = step.getAttribute("data-label");
      formula.textContent = "$" + step.getAttribute("data-formula") + "$";
      count.textContent = step.getAttribute("data-count");
      renderMath(formula);
    }

    // Pick the step whose center is closest to the viewport midpoint.
    function onScroll() {
      var mid = window.innerHeight * 0.5;
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

    // Wait for KaTeX to be available for the HUD formula.
    var tries = 0;
    (function waitForKatex() {
      if (window.renderMathInElement || tries > 50) { current = -1; onScroll(); return; }
      tries++; setTimeout(waitForKatex, 100);
    })();
    onScroll();
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
