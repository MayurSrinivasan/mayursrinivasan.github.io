---
title: "rubiks cube"
date: 2026-11-14T01:03:00-08:00
math: true
meta: true
categories: ["math", "combinatorics"]
tags: ["rubiks-cube", "group-theory", "scrollytelling"]
summary: "A scroll-based visual essay and mathematical deep dive into why a 3×3×3 Rubik's Cube has exactly 43,252,003,274,489,856,000 reachable states."
---

Every time you scramble a standard $3 \times 3 \times 3$ Rubik's Cube, you are navigating a finite mathematical universe of **43,252,003,274,489,856,000** possible configurations.{{< sidenote >}}Formally, the set of legal cube moves forms a finite non-abelian group $G$ of order $|G| \approx 4.325 \times 10^{19}$, known as the Rubik's Cube group.{{< /sidenote >}}

That number is not just "big" — it is *constrained*. If you peeled off the stickers or pried the cubies apart with a screwdriver and reassembled them at random, **11 out of every 12** cubes you built would be mathematically impossible to solve.

Scroll through the visual essay below to see how the cube's physical mechanism locks its pieces into three conservation laws, and how those laws give us the exact formula.

<style>
.scrolly-wrap {
  width: min(1120px, 94vw);
  margin: 2.5rem 0 3rem 0;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 2.5rem;
  align-items: start;
}

.scrolly-stage {
  position: sticky;
  top: 2rem;
  background: #fbfaf2;
  border: 1px solid #e6e2d3;
  border-radius: 14px;
  padding: 1.1rem;
  box-shadow: 0 10px 30px rgba(30, 25, 15, 0.06);
}

.scrolly-img-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 10px;
  background: #fffff8;
}

.scrolly-img-frame img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.03);
  transition: opacity 0.55s ease, transform 0.65s ease;
  margin: 0;
  max-width: none;
}

.scrolly-img-frame img.is-active {
  opacity: 1;
  transform: scale(1);
}

.scrolly-hud {
  margin-top: 0.9rem;
  padding-top: 0.8rem;
  border-top: 1px solid #e6e2d3;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.scrolly-hud-label {
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #6b6659;
}

.scrolly-hud-formula {
  font-family: Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.95rem;
  font-weight: 600;
  color: #111;
}

.scrolly-hud-count {
  font-family: Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.85rem;
  color: #8c2d19;
}

.scrolly-steps {
  display: flex;
  flex-direction: column;
  gap: 55vh;
  padding: 6vh 0 22vh 0;
}

.scrolly-step {
  background: rgba(255, 255, 248, 0.92);
  border: 1px solid #e6e2d3;
  border-left: 3px solid #c9c3b2;
  border-radius: 10px;
  padding: 1.25rem 1.35rem;
  opacity: 0.45;
  transform: translateY(6px);
  transition: opacity 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
}

.scrolly-step.is-active {
  opacity: 1;
  border-left-color: #a00000;
  transform: translateY(0);
  box-shadow: 0 6px 20px rgba(30, 25, 15, 0.05);
}

.scrolly-step h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.scrolly-step p {
  width: 100% !important;
  margin: 0.6rem 0;
}

@media (max-width: 860px) {
  .scrolly-wrap {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .scrolly-stage {
    top: 0.5rem;
    z-index: 10;
  }
  .scrolly-img-frame {
    aspect-ratio: 16 / 10;
  }
  .scrolly-steps {
    gap: 30vh;
    padding: 2vh 0 8vh 0;
  }
}
</style>

<div class="scrolly-wrap" id="rubiks-scrolly">
  <div class="scrolly-stage">
    <div class="scrolly-img-frame">
      <img src="/images/rubiks/01-anatomy.jpg" alt="Exploded 3x3x3 Rubik's Cube anatomy showing 6 centers, 8 corners, and 12 edges" class="is-active" data-img="0" />
      <img src="/images/rubiks/02-corners.jpg" alt="8 corner cubies with 3 twist orientations" data-img="1" />
      <img src="/images/rubiks/03-edges.jpg" alt="12 edge cubies with 2 flip orientations" data-img="2" />
      <img src="/images/rubiks/04-parity.jpg" alt="Quarter turn showing simultaneous 4-cycles on corners and edges" data-img="3" />
      <img src="/images/rubiks/05-scale.jpg" alt="Spiral of cubes receding into a miniature cosmos" data-img="4" />
    </div>
    <div class="scrolly-hud">
      <span class="scrolly-hud-label" id="hud-label">Step 1 of 5 · The Fixed Core</span>
      <span class="scrolly-hud-formula" id="hud-formula">1 (centers fixed)</span>
      <span class="scrolly-hud-count" id="hud-count">Running total: 1 state</span>
    </div>
  </div>

  <div class="scrolly-steps">
    <div class="scrolly-step is-active" data-step="0"
         data-label="Step 1 of 5 · The Fixed Core"
         data-formula="1 (centers fixed)"
         data-count="Running total: 1 state">
      <h3>1. The 6 Centers Never Move</h3>
      <p>A 3×3×3 cube looks like 27 smaller cubes, but the innermost piece is a 3D cross axle. Attached to it are <strong>6 center caps</strong>, each with 1 sticker.</p>
      <p>No matter how you turn the faces, white stays opposite yellow, red opposite orange, and blue opposite green. Rotating the whole cube in your hands doesn't create a new scramble—so centers contribute a factor of <strong>1</strong>.</p>
    </div>

    <div class="scrolly-step" data-step="1"
         data-label="Step 2 of 5 · Corners & Twist Conservation"
         data-formula="8! × 3⁷"
         data-count="Corner states: 88,179,840">
      <h3>2. The 8 Corners (and the Mod-3 Rule)</h3>
      <p>There are <strong>8 corner cubies</strong>, each carrying 3 stickers. Ignoring orientation, they can sit in any of $8! = 40{,}320$ positions.</p>
      <p>Each corner can also be twisted in 3 ways, which suggests $3^8$ orientations. However, every face turn twists corners in balanced pairs, locking the total twist to $0 \pmod 3$. Once 7 corners are oriented, the 8th is forced: only <strong>$3^7 = 2{,}187$</strong> orientations are reachable.</p>
    </div>

    <div class="scrolly-step" data-step="2"
         data-label="Step 3 of 5 · Edges & Flip Conservation"
         data-formula="8! × 3⁷ × 12! × 2¹¹"
         data-count="Before parity: 86,504,006,548,979,712,000">
      <h3>3. The 12 Edges (and the Mod-2 Rule)</h3>
      <p>Between the corners sit <strong>12 edge cubies</strong>, each with 2 stickers. They can be permuted across 12 slots in $12! = 479{,}001{,}600$ ways.</p>
      <p>Each edge can be flipped in 2 ways, suggesting $2^{12}$ orientations. But legal moves always flip edges in even numbers (0, 2, or 4 at a time), locking the sum of flips to $0 \pmod 2$. The 12th edge is forced by the other 11, leaving <strong>$2^{11} = 2{,}048$</strong> valid orientations.</p>
    </div>

    <div class="scrolly-step" data-step="3"
         data-label="Step 4 of 5 · Permutation Parity"
         data-formula="(8! × 3⁷ × 12! × 2¹¹) ÷ 2"
         data-count="Reachable states: 43,252,003,274,489,856,000">
      <h3>4. The Parity Lock (÷ 2)</h3>
      <p>A single 90° turn of any face moves <strong>4 corners</strong> in a 4-cycle and <strong>4 edges</strong> in a 4-cycle simultaneously. In permutation math, a 4-cycle is an <em>odd</em> permutation.</p>
      <p>Because every move changes corner parity and edge parity together, they must always match: either both are even, or both are odd. You can never swap just two corners without also swapping two edges. That cuts our total exactly in <strong>half</strong>.</p>
    </div>

    <div class="scrolly-step" data-step="4"
         data-label="Step 5 of 5 · 43 Quintillion Worlds"
         data-formula="8! × 3⁷ × 12! × 2¹⁰ ≈ 4.325 × 10¹⁹"
         data-count="43,252,003,274,489,856,000 states">
      <h3>5. Forty-Three Quintillion</h3>
      <p>Multiplying everything together yields <strong>43,252,003,274,489,856,000</strong>—roughly 43 quintillion reachable states.</p>
      <p>If you owned one standard 57 mm cube for every reachable state and lined them up end-to-end, the chain would stretch about <strong>260 light-years</strong>—far enough to reach Polaris and well beyond.</p>
    </div>
  </div>
</div>

<script>
(function () {
  const wrap = document.getElementById("rubiks-scrolly");
  if (!wrap) return;
  const steps = Array.from(wrap.querySelectorAll(".scrolly-step"));
  const imgs = Array.from(wrap.querySelectorAll(".scrolly-img-frame img"));
  const hudLabel = document.getElementById("hud-label");
  const hudFormula = document.getElementById("hud-formula");
  const hudCount = document.getElementById("hud-count");

  function activate(stepEl) {
    const idx = stepEl.getAttribute("data-step");
    steps.forEach((s) => s.classList.toggle("is-active", s === stepEl));
    imgs.forEach((img) => img.classList.toggle("is-active", img.getAttribute("data-img") === idx));
    hudLabel.textContent = stepEl.getAttribute("data-label");
    hudFormula.textContent = stepEl.getAttribute("data-formula");
    hudCount.textContent = stepEl.getAttribute("data-count");
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activate(entry.target);
        }
      });
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: 0.05 }
  );

  steps.forEach((step) => observer.observe(step));
})();
</script>

---

## The Deep Dive: Proving the Three Conservation Laws

Putting the four factors together gives the exact order of the Rubik's Cube group:

$$|G| = \frac{8! \times 3^7 \times 12! \times 2^{11}}{2} = 8! \times 3^7 \times 12! \times 2^{10} = 43{,}252{,}003{,}274{,}489{,}856{,}000$$

Why do these three constraints hold for *every* possible sequence of moves? Each one comes from an invariant that is preserved by all six face turns $\{U, D, L, R, F, B\}$.

### 1. Corner Twist Invariant ($\sum c_i \equiv 0 \pmod 3$)

Label the **Up** ($U$) and **Down** ($D$) faces as our reference axis. For each of the 8 corner cubies, look at where its $U/D$ sticker (say, white or yellow) is pointing:
- $c_i = 0$ if it points $U$ or $D$ (in-plane)
- $c_i = +1$ if it is twisted clockwise from the $U/D$ plane
- $c_i = -1$ (or $+2 \pmod 3$) if it is twisted counterclockwise

Now check every basic 90° quarter-turn:
- **$U$ or $D$ turns** rotate corners within the $U$ or $D$ plane, so every corner's $c_i$ stays unchanged ($\Delta = 0$).
- **$F, B, L,$ or $R$ quarter-turns** move 4 corners between the $U$ and $D$ layers: two corners twist $+1$ and two corners twist $-1$. Their sum changes by $(+1) + (+1) + (-1) + (-1) = 0 \pmod 3$.

Since a solved cube starts with $\sum_{i=1}^{8} c_i = 0$, **every reachable state** satisfies $\sum c_i \equiv 0 \pmod 3$. Only $1/3$ of the $3^8$ raw corner orientations are reachable.

### 2. Edge Flip Invariant ($\sum e_j \equiv 0 \pmod 2$)

Assign each of the 12 edge cubies a binary orientation $e_j \in \{0, 1\}$ ("good" vs. "bad") relative to a fixed reference frame (for instance, an edge is $0$ if it can be solved using only $\{U, D, R, L, F^2, B^2\}$ without ever doing a 90° $F$ or $B$ turn).{{< sidenote >}}This is the exact trick speedcubers use in the "EO" (Edge Orientation) step of ZZ and Petrus methods: once all edges are oriented ($e_j = 0$), the rest of the cube can be solved without quarter-turns of $F$ or $B$.{{< /sidenote >}}

- **$U, D, R, L$ turns** preserve every edge's orientation ($e_j$ unchanged).
- **$F$ or $B$ quarter-turns** flip all 4 edges on that face simultaneously, changing $\sum e_j$ by $+4 \equiv 0 \pmod 2$.

Starting from $\sum e_j = 0$, the sum of flips is always even. Only $1/2$ of the $2^{12}$ raw edge orientations are reachable.

### 3. Permutation Parity ($\text{sgn}(\sigma_C) = \text{sgn}(\sigma_E)$)

Every permutation can be written as a product of 2-cycles (swaps). A permutation is **even** ($\text{sgn} = +1$) if it takes an even number of swaps, and **odd** ($\text{sgn} = -1$) if it takes an odd number.

A single 90° face turn performs:
- a **4-cycle** on 4 corners (which decomposes into 3 swaps $\implies$ **odd**, $\text{sgn} = -1$), and
- a **4-cycle** on 4 edges (3 swaps $\implies$ **odd**, $\text{sgn} = -1$).

Therefore, every single quarter-turn flips *both* parities together. Because a solved cube starts with $(\text{even}, \text{even})$, the combined parity $\text{sgn}(\sigma_C) \cdot \text{sgn}(\sigma_E)$ is always $+1$. You can swap two corners *and* two edges (as in a T-perm), but you can never swap just two corners alone.

---

## Putting the Numbers in Perspective

<details>
<summary>Expand for prime factorization, screwdriver odds, and God's Number</summary>

- **Prime factorization of $|G|$:**
  $$43{,}252{,}003{,}274{,}489{,}856{,}000 = 2^{27} \times 3^{14} \times 5^3 \times 7^2 \times 11$$
- **Random reassembly ("screwdriver test"):**
  If you disassemble a cube and put the 8 corners and 12 edges back randomly, there are $8! \times 3^8 \times 12! \times 2^{12}$ ways to assemble it. Dividing by the reachable states gives $3 \times 2 \times 2 = 12$ distinct "orbits"—meaning only **1 in 12** random assemblies is solvable.
- **God's Number:**
  Despite having $4.325 \times 10^{19}$ states, in 2010 Tomas Rokicki, Herbert Kociemba, Morley Davidson, and John Dethridge proved (using ~35 CPU-years donated by Google) that **every** reachable state can be solved in **20 moves or fewer** in the half-turn metric.

</details>
