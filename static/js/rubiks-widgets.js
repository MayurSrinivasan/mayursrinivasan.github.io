/* Interactive illustrations for the "rubiks cube" post. */
(function () {
  var COL = { W: "#F4F1E8", Y: "#F2B134", R: "#D9483B", O: "#F08A24", B: "#2F62B0", G: "#5E9E4F" };
  // Each corner: [reference sticker (white/yellow), left, right]
  var CORNERS = [["W","R","B"],["W","B","O"],["W","O","G"],["W","G","R"],["Y","R","G"],["Y","G","O"],["Y","O","B"],["Y","B","R"]];
  // Each edge: [reference sticker, other]
  var EDGES = [["W","R"],["W","B"],["W","O"],["W","G"],["Y","R"],["Y","B"],["Y","O"],["Y","G"],["R","B"],["B","O"],["O","G"],["G","R"]];
  var THIRDS = ["0", "⅓", "⅔"];

  function face(pts, cx, cy, fill) {
    return '<polygon points="' + pts + '" fill="' + fill + '" stroke="' + fill + '" stroke-width="5" stroke-linejoin="round" ' +
      'transform="translate(' + cx + ' ' + cy + ') scale(0.78) translate(' + (-cx) + ' ' + (-cy) + ')"/>';
  }

  // Isometric view of a corner cubie. The hexagon has 3-fold symmetry about its
  // center, so rotating the whole SVG by 120° is exactly one corner twist.
  function cornerSVG(k) {
    var c = CORNERS[k].map(function (x) { return COL[x]; });
    return '<svg class="cubie" viewBox="-48 -48 96 96" aria-hidden="true">' +
      '<polygon points="0,-44 38.1,-22 38.1,22 0,44 -38.1,22 -38.1,-22" fill="#2b2620" stroke="#2b2620" stroke-width="4" stroke-linejoin="round"/>' +
      face("0,-40 34.64,-20 0,0 -34.64,-20", 0, -20, c[0]) +
      face("-34.64,-20 0,0 0,40 -34.64,20", -17.32, 10, c[1]) +
      face("34.64,-20 34.64,20 0,40 0,0", 17.32, 10, c[2]) +
      "</svg>";
  }

  // An edge cubie seen side-on: rotating it 180° swaps its two stickers (a flip).
  function edgeSVG(k) {
    var c = EDGES[k].map(function (x) { return COL[x]; });
    return '<svg class="edgie" viewBox="-48 -28 96 56" aria-hidden="true">' +
      '<rect x="-46" y="-26" width="92" height="52" rx="12" fill="#2b2620"/>' +
      '<rect x="-41" y="-21" width="39" height="42" rx="8" fill="' + c[0] + '"/>' +
      '<rect x="2" y="-21" width="39" height="42" rx="8" fill="' + c[1] + '"/>' +
      "</svg>";
  }

  function $(root, sel) { return root.querySelector(sel); }
  function $$(root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }
  function rot(el, deg) { el.style.transform = "rotate(" + deg + "deg)"; }

  /* ---------- 1. Filling 8 spots one at a time (8!) ---------- */
  function slotsWidget(panel) {
    var tray = $(panel, ".w-tray"), row = $(panel, ".w-slots"), prod = $(panel, ".w-product");
    tray.innerHTML = CORNERS.map(function (_, k) { return '<span class="tray-piece">' + cornerSVG(k) + "</span>"; }).join("");
    row.innerHTML = CORNERS.map(function () { return '<div class="slot"><div class="slot-box"></div><div class="slot-n">&nbsp;</div></div>'; }).join("");
    var pieces = $$(tray, ".tray-piece"), slots = $$(row, ".slot");
    var timers = [];

    function reset() {
      timers.forEach(clearTimeout); timers = [];
      pieces.forEach(function (p) { p.classList.remove("used"); });
      slots.forEach(function (s) { s.classList.remove("filled"); $(s, ".slot-box").innerHTML = ""; $(s, ".slot-n").innerHTML = "&nbsp;"; });
      prod.innerHTML = "&nbsp;";
    }

    function play() {
      reset();
      var order = [0, 1, 2, 3, 4, 5, 6, 7].sort(function () { return Math.random() - 0.5; });
      var nums = [];
      order.forEach(function (k, i) {
        timers.push(setTimeout(function () {
          var choices = 8 - i;
          pieces[k].classList.add("used");
          $(slots[i], ".slot-box").innerHTML = cornerSVG(k);
          $(slots[i], ".slot-n").textContent = choices;
          slots[i].classList.add("filled");
          nums.push(choices);
          prod.innerHTML = nums.join(" × ") + (i === 7 ? ' = <strong>40,320</strong>' : "");
        }, 500 + i * 700));
      });
    }

    $(panel, ".w-btn").addEventListener("click", play);
    panel.addEventListener("panel:enter", play);
  }

  /* ---------- 2. Three ways a corner can sit ---------- */
  function twistsWidget(panel) {
    var row = $(panel, ".w-twists");
    row.innerHTML = [0, 1, 2].map(function (t) {
      return '<div class="w-cell"><span class="spin">' + cornerSVG(0) + '</span><span class="w-cap">twist ' + THIRDS[t] + "</span></div>";
    }).join("");
    var spins = $$(row, ".spin");
    panel.addEventListener("panel:enter", function () {
      spins.forEach(function (s) { s.style.transition = "none"; rot(s, 0); });
      void row.offsetWidth;
      spins.forEach(function (s, t) { s.style.transition = ""; setTimeout(function () { rot(s, 120 * t); }, 300 + t * 250); });
    });
  }

  /* ---------- 3. A front turn twists +⅓, −⅓, +⅓, −⅓ ---------- */
  function balanceWidget(panel) {
    var sq = $(panel, ".w-square"), out = $(panel, ".w-readout");
    var POS = [[0, 0], [1, 0], [1, 1], [0, 1]]; // TL, TR, BR, BL (clockwise)
    var ids = [0, 1, 2, 3];
    var state = ids.map(function (k) { return { pos: k, angle: 0 }; });
    ids.forEach(function (k) {
      var el = document.createElement("div");
      el.className = "sq-piece";
      el.innerHTML = '<span class="spin">' + cornerSVG(k) + '</span><span class="badge"></span>';
      sq.appendChild(el);
      state[k].el = el;
    });

    function place() {
      state.forEach(function (s) {
        s.el.style.left = POS[s.pos][0] ? "calc(100% - var(--cubie))" : "0px";
        s.el.style.top = POS[s.pos][1] ? "calc(100% - var(--cubie))" : "0px";
        rot($(s.el, ".spin"), s.angle);
      });
    }

    function turn() {
      var parts = [];
      state.forEach(function (s) {
        s.pos = (s.pos + 1) % 4;
        var d = s.pos % 2 === 1 ? 1 : -1; // pieces landing TR/BL twist forward, TL/BR back
        s.angle += d * 120;
        var b = $(s.el, ".badge");
        b.textContent = d > 0 ? "+⅓" : "−⅓";
        b.className = "badge show " + (d > 0 ? "plus" : "minus");
      });
      [0, 1, 2, 3].forEach(function (p) {
        var s = state.filter(function (x) { return x.pos === p; })[0];
        parts.push(p % 2 === 1 ? "+⅓" : "−⅓");
      });
      place();
      out.innerHTML = "Twist added: " + parts.join(" ") + " = <strong>0</strong>";
      setTimeout(function () { state.forEach(function (s) { $(s.el, ".badge").classList.remove("show"); }); }, 1800);
    }

    place();
    $(panel, ".w-btn").addEventListener("click", turn);
    panel.addEventListener("panel:enter", function () { setTimeout(turn, 600); });
  }

  /* ---------- 4. The 8th corner is forced ---------- */
  function lastCornerWidget(panel) {
    var grid = $(panel, ".w-grid"), out = $(panel, ".w-readout");
    var t = [0, 0, 0, 0, 0, 0, 0, 0], ang = [0, 0, 0, 0, 0, 0, 0, 0];
    grid.innerHTML = CORNERS.map(function (_, k) {
      var last = k === 7;
      return '<button type="button" class="w-cell' + (last ? " is-locked" : " is-tappable") + '" data-k="' + k + '"' + (last ? " disabled" : "") + ">" +
        '<span class="spin">' + cornerSVG(k) + "</span>" +
        '<span class="w-cap">' + (last ? "🔒 corner 8" : "corner " + (k + 1)) + "</span>" +
        '<span class="w-val">0</span></button>';
    }).join("");
    var cells = $$(grid, ".w-cell");

    function render(changedLast) {
      var sum = 0;
      for (var i = 0; i < 7; i++) sum += t[i];
      var need = (3 - (sum % 3)) % 3;
      var diff = (need - t[7] + 3) % 3;
      if (diff) { ang[7] += 120 * diff; t[7] = need; cells[7].classList.remove("pulse"); void cells[7].offsetWidth; cells[7].classList.add("pulse"); }
      cells.forEach(function (c, k) { rot($(c, ".spin"), ang[k]); $(c, ".w-val").textContent = THIRDS[t[k]]; });
      var total = sum + t[7];
      out.innerHTML = "First 7 add up to <strong>" + sum + "</strong> thirds → corner 8 must add <strong>" + need +
        "</strong> → total " + total + " thirds = " + (total / 3) + " whole turn" + (total / 3 === 1 ? "" : "s") + " ✓";
    }

    function twist(k, by) { t[k] = (t[k] + by) % 3; ang[k] += 120 * by; }

    grid.addEventListener("click", function (e) {
      var c = e.target.closest(".is-tappable");
      if (!c) return;
      twist(+c.getAttribute("data-k"), 1);
      render();
    });
    $(panel, '[data-act="random"]').addEventListener("click", function () {
      for (var i = 0; i < 7; i++) twist(i, Math.floor(Math.random() * 3));
      render();
    });
    $(panel, '[data-act="reset"]').addEventListener("click", function () {
      for (var i = 0; i < 8; i++) { t[i] = 0; ang[i] = Math.round(ang[i] / 360) * 360; }
      render();
    });
    render();
    panel.addEventListener("panel:enter", function () {
      setTimeout(function () { twist(0, 1); render(); }, 700);
      setTimeout(function () { twist(3, 2); render(); }, 1600);
      setTimeout(function () { twist(5, 1); render(); }, 2500);
    });
  }

  /* ---------- 5. The 12th edge is forced ---------- */
  function lastEdgeWidget(panel) {
    var grid = $(panel, ".w-grid"), out = $(panel, ".w-readout");
    var f = [], ang = [];
    for (var i = 0; i < 12; i++) { f.push(0); ang.push(0); }
    grid.innerHTML = EDGES.map(function (_, k) {
      var last = k === 11;
      return '<button type="button" class="w-cell' + (last ? " is-locked" : " is-tappable") + '" data-k="' + k + '"' + (last ? " disabled" : "") + ">" +
        '<span class="spin spin--edge">' + edgeSVG(k) + "</span>" +
        '<span class="w-cap">' + (last ? "🔒 edge 12" : "edge " + (k + 1)) + "</span></button>";
    }).join("");
    var cells = $$(grid, ".w-cell");

    function flip(k) { f[k] ^= 1; ang[k] += 180; }

    function render() {
      var s = 0;
      for (var i = 0; i < 11; i++) s += f[i];
      var need = s % 2;
      if (need !== f[11]) { flip(11); cells[11].classList.remove("pulse"); void cells[11].offsetWidth; cells[11].classList.add("pulse"); }
      cells.forEach(function (c, k) { rot($(c, ".spin"), ang[k]); c.classList.toggle("is-flipped", !!f[k]); });
      var total = s + f[11];
      out.innerHTML = "First 11: <strong>" + s + "</strong> flipped (" + (s % 2 ? "odd" : "even") + ") → edge 12 " +
        (need ? "<strong>must flip</strong>" : "stays put") + " → " + total + " flipped, even ✓";
    }

    grid.addEventListener("click", function (e) {
      var c = e.target.closest(".is-tappable");
      if (!c) return;
      flip(+c.getAttribute("data-k"));
      render();
    });
    $(panel, '[data-act="turn"]').addEventListener("click", function () {
      [0, 1, 2, 3].forEach(function (k) { flip(k); cells[k].classList.remove("pulse"); void cells[k].offsetWidth; cells[k].classList.add("pulse"); });
      render();
    });
    $(panel, '[data-act="reset"]').addEventListener("click", function () {
      for (var i = 0; i < 12; i++) { f[i] = 0; ang[i] = Math.round(ang[i] / 360) * 360; }
      render();
    });
    render();
    panel.addEventListener("panel:enter", function () {
      setTimeout(function () { flip(2); render(); }, 700);
      setTimeout(function () { flip(6); render(); }, 1700);
      setTimeout(function () { flip(9); render(); }, 2700);
    });
  }

  var WIDGETS = { slots: slotsWidget, twists: twistsWidget, balance: balanceWidget, lastcorner: lastCornerWidget, lastedge: lastEdgeWidget };

  function boot() {
    $$(document, "[data-widget]").forEach(function (panel) {
      var w = WIDGETS[panel.getAttribute("data-widget")];
      if (w) w(panel);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
