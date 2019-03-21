---
title: Supervised Discrete Hashing
category: Research Note
tag: learning to hash
---

Supervised Discrete Hashing（SDH）论文阅读笔记。

![1536309561149](/assets/images/Supervised Discrete Hashing/1536309561149.png)

> CVPR 2015

本文提出了一个有监督的哈希学习框架，旨在快速且高效地**对二进制哈希码直接进行优化**。为了利用监督标签信息，本文设计了一个分类框架进行哈希学习，即希望学到的哈希码能够获得更高的分类精度。哈希码相当于数据的特征，将源数据通过非线性转化到二值空间，然后在此空间下进行分类。

为了实现上述的框架，本文将二值特征学习和线性分类器联合起来进行优化。为了能更好的获得数据的非线性结构特征，哈希函数的学习在**核空间**下进行。整个的优化过程以迭代的方式进行，分为**三个相互关联的子问题**。

为了解决最复杂的子问题，即**二值优化问题**，本文提出了 ***discrete cyclic coordinate descent（DCC）*** 算法来**一位一位（bit by bit）**的生成哈希码。通过选择合适的分类损失函数，DCC 算法可以返回最优哈希码的**闭合解**，使得优化过程变得更加高效。

SDH的关键技术在于直接解决没有经过任何**松弛操作**的**离散优化**问题。首先引入了一个辅助变量，将目标函数转化成可以以正则化项的形式解决的问题；然后使用DCC算法解决二值优化问题。

<!-- more -->

### SDH

* $n$ 个样本 $$\mathbf{X} = \lbrace \mathbf{x}_i\rbrace_{i=1}^n$$

* 学习二值表示 $$\mathbf{B} = \lbrace \mathbf{b}_i\rbrace_{i=1}^n \in \lbrace-1, +1 \rbrace^{L \times n}$$

学到的二值表示能够保留数据的语义关联，其中第 $i$ 列 $\mathbf{b}_i$ 是数据 $\mathbf{x}_i$ 的二值表示，长度为 $L$。

为了利用标签信息，将二进制码的学习问题转化成线性分类问题，希望学到的二值表示使得分类结果达到最优。

定义如下的多分类公式：

$$
\mathbf{y} = G(\mathbf{b}) = \mathbf{W}^T\mathbf{b} = [\mathbf{w}_1^T\mathbf{b},\cdots,\mathbf{w}_C^T\mathbf{b}]
$$

其中 $\mathbf{w}_k \in \mathbb{R}^{L\times 1},k=1,\cdots,C$ 是类别 $k$ 的分类向量，$\mathbf{y}\in \mathbb{R}^{C \times 1}$ 是标签向量。

目标函数如下：

$$
\min_{\mathbf{B}, \mathbf{W}, F} \sum_{i=1}^n \mathcal{L}(\mathbf{y}_i, \mathbf{W}^T\mathbf{b}_i) + \lambda \|\mathbf{W}\|^2 \\
{\rm s.t.}\quad \mathbf{b}_i = {\rm sgn}(F(\mathbf{x}_i)),i=1,\cdots,n
$$

* $\mathcal{L}(\cdot)$ 损失函数
* $\lambda$ 正则项系数
* $$\mathbf{Y} = \lbrace \mathbf{y}_i\rbrace_{i=1}^n \in \mathbb{R}^{C\times n}$$ 实际标签矩阵

在上式中，可以将 $\mathbf{b}_i$ 替换来消除约束，但是这样做使得优化问题变得更加复杂。一些方法通过先学习 $F(\mathbf{x})$ 的方法，来学习 $\mathbf{b}_i$ 的实值表达，然后通过阈值函数转换为二值表达，这样做可以使得原问题更容易得到解决，但是最后的结果并不是最优解。

为了得到更高质量的二进制表达，将上述问题转化如下：

$$
\min_{\mathbf{B}, \mathbf{W}, F} \sum_{i=1}^n \mathcal{L}(\mathbf{y}_i, \mathbf{W}^T\mathbf{b}_i) + \lambda\|\mathbf{W}\|^2 + \nu \sum_{i=1}^n \|\mathbf{b}_i - F(\mathbf{x}_i)\|^2 \qquad (3)\\
{\rm s.t.}\quad \mathbf{b}_i \in \{-1, +1\}^L
$$

上式中最后一项用来建模二进制码 $\mathbf{b}_i$ 与其实值表达 $F(\mathbf{x}_i)$ 之间的误差，$\nu$ 是惩罚因子。理论上，当 $\nu$ 足够大时，上式即接近原优化问题。

容易看出，上式是非凸的并且难以求解，但是当制定合适的损失函数时，上式是可以迭代的求解的。

#### $\mathbf{b}_i$ 的非线性映射

本文使用一个简单但是有效的非线性变换，如下所示：

$$
F(\mathbf{x}) = \mathbf{P}^T\phi(\mathbf{x})
$$

其中 $\phi(\mathbf{x})$ 是一个 $m$ 维的列向量，由 **RBF 核函数**映射得到：

$$
\phi(\mathbf{x}) = [\exp(-\frac{\|\mathbf{x} - \mathbf{a}_1\|^2}{\sigma}),\cdots,\exp(-\frac{\|\mathbf{x}-\mathbf{a}_m\|^2}{\sigma})]^T
$$

其中 $$\lbrace \mathbf{a}_j \rbrace_{j=1}^m$$ 是从训练样本中随机挑选的 $m$ 个样本，$\sigma$ 是核的宽度，$$\mathbf{P} \in \mathbb{R}^{m\times L}$$ 将 $$\phi(\mathbf{x})$$ 映射到低维空间，

**F-Step**

将(3) 中 $\mathbf{B}$ 固定，$\mathbf{P}$ 可以由下式计算：

$$
\mathbf{P} = (\phi(\mathbf{X})\phi(\mathbf{X})^T)^{-1}\phi(\mathbf{X})\mathbf{B}^T \qquad (5)
$$

这一步与损失函数无关。

#### 使用 $l_2$ 损失

(3) 是写为：

$$
\min_{\mathbf{B}, \mathbf{W},F} \sum_{i=1}^n\|\mathbf{y}_i - \mathbf{W}^T\mathbf{b}_i\|^2 + \lambda\|\mathbf{W}\|^2 + \nu\sum_{i=1}^n\|\mathbf{b}_i - F(\mathbf{x}_i)\|^2 \\
{\rm s.t.} \quad \mathbf{b}_i \in \{-1, +1\}^L
$$

即

$$
\min_{\mathbf{B}, \mathbf{W},F} \|\mathbf{Y} - \mathbf{W}^T\mathbf{B}\|^2 + \lambda\|\mathbf{W}\|^2 + \nu\|\mathbf{B} - F(\mathbf{X})\|^2 \\
{\rm s.t.} \quad \mathbf{B} \in \{-1, +1\}^{L\times n}
$$

**G-Step**

对于上式，当$\mathbf{B}$ 固定时，能够很容易求得 $\mathbf{W}$ 的闭合解：

$$
\mathbf{W} = (\mathbf{B}\mathbf{B}^T + \lambda \mathbf{I})^{-1}\mathbf{B}\mathbf{Y}^T \qquad (8)
$$

**B-Step**

当除 $\mathbf{B}$ 以外的其他参数都固定时，由于 $\mathbf{B}$ 的离散性，求得 $\mathbf{B}$ 的值很难。将原问题写为：

$$
\min_{\mathbf{B}} \|\mathbf{Y} - \mathbf{W}^T\mathbf{B}\|^2 + \nu \|\mathbf{B} - F(\mathbf{X})\|^2 \\
{\rm s.t.} \quad \mathbf{B} \in \{-1, +1\}^{L \times n}
$$

上式的求解问题是 NP 难度的，但是当 $\mathbf{B}$ 中的其他列固定时，$\mathbf{B}$ 中的**每一列**都有一个封闭解。将上式重写为：

$$
\begin{align}
\min_{\mathbf{B}} \quad&\|\mathbf{Y}\|^2 - 2{\rm Tr}(\mathbf{Y}^T\mathbf{W}^T\mathbf{B}) +
\|\mathbf{W}^T\mathbf{B}\|^2 +\\
\nu(&\|\mathbf{B}\|^2 - 2{\rm Tr}(\mathbf{B}^TF(\mathbf{X})) + \|F(\mathbf{X})\|^2) \\
{\rm s.t.}\quad &\mathbf{B} \in \{-1,1\}^{L \times n}
\end{align}
$$

等价于：

$$
\min_\mathbf{B} \|\mathbf{W}^T\mathbf{B}\|^2 - 2{\rm Tr}(\mathbf{B}^T\mathbf{Q}) \\
{\rm s.t.} \quad \mathbf{B}\in \{-1, 1\}^{L\times n}
$$

其中 $\mathbf{Q} = \mathbf{WY} + \nu F(\mathbf{X})$。

本文使用 **DCC** 方法学习 $\mathbf{B}$，即**一位一位**地学习 $\mathbf{B}$ 。令 $\mathbf{z}^T$ 表示 $\mathbf{B}$ 的第 $l$ （$l=1,\cdots,L$）列，$\mathbf{B}'$ 表示矩阵 $\mathbf{B}$ 除去 $\mathbf{z}$ 的子矩阵，其他符号（$\mathbf{q},\mathbf{Q}'$ 和 $\mathbf{v}, \mathbf{W}'$）的定义与之类似，则有：

$$
\begin{align}
\|\mathbf{W}^T\mathbf{B}\|^2 &= {\rm Tr}(\mathbf{B}^T\mathbf{WW}^T\mathbf{B}) \\
&=const + \|\mathbf{zv}^T\|^2 + 2\mathbf{v}^T\mathbf{W}'^T\mathbf{B}'\mathbf{z} \\
&=const + 2\mathbf{v}^T\mathbf{W}'^T\mathbf{B}'\mathbf{z}
\end{align}
$$

其中

$$
\|\mathbf{zv}^T\|^2 = {\rm Tr}(\mathbf{vz}^T\mathbf{zv}^T) = n\mathbf{v}^T\mathbf{v} = const
$$

同样的，有

$$
{\rm Tr}(\mathbf{B}^T\mathbf{Q}) = const + \mathbf{q}^T\mathbf{z}
$$

将上面的式子结合起来，得到

$$
\min_\mathbf{z}(\mathbf{v}^T\mathbf{W}'^T\mathbf{B}' - \mathbf{q}^T)\mathbf{z} \\
{\rm s.t.} \quad \mathbf{z} \in \{-1,1\}^n
$$

这个问题有最优解：

$$
\mathbf{z} = {\rm sgn}(\mathbf{q} - \mathbf{B}'^T\mathbf{W}'\mathbf{v}) \qquad (15)
$$

#### 使用hinge损失

损失函数为：

$$
\begin{align}
\min_{\mathbf{B}, \mathbf{W}, F, \xi} \quad &\lambda\|\mathbf{W}\|^2 + \sum_{i=1}^n \xi_i + \nu \sum_{i=1}^n\|\mathbf{b}_i-F(\mathbf{x}_i)\|^2 \\
{\rm s.t.}\quad &\forall i,k\quad \mathbf{w}_{c_i}^T\mathbf{b}_i + y_{ki} - \mathbf{w}_k^T\mathbf{b}_i \ge 1-\xi_i,\\
& \mathbf{b}_i \in \{-1,1\}^L
\end{align}
$$

其中 $c_i$ 是 $\mathbf{x}_i$ 的标签。

**G-Step**

当 $\mathbf{B}$ 固定时，$\mathbf{W}$ 可由多分类 SVM 解决方法求得。

**B-Step**

当除 $\mathbf{B}$ 以外的其他参数固定时，原问题写为：

$$
\begin{align}
\min_{\mathbf{b}_i} \quad &\|\mathbf{b}_i-F(\mathbf{x}_i)\|^2 \\
{\rm s.t.}\quad &\forall i,k\quad \mathbf{w}_{c_i}^T\mathbf{b}_i + y_{ki} - \mathbf{w}_k^T\mathbf{b}_i \ge 1-\xi_i,\\
& \mathbf{b}_i \in \{-1,1\}^L
\end{align}
$$

上式中的约束可以写为：

$$
\begin{align}
& \forall i,k\quad \mathbf{w}^{(ki)T}\mathbf{b}_i + y^{(ki)} \le 0,\\
& \mathbf{w}^{(ki)} = \mathbf{w}_{c_i} - \mathbf{w}_k, \\
& y^{(ki)} = y_{ki}-1+\xi_i
\end{align}
$$

带入原问题中，得：

$$
\min_{\mathbf{b}_i} \|\mathbf{b}_i - F(\mathbf{x}_i)\|^2 - \delta\sum_{k=1}^C(\mathbf{w}^{(ki)T}\mathbf{b}_i + y^{(ki)})\\
{\rm s.t.}\quad \mathbf{b}_i \in \{-1,1\}^L
$$

这里 $\delta = 1/\nu$。

上式可以转化为：

$$
\max_{\mathbf{b}_i} \mathbf{b}_i^T(F(\mathbf{x}_i) + \frac \delta 2 \sum_{k=1}^C \mathbf{w}^{(ki)}) \\
{\rm s.t.} \quad \mathbf{b}_i \in \{-1, 1\}^L
$$

该问题的最优解为：

$$
\mathbf{b}_i = {\rm sgn}(F(\mathbf{x}_i) + \frac \delta 2 \sum_{k=1}^C \mathbf{w}^{(ki)}) \qquad (22)
$$

SDH 算法如下所示：

![1536473767360](/assets/images/Supervised Discrete Hashing/1536473767360.png)

### 实验

详见论文。