/* Interactive scrollytelling visualizations for "Twelve Years of the Berkeley 5K" */
(function () {
  var DATA = [
    {"label":"2014","date":"2014-11-09","n":1104,"winner":"Dylan Isaacson","min":995,"p10":1572,"p25":1775,"median":2096,"mean":2177,"p75":2470,"p90":2956,"p95":3246,"max":7551,"iqr":695,"sd":574,"u25":7.8,"o45":15.5,"pctF":62.3,"medAge":33,"w":{"t":57.2,"hum":82,"wind":1.9,"rainRace":0.0,"rainDay":0.0,"cond":"Partly cloudy","code":2},"m26Rank":526,"m26Pct":52.4,"m25Rank":545,"m25Pct":50.5,"kde":[0.0002,0.0006,0.0013,0.0024,0.0036,0.0046,0.0057,0.0074,0.01,0.0137,0.0181,0.0232,0.029,0.0358,0.0422,0.0465,0.0484,0.0488,0.0484,0.0474,0.0462,0.0452,0.0438,0.0419,0.0395,0.0372,0.0348,0.0321,0.0288,0.0249,0.021,0.0176,0.0149,0.0132,0.0125,0.0121,0.0115,0.0107,0.0099,0.0091,0.0081,0.0069,0.0055,0.0043,0.0034,0.0031,0.0031,0.0031,0.003,0.0029,0.0028,0.0023,0.0017,0.0013,0.0011,0.0009,0.0006]},
    {"label":"2015","date":"2015-11-22","n":1128,"winner":"Dave Winnacker","min":933,"p10":1607,"p25":1857,"median":2180,"mean":2257,"p75":2569,"p90":3178,"p95":3412,"max":4915,"iqr":712,"sd":593,"u25":6.6,"o45":19.7,"pctF":61.6,"medAge":32,"w":{"t":50.5,"hum":76,"wind":5.4,"rainRace":0.0,"rainDay":0.0,"cond":"Overcast","code":3},"m26Rank":456,"m26Pct":59.7,"m25Rank":486,"m25Pct":57.0,"kde":[0.0008,0.002,0.0036,0.0052,0.0058,0.0054,0.0046,0.0045,0.0061,0.0093,0.0134,0.0179,0.0227,0.0275,0.0321,0.0366,0.0408,0.0443,0.0457,0.0452,0.0446,0.045,0.0454,0.0442,0.0413,0.0384,0.0361,0.0343,0.0324,0.0295,0.0255,0.0214,0.0183,0.0158,0.0133,0.0111,0.0095,0.0088,0.0091,0.0104,0.0118,0.0123,0.0116,0.0104,0.0089,0.007,0.0052,0.0041,0.004,0.0043,0.004,0.003,0.0018,0.001,0.0006,0.0004,0.0002]},
    {"label":"2016","date":"2016-11-20","n":1472,"winner":"Rodrigo Vargas","min":1010,"p10":1564,"p25":1839,"median":2152,"mean":2217,"p75":2531,"p90":2959,"p95":3269,"max":5586,"iqr":692,"sd":546,"u25":7.5,"o45":17.7,"pctF":60.5,"medAge":33,"w":{"t":55.8,"hum":94,"wind":4.1,"rainRace":0.028,"rainDay":0.31,"cond":"Light drizzle","code":51},"m26Rank":626,"m26Pct":57.5,"m25Rank":664,"m25Pct":55.0,"kde":[0.0001,0.0002,0.0005,0.0011,0.0019,0.003,0.0047,0.0073,0.0111,0.0157,0.0198,0.0227,0.0251,0.0279,0.0316,0.036,0.0409,0.0449,0.0468,0.047,0.0468,0.0472,0.0482,0.0483,0.0459,0.041,0.035,0.0298,0.0266,0.0253,0.0243,0.0226,0.0201,0.0181,0.0169,0.0158,0.0141,0.012,0.0098,0.0081,0.0071,0.0068,0.0068,0.0064,0.0057,0.0048,0.0037,0.0027,0.0022,0.0019,0.0018,0.0016,0.0013,0.0009,0.0005,0.0003,0.0003]},
    {"label":"2017","date":"2017-11-19","n":1405,"winner":"Ricardo Ibarra","min":1073,"p10":1561,"p25":1801,"median":2107,"mean":2195,"p75":2507,"p90":3041,"p95":3328,"max":4222,"iqr":706,"sd":557,"u25":7.3,"o45":16.6,"pctF":59.2,"medAge":33,"w":{"t":48.0,"hum":74,"wind":4.5,"rainRace":0.0,"rainDay":0.0,"cond":"Overcast","code":3},"m26Rank":648,"m26Pct":54.0,"m25Rank":687,"m25Pct":51.1,"kde":[0.0,0.0001,0.0004,0.0011,0.0023,0.004,0.0065,0.0094,0.0124,0.0153,0.0189,0.0234,0.0283,0.0328,0.0367,0.0403,0.0434,0.046,0.0478,0.0492,0.0498,0.0492,0.0469,0.0431,0.0387,0.0345,0.0314,0.0295,0.028,0.0257,0.0222,0.0184,0.0155,0.0138,0.0125,0.0116,0.0115,0.0119,0.0118,0.0106,0.0089,0.0078,0.0074,0.0074,0.0074,0.0068,0.0057,0.0042,0.0028,0.0017,0.001,0.0006,0.0005,0.0005,0.0006,0.0006,0.0006]},
    {"label":"2019","date":"2019-11-17","n":1589,"winner":"Felipe Garcia","min":1011,"p10":1548,"p25":1832,"median":2202,"mean":2301,"p75":2620,"p90":3166,"p95":3572,"max":6309,"iqr":788,"sd":691,"u25":8.3,"o45":22.4,"pctF":58.1,"medAge":33,"w":{"t":55.6,"hum":86,"wind":8.9,"rainRace":0.0,"rainDay":0.0,"cond":"Mainly clear","code":1},"m26Rank":630,"m26Pct":60.4,"m25Rank":671,"m25Pct":57.8,"kde":[0.0001,0.0003,0.0009,0.0019,0.0033,0.0049,0.0069,0.0094,0.0124,0.0158,0.0192,0.0225,0.0256,0.0283,0.0306,0.0325,0.0345,0.0367,0.039,0.0408,0.0418,0.0423,0.0425,0.0422,0.0404,0.0372,0.0339,0.032,0.0313,0.03,0.0274,0.0244,0.0217,0.019,0.0166,0.0144,0.0125,0.0109,0.0095,0.0085,0.0081,0.0081,0.008,0.0075,0.0069,0.0063,0.006,0.0058,0.0054,0.0049,0.004,0.003,0.0023,0.0019,0.0016,0.0014,0.0011]},
    {"label":"2022 Feb","date":"2022-02-27","n":1109,"winner":"Dylan Peterson","min":984,"p10":1568,"p25":1861,"median":2195,"mean":2356,"p75":2699,"p90":3321,"p95":3818,"max":7892,"iqr":838,"sd":751,"u25":7.2,"o45":25.0,"pctF":59.7,"medAge":33,"w":{"t":49.6,"hum":59,"wind":6.7,"rainRace":0.0,"rainDay":0.0,"cond":"Clear","code":0},"m26Rank":450,"m26Pct":59.5,"m25Rank":477,"m25Pct":57.1,"kde":[0.0001,0.0003,0.0006,0.0013,0.0024,0.0038,0.0058,0.0086,0.012,0.015,0.0175,0.02,0.0229,0.0262,0.0297,0.0333,0.037,0.0409,0.0441,0.0453,0.0445,0.0427,0.0408,0.0388,0.0368,0.0347,0.0322,0.0293,0.0266,0.0239,0.0212,0.0188,0.0171,0.016,0.0151,0.0141,0.0131,0.0125,0.0123,0.0125,0.0126,0.0117,0.0094,0.0068,0.0057,0.0063,0.0073,0.0076,0.007,0.0063,0.0059,0.0057,0.0054,0.0052,0.0048,0.0042,0.0033]},
    {"label":"2022 Nov","date":"2022-11-13","n":1221,"winner":"Kristiyan Klichev","min":970,"p10":1545,"p25":1808,"median":2169,"mean":2290,"p75":2645,"p90":3161,"p95":3691,"max":4694,"iqr":837,"sd":666,"u25":8.1,"o45":23.3,"pctF":53.8,"medAge":33,"w":{"t":48.4,"hum":69,"wind":6.4,"rainRace":0.0,"rainDay":0.0,"cond":"Clear","code":0},"m26Rank":507,"m26Pct":58.6,"m25Rank":531,"m25Pct":56.6,"kde":[0.0002,0.0005,0.0011,0.0021,0.0034,0.0049,0.0066,0.009,0.0122,0.0158,0.0193,0.0228,0.0266,0.0306,0.0341,0.0367,0.0386,0.0401,0.0409,0.0406,0.04,0.04,0.0403,0.0399,0.0382,0.0348,0.0308,0.0279,0.0267,0.0263,0.0256,0.024,0.0215,0.0186,0.0162,0.015,0.0145,0.0137,0.012,0.0096,0.0076,0.0065,0.0061,0.0059,0.0058,0.0057,0.0054,0.005,0.0049,0.0049,0.0047,0.0046,0.0048,0.0053,0.0056,0.005,0.0037]},
    {"label":"2023","date":"2023-11-19","n":1342,"winner":"Vicente Contreras","min":1027,"p10":1592,"p25":1856,"median":2196,"mean":2293,"p75":2621,"p90":3205,"p95":3453,"max":4855,"iqr":765,"sd":622,"u25":6.3,"o45":22.1,"pctF":55.4,"medAge":33,"w":{"t":50.0,"hum":84,"wind":7.9,"rainRace":0.0,"rainDay":0.0,"cond":"Clear","code":0},"m26Rank":522,"m26Pct":61.2,"m25Rank":569,"m25Pct":57.6,"kde":[0.0001,0.0002,0.0005,0.0011,0.0021,0.0034,0.0051,0.0073,0.0101,0.0134,0.017,0.0209,0.0251,0.0293,0.0327,0.0348,0.0363,0.0382,0.0407,0.0433,0.0449,0.0449,0.0435,0.0414,0.039,0.0367,0.0347,0.033,0.0311,0.0285,0.0258,0.0237,0.0221,0.0202,0.0173,0.0141,0.0116,0.0098,0.0089,0.009,0.01,0.0113,0.0117,0.0105,0.0084,0.0064,0.0052,0.0047,0.0041,0.0034,0.0029,0.0028,0.0026,0.0021,0.0015,0.0011,0.0009]},
    {"label":"2024","date":"2024-11-17","n":1548,"winner":"Primo Beekhuis","min":989,"p10":1562,"p25":1800,"median":2132,"mean":2202,"p75":2526,"p90":2999,"p95":3299,"max":4518,"iqr":726,"sd":569,"u25":8.0,"o45":17.8,"pctF":56.7,"medAge":34,"w":{"t":48.1,"hum":56,"wind":3.6,"rainRace":0.0,"rainDay":0.0,"cond":"Overcast","code":3},"m26Rank":681,"m26Pct":56.1,"m25Rank":722,"m25Pct":53.4,"kde":[0.0001,0.0004,0.0009,0.0017,0.0029,0.0048,0.0073,0.0098,0.0121,0.0148,0.0183,0.0227,0.0277,0.0325,0.0365,0.04,0.0428,0.0445,0.045,0.0452,0.0463,0.0477,0.0473,0.0444,0.0402,0.0362,0.0328,0.0299,0.0275,0.025,0.0225,0.0202,0.0184,0.0167,0.0149,0.0127,0.011,0.0103,0.0104,0.0103,0.0098,0.0088,0.0077,0.0066,0.0055,0.0045,0.0035,0.0028,0.0024,0.0021,0.0019,0.0018,0.0017,0.0016,0.0013,0.0008,0.0003]},
    {"label":"2025","date":"2025-11-16","n":1502,"winner":"Kyle Suhendra","min":1024,"p10":1546,"p25":1810,"median":2152,"mean":2243,"p75":2571,"p90":3013,"p95":3317,"max":4875,"iqr":761,"sd":596,"u25":8.4,"o45":19.4,"pctF":55.9,"medAge":33,"w":{"t":56.0,"hum":92,"wind":7.5,"rainRace":0.0,"rainDay":0.15,"cond":"Overcast","code":3},"m26Rank":626,"m26Pct":58.4,"m25Rank":672,"m25Pct":55.3,"kde":[0.0,0.0001,0.0003,0.0007,0.0016,0.0034,0.0062,0.0101,0.0141,0.0176,0.0203,0.0226,0.0253,0.0289,0.0331,0.0368,0.0395,0.0411,0.0421,0.0431,0.0442,0.0449,0.0444,0.0425,0.0394,0.0361,0.0338,0.0326,0.0314,0.0289,0.0252,0.0215,0.0193,0.0185,0.018,0.0168,0.015,0.0133,0.0117,0.01,0.0083,0.0069,0.0057,0.0047,0.0039,0.0035,0.0035,0.0034,0.0031,0.0027,0.0025,0.0023,0.0022,0.0022,0.0021,0.0019,0.0016]},
    {"label":"2026","date":"2026-11-15","n":1201,"winner":"Eric Fan","min":1023,"p10":1528,"p25":1835,"median":2156,"mean":2251,"p75":2590,"p90":3086,"p95":3461,"max":4772,"iqr":755,"sd":622,"u25":9.4,"o45":19.9,"pctF":53.0,"medAge":35,"w":{"t":57.4,"hum":75,"wind":11.1,"rainRace":0.0,"rainDay":0.6,"cond":"Overcast","code":3},"m26Rank":510,"m26Pct":57.5,"m25Rank":545,"m25Pct":54.7,"kde":[0.0001,0.0004,0.0012,0.0024,0.0041,0.0065,0.0093,0.012,0.0142,0.0162,0.0185,0.021,0.0238,0.0264,0.0292,0.0327,0.0367,0.041,0.0446,0.0465,0.0463,0.0442,0.0413,0.0381,0.0355,0.0342,0.034,0.0341,0.0333,0.0309,0.0271,0.0229,0.0196,0.0176,0.0163,0.015,0.0132,0.0114,0.01,0.0088,0.0077,0.007,0.0067,0.0066,0.0061,0.0055,0.005,0.0045,0.004,0.0036,0.0034,0.0032,0.0028,0.0021,0.0014,0.001,0.0011]}
  ];

  var MAYUR = {
    y2025: { sec: 2090, str: "34:50", rank: 672, n: 1502, pct: 55.3, top: 44.7 },
    y2026: { sec: 2054.47, str: "34:14", rank: 510, n: 1201, pct: 57.5, top: 42.5 }
  };

  var STEPS = [
    { short: "1. History", title: "Eleven editions, 14,621 finishes", metric: "2014 → 2026", caption: "Hover any bar for finisher count, winner, and 8:30 AM weather." },
    { short: "2. Median", title: "Median finish time over 12 years", metric: "34:56 – 36:42", caption: "Every edition’s median lands inside a 1m 46s band." },
    { short: "3. Min & Max", title: "Fastest winners vs. the slowest tail", metric: "15:33 min · 2:11:32 max", caption: "Winners stay near 16–17 min; raw max reflects cutoff enforcement." },
    { short: "4. Dispersion", title: "The one-sided stretch (IQR & P10–P90)", metric: "IQR 11:32 → 13:58 → 12:35", caption: "Q1 stayed flat within 86s; Q3 stretched nearly 4 minutes by 2022." },
    { short: "5. Shapes", title: "Finish-time density by edition (KDE)", metric: "14 – 68 min", caption: "Shaded right tail highlights finishers taking 45+ minutes." },
    { short: "6. Weather", title: "8:30 AM Downtown Berkeley conditions", metric: "48.0°F – 57.4°F", caption: "Cool, calm mornings favor speed; wind (r = +0.65) matters more than temp." },
    { short: "7. My Runs", title: "My 2025 → 2026 runs & Time Machine", metric: "34:50 → 34:14 (−36s)", caption: "Click any edition above to drop 34:14 into that year’s field." }
  ];

  var C = {
    paper: "#fffff8",
    fg: "#1c1b18",
    muted: "#7a7466",
    border: "#d5cebc",
    grid: "#ebe6d6",
    primary: "#a00000",
    slate: "#2f6294",
    green: "#2e7d4f",
    ochre: "#c98a1b"
  };

  function fmtTime(sec) {
    sec = Math.round(sec);
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 60;
    var ss = (s < 10 ? "0" : "") + s;
    if (h > 0) return h + ":" + (m < 10 ? "0" : "") + m + ":" + ss;
    return m + ":" + ss;
  }

  function weatherIcon(w) {
    if (w.rainRace > 0) return "🌧";
    if (w.rainDay >= 0.15) return "🌦";
    if (w.code <= 1) return "☀️";
    if (w.code === 2) return "⛅";
    return "☁️";
  }

  function svgEl(tag, attrs, parent) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { node.setAttribute(k, String(attrs[k])); });
    }
    if (parent) parent.appendChild(node);
    return node;
  }

  function getTimelineX(i, x0, x1) {
    var slots = [0, 1, 2, 3, 5, 7.2, 8.2, 9.2, 10.2, 11.2, 12.2];
    return x0 + (slots[i] / 12.2) * (x1 - x0);
  }

  function drawTimelineAxis(g, x0, x1, yBottom) {
    svgEl("line", { x1: x0, x2: x1, y1: yBottom, y2: yBottom, stroke: C.border, "stroke-width": 1 }, g);
    DATA.forEach(function (d, i) {
      var x = getTimelineX(i, x0, x1);
      var lbl = d.label === "2022 Feb" ? "’22 Feb" : d.label === "2022 Nov" ? "’22 Nov" : d.label;
      var t = svgEl("text", { x: x, y: yBottom + 16, "text-anchor": "middle", fill: C.muted, "font-size": 10.5, class: "sans" }, g);
      t.textContent = lbl;
    });
  }

  function init() {
    var root = document.getElementById("b5k-root");
    if (!root) return;

    var nav = document.getElementById("b5k-nav");
    var svg = document.getElementById("b5k-viz");
    var kicker = document.getElementById("b5k-kicker");
    var titleEl = document.getElementById("b5k-title");
    var metricEl = document.getElementById("b5k-metric");
    var controls = document.getElementById("b5k-controls");
    var captionEl = document.getElementById("b5k-caption");
    var stepNumEl = document.getElementById("b5k-step-num");
    var progress = document.getElementById("b5k-progress");
    var graphic = root.querySelector(".b5k-graphic");
    var stepEls = Array.prototype.slice.call(root.querySelectorAll(".b5k-step"));

    var tooltip = document.createElement("div");
    tooltip.className = "b5k-tooltip";
    document.body.appendChild(tooltip);

    var state = {
      step: 0,
      extremesFull: true,
      weatherMode: "timeline",
      tmYearIdx: 10
    };

    function showTip(evt, d) {
      var extra = d.label === "2025"
        ? '<div class="b5k-tip-me">Mayur: 34:50 (#672/' + d.n.toLocaleString() + " · 55.3rd pct)</div>"
        : d.label === "2026"
        ? '<div class="b5k-tip-me">Mayur: 34:14 (#510/' + d.n.toLocaleString() + " · 57.5th pct)</div>"
        : "";
      var rainNote = d.w.rainRace > 0 ? " · drizzle" : (d.w.rainDay >= 0.15 ? ' · ' + d.w.rainDay + '" later' : "");
      tooltip.innerHTML =
        '<div class="b5k-tip-title">' + d.label + " · " + d.date + "</div>" +
        '<div class="b5k-tip-rows">' +
          "<div>Finishers: <strong>" + d.n.toLocaleString() + "</strong> (Winner: " + d.winner + ")</div>" +
          "<div>Min / Med / Max: <strong>" + fmtTime(d.min) + "</strong> / <strong>" + fmtTime(d.median) + "</strong> / " + fmtTime(d.max) + "</div>" +
          "<div>IQR (Q1–Q3): <strong>" + fmtTime(d.iqr) + "</strong> (" + fmtTime(d.p25) + "–" + fmtTime(d.p75) + ")</div>" +
          "<div>8:30 AM: " + weatherIcon(d.w) + " " + d.w.t + "°F · " + d.w.wind + " mph · " + d.w.hum + "% RH" + rainNote + "</div>" +
        "</div>" + extra;
      tooltip.classList.add("is-visible");
      var pad = 14;
      var rect = tooltip.getBoundingClientRect();
      var x = evt.clientX + pad;
      var y = evt.clientY - rect.height - 10;
      if (x + rect.width > window.innerWidth - 10) x = evt.clientX - rect.width - pad;
      if (y < 10) y = evt.clientY + pad;
      tooltip.style.left = x + "px";
      tooltip.style.top = y + "px";
    }

    function hideTip() {
      tooltip.classList.remove("is-visible");
    }

    function clearSvg() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
    }

    function bindHover(node, d) {
      node.style.cursor = "pointer";
      node.addEventListener("mousemove", function (e) { showTip(e, d); });
      node.addEventListener("mouseleave", hideTip);
    }

    /* -------- STEP 0: FIELD SIZE & HISTORY -------- */
    function renderHistory() {
      var x0 = 56, x1 = 626, y0 = 38, y1 = 350, maxN = 1750;
      var g = svgEl("g", {}, svg);
      var yOf = function (v) { return y1 - (v / maxN) * (y1 - y0); };

      [0, 500, 1000, 1500].forEach(function (v) {
        var y = yOf(v);
        svgEl("line", { x1: x0, x2: x1, y1: y, y2: y, stroke: C.grid, "stroke-dasharray": v ? "3,3" : "none" }, g);
        var t = svgEl("text", { x: x0 - 8, y: y + 4, "text-anchor": "end", fill: C.muted, "font-size": 10.5, class: "mono" }, g);
        t.textContent = v.toLocaleString();
      });

      var x2018 = x0 + (4 / 12.2) * (x1 - x0);
      var x2020 = x0 + (6.1 / 12.2) * (x1 - x0);
      [[x2018, "2018", "Camp Fire", "smoke"], [x2020, "2020–21", "COVID-19", "hiatus"]].forEach(function (item) {
        svgEl("line", { x1: item[0], x2: item[0], y1: y0 + 22, y2: y1, stroke: C.border, "stroke-dasharray": "4,4", "stroke-width": 1.2 }, g);
        [item[1], item[2], item[3]].forEach(function (ln, k) {
          var t = svgEl("text", { x: item[0], y: y0 + 6 + k * 12, "text-anchor": "middle", fill: C.muted, "font-size": k === 0 ? 10 : 9.5, "font-weight": k === 0 ? 700 : 400, class: "sans" }, g);
          t.textContent = ln;
        });
      });

      var barW = 30;
      DATA.forEach(function (d, i) {
        var cx = getTimelineX(i, x0, x1);
        var y = yOf(d.n);
        var isMe = d.label === "2025" || d.label === "2026";
        var rect = svgEl("rect", {
          x: cx - barW / 2, y: y, width: barW, height: y1 - y, rx: 4,
          fill: isMe ? C.primary : C.slate, opacity: isMe ? 0.88 : 0.62
        }, g);
        bindHover(rect, d);

        var lbl = svgEl("text", {
          x: cx, y: y - 6, "text-anchor": "middle",
          fill: isMe ? C.primary : C.fg, "font-size": 10, "font-weight": isMe ? 700 : 500, class: "mono"
        }, g);
        lbl.textContent = d.n.toLocaleString();
      });

      var lg = svgEl("text", { x: x1, y: 18, "text-anchor": "end", fill: C.muted, "font-size": 10.5, class: "sans" }, g);
      lg.textContent = "Crimson bars: 2025 & 2026 editions I ran";
      drawTimelineAxis(g, x0, x1, y1);
    }

    /* -------- STEP 1: MEDIAN EVOLUTION -------- */
    function renderMedian() {
      var x0 = 56, x1 = 626, y0 = 38, y1 = 350, minM = 32, maxM = 39;
      var g = svgEl("g", {}, svg);
      var yOf = function (sec) { return y1 - ((sec / 60 - minM) / (maxM - minM)) * (y1 - y0); };

      var yFast = yOf(2096), ySlow = yOf(2202);
      svgEl("rect", { x: x0, y: ySlow, width: x1 - x0, height: yFast - ySlow, fill: C.primary, opacity: 0.08 }, g);
      var bandLbl = svgEl("text", { x: x1 - 4, y: ySlow - 6, "text-anchor": "end", fill: C.primary, "font-size": 10.5, "font-weight": 600, class: "sans" }, g);
      bandLbl.textContent = "12-year median band: 1m 46s total span (34:56 – 36:42)";

      for (var m = minM; m <= maxM; m++) {
        var y = yOf(m * 60);
        svgEl("line", { x1: x0, x2: x1, y1: y, y2: y, stroke: C.grid, "stroke-dasharray": "3,3" }, g);
        var t = svgEl("text", { x: x0 - 8, y: y + 4, "text-anchor": "end", fill: C.muted, "font-size": 10.5, class: "mono" }, g);
        t.textContent = m + ":00";
      }

      var pts = DATA.map(function (d, i) { return [getTimelineX(i, x0, x1), yOf(d.median)]; });
      var pathD = pts.map(function (p, i) { return (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" ");
      svgEl("path", { d: pathD, fill: "none", stroke: C.primary, "stroke-width": 2.6, "stroke-linejoin": "round" }, g);

      DATA.forEach(function (d, i) {
        var x = pts[i][0], y = pts[i][1];
        var dot = svgEl("circle", { cx: x, cy: y, r: 5.5, fill: C.primary, stroke: C.paper, "stroke-width": 2 }, g);
        bindHover(dot, d);
        var dy = (i === 0 || i === 3 || i === 8) ? 18 : -11;
        var lbl = svgEl("text", { x: x, y: y + dy, "text-anchor": "middle", fill: C.fg, "font-size": 10.5, "font-weight": 600, class: "mono" }, g);
        lbl.textContent = fmtTime(d.median);
      });

      drawTimelineAxis(g, x0, x1, y1);
    }

    /* -------- STEP 2: MIN, P95, MAX EXTREMES -------- */
    function renderExtremes() {
      var x0 = 58, x1 = 626, y0 = 36, y1 = 350;
      var g = svgEl("g", {}, svg);
      var maxMin = state.extremesFull ? 140 : 75;
      var minMin = 10;
      var yOf = function (sec) { return y1 - ((sec / 60 - minMin) / (maxMin - minMin)) * (y1 - y0); };

      var ticks = state.extremesFull ? [15, 30, 45, 60, 75, 90, 105, 120, 135] : [15, 25, 35, 45, 55, 65, 75];
      ticks.forEach(function (m) {
        var y = yOf(m * 60);
        svgEl("line", { x1: x0, x2: x1, y1: y, y2: y, stroke: C.grid, "stroke-dasharray": "3,3" }, g);
        var t = svgEl("text", { x: x0 - 8, y: y + 4, "text-anchor": "end", fill: C.muted, "font-size": 10.5, class: "mono" }, g);
        t.textContent = m >= 60 ? Math.floor(m / 60) + ":" + ((m % 60) < 10 ? "0" : "") + (m % 60) : m + "m";
      });

      var y60 = yOf(3600);
      svgEl("line", { x1: x0, x2: x1, y1: y60, y2: y60, stroke: C.ochre, "stroke-dasharray": "5,4", "stroke-width": 1.3 }, g);
      var cutLbl = svgEl("text", { x: x1 - 4, y: y60 - 5, "text-anchor": "end", fill: C.ochre, "font-size": 10, "font-weight": 600, class: "sans" }, g);
      cutLbl.textContent = "Official 1-hour course limit";

      DATA.forEach(function (d, i) {
        var x = getTimelineX(i, x0, x1);
        var yMin = yOf(d.min), yMed = yOf(d.median), yP95 = yOf(d.p95), yMax = Math.max(y0, yOf(d.max));

        svgEl("line", { x1: x, x2: x, y1: yMin, y2: state.extremesFull ? yMax : yP95, stroke: C.border, "stroke-width": 2 }, g);
        bindHover(svgEl("circle", { cx: x, cy: yMin, r: 4.8, fill: C.green, stroke: C.paper, "stroke-width": 1.5 }, g), d);
        bindHover(svgEl("circle", { cx: x, cy: yMed, r: 4.5, fill: C.primary, stroke: C.paper, "stroke-width": 1.5 }, g), d);
        bindHover(svgEl("circle", { cx: x, cy: yP95, r: 4, fill: C.slate, stroke: C.paper, "stroke-width": 1.2 }, g), d);

        if (state.extremesFull) {
          bindHover(svgEl("circle", { cx: x, cy: yMax, r: 4.5, fill: C.ochre, stroke: C.paper, "stroke-width": 1.5 }, g), d);
          if (d.max > 6000) {
            var tm = svgEl("text", { x: x, y: yMax - 8, "text-anchor": "middle", fill: C.ochre, "font-size": 9.8, "font-weight": 700, class: "mono" }, g);
            tm.textContent = fmtTime(d.max);
          }
        } else {
          var t95 = svgEl("text", { x: x, y: yP95 - 8, "text-anchor": "middle", fill: C.slate, "font-size": 9.5, class: "mono" }, g);
          t95.textContent = fmtTime(d.p95);
        }

        if (d.label === "2015") {
          var cr = svgEl("text", { x: x, y: yMin + 15, "text-anchor": "middle", fill: C.green, "font-size": 9.8, "font-weight": 700, class: "mono" }, g);
          cr.textContent = "15:33 CR";
        }
      });

      var items = [[C.green, "Min (Winner)"], [C.primary, "Median"], [C.slate, "95th pct"]];
      if (state.extremesFull) items.push([C.ochre, "Max (Slowest)"]);
      items.forEach(function (it, k) {
        var lx = x0 + k * 118;
        svgEl("circle", { cx: lx + 5, cy: 14, r: 4.5, fill: it[0] }, g);
        var t = svgEl("text", { x: lx + 14, y: 18, fill: C.muted, "font-size": 10.5, class: "sans" }, g);
        t.textContent = it[1];
      });

      drawTimelineAxis(g, x0, x1, y1);
    }

    /* -------- STEP 3: DISPERSION FAN (P10-P90 & IQR) -------- */
    function renderDispersion() {
      var x0 = 56, x1 = 620, y0 = 36, y1 = 350, minM = 22, maxM = 60;
      var g = svgEl("g", {}, svg);
      var yOf = function (sec) { return y1 - ((sec / 60 - minM) / (maxM - minM)) * (y1 - y0); };

      [25, 30, 35, 40, 45, 50, 55, 60].forEach(function (m) {
        var y = yOf(m * 60);
        svgEl("line", { x1: x0, x2: x1, y1: y, y2: y, stroke: C.grid, "stroke-dasharray": "3,3" }, g);
        var t = svgEl("text", { x: x0 - 8, y: y + 4, "text-anchor": "end", fill: C.muted, "font-size": 10.5, class: "mono" }, g);
        t.textContent = m + "m";
      });

      function areaPath(lo, hi) {
        var top = DATA.map(function (d, i) { return getTimelineX(i, x0, x1).toFixed(1) + "," + yOf(d[hi]).toFixed(1); });
        var bot = DATA.map(function (d, i) { return getTimelineX(i, x0, x1).toFixed(1) + "," + yOf(d[lo]).toFixed(1); }).reverse();
        return "M" + top.join("L") + "L" + bot.join("L") + "Z";
      }

      function linePath(key) {
        return "M" + DATA.map(function (d, i) { return getTimelineX(i, x0, x1).toFixed(1) + "," + yOf(d[key]).toFixed(1); }).join("L");
      }

      svgEl("path", { d: areaPath("p10", "p90"), fill: C.slate, opacity: 0.13 }, g);
      svgEl("path", { d: areaPath("p25", "p75"), fill: C.primary, opacity: 0.22 }, g);
      svgEl("path", { d: linePath("p25"), fill: "none", stroke: C.primary, "stroke-width": 1.3, opacity: 0.7 }, g);
      svgEl("path", { d: linePath("p75"), fill: "none", stroke: C.primary, "stroke-width": 1.3, opacity: 0.7 }, g);
      svgEl("path", { d: linePath("median"), fill: "none", stroke: C.primary, "stroke-width": 2.6 }, g);

      DATA.forEach(function (d, i) {
        var x = getTimelineX(i, x0, x1);
        bindHover(svgEl("rect", { x: x - 18, y: y0, width: 36, height: y1 - y0, fill: "transparent" }, g), d);
        svgEl("circle", { cx: x, cy: yOf(d.median), r: 3.8, fill: C.primary, style: "pointer-events:none;" }, g);
        if (["2014", "2016", "2019", "2022 Feb", "2024", "2026"].indexOf(d.label) !== -1) {
          var t = svgEl("text", { x: x, y: yOf(d.p75) - 7, "text-anchor": "middle", fill: C.primary, "font-size": 9.8, "font-weight": 700, class: "mono", style: "pointer-events:none;" }, g);
          t.textContent = fmtTime(d.iqr);
        }
      });

      var last = DATA[DATA.length - 1];
      [["P90", last.p90, C.slate], ["Q3", last.p75, C.primary], ["Med", last.median, C.primary], ["Q1", last.p25, C.primary], ["P10", last.p10, C.slate]].forEach(function (r) {
        var t = svgEl("text", { x: x1 + 6, y: yOf(r[1]) + 3.5, fill: r[2], "font-size": 9.8, "font-weight": 600, class: "sans" }, g);
        t.textContent = r[0];
      });

      var ann = svgEl("text", { x: x0 + 4, y: 18, fill: C.muted, "font-size": 10.5, class: "sans" }, g);
      ann.textContent = "Labels above Q3 show IQR width · Outer band = P10–P90";
      drawTimelineAxis(g, x0, x1, y1);
    }

    /* -------- STEP 4: RIDGELINE KDE DISTRIBUTIONS -------- */
    function renderRidgelines() {
      var x0 = 76, x1 = 622, yTop = 36, yBot = 365, minM = 14, maxM = 68;
      var g = svgEl("g", {}, svg);
      var xOf = function (m) { return x0 + ((m - minM) / (maxM - minM)) * (x1 - x0); };

      [20, 25, 30, 35, 40, 45, 50, 55, 60, 65].forEach(function (m) {
        var x = xOf(m);
        svgEl("line", { x1: x, x2: x, y1: yTop - 10, y2: yBot, stroke: m === 45 ? C.ochre : C.grid, "stroke-dasharray": m === 45 ? "4,3" : "2,3", opacity: m === 45 ? 0.8 : 1 }, g);
        var t = svgEl("text", { x: x, y: yBot + 16, "text-anchor": "middle", fill: m === 45 ? C.ochre : C.muted, "font-size": 10.5, "font-weight": m === 45 ? 700 : 400, class: "mono" }, g);
        t.textContent = m + "m";
      });

      var tailLbl = svgEl("text", { x: xOf(45) + 5, y: 18, fill: C.ochre, "font-size": 10.5, "font-weight": 600, class: "sans" }, g);
      tailLbl.textContent = "45+ min tail (walkers & strollers)";

      var rowStep = (yBot - yTop) / DATA.length;
      var ridgeH = 44;

      DATA.forEach(function (d, idx) {
        var baseY = yTop + (idx + 0.9) * rowStep;
        var pts = [], tailPts = [];
        for (var k = 0; k < d.kde.length; k++) {
          var m = 14 + k;
          if (m > maxM) break;
          var x = xOf(m);
          var y = baseY - (d.kde[k] / 0.052) * ridgeH;
          pts.push([x, y]);
          if (m >= 45) tailPts.push([x, y]);
        }

        var isMe = d.label === "2025" || d.label === "2026";
        var grp = svgEl("g", {}, g);
        var areaD = "M" + pts[0][0].toFixed(1) + "," + baseY.toFixed(1) +
          pts.map(function (p) { return "L" + p[0].toFixed(1) + "," + p[1].toFixed(1); }).join("") +
          "L" + pts[pts.length - 1][0].toFixed(1) + "," + baseY.toFixed(1) + "Z";
        svgEl("path", { d: areaD, fill: isMe ? C.primary : C.slate, opacity: isMe ? 0.2 : 0.13 }, grp);

        if (tailPts.length > 1) {
          var tD = "M" + tailPts[0][0].toFixed(1) + "," + baseY.toFixed(1) +
            tailPts.map(function (p) { return "L" + p[0].toFixed(1) + "," + p[1].toFixed(1); }).join("") +
            "L" + tailPts[tailPts.length - 1][0].toFixed(1) + "," + baseY.toFixed(1) + "Z";
          svgEl("path", { d: tD, fill: C.ochre, opacity: 0.28 }, grp);
        }

        var strokeD = "M" + pts.map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join("L");
        svgEl("path", { d: strokeD, fill: "none", stroke: isMe ? C.primary : C.slate, "stroke-width": isMe ? 1.8 : 1.25 }, grp);

        var mx = xOf(d.median / 60);
        svgEl("line", { x1: mx, x2: mx, y1: baseY - 12, y2: baseY, stroke: C.primary, "stroke-width": 2 }, grp);

        var yl = svgEl("text", { x: x0 - 8, y: baseY - 2, "text-anchor": "end", fill: isMe ? C.primary : C.fg, "font-size": 10.5, "font-weight": isMe ? 700 : 500, class: "sans" }, grp);
        yl.textContent = d.label;

        var pl = svgEl("text", { x: x1 + 4, y: baseY - 2, fill: C.muted, "font-size": 9.5, class: "mono" }, grp);
        pl.textContent = d.o45 + "%";

        bindHover(grp, d);
      });
    }

    /* -------- STEP 5: WEATHER & SPEED -------- */
    function renderWeather() {
      var x0 = 58, x1 = 620, y0 = 42, y1 = 345;
      var g = svgEl("g", {}, svg);

      if (state.weatherMode === "timeline") {
        var yMid = 198, tMin = 44, tMax = 62;
        var yT = function (t) { return (yMid - 28) - ((t - tMin) / (tMax - tMin)) * ((yMid - 28) - y0); };
        [46, 50, 54, 58].forEach(function (t) {
          var y = yT(t);
          svgEl("line", { x1: x0, x2: x1, y1: y, y2: y, stroke: C.grid, "stroke-dasharray": "2,3" }, g);
          var lb = svgEl("text", { x: x0 - 8, y: y + 3.5, "text-anchor": "end", fill: C.muted, "font-size": 10, class: "mono" }, g);
          lb.textContent = t + "°F";
        });

        var topTitle = svgEl("text", { x: x0, y: 20, fill: C.fg, "font-size": 11, "font-weight": 600, class: "sans" }, g);
        topTitle.textContent = "8:30 AM Temperature (°F) & Sky Conditions";

        var tPts = DATA.map(function (d, i) { return [getTimelineX(i, x0, x1), yT(d.w.t)]; });
        svgEl("path", { d: "M" + tPts.map(function (p) { return p.join(","); }).join("L"), fill: "none", stroke: C.ochre, "stroke-width": 2.2 }, g);
        DATA.forEach(function (d, i) {
          bindHover(svgEl("circle", { cx: tPts[i][0], cy: tPts[i][1], r: 4.5, fill: C.ochre, stroke: C.paper, "stroke-width": 1.5 }, g), d);
          var ic = svgEl("text", { x: tPts[i][0], y: tPts[i][1] - 10, "text-anchor": "middle", "font-size": 13 }, g);
          ic.textContent = weatherIcon(d.w);
        });

        var bTop = yMid + 16, bBot = y1, wMax = 13;
        var yW = function (w) { return bBot - (w / wMax) * (bBot - bTop); };
        var yM = function (sec) { return bBot - ((sec / 60 - 34) / (37.5 - 34)) * (bBot - bTop); };

        [0, 4, 8, 12].forEach(function (w) {
          var y = yW(w);
          svgEl("line", { x1: x0, x2: x1, y1: y, y2: y, stroke: C.grid, "stroke-dasharray": "2,3" }, g);
          var lb = svgEl("text", { x: x0 - 8, y: y + 3.5, "text-anchor": "end", fill: C.slate, "font-size": 10, class: "mono" }, g);
          lb.textContent = w + "mph";
        });

        var botTitle = svgEl("text", { x: x0, y: bTop - 6, fill: C.fg, "font-size": 11, "font-weight": 600, class: "sans" }, g);
        botTitle.textContent = "Wind Speed (bars, mph) vs. Median 5K Time (crimson line · r = +0.65)";

        DATA.forEach(function (d, i) {
          var x = getTimelineX(i, x0, x1);
          var y = yW(d.w.wind);
          bindHover(svgEl("rect", { x: x - 11, y: y, width: 22, height: bBot - y, rx: 3, fill: C.slate, opacity: 0.34 }, g), d);
        });

        var mPts = DATA.map(function (d, i) { return [getTimelineX(i, x0, x1), yM(d.median)]; });
        svgEl("path", { d: "M" + mPts.map(function (p) { return p.join(","); }).join("L"), fill: "none", stroke: C.primary, "stroke-width": 2.3 }, g);
        DATA.forEach(function (d, i) {
          bindHover(svgEl("circle", { cx: mPts[i][0], cy: mPts[i][1], r: 4, fill: C.primary, stroke: C.paper, "stroke-width": 1.3 }, g), d);
        });

        drawTimelineAxis(g, x0, x1, y1);
      } else {
        var isTemp = state.weatherMode === "temp";
        var xMin = isTemp ? 46 : 0, xMax = isTemp ? 60 : 13;
        var yMin = 34.4, yMax = 37.2;
        var xOf = function (v) { return x0 + ((v - xMin) / (xMax - xMin)) * (x1 - x0); };
        var yOf = function (sec) { return y1 - ((sec / 60 - yMin) / (yMax - yMin)) * (y1 - y0); };

        [34.5, 35, 35.5, 36, 36.5, 37].forEach(function (m) {
          var y = yOf(m * 60);
          svgEl("line", { x1: x0, x2: x1, y1: y, y2: y, stroke: C.grid, "stroke-dasharray": "3,3" }, g);
          var lb = svgEl("text", { x: x0 - 8, y: y + 4, "text-anchor": "end", fill: C.muted, "font-size": 10.5, class: "mono" }, g);
          lb.textContent = fmtTime(m * 60);
        });

        (isTemp ? [48, 50, 52, 54, 56, 58] : [2, 4, 6, 8, 10, 12]).forEach(function (v) {
          var x = xOf(v);
          svgEl("line", { x1: x, x2: x, y1: y0, y2: y1, stroke: C.grid, "stroke-dasharray": "3,3" }, g);
          var lb = svgEl("text", { x: x, y: y1 + 17, "text-anchor": "middle", fill: C.muted, "font-size": 10.5, class: "mono" }, g);
          lb.textContent = isTemp ? v + "°F" : v + " mph";
        });

        var xs = DATA.map(function (d) { return isTemp ? d.w.t : d.w.wind; });
        var ys = DATA.map(function (d) { return d.median / 60; });
        var mx = xs.reduce(function (a, b) { return a + b; }, 0) / xs.length;
        var my = ys.reduce(function (a, b) { return a + b; }, 0) / ys.length;
        var num = 0, den = 0;
        for (var i = 0; i < xs.length; i++) { num += (xs[i] - mx) * (ys[i] - my); den += (xs[i] - mx) * (xs[i] - mx); }
        var slope = num / den, intercept = my - slope * mx;
        svgEl("line", {
          x1: xOf(xMin + 0.5), y1: yOf((intercept + slope * (xMin + 0.5)) * 60),
          x2: xOf(xMax - 0.5), y2: yOf((intercept + slope * (xMax - 0.5)) * 60),
          stroke: C.primary, "stroke-dasharray": "5,4", "stroke-width": 1.6, opacity: 0.65
        }, g);

        DATA.forEach(function (d) {
          var x = xOf(isTemp ? d.w.t : d.w.wind);
          var y = yOf(d.median);
          var isRainy = d.w.rainRace > 0 || d.w.rainDay >= 0.15;
          bindHover(svgEl("circle", { cx: x, cy: y, r: 6.5, fill: isRainy ? C.slate : C.primary, opacity: 0.85, stroke: C.paper, "stroke-width": 2 }, g), d);
          var lb = svgEl("text", { x: x, y: y - 10, "text-anchor": "middle", fill: C.fg, "font-size": 10, "font-weight": 600, class: "sans" }, g);
          lb.textContent = d.label;
        });

        var hdr = svgEl("text", { x: x0, y: 20, fill: C.muted, "font-size": 11, class: "sans" }, g);
        hdr.textContent = isTemp
          ? "8:30 AM Temperature vs. Median Time (r = −0.11 · narrow 48–57°F window)"
          : "8:30 AM Wind Speed vs. Median Time (r = +0.65 · calmer mornings run faster)";
      }
    }

    /* -------- STEP 6: MAYUR'S RUNS & TIME MACHINE -------- */
    function renderMayur() {
      var x0 = 48, x1 = 626, y0 = 52, y1 = 330, minM = 15, maxM = 65;
      var g = svgEl("g", {}, svg);
      var ed = DATA[state.tmYearIdx];
      var xOf = function (m) { return x0 + ((m - minM) / (maxM - minM)) * (x1 - x0); };
      var maxK = Math.max.apply(null, ed.kde) * 1.15;
      var yOf = function (k) { return y1 - (k / maxK) * (y1 - y0); };

      [20, 25, 30, 35, 40, 45, 50, 55, 60].forEach(function (m) {
        var x = xOf(m);
        svgEl("line", { x1: x, x2: x, y1: y0, y2: y1, stroke: C.grid, "stroke-dasharray": "2,3" }, g);
        var lb = svgEl("text", { x: x, y: y1 + 17, "text-anchor": "middle", fill: C.muted, "font-size": 10.5, class: "mono" }, g);
        lb.textContent = m + ":00";
      });

      var pts = [];
      for (var k = 0; k < ed.kde.length; k++) {
        var m = 14 + k;
        if (m < minM || m > maxM) continue;
        pts.push([m, xOf(m), yOf(ed.kde[k])]);
      }

      var my26Min = MAYUR.y2026.sec / 60;
      var my25Min = MAYUR.y2025.sec / 60;
      var isActual25 = ed.label === "2025";
      var isActual26 = ed.label === "2026";
      var activeMin = isActual25 ? my25Min : my26Min;

      var fullD = "M" + pts[0][1].toFixed(1) + "," + y1 +
        pts.map(function (p) { return "L" + p[1].toFixed(1) + "," + p[2].toFixed(1); }).join("") +
        "L" + pts[pts.length - 1][1].toFixed(1) + "," + y1 + "Z";
      svgEl("path", { d: fullD, fill: C.slate, opacity: 0.13 }, g);

      var rightPts = pts.filter(function (p) { return p[0] > activeMin; });
      if (rightPts.length > 0) {
        var xStart = xOf(activeMin);
        var idxL = Math.max(0, Math.floor(activeMin) - 14);
        var idxR = Math.min(ed.kde.length - 1, idxL + 1);
        var frac = activeMin - Math.floor(activeMin);
        var kInterp = ed.kde[idxL] * (1 - frac) + ed.kde[idxR] * frac;
        var rD = "M" + xStart.toFixed(1) + "," + y1 + "L" + xStart.toFixed(1) + "," + yOf(kInterp).toFixed(1) +
          rightPts.map(function (p) { return "L" + p[1].toFixed(1) + "," + p[2].toFixed(1); }).join("") +
          "L" + rightPts[rightPts.length - 1][1].toFixed(1) + "," + y1 + "Z";
        svgEl("path", { d: rD, fill: C.primary, opacity: 0.22 }, g);
      }

      svgEl("path", { d: "M" + pts.map(function (p) { return p[1].toFixed(1) + "," + p[2].toFixed(1); }).join("L"), fill: "none", stroke: C.fg, "stroke-width": 1.8, opacity: 0.78 }, g);

      var xMed = xOf(ed.median / 60);
      svgEl("line", { x1: xMed, x2: xMed, y1: y0 + 18, y2: y1, stroke: C.muted, "stroke-dasharray": "4,3", "stroke-width": 1.5 }, g);
      var medLbl = svgEl("text", { x: xMed + 5, y: y0 + 30, fill: C.muted, "font-size": 10.5, class: "mono" }, g);
      medLbl.textContent = "Median " + fmtTime(ed.median);

      if (isActual26) {
        var x25 = xOf(my25Min);
        svgEl("line", { x1: x25, x2: x25, y1: y0 + 44, y2: y1, stroke: C.ochre, "stroke-dasharray": "3,3", "stroke-width": 1.6 }, g);
        var l25 = svgEl("text", { x: x25 + 5, y: y0 + 56, fill: C.ochre, "font-size": 10, "font-weight": 600, class: "mono" }, g);
        l25.textContent = "2025: 34:50";
      }

      var xMe = xOf(activeMin);
      svgEl("line", { x1: xMe, x2: xMe, y1: y0 - 4, y2: y1, stroke: C.primary, "stroke-width": 2.6 }, g);
      svgEl("circle", { cx: xMe, cy: y0 - 4, r: 5, fill: C.primary }, g);

      var rank = isActual25 ? ed.m25Rank : ed.m26Rank;
      var pct = isActual25 ? ed.m25Pct : ed.m26Pct;
      var topPct = (100 - pct).toFixed(1);
      var timeStr = isActual25 ? "34:50" : "34:14";

      var badgeLbl = svgEl("text", { x: xMe - 8, y: y0 + 4, "text-anchor": "end", fill: C.primary, "font-size": 12, "font-weight": 700, class: "sans" }, g);
      badgeLbl.textContent = isActual26 ? "2026: " + timeStr : (isActual25 ? "2025: " + timeStr : "34:14 in " + ed.label);

      var badgeSub = svgEl("text", { x: xMe - 8, y: y0 + 19, "text-anchor": "end", fill: C.fg, "font-size": 10.5, class: "mono" }, g);
      badgeSub.textContent = "#" + rank + " of " + ed.n.toLocaleString() + " · Top " + topPct + "%";

      var shadeTxt = svgEl("text", { x: xOf(45), y: y1 - 14, "text-anchor": "middle", fill: C.primary, "font-size": 11, "font-weight": 700, class: "sans" }, g);
      shadeTxt.textContent = "Faster than " + pct + "% of " + ed.label + " finishers";

      var strip = svgEl("text", { x: x0, y: 386, fill: C.muted, "font-size": 10.5, class: "sans" }, g);
      if (isActual26) {
        strip.textContent = "2026 actual · Male #309/550 · M30–39 #56/106 · " + weatherIcon(ed.w) + " " + ed.w.t + "°F, " + ed.w.wind + " mph wind";
      } else if (isActual25) {
        strip.textContent = "2025 actual · Male #366/654 · M30–39 #58/117 · " + weatherIcon(ed.w) + " " + ed.w.t + "°F, " + ed.w.wind + " mph wind";
      } else {
        var diff = ed.median - MAYUR.y2026.sec;
        strip.textContent = "Time Machine (" + ed.label + "): " + fmtTime(diff) + " faster than " + ed.label + "’s " + fmtTime(ed.median) + " median · " + weatherIcon(ed.w) + " " + ed.w.t + "°F";
      }
    }

    function renderControls() {
      controls.innerHTML = "";
      controls.classList.remove("is-open");

      if (state.step === 2) {
        controls.classList.add("is-open");
        [[true, "Full range (incl. 2h+ max)"], [false, "Core race zoom (15–75m, P95)"]].forEach(function (opt) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "b5k-ctrl-btn" + (state.extremesFull === opt[0] ? " is-active" : "");
          b.textContent = opt[1];
          b.onclick = function () { state.extremesFull = opt[0]; render(); };
          controls.appendChild(b);
        });
      } else if (state.step === 5) {
        controls.classList.add("is-open");
        [["timeline", "By edition (Temp & Wind)"], ["wind", "Wind vs. Median (r = +0.65)"], ["temp", "Temp vs. Median (r = −0.11)"]].forEach(function (opt) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "b5k-ctrl-btn" + (state.weatherMode === opt[0] ? " is-active" : "");
          b.textContent = opt[1];
          b.onclick = function () { state.weatherMode = opt[0]; render(); };
          controls.appendChild(b);
        });
      } else if (state.step === 6) {
        controls.classList.add("is-open");
        var lbl = document.createElement("span");
        lbl.className = "b5k-ctrl-label";
        lbl.textContent = "Time Machine:";
        controls.appendChild(lbl);
        DATA.forEach(function (d, idx) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "b5k-ctrl-btn is-mono" + (state.tmYearIdx === idx ? " is-active" : "");
          b.textContent = d.label.replace("2022 ", "’22 ");
          b.onclick = function () { state.tmYearIdx = idx; render(); };
          controls.appendChild(b);
        });
      }
    }

    function render() {
      hideTip();
      clearSvg();
      var st = STEPS[state.step];
      kicker.textContent = "Step " + (state.step + 1) + " of " + STEPS.length;
      titleEl.textContent = st.title;
      metricEl.textContent = st.metric;
      captionEl.textContent = st.caption;
      stepNumEl.textContent = (state.step + 1) + " / " + STEPS.length;

      Array.prototype.forEach.call(progress.children, function (b, k) {
        b.classList.toggle("is-done", k <= state.step);
      });
      Array.prototype.forEach.call(nav.children, function (btn, k) {
        btn.classList.toggle("is-active", k === state.step);
      });
      stepEls.forEach(function (s, k) {
        s.classList.toggle("is-active", k === state.step);
      });

      renderControls();

      switch (state.step) {
        case 0: renderHistory(); break;
        case 1: renderMedian(); break;
        case 2: renderExtremes(); break;
        case 3: renderDispersion(); break;
        case 4: renderRidgelines(); break;
        case 5: renderWeather(); break;
        case 6: renderMayur(); break;
      }
    }

    // Build quick-jump nav & progress bars
    STEPS.forEach(function (st, k) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = st.short;
      btn.onclick = function () {
        state.step = k;
        render();
        stepEls[k].scrollIntoView({ behavior: "smooth", block: "center" });
      };
      nav.appendChild(btn);

      var bar = document.createElement("span");
      progress.appendChild(bar);
    });

    // Populate reference table if present
    var tbody = document.getElementById("b5k-ref-tbody");
    if (tbody) {
      DATA.forEach(function (d) {
        var tr = document.createElement("tr");
        if (d.label === "2025" || d.label === "2026") tr.className = "is-me";
        var rainExtra = (d.w.rainDay >= 0.15 && d.w.rainRace === 0) ? ' (' + d.w.rainDay + '" later)' : "";
        tr.innerHTML =
          '<td><strong>' + d.label + '</strong><span class="b5k-ref-date">' + d.date.slice(5) + "</span></td>" +
          '<td class="num">' + d.n.toLocaleString() + "</td>" +
          '<td class="num">' + fmtTime(d.min) + "</td>" +
          '<td class="num">' + fmtTime(d.p25) + "</td>" +
          '<td class="num is-med">' + fmtTime(d.median) + "</td>" +
          '<td class="num">' + fmtTime(d.p75) + "</td>" +
          '<td class="num is-iqr">' + fmtTime(d.iqr) + "</td>" +
          '<td class="num">' + fmtTime(d.max) + "</td>" +
          '<td class="num">' + d.o45.toFixed(1) + "%</td>" +
          "<td>" + weatherIcon(d.w) + " " + d.w.t + "°F · " + d.w.wind + " mph · " + d.w.cond + rainExtra + "</td>";
        tbody.appendChild(tr);
      });
    }

    // Scroll spy (accounts for sticky top graphic on mobile <= 860px)
    var ticking = false;
    function onScroll() {
      var top = 0;
      if (window.matchMedia("(max-width: 860px)").matches && graphic) {
        top = Math.max(0, graphic.getBoundingClientRect().bottom);
      }
      var mid = top + (window.innerHeight - top) * 0.42;
      var best = 0, bestD = Infinity;
      stepEls.forEach(function (s, k) {
        var r = s.getBoundingClientRect();
        var d = Math.abs((r.top + r.bottom) / 2 - mid);
        if (d < bestD) { bestD = d; best = k; }
      });
      if (best !== state.step) {
        state.step = best;
        render();
      }
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { onScroll(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener("resize", onScroll);

    render();
    onScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
