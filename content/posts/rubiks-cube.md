---
title: "rubiks cube"
date: 2026-11-14T01:03:00-08:00
math: true
meta: true
categories: ["math", "combinatorics"]
tags: ["rubiks-cube", "group-theory", "scrollytelling"]
summary: "A scroll-driven visual essay on why a 3×3×3 Rubik's Cube has exactly 43,252,003,274,489,856,000 reachable states."
---

Every time you scramble a standard Rubik's Cube, you are wandering through a finite universe of exactly **43,252,003,274,489,856,000** configurations.{{< sidenote >}}Formally, the legal move sequences form a finite non-abelian group $G$, the *Rubik's Cube group*, of order $|G| \approx 4.33 \times 10^{19}$.{{< /sidenote >}}

That number is not just big; it is *constrained*. Pry the cube apart and reassemble the pieces at random, and **11 out of every 12** cubes you build will be impossible to solve. Scroll on to see why.

{{< rubiks-scrolly >}}

## The formula

Putting the four pieces together:

$$
|G| = \frac{8! \cdot 3^{7} \cdot 12! \cdot 2^{11}}{2} = 8! \cdot 3^{7} \cdot 12! \cdot 2^{10} = 43{,}252{,}003{,}274{,}489{,}856{,}000
$$

The interesting part is *why* the three constraints hold for every possible sequence of moves. Each one is an **invariant**: a quantity that none of the six face turns $U, D, L, R, F, B$ can change.

## 1. Corner twist is conserved mod 3

Treat the Up/Down axis as the reference. For each corner $i$, look at its Up-or-Down coloured sticker (white or yellow) and assign a twist $c_i \in \{0, 1, 2\}$:

- $c_i = 0$ if that sticker faces up or down,
- $c_i = 1$ if it is rotated one step clockwise,
- $c_i = 2$ if it is rotated one step counter-clockwise.

Now check each quarter turn:

- $U$ and $D$ turns slide corners around within their layer, so every $c_i$ is unchanged.
- $F$, $B$, $L$ and $R$ turns move four corners between layers, twisting two of them by $+1$ and two by $-1$. The total changes by $(+1) + (+1) + (-1) + (-1) = 0$.

A solved cube has $\sum_{i=1}^{8} c_i = 0$, so every reachable state satisfies

$$
\sum_{i=1}^{8} c_i \equiv 0 \pmod 3 .
$$

Only one third of the $3^8$ raw orientations survive, leaving $3^7$.

## 2. Edge flip is conserved mod 2

Give each edge $j$ a flip $e_j \in \{0, 1\}$, where $e_j = 0$ means the edge could be solved using only $U, D, L, R$ and half turns of $F$ and $B$.{{< sidenote >}}This is exactly the "edge orientation" step speedcubers use in the ZZ method: once every $e_j = 0$, the rest of the solve never needs a quarter turn of $F$ or $B$.{{< /sidenote >}}

- $U, D, L, R$ turns never change any $e_j$.
- An $F$ or $B$ quarter turn flips all four edges on that face, changing the sum by $4 \equiv 0 \pmod 2$.

Starting from zero, the total stays even:

$$
\sum_{j=1}^{12} e_j \equiv 0 \pmod 2 ,
$$

so half of the $2^{12}$ raw orientations survive, leaving $2^{11}$.

## 3. Corner and edge parity must match

Any permutation $\sigma$ can be written as a sequence of swaps. Its sign $\operatorname{sgn}(\sigma)$ is $+1$ if that takes an even number of swaps and $-1$ if odd.

A single quarter turn performs a 4-cycle on corners and a 4-cycle on edges. A 4-cycle equals three swaps, so

$$
\operatorname{sgn}(\sigma_C) = -1, \qquad \operatorname{sgn}(\sigma_E) = -1 .
$$

Each move multiplies *both* signs by $-1$, so their product never changes. The solved cube starts at $(+1)(+1)$, so for every reachable state

$$
\operatorname{sgn}(\sigma_C) \cdot \operatorname{sgn}(\sigma_E) = +1 .
$$

That is why algorithms such as the T-perm always swap two corners *and* two edges: a lone corner swap is impossible.

## Putting it in perspective

<details>
<summary>Prime factorisation, the screwdriver test, and God's Number</summary>

**Prime factorisation.**

$$
43{,}252{,}003{,}274{,}489{,}856{,}000 = 2^{27} \cdot 3^{14} \cdot 5^{3} \cdot 7^{2} \cdot 11
$$

**The screwdriver test.** Reassembling a cube at random gives $8! \cdot 3^8 \cdot 12! \cdot 2^{12}$ possible builds. Dividing by the reachable count leaves $3 \times 2 \times 2 = 12$ separate "orbits" that can never reach each other, so only 1 random build in 12 can be solved.

**God's Number.** In 2010 Tomas Rokicki, Herbert Kociemba, Morley Davidson and John Dethridge used about 35 CPU-years of computer time donated by Google to prove that every one of these states can be solved in **20 moves or fewer** (half-turn metric).

</details>
