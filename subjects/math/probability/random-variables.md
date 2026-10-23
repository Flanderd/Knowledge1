---
title: 随机变量与分布
date: 2026-10-15
subject: math
subjectLabel: 数学
category: 概率统计
tags:
  - 随机变量
  - 分布函数
  - 数字特征
description: 从分布函数出发，区分离散型与连续型随机变量，列举常见分布及其数字特征，并说明期望与方差的运算性质。
---

# 随机变量与分布

> **一句话概括**：随机变量把随机试验的结果"数字化"，分布函数则完整描述了它取值的概率规律。

## 一、分布函数

设 $X$ 为随机变量，其分布函数定义为

$$
F(x) = P(X \le x), \quad x \in \mathbb{R}
$$

性质：

1. 单调不减：若 $x_1 < x_2$，则 $F(x_1) \le F(x_2)$；
2. 有界：$0 \le F(x) \le 1$，且 $F(-\infty) = 0$，$F(+\infty) = 1$；
3. 右连续：$F(x+0) = F(x)$。

由分布函数可求区间概率：$P(a < X \le b) = F(b) - F(a)$。

## 二、离散型

用分布律 $P(X = x_k) = p_k$ 描述，要求 $p_k \ge 0$ 且 $\sum_k p_k = 1$。

常见离散分布：

| 分布 | 记号 | 分布律 | 期望 | 方差 |
| --- | --- | --- | --- | --- |
| 0-1 分布 | $B(1, p)$ | $P(X=1)=p$ | $p$ | $p(1-p)$ |
| 二项分布 | $B(n, p)$ | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| 泊松分布 | $P(\lambda)$ | $\dfrac{\lambda^k}{k!}e^{-\lambda}$ | $\lambda$ | $\lambda$ |
| 几何分布 | $G(p)$ | $(1-p)^{k-1}p$ | $\dfrac{1}{p}$ | $\dfrac{1-p}{p^2}$ |

当 $n$ 较大、$p$ 较小且 $np$ 适中时，二项分布可用泊松分布近似：$\lambda = np$。

## 三、连续型

存在非负函数 $f(x)$（概率密度）使 $F(x) = \int_{-\infty}^{x} f(t)\,dt$，
$f(x) = F'(x)$（在连续点处），且 $\int_{-\infty}^{+\infty} f(x)\,dx = 1$。

注意：对连续型随机变量，$P(X = a) = 0$，因此

$$
P(a \le X \le b) = P(a < X < b) = \int_a^b f(x)\,dx
$$

常见连续分布：

| 分布 | 记号 | 密度函数 | 期望 | 方差 |
| --- | --- | --- | --- | --- |
| 均匀分布 | $U(a,b)$ | $\dfrac{1}{b-a}$ | $\dfrac{a+b}{2}$ | $\dfrac{(b-a)^2}{12}$ |
| 指数分布 | $E(\lambda)$ | $\lambda e^{-\lambda x}$（$x>0$） | $\dfrac{1}{\lambda}$ | $\dfrac{1}{\lambda^2}$ |
| 正态分布 | $N(\mu,\sigma^2)$ | $\dfrac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ | $\mu$ | $\sigma^2$ |

标准正态分布记为 $N(0, 1)$，任意正态变量可标准化：

$$
Z = \frac{X - \mu}{\sigma} \sim N(0, 1)
$$

## 四、数字特征

### 期望

$$
E(X) = \begin{cases}
\sum_k x_k p_k, & \text{离散型} \\[6pt]
\int_{-\infty}^{+\infty} x f(x)\,dx, & \text{连续型}
\end{cases}
$$

函数期望：$E[g(X)] = \sum_k g(x_k)p_k$ 或 $\int g(x)f(x)\,dx$。

### 方差

$$
D(X) = E\big[(X - E(X))^2\big] = E(X^2) - [E(X)]^2
$$

第二个等号是实际计算中最常用的公式。

### 运算性质

- $E(aX + bY) = aE(X) + bE(Y)$（**无条件成立**）；
- $D(aX + b) = a^2 D(X)$；
- 若 $X, Y$ **相互独立**，则 $D(X \pm Y) = D(X) + D(Y)$，注意这里是"相加"；
- 独立时 $E(XY) = E(X)E(Y)$。

协方差 $\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y)$，
相关系数 $\rho_{XY} = \dfrac{\operatorname{Cov}(X,Y)}{\sqrt{D(X)D(Y)}}$，取值范围 $[-1, 1]$。
$\rho = 0$ 只说明**不线性相关**，不能推出独立（正态变量除外）。

## 五、大数定律与中心极限定理

- **切比雪夫不等式**：$P(|X - E(X)| \ge \varepsilon) \le \dfrac{D(X)}{\varepsilon^2}$；
- **辛钦大数定律**：独立同分布且期望存在时，样本均值依概率收敛于总体均值；
- **中心极限定理**：独立同分布、方差存在时，

$$
\frac{\sum_{i=1}^{n}X_i - n\mu}{\sqrt{n}\sigma} \xrightarrow{d} N(0, 1)
$$

这解释了为什么自然界中大量随机变量近似服从正态分布，也是统计推断的理论基础。

## 常见误区

- 把 $E(X^2) = [E(X)]^2$：二者相差一个方差；
- 认为方差可直接相加：只有独立时才成立，一般情形要加协方差项；
- 混淆"不相关"与"独立"。

## 参考

- 浙大《概率论与数理统计》（第五版）第二—五章
