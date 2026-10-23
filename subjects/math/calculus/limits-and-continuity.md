---
title: 极限与连续
date: 2026-10-23
updated: 2026-10-23
subject: math
subjectLabel: 数学
category: 微积分
tags:
  - 极限
  - 连续性
  - 等价无穷小
description: 从 ε-δ 语言出发梳理数列与函数极限、极限运算法则、两个重要极限、等价无穷小与连续性判定。
---

# 极限与连续

> **一句话概括**：极限描述"无限接近但不必到达"的趋势，连续则是"极限值等于函数值"。

## 为什么要先学极限

导数定义为差商的极限 $f'(x_0) = \lim\limits_{h \to 0} \frac{f(x_0+h)-f(x_0)}{h}$，
定积分定义为黎曼和的极限 $\int_a^b f(x)\,dx = \lim\limits_{\lambda \to 0} \sum f(\xi_i)\Delta x_i$。
两者都建立在极限之上，所以极限的语言必须先过关。

## 数列极限（$\varepsilon$-$N$ 语言）

数列 $\{a_n\}$ 以常数 $A$ 为极限，记作 $\lim\limits_{n \to \infty} a_n = A$，指的是：

$$
\forall\, \varepsilon > 0,\ \exists\, N \in \mathbb{N}^+,\ \text{当 } n > N \text{ 时，恒有 } |a_n - A| < \varepsilon
$$

理解要点：

1. $\varepsilon$ 是**任意给定的**精度，不是某个具体小数；
2. $N$ 依赖于 $\varepsilon$，一般 $\varepsilon$ 越小，$N$ 越大；
3. 前有限项不影响收敛性，改变有限项不改变极限。

## 函数极限（$\varepsilon$-$\delta$ 语言）

函数 $f(x)$ 在 $x \to x_0$ 时以 $A$ 为极限，指的是：

$$
\forall\, \varepsilon > 0,\ \exists\, \delta > 0,\ \text{当 } 0 < |x - x_0| < \delta \text{ 时，恒有 } |f(x) - A| < \varepsilon
$$

注意 $0 < |x-x_0|$ 中的 **$0<$** 很关键：它说明函数在 $x_0$ 处**是否有定义、取值是多少都无所谓**。
这正是"极限"与"连续"的分界线。

左右极限分别记为 $f(x_0^-)$ 与 $f(x_0^+)$，极限存在当且仅当

$$
\lim_{x \to x_0^-} f(x) = \lim_{x \to x_0^+} f(x) = A
$$

## 极限的运算法则

若 $\lim f(x) = A$，$\lim g(x) = B$，且 $B \neq 0$，则

| 运算 | 结论 |
| --- | --- |
| 加减 | $\lim [f(x) \pm g(x)] = A \pm B$ |
| 乘法 | $\lim [f(x) \cdot g(x)] = A \cdot B$ |
| 除法 | $\lim \dfrac{f(x)}{g(x)} = \dfrac{A}{B}$ |
| 数乘 | $\lim k f(x) = kA$ |

使用前提：参与运算的每一项极限**都存在**。$\infty - \infty$、$0 \cdot \infty$、$\dfrac{0}{0}$、
$\dfrac{\infty}{\infty}$ 属于未定式，不能直接套法则，需要洛必达法则或等价无穷小替换。

## 两个重要极限

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1, \qquad
\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^{x} = e
$$

由此可推出连续复利公式 $\lim\limits_{n \to \infty}\left(1 + \frac{r}{n}\right)^{nt} = e^{rt}$，
这是后面经济学笔记里贴现计算的基础。

## 常用等价无穷小（$x \to 0$）

$$
\sin x \sim x,\quad \tan x \sim x,\quad \arcsin x \sim x,\quad \ln(1+x) \sim x,\quad
e^{x} - 1 \sim x,\quad 1 - \cos x \sim \frac{x^2}{2}
$$

使用规则：

- 等价无穷小**只能替换乘除因子**，不能替换加减项。$\tan x - \sin x$ 不能写成 $x - x = 0$，
  正确做法是先提出公因式：$\tan x - \sin x = \tan x(1-\cos x) \sim x \cdot \dfrac{x^2}{2} = \dfrac{x^3}{2}$。
- 复合替换要求内层趋于 $0$，例如 $\ln(1+x^2) \sim x^2$ 成立，因为 $x \to 0$ 时 $x^2 \to 0$。

## 连续性

### 定义

函数 $f(x)$ 在 $x_0$ 处连续，需要同时满足三个条件：

1. $f(x)$ 在 $x_0$ 处**有定义**；
2. $\lim\limits_{x \to x_0} f(x)$ **存在**；
3. $\lim\limits_{x \to x_0} f(x) = f(x_0)$。

写成紧凑形式就是 $\lim\limits_{x \to x_0} f(x) = f(x_0)$。
用增量形式表达为 $\lim\limits_{\Delta x \to 0} \Delta y = 0$，其中 $\Delta y = f(x_0 + \Delta x) - f(x_0)$。

### 间断点分类

| 类型 | 判定条件 | 例子 |
| --- | --- | --- |
| 可去间断点 | 左右极限存在且相等，但不等于函数值（或无定义） | $f(x) = \dfrac{\sin x}{x}$ 在 $x=0$ |
| 跳跃间断点 | 左右极限存在但不相等 | 符号函数 $\operatorname{sgn}(x)$ 在 $x=0$ |
| 无穷间断点 | 至少一个单侧极限为 $\infty$ | $f(x) = \dfrac{1}{x}$ 在 $x=0$ |
| 振荡间断点 | 极限不存在且不为 $\infty$，函数值反复振荡 | $\sin\frac{1}{x}$ 在 $x=0$ |

### 闭区间上连续函数的性质

若 $f(x)$ 在 $[a, b]$ 上连续，则：

- **有界性**：$f(x)$ 在 $[a,b]$ 上有界；
- **最值定理**：$f(x)$ 在 $[a,b]$ 上必能取到最大值与最小值；
- **介值定理**：对任意介于 $f(a)$ 与 $f(b)$ 之间的值 $C$，存在 $\xi \in (a,b)$ 使 $f(\xi) = C$；
- **零点定理**：若 $f(a) \cdot f(b) < 0$，则存在 $\xi \in (a, b)$ 使 $f(\xi) = 0$。

## 常见误区

| 误区 | 正确说法 |
| --- | --- |
| "极限就是代入求值" | 只有连续函数才能直接代入 |
| "$\dfrac{0}{0}$ 等于 0 或 1" | 这是未定式，需进一步化简 |
| "等价无穷小随便换" | 只能替换整个乘除因子 |
| "极限存在则函数连续" | 还需函数值等于极限值 |

## 速查清单

1. 看到 $\dfrac{0}{0}$：先因式分解 → 再等价无穷小 → 最后考虑洛必达；
2. 看到 $1^{\infty}$：凑第二个重要极限，或取对数化为 $0 \cdot \infty$；
3. 判断分段函数在分界点的连续性：分别求左右极限，再与函数值比较；
4. 求渐近线：垂直渐近线看 $\lim\limits_{x \to x_0} f(x) = \infty$，水平渐近线看 $\lim\limits_{x \to \infty} f(x)$。

## 参考

- 同济大学《高等数学》（第七版）第一章
- 《普林斯顿微积分读本》第 3—6 章
