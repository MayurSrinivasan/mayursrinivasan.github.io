---
title: "Twelve Years of the Berkeley 5K"
date: 2026-11-22T02:04:00-08:00
math: false
meta: true
categories: ["Data", "Running"]
tags: ["berkeley", "5k", "running", "statistics", "scrollytelling"]
summary: "A scroll-driven visual essay analyzing 14,621 official Berkeley Half Marathon 5K finishes from 2014 to 2026—median, extremes, dispersion, race-day weather, and my 2025–2026 runs."
---

Since the 5K joined the Berkeley Half Marathon weekend in November 2014, **14,621 runners** have crossed the finish line across eleven editions.{{< sidenote >}}The Berkeley Half Marathon launched in 2013 with a half marathon, a 10-miler, and a 10K. The 5K debuted the following year on November 9, 2014.{{< /sidenote >}}

Over that twelve-year span, the median finish time barely budged—staying inside a 1-minute-46-second band from start to finish. Yet the *shape* of the race quietly stretched out, bent around wildfire smoke, a pandemic, and November Bay Area weather. And over the past two years, I joined the curve myself. Scroll on to walk through the data.

{{< berkeley-5k-scrolly >}}

## Complete edition reference

Every edition below reflects 100% of official chip-timed 5K finishers, paired with Downtown Berkeley weather averaged over the 8:00–9:00 AM PST start window.{{< sidenote >}}The 5K starts at 8:30 AM at Milvia St. and Kittredge St. Highlighted rows mark the two editions I ran (2025 and 2026).{{< /sidenote >}}

<div class="b5k-ref-wrap">
  <table class="b5k-ref-table" aria-label="Berkeley 5K edition summary statistics and race-morning weather (2014 to 2026)">
    <thead>
      <tr>
        <th>Edition</th>
        <th class="num">Finishers</th>
        <th class="num">Min</th>
        <th class="num">Q1</th>
        <th class="num">Median</th>
        <th class="num">Q3</th>
        <th class="num">IQR</th>
        <th class="num">Max</th>
        <th class="num">≥45m</th>
        <th>8:30 AM Weather</th>
      </tr>
    </thead>
    <tbody id="b5k-ref-tbody"></tbody>
  </table>
</div>

## Sources & methodology

* **Race results (14,621 official chip-timed finishes):** 2014–2025 editions from [Athlinks Master Event #95041](https://www.athlinks.com/event/95041/results/Event/1093947/Results) and 2026 from [ChronoTrack Live Event #94320](https://live.chronotrack.com/event/94320/results?raceId=250537&divisionId=2814830). Zero confirmed finishers were excluded; all 11 editions match official finisher counts to the runner.
* **Historical weather:** Hourly reanalysis for the Downtown Berkeley start line (`37.8688°N, 122.2708°W`) from the [Open-Meteo ERA5 Archive](https://open-meteo.com/en/docs/historical-weather-api), averaged across the 8:00 AM and 9:00 AM PST readings for temperature, humidity, and wind speed, with total daily precipitation noted where rain fell outside the 5K window.
* **Density curves & percentiles:** Ridgelines and Time Machine distributions use a Gaussian kernel density estimate (bandwidth = 1.6 minutes) evaluated across every confirmed finish time. Percentiles report the share of finishers strictly slower than a given time.
