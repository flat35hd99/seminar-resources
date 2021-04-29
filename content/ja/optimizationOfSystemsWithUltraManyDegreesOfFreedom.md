---
title: 超多自由度系の最適化p128-p139
description: 'hogehoge'
position: 2
category: '2021SprFri34'
---

## カノニカルアンサンブルを再現するシミュレーション手法

MD法とMC法に大別されるが、今回はMC法を取り扱う。

モンテカルロ法ではふつう運動量$p$は考慮せず、座標$q$のみ変化させる。よって物理量$A$も$p$のみの関数として取り扱うことになる。

教科書の式(2.16)は以下のように変形される。

$$
\begin{aligned}
\langle A \rangle_T &= \frac{\int dq A(q) \exp^{-\beta E(q)}}{Z_q} \\
&= \frac{\int dE A(E)P_B (E)}{\int dE P_B (E)}
\end{aligned}
$$

ただし
$$
\begin{aligned}
  P_B &= n(E)W_B (E)\\
  W_B(E) &= \exp^{-\beta E}
\end{aligned}
$$

を利用した。

<alert>
ここまでの話は今日はまったく触りません。
今回は
</alert>