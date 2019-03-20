---
title: Transitive Hashing Network for Heterogeneous Multimedia Retrieval
category: Research Note
date: 2019-03-20
tag:
 - deep hashing
 - transitive hashing
---

Transitive Hashing Network for Heterogeneous Multimedia Retrieval 论文阅读笔记。

<center><img src="https://ws4.sinaimg.cn/large/006tKfTcgy1g19e6c953nj31d40d0tce.jpg" /></center>

> AAAI 2017

本文针对的是在文本数据和图像数据不同源，不能直接获取相似关系的情况下的跨模态检索问题，文中提出了**迁移哈希**的思路，利用现有的同源跨模态数据集作为辅助数据集，进行迁移学习，通过拟合非同源数据与同源数据的分布，以同源跨模态数据集的相似度拟合非同源数据集的相似度，从而完成相似度的学习，生成各模态对应的哈希码。

### 研究动机

1. 满足非同源跨模态数据间的检索需求，比如用YahooQA数据集中的文本检索ImageNet的图像等；
2. 现有的跨模态方法针对的都是有同源有标签的跨模态数据集进行的，直接用于非同源的跨模态检索效果不佳

### 模型

<center><img src="https://ws4.sinaimg.cn/large/006tKfTcly1g19gr5g9ymj31em0gudsx.jpg" /></center>

模型包含两个部分：异构相似度学习和同构分布拟合。

#### 异构相似度学习

由于本文中问题的特殊性，本文的训练集为图片模态 $$\mathcal{X} = \{x_i\}_{i=1}^N$$ 和 文本模态 $$\mathcal{Y} = \{y_j\}_{j=1}^M$$，其中 $$\mathcal{X}$$ 由整个辅助数据集图片模态的数据 $$\bar{\mathcal{X}}$$ 和 $$\hat n$$ 个非同源查询集中的图片或文本组成，即 $$N = \bar n + \hat n$$；$$\mathcal{Y}$$ 由整个辅助数据集文本模态的数据 $$\bar {\mathcal{Y}}$$ 和 $$\hat m$$ 个非同源数据库中的图片文本组成，集 $$M = \bar m + \hat m$$。

异构相似度学习，目的是学习图片和文本之间的相似度。损失函数如下：

$$
\min _{\Theta} J=L+\lambda Q
$$

其中，

$$
L=\sum_{s_{i j} \in \mathcal{S}} \log \left(1+\exp \left(\left\langle\boldsymbol{z}_{i}^{x}, \boldsymbol{z}_{j}^{y}\right\rangle\right)\right)-s_{i j}\left\langle\boldsymbol{z}_{i}^{x}, \boldsymbol{z}_{j}^{y}\right\rangle
$$

$$
Q=\sum_{s_{i j} \in \mathcal{S}} \sum_{k=1}^{b}\left(-\log \left(\left|z_{i k}^{x}\right|\right)-\log \left(\left|z_{j k}^{y}\right|\right)\right)
$$

$$L$$ 为基于对的交叉熵损失，$$Q$$ 为量化损失，$$z$$ 是 *Tanh* 激活函数之后的实值哈希码。

#### 同构分布拟合

通过最小化**再生核希尔伯特空间（RKHS）**内两个分布 $$P_d$$ 和 $$P_x$$ 的**最大平均差异**（**Maximum Mean Discrepancy, MMD**）的方法来对齐两个分布。 $$P_d$$ 和 $$P_x$$ 的 MMD 为：

$$
D_{q} \triangleq\left\|\mathbb{E}_{\boldsymbol{h}^{q} \sim P_{q}}\left[\phi\left(\boldsymbol{h}^{q}\right)\right]-\mathbb{E}_{\boldsymbol{h}^{x} \sim P_{x}}\left[\phi\left(\boldsymbol{h}^{x}\right)\right]\right\|_{\mathcal{H}}^{2}
$$

其中 $$P_q$$ 是查询集 $$\mathcal{X}^q$$ 的分布，$$P_x$$ 是辅助数据集中 $$\bar{\mathcal{X}}$$ 的分布，即：

$$
\begin{aligned} D_{q} &=\sum_{i=1}^{\hat{n}} \sum_{j=1}^{\hat{n}} \frac{k\left(\boldsymbol{z}_{i}^{q}, \boldsymbol{z}_{j}^{q}\right)}{\hat{n}^{2}}+\sum_{i=1}^{\overline{n}} \sum_{j=1}^{\overline{n}} \frac{k\left(\boldsymbol{z}_{i}^{x}, \boldsymbol{z}_{j}^{x}\right)}{\overline{n}^{2}} \\ &-2 \sum_{i=1}^{\hat{n}} \sum_{j=1}^{\overline{n}} \frac{k\left(\boldsymbol{z}_{i}^{q}, \boldsymbol{z}_{j}^{x}\right)}{\hat{n} \overline{n}} \end{aligned}
$$

其中 $$k\left(\boldsymbol{z}_{i}, \boldsymbol{z}_{j}\right)=\exp \left(-\gamma\left\Vert\boldsymbol{z}_{i}-\boldsymbol{z}_{j}\right\Vert^{2}\right)$$ 是高斯核函数。相似的，替换 $$q, x, \hat n, \bar n$$ 为 $$d,y,\hat m, \bar m$$，就可得到辅助变量 $$\bar{\mathcal{Y}}$$ 和 $$\mathcal{Y}_d$$ 分布的 MMD $$D_d$$。 

总的损失函数为：

$$
\min _{\Theta} C=J+\mu\left(D_{q}+D_{d}\right)
$$

### 实验

详见[论文](https://www.aaai.org/ocs/index.php/AAAI/AAAI17/paper/viewPaper/14559)。

### 问题

文中提到在进行异构相似度学习时需要用到相似矩阵，但是非同源跨模态数据集中没有监督信息，相似度如何赋值。在实验阶段提到的为非同源跨模态文本和图像给予标签的方法，是只用于测试的时候评价还是训练的时候也用到，如果训练的时候非同源跨模态数据集有标签的话，就又和本文针对的问题不相符了。