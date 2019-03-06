---
title: Semantic Cluster Unary Loss for Efficient Deep Hashing
category: Research Note
date: 2019-03-06
tag:
 - deep hashing
 - unary loss
 - semi-supervised learning
 - information retrieval
---

Semantic Cluster Unary Loss for Efficient Deep Hashing 论文阅读笔记。

![image-20190306093423179](https://ws2.sinaimg.cn/large/006tKfTcgy1g0stnmvu6oj31pg0beq56.jpg)

> IEEE TIP 2018

本文提出了一个**训练效率**很高的半监督哈希方法，该方法提出了一个基于分类的一元损失。

1. 提出了三元组损失的**一元上界（Unary Upper Bound, UUB）**，将基于分类的一元损失与三元组损失连接起来。
2. 提出了一个高效的有监督哈希算法，该算法通过 **Semantic Cluster Unary Loss（SCUL）** 进行训练，**SCUL** 是通过 **UUB** 修改得到的。**SCUL** 的时间复杂度只有 $O(n)$，所以能够大幅提升算法训练效率。
3. 提出了一个结合 *UUB* 和 *Mean Teacher*（一个state-of-the-aet的半监督算法）的半监督哈希算法。

### 有监督哈希的一元上界

$n$ 个数据样本 $$\mathbf{x}_1, \mathbf{x}_2, \cdots, \mathbf{x}_n$$，哈希学习的目标是学习从数据到哈希码的映射：$$H: \mathbf{x} \to \{-1, 1\}^r$$，其中 $r$ 是哈希码的长度。

#### 三元组损失

给定训练数据 $$(\mathbf{x}, \mathbf{x}^+, \mathbf{x}^-)$$，其中 $$\mathbf{x}$$ 与 $$\mathbf{x}^+$$ 是语义相似的，$$\mathbf{x}$$ 与 $$\mathbf{x}^-$$ 语义不相似，最常见的一种三元组损失如下：

$$
l_{t}\left(\mathbf{x}, \mathbf{x}^{+}, \mathbf{x}^{-}\right)=\left[m-\left|H(\mathbf{x})-H\left(\mathbf{x}^{-}\right)\right|+\left|H(\mathbf{x})-H\left(\mathbf{x}^{+}\right)\right|\right]_{+}
$$

其中 $$[\cdot]_+ \doteq \max(0, \cdot)$$，$|\cdot|$ 是距离度量方式（如汉明距离），$m$ 是超参。

定义 $g(\cdot, \cdot)$ 是一个单调的，[Lipschitz连续](https://zh.wikipedia.org/wiki/%E5%88%A9%E6%99%AE%E5%B8%8C%E8%8C%A8%E9%80%A3%E7%BA%8C)的函数，$g(\cdot, \cdot)$ 满足：

$$
g(a, b) \ge 0 \\
0\le g(a_2, b) - g(a_1, b) \le a_2 - a_1, \quad a_1\le a_2 \\
0 \le g(a, b_1) - g(a, b_2) \le b_2 - b_1, \quad b_1 \le b_2
$$

则更一般的，三元组损失可以被表示为：

$$
l_{t}\left(\mathbf{x}, \mathbf{x}^{+}, \mathbf{x}^{-}\right)=g\left(\left|H(\mathbf{x})-H\left(\mathbf{x}^{+}\right)\right|,\left|H(\mathbf{x})-H\left(\mathbf{x}^{-}\right)\right|\right)
$$

此时，$$g(a, b) = [m + a - b]_+​$$。

假设 $S$ 是相似矩阵，$$(i, j) \in S$$ 表示 $$\mathbf{x}_i$$ 和 $$\mathbf{x}_j$$ 相似，则哈希学习的目标是优化下面这个三元组损失函数：
$$
\min _{H} \mathcal{L}_{t}=\sum_{(i, j) \in S,(i, k) \notin S} g\left(\left|\mathbf{h}_{i}-\mathbf{h}_{j}\right|,\left|\mathbf{h}_{i}-\mathbf{h}_{k}\right|\right)
$$

其中 $$\mathbf{h}_i = H(\mathbf{x}_i), i=1,2, \cdots, n$$ 是 $$\mathbf{x}_i$$ 学到的哈希码。

#### 三元组损失的一元上界

首先考虑每个样本只有一个语义标签的情况，令 $C$ 为语义标签的数目，$$y_1, \cdots,y_n \in \{1, 2, \cdots, C\}$$ 是 $$\mathbf{x}_1,\cdots, \mathbf{x}_n$$ 的标签，如果两个样本有相同的标签，则二者相似。

直觉上讲，同一类的样本的哈希码之间的差异应该尽可能小，而不同类样本之间的距离应该尽可能大。定义 $C$ 个辅助向量 $$\mathbf{c}_1,…,\mathbf{c}_C \in \mathbb{R}^r$$，其中每个向量对应一个语义标签，考虑三元组 $$(\mathbf{x}_i, \mathbf{x}_j, \mathbf{x}_k)$$，其中 $$y_i = y_j, y_i \neq y_k$$，根据[三角不等式](https://zh.wikipedia.org/wiki/%E4%B8%89%E8%A7%92%E4%B8%8D%E7%AD%89%E5%BC%8F)，有：

$$
\begin{array}{l}{\left|\mathbf{h}_{i}-\mathbf{h}_{j}\right| \leq\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|+\left|\mathbf{h}_{j}-\mathbf{c}_{y_{j}}\right|, \quad y_{i}=y_{j}} \\ {\left|\mathbf{h}_{i}-\mathbf{h}_{k}\right| \geq\left|\mathbf{h}_{i}-\mathbf{c}_{y_{k}}\right|-\left|\mathbf{h}_{k}-\mathbf{c}_{y_{k}}\right|, \quad y_{i} \neq y_{k}}\end{array}
$$

上式给定了类内两样本距离的上界和类间两样本距离的下界。

根据函数 $$g(\cdot, \cdot)$$ 的性质，我们可以得到三元组损失的上界：

$$
\begin{array}{l}{g\left(\left|\mathbf{h}_{i}-\mathbf{h}_{j}\right|,\left|\mathbf{h}_{i}-\mathbf{h}_{k}\right|\right)} \\ {\quad \leq g\left(\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|+\left|\mathbf{h}_{j}-\mathbf{c}_{y_{j}}\right|,\left|\mathbf{h}_{i}-\mathbf{c}_{y_{k}}\right|-\left|\mathbf{h}_{k}-\mathbf{c}_{y_{k}}\right|\right)} \\ {\quad \leq g\left(\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|,\left|\mathbf{h}_{i}-\mathbf{c}_{y_{k}}\right|\right)+\left(\left|\mathbf{h}_{j}-\mathbf{c}_{y_{j}}\right|+\left|\mathbf{h}_{k}-\mathbf{c}_{y_{k}}\right|\right)} \\ {\quad\left(y_{i}=y_{j}, y_{i} \neq y_{k}\right)}\end{array}
$$

因此，三元组损失可以用哈希码与 $C$ 个辅助向量 $$\mathbf{c}_1, …, \mathbf{c}_C$$ 的距离表示。

如果类别标签在样本中均匀分布，则有：

$$
\begin{aligned} \mathcal{L}_{t} & \leq \sum_{(i, j) \in S,(i, k) \notin S}\left[g\left(\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|,\left|\mathbf{h}_{i}-\mathbf{c}_{y_{k}}\right|\right)+\left(\left|\mathbf{h}_{j}-\mathbf{c}_{y_{j}}\right|+\left|\mathbf{h}_{k}-\mathbf{c}_{y_{k}}\right|\right)\right] \\ &=\sum_{s=1}^{C} \sum_{t=1, t \neq s}^{C} \sum_{i : y_{i}=s} \sum_{j : y_{j}=s} \sum_{k : y_{k}=t}\left[g\left(\left|\mathbf{h}_{i}-\mathbf{c}_{s}\right|,\left|\mathbf{h}_{i}-\mathbf{c}_{t}\right|\right)+\left(\left|\mathbf{h}_{j}-\mathbf{c}_{s}\right|+\left|\mathbf{h}_{k}-\mathbf{c}_{t}\right|\right)\right] \end{aligned}
$$

由于 $$y_j, y_k$$ 与 $$h_i$$ 无关，则有：

$$
\sum_{j : y_{j}=s} \sum_{k : y_{k}=t} g\left(\left|\mathbf{h}_{i}-\mathbf{c}_{s}\right|,\left|\mathbf{h}_{i}-\mathbf{c}_{t}\right|\right)=\left(\frac{n}{C}\right)^{2} g\left(\left|\mathbf{h}_{i}-\mathbf{c}_{s}\right|,\left|\mathbf{h}_{i}-\mathbf{c}_{t}\right|\right)
$$

同理，有

$$
\sum_{i : y_{i}=s} \sum_{j : y_{j}=s} \sum_{k : y_{k}=t}\left|\mathbf{h}_{j}-\mathbf{c}_{s}\right|=\left(\frac{n}{C}\right)^{2} \sum_{j : y_{j}=s}\left|\mathbf{h}_{j}-\mathbf{c}_{s}\right|
$$

和

$$
\sum_{i : y_{i}=s} \sum_{j : y_{j}=s} \sum_{k : y_{k}=t}\left|\mathbf{h}_{k}-\mathbf{c}_{t}\right|=\left(\frac{n}{C}\right)^{2} \sum_{k : y_{k}=t}\left|\mathbf{h}_{k}-\mathbf{c}_{t}\right|
$$

因此 $$\mathcal{L}_t$$ 的上界为：

$$
\begin{align}
\mathcal{L}_{t} & \leq\left(\frac{n}{C}\right)^{2}\left[\sum_{s=1}^{C} \sum_{t=1, t \neq s}^{C} \sum_{i : y_{i}=s} g\left(\left|\mathbf{h}_{i}-\mathbf{c}_{s}\right|,\left|\mathbf{h}_{i}-\mathbf{c}_{t}\right|\right) +\sum_{s=1}^{C} \sum_{t=1, t \neq s}^{C} \sum_{j : y_{j}=s}\left|\mathbf{h}_{j}-\mathbf{c}_{s}\right|+\sum_{t=1}^{C} \sum_{s=1, s \neq t}^{C} \sum_{k : y_{k}=t}\left|\mathbf{h}_{k}-\mathbf{c}_{t}\right|\right] \\
& =\left(\frac{n}{C}\right)^{2}\left[\sum_{i=1}^{n} \sum_{t=1, t \neq y_{i}}^{C} g\left(\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|,\left|\mathbf{h}_{i}-\mathbf{c}_{t}\right|\right)+\sum_{j=1}^{n} \sum_{t=1, t \neq y_{j}}^{C}\left|\mathbf{h}_{j}-\mathbf{c}_{y_{j}}\right|+\sum_{k=1}^{n} \sum_{s=1, s \neq y_{k}}^{C}\left|\mathbf{h}_{k}-\mathbf{c}_{y_{k}}\right|\right] \\
& =\left(\frac{n}{C}\right)^{2} \sum_{i=1}^{n}\left[\sum_{t=1, t \neq y_{i}}^{C} g\left(\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|,\left|\mathbf{h}_{i}-\mathbf{c}_{t}\right|\right)+2(C-1)\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|\right]
\end{align}
$$

令 $$l_{c}\left(\mathbf{h}_{i}, y_{i}\right)=\frac{1}{C-1} \sum_{l=1, l \neq y_{i}}^{C} g\left(\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|,\left|\mathbf{h}_{i}-\mathbf{c}_{l}\right|\right)$$，则有：

$$
\mathcal{L}_{t} \leq\left(\frac{n}{C}\right)^{2}(C-1) \sum_{i=1}^{n}\left[l_{c}\left(\mathbf{h}_{i}, y_{i}\right)+2\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|\right]
$$

$$l_c​$$ 可以认为是最大间距的多分类损失：

$$
l_{c}\left(\mathbf{h}_{i}, y_{i}\right)=\frac{1}{C-1} \sum_{l=1, l \neq y_{i}}^{C}\left[m+\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|-\left|\mathbf{h}_{i}-\mathbf{c}_{l}\right|\right]_{+}
$$

或者是 *Softmax* 损失：

$$
\begin{align}
l_{c}\left(\mathbf{h}_{i}, y_{i}\right) &=-\log \frac{\exp \left(-\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|\right)}{\sum_{j=1}^{C} \exp \left(-\left|\mathbf{h}_{i}-\mathbf{c}_{j}\right|\right)} \\
& =\frac{1}{C-1} \sum_{l=1, l \neq y_{i}}^{C}\left[-\log \frac{\exp \left(-\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|\right)}{e^{-\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|}+e^{-\left|\mathbf{h}_{i}-\mathbf{c}_{l}\right|}+\sum_{j=1,j\neq y_i,j \neq l}^{C} e^{-\left|\mathbf{h}_{i}-\mathbf{c}_{j}\right|}}\right]\end{align}
$$

#### 一元上界和语义簇一元损失（SCUL）

从上式可以看出，*UUB* 的时间复杂度为 $O(n)$，$$\mathbf{c}_1,…,\mathbf{c}_C$$ 可以看做是 $C$ 个簇中心，每个簇对应一个语义标签。

然而，直接最小化 *UUB* 可能不够稳定，因为 *UUB* 中的 $$|\mathbf{h}_i - \mathbf{c}_{y_i}|$$ 项在 *UUB* 中所占权重较大，为了满足 $$|\mathbf{h}_i - \mathbf{c}_{y_i}| = 0$$，可能使得 $$\mathbf{c}_{y_i}$$ 和 $$\mathbf{h}_i$$ 收敛到 $$\mathbf{0}$$。为了解决这个问题，需要为 $$\mathcal{L}_t$$ 寻找更严格的一元上界，即：

$$
\mathcal{L}_{t} \leq M_{t} \mathcal{L}_{u} \quad \mathcal{L}_{u}=\sum_{i=1}^{n}\left[l_{c}\left(\mathbf{h}_{i}, y_{i}\right)+\lambda\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|\right]
$$

其中， $$M_{t}=\left(\frac{n}{C}\right)^{2}(C-1), \lambda > 0$$。上式即为语义簇一元损失（*SCUL*）。

本文通过实验，在两个类别中进行测试，通过计算真实三元组损失，然后用 $$\lambda \doteq\left(\mathcal{L}_{t} / M_{t}-\sum_{i=1}^{n} l_{c}\left(\mathbf{h}_{i}, y_{i}\right)\right) / \sum_{i=1}^{n}\left|\mathbf{h}_{\mathbf{i}}-y_{i}\right|$$ 来估计 $$\lambda$$ 的取值，有下图 (a) 可以看出，$$\lambda$$ 的值在整个过程中都很小，所以使用相对小的 $$\lambda$$ 的值可以得到 $$\mathcal{L}_t$$ 更严格的一元上界。

![image-20190306145505687](https://ws3.sinaimg.cn/large/006tKfTcly1g0t2z4yc36j310y0gggq5.jpg)

#### 多标签扩展

实际应用中，一个样本可能有多个标签，当两个样本有一定数目的相同的标签时，认为两个样本相似。

还是考虑语义标签平均分布的情况，即每个样本 $$\mathbf{x}_i,i=1,…,n$$ 拥有某个标签 $$l \in \{1, …, C\}$$ 的概率为 $$p$$。当两个样本至少有一个标签相同时，认为他们相似，三元组损失定义为：

$$
\mathcal{L}_{m t}=\sum_{(i, j) \in S,(i, k) \notin S} r_{i j} g\left(\left|\mathbf{h}_{i}-\mathbf{h}_{j}\right|,\left|\mathbf{h}_{i}-\mathbf{h}_{k}\right|\right)
$$

其中 $$r_{ij} \ge 1$$ 表示 $$\mathbf{x}_i$$ 和 $$\mathbf{x}_j$$ 共有的标签数目。当两个样本共有的标签越多时，其相似度就越高。

令 $$Y_i \subseteq \{1, 2, …, C\}$$ 表示样本 $$\mathbf{x}_i$$ 的标签，并且对任意 $$l=1, 2, …, C$$，$$P(l\in Y_i) = p$$。则多标签三元组损失的一元上界的期望为：

$$
\begin{align} 
\mathbb{E}\left[\mathcal{L}_{m t}\right] \leq & (C-1) p^{2} n^{2} \sum_{i=1}^{n}[q\left(\left|Y_{i}\right|\right) l_{m c}\left(\mathbf{h}_{i}, Y_{i}\right) \\ 
& +\left(Q+q\left(\left|Y_{i}\right|\right)\right) \sum_{s \in Y_{i}}\left|\mathbf{h}_{i}-\mathbf{c}_{s}\right| ]
\end{align}
$$

其中 $$q(x)=\frac{C-x}{C-1}(1-p)^{x}, Q=(1-p)^{2}\left(1-p^{2}\right)^{C-2}$$，$$|Y_i|$$ 表示 $$\mathbf{x}_i$$ 包含的标签的数目，并且：

$$
l_{m c}\left(\mathbf{h}_{i}, Y_{i}\right)=\frac{1}{C-\left|Y_{i}\right|} \sum_{s \in Y_{i}} \sum_{t \notin Y_{i}} g\left(\left|\mathbf{h}_{i}-\mathbf{c}_{s}\right|,\left|\mathbf{h}_{i}-\mathbf{c}_{t}\right|\right)
$$

可以看做是多标签 *Softmax* 分类损失，即

$$
l_{m c}\left(\mathbf{h}_{i}, Y_{i}\right)=\sum_{s \in Y_{i}}\left[-\log \frac{\exp \left(-\left|\mathbf{h}_{i}-\mathbf{c}_{s}\right|\right)}{\sum_{j=1}^{C} \exp \left(-\left|\mathbf{h}_{i}-\mathbf{c}_{j}\right|\right)}\right]
$$

关于多标签三元组损失一元上界的证明过程可以参见[原论文](https://arxiv.org/abs/1805.08705)附录部分。

同理，我们可以得到更一般化的一元上界的形式，即：

$$
\begin{array}{c}{\mathbb{E}\left[\mathcal{L}_{m t}\right] \leq M_{m t} \mathcal{L}_{m u}} \\ {\mathcal{L}_{m u}=\sum_{i=1}^{n}\left[q\left(\left|Y_{i}\right|\right) l_{m c}\left(\mathbf{h}_{i}, Y_{i}\right)+u\left(\left|Y_{i}\right|\right) \sum_{s \in Y_{i}}\left|\mathbf{h}_{i}-\mathbf{c}_{s}\right|\right]}\end{array}
$$

### 基于语义簇的深度哈希方法

#### 模型

![image-20190306155203178](https://ws1.sinaimg.cn/large/006tKfTcly1g0t4khy2inj31a40ccjyt.jpg)

模型中，fc7特征提取的最后一层，在fc7之后包含两条路径，一是经过两个全连接层，第一层是有 $r$ 个输出的哈希层，第二层有 $C$ 个输出，$$\mathbf{C} = [\mathbf{c}_1,…,\mathbf{c}_C] \in \mathbb{R}^{r\times C}$$ 是第二层的参数，即 $$C$$ 个语义簇中心；第二条路径是通过 *Softmax* 分类的全连接层。

令 $$F(x)$$ 表示通过激活函数的哈希层的输出，则 $$H(x) = {\rm sgn}(F(x))$$ 即为哈希函数，$$F(x) \in \mathbb{R}^r$$。

#### 损失函数

令 $$\mathbf{h}_i = {\rm sgn}(F(\mathbf{x}_i)), i=1, 2, …, n$$，我们需要优化的 *SCUL* 为：

$$
\min _{F, \mathbf{C}} \mathcal{L}_{u}=\sum_{i=1}^{n}\left[l_{c}\left(\mathbf{h}_{i}, y_{i}\right)+\lambda\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|\right]
$$

其中 $$|\cdot|$$ 为欧式距离，正如上文讨论的，此损失的训练复杂度为 $O(n)$，并且与三元组损失有着理论关系。为了加快收敛，文中加入了分类损失 $$\mathcal{L}_{1}=\sum_{i=1}^{n} l_{1}\left(\mathbf{x}_{i}, y_{i}\right)$$ 作为另一个损失项：

$$
\min _{F, \mathbf{C}} \mathcal{L}=\mathcal{L}_{u}+\mu \mathcal{L}_{1}=\sum_{i=1}^{n}\left[l_{c}\left(\mathbf{h}_{i}, y_{i}\right)+\mu l_{1}\left(\mathbf{x}_{i}, y_{i}\right)+\lambda\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|\right]
$$

对于单标签问题，其中

$$
l_{c}\left(\mathbf{h}_{i}, y_{i}\right)=-\log \frac{\exp \left(-\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|\right)}{\sum_{j=1}^{C} \exp \left(-\left|\mathbf{h}_{i}-\mathbf{c}_{j}\right|\right)}
$$

对于多标签问题，上式中的 $$l_{c}\left(\mathbf{h}_{i}, y_{i}\right)+\lambda\left|\mathbf{h}_{i}-\mathbf{c}_{y_{i}}\right|$$ 可以被替换为 $$q\left(\left|Y_{i}\right|\right) l_{m c}\left(\mathbf{h}_{i}, Y_{i}\right)+\lambda \sum_{s \in Y_{i}}\left|\mathbf{h}_{i}-\mathbf{c}_{s}\right|$$，$$l_{mc}$$ 在上文中有定义，为了简单起见，定义 $$q(x) = 1/x$$，$$l_1(\mathbf{x}_i, y_i)$$ 是多分类 *Softmax* 损失。

#### 量化损失

本文中没有使用传统的量化损失，通过限制 $$F(x)$$ 的范数，使 $$F(x)$$ 的值接近 +1/-1，而是采取策略令 $$F(x)$$ 远离 $$\mathbf{0}$$，减少通过 sgn 函数得到的哈希码与 $$F(x)$$ 的差异。定义量化损失：

$$
l_{q}(\mathbf{f})=1-\frac{\mathbf{1}^{\mathrm{T}} \operatorname{abs}(\mathbf{f})}{\|\mathbf{1}\|_{q}\|\mathbf{f}\|_{p}}
$$

其中 $$1/p + 1/q = 1$$，根据[赫尔德不等式](https://zh.wikipedia.org/wiki/%E8%B5%AB%E5%B0%94%E5%BE%B7%E4%B8%8D%E7%AD%89%E5%BC%8F)，有 $$\operatorname{abs}(\mathbf{x})^{\mathrm{T}} \operatorname{abs}(\mathbf{y}) \leq\|\mathbf{x}\|_{p}\|\mathbf{y}\|_{q}$$，故 $$0 \le l_q(\mathbf{f}) \le 1$$。

新的优化问题如下：
$$
\begin{aligned} \min _{F, \mathbf{C}} \mathcal{L} &=\sum_{i=1}^{n}\left[l_{c}\left(F\left(\mathbf{x}_{i}\right), y_{i}\right)+\mu l_{1}\left(\mathbf{x}_{i}, y_{i}\right)\right.\\ &+\lambda\left|F\left(\mathbf{x}_{i}\right)-\mathbf{c}_{y_{i}}\right|+\alpha l_{q}\left(F\left(\mathbf{x}_{i}\right)\right) ] \end{aligned}
$$

当 $p$ 较大时，更容易进行优化，本文中使用 $$p=3, q=1.5$$。

#### 优化

对于标签数目很多的大数据集，如 *ImageNet*，因为一开始训练时分类的概率比较小，会对反向传播造成影响，所以需要进行 *warm-up* 操作对语义簇中心矩阵 $$\mathbf{C}$$ 的范数进行限制，比如让其等于某个定值 $$s$$， 来防止 $$F(\mathbf{x}_i)$$ 变成 $$\mathbf{0}$$。

对于较小规模的数据集，虽然不需要进行 *warm-up* 操作，但是为了防止语义簇中心变成 $$\mathbf{0}$$，一定要随机初始化使得其范数足够的大。

### 实验

详见[论文](https://arxiv.org/abs/1805.08705)。