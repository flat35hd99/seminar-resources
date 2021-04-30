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


### マルコフ連鎖
モンテカルロ法では、ステップごとに状態を発生（生成）する。

$$
x^{(1)} \rarr x^{(2)} \rarr x^{(3)} \rarr x^{(4)} \rarr x^{(5)} \rarr ...
$$

そのため、シミュレーションの$\mu$ステップ目から、$\nu + 1$ステップ目への状態に移るときの遷移確立$\omega$は、本来過去のすべての状態がどのようであったかの情報をもっている（依存している）はずである。

しかし、これは実用的ではないため、

 - ある状態は直前のステップの状態にのみ依存する
   - 言い換えれば一つ前以外のステップすべてにまったく依存しない。
 - $\nu$にも依存しない

と仮定し、状態$x_j$から状態$x_k$への遷移確立$\omega$を

$$
\omega(x_j \rarr x_k)
$$

と書く。

このような**過程**(not 仮定)をマルコフ過程、また、この状態の流れをマルコフ鎖と呼ぶ。

このとき、あるステップで状態$x_k$が現れる確率$P^{(\nu)}(x_k)$は以下の形で与えられる。

$$
P^{(\nu+1)}(x_k) = \sum_j P^{(\nu)}(x_j) \omega(x_j \rarr x_k)
$$

さて、MC法ではこのマルコフ連鎖を使って、
1. 熱平衡状態になるまでステップ数を重ねることになる。
   1. 言い換えれば、熱平衡状態になることを要求する
2. また、熱平衡であるということは、ミクロな視点で見ればまったく静止しているか、出入りを繰り返してある状態同士をいったりきたりしているはずである。


これを数式で表すと、1. については

$$
P_{eq}(x) = \lim_{\nu \rarr \infty} P^{(\nu)} (x)
$$

と表され、また、2については

$$
P_{eq}(x_j) \omega(x_j \rarr x_k) = P_{eq}(x_k) \omega(x_k \rarr x_j)
$$

と表される。ちなみにこれは「詳細つり合い条件」と呼ばれる。

1 によって、

$$
P^{(\nu+1)}(x_k) = \sum_j P^{(\nu)}(x_j) \omega(x_j \rarr x_k)
$$

は、

$$
P_{eq}(x_k) = \sum_j P_{eq}(x_j) \omega(x_j \rarr x_k)
$$

と書き換えられる。

これらの仮定のもとで成立する遷移確率として、メトロポリス法があり、

$$
\omega (x_j \rarr x_k) = \begin{cases}
  1&  \frac{P_{eq}(x_k)}{P_{eq}(x_j)} \geq 1 \\
  \frac{P_{eq}(x_k)}{P_{eq}(x_j)} & \frac{P_{eq}(x_k)}{P_{eq}(x_j)} \ < 1.
\end{cases}
$$

これが詳細つり合い条件を満たすことは確認しないといけないが、ここでは省略する。

カノニカルアンサンブルを考えている場合には、平衡分布は

$P_{eq}(x) = \frac{W_B(E(X))}{Z}$

で与えられるから、上式にこれを代入すると分配関数$Z$はキャンセルされて

$$
\omega (x_j \rarr x_k) = \begin{cases}
  1&  \frac{W_B(E(x_k))}{W_B(E(x_j))} \geq 1 \\
  \frac{W_B(E(x_k))}{W_B(E(x_j))} & \frac{W_B(E(x_k))}{W_B(E(x_j))} < 1.
\end{cases}
$$

と書き換えることができ、ボルツマン因子
$$
W_B(E) = \exp^{-\beta E}
$$

と、以下に定義する$\Delta E$

$$
\Delta E \equiv E(x_k) - E(x_j)
$$

<alert>
0以上ならポテンシャルが増加する遷移、0以下ならポテンシャルが減少する遷移であることを表す量
</alert>

を使うことで、

$$
\omega (x_j \rarr x_k) = \begin{cases}
  1&  \Delta E \le 0 \\
  \exp(-\beta \Delta E) & \Delta E > 0
\end{cases}
$$

と表される。

### 実際の計算の様子

$\nu$step目までシミュレーションが進み、そのときの状態が$x_j$であるとする。その状態をもとに、$\nu + 1$step目の状態の候補(candication)、$x^{\nu + 1}_{cand}$を用意する。

1. $\Delta E \le 0$なら必ず採用する
2. そうでなければ、$\exp(-\beta \Delta E)$と発生させた乱数を比較して採用、棄却を決定する。
   1. $\exp(-\beta \Delta E)$の方が大きければ採用する。
   2. $\exp(-\beta \Delta E)$の方が小さければ棄却する。

これは、**メトロポリス判定**と呼ばれる。

### 乱数生成アルゴリズム

さて、モンテカルロ法では乱数生成が必要であることがわかったが、実はコンピュータで乱数を発生させることは奥が深くてとても難しい。

ここでは、その中でも簡単な**線形合同法**を紹介する。

<alert type="warning">

本にはこのアルゴリズムの名称が書いていなかったが、別で調べた線形合同の式によく似ているのでこのように記述した。

</alert>

[線形合同法](https://ja.wikipedia.org/wiki/%E7%B7%9A%E5%BD%A2%E5%90%88%E5%90%8C%E6%B3%95)はコンピュータの性質である、オーバーフローを逆手に利用することで簡単に生成することができる。

百聞は一見に如かずなので、実際に試してみる。

<alert type="info">

「じゃあモンテカルロ法もコード書けばいいじゃん」と突っ込んではいけない。その通り。

</alert>

[Google Colab](https://colab.research.google.com/drive/1RZl88ZLopVxv7q80fpmp8wayS_nbmXAS?usp=sharing)でサンプルを作成した。細かい使い方は省略するが、Googleアカウントをもっていれば自分用に複製して好き勝手できるので、どうぞ。

使ったC言語の乱数生成器

```c
#include <stdio.h>
#include <float.h>
#include <stdlib.h>
double myRandom(int *IX);

void main() {
  printf("start");
  FILE *outputfile;
  int IX = 60001;
  double r,r1,r2;

  outputfile = fopen("output.txt", "w");
  if (outputfile == NULL) {
      printf("cannot open\n");
      exit(1);
  }
  unsigned int count;
  
  for (count = 0; count <= 5000000; count = count + 1) {
    r = myRandom(&IX);
    fprintf(outputfile, "%u %e\n", count, r);
    // printf("r%d = %e\n",count,r);
  }
  fclose(outputfile);
  printf("end");
}

double myRandom(int *IX) {
  int M = DBL_MAX;     // 2^64 - 1 
  int K = 30517578125; // 5^15
  double rand; // random number
  *IX = ((*IX)*K)&M;
  rand = (double)*IX/M;
  return rand;
}
```