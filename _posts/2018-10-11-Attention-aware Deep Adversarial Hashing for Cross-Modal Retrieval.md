---
title: Attention-aware Deep Adversarial Hashing for Cross-Modal Retrieval
category: Research Note
tag:
 - adversarial learning
 - attention mechanism
 - cross-modal retrieval
---

Attention-aware Deep Adversarial Hashing for Cross-Modal Retrieval 阅读笔记。

![image-20181011104959190](https://ws2.sinaimg.cn/large/006tNbRwly1fw43d8k6pgj30kq099dhb.jpg)

> ECCV 2018

本文提出了一个新的**深度对抗哈希**方法，主要包含三个部分：

1. 一个用来学习多模态数据的语义特征的特征学习模块；
2. 一个用来生成自适应 **attention masks** 的注意力模块，该模块通过 attention masks 将特征表示分为两个部分，**attended** 特征和 **unattended** 特征；
3. 一个用来学习多模态哈希码的哈希模块。

为了获得好的 attention masks 并产生有效的 hash 码，本文还提出了**对抗检索损失**和**跨模态检索损失**。

<!-- more -->

## 模型

![image-20181011110106177](https://ws2.sinaimg.cn/large/006tNbRwly1fw43orfiauj30vh0ek7dx.jpg)

### 问题定义

* 训练集：$$\{I_i, T_i\}_{i=1}^n$$
* 相似矩阵：$$S\in \{0,1\}^{n\times n}$$，$$S_{ij} = 1$$ 表示第 $$i$$ 个图片和 $$j$$ 个文本相似
* 相似的图像和文本的哈希码的汉明距离应该尽可能小

### 特征学习模块 $E^I,E^T$

通过 VGGNet 来学习图像的特征，两层神经网络来学习文本特征，令 $$f_i^I = E^I(I_i)$$ 和 $$f_i^T = E^T(T_i)$$ 分别表示图像的**特征图**和文本的**特征向量**。

### 注意力模块 $G^I,G^T$

![image-20181011111527592](https://ws2.sinaimg.cn/large/006tNbRwly1fw443ozwioj30xw0cxtea.jpg)

首先将图像特征图输入到一个核大小为 $$1 \times 1$$ 的卷积层中，假设第 $$i$$ 个图像的特征图为 $$f_i^I \in \mathbb{R} ^{H\times W\times C}$$，通过卷积层将 $$f_i^I$$ 压缩为一个矩阵 $$M_i^I = Conv(f_i^I)$$，其中 $$M_i^I \in \mathbb{R}^{H \times W}$$，第二步将 $$M_i^I$$ 输入到一个 softmax 层，得到概率矩阵 $$P_i^I$$，第三步，使用阈值函数获得 attention mask，阈值函数定义如下：

$$
Z_i^I(h,w) = \begin{cases}
1 & P_i^I(h,w) \ge \alpha \\
0 & P_i^I(h,w) \lt \alpha
\end{cases}
$$

其中 $$\alpha$$ 为预定义的阈值，取值为 $$\frac{1}{H\times W}$$。阈值函数的输出即为二值掩码矩阵，基于这个掩码矩阵可以计算第 $$i$$ 个图像的 attended 特征和 unattended 特征：

$$
\breve{f}_i^I(h,w,c) = Z_i^I(h,w) \times f_i^I(h,w,w),\quad\textbf{(attended)}\\
\hat{f}_i^I(h,w,c) = (1-Z_i^I(h,w))\times f_i^I(h,w,c),\quad \textbf{(unattended)}
$$

将整个过程表示为 $$[\breve{f}_i^I,\hat{f}_i^I] = G^I(f_i^I)$$。

对于文本模态数据，类似地有：

$$
\begin{align}
&M_i^T = {\rm fc}(f_i^T), \\
&P_i^T = {\rm softmax}(M_i^T), \\
&Z_i^T = {\rm threshold}(P_i^T), \\
&\breve{f}_i^T(j) = Z_i^T(j) \times f_i^T(j),\quad \textbf{(attended)} \\
&\hat{f}_i^T(j)=(1-Z_i^T(j))\times f_i^T(j),\quad \textbf{(unattended)}
\end{align}
$$

其中 $$fc$$ 为全连接层。

因为BP算法不能直接对阈值函数求导，本文采用[这篇论文](https://arxiv.org/abs/1602.02830)中的方法传播阈值函数的梯度。

### 哈希模块 $D^I,D^T$

![image-20181011150257422](https://ws3.sinaimg.cn/large/006tNbRwly1fw4aog0v4mj30tq0aimzw.jpg)

对于图像数据，将得到的两个特征经过两个全连接层（VGGNet的最后两层），然后加一个 $$q$$ 维的全连接层通过 tanh 激活函数输出哈希码，attended特征哈希码表示为 $$H_i^I = D^I(\breve{f}_i^I)$$，unattended特征哈希码表示为 $$\hat{H}_i^I =D^I(\hat{f}_i^I)$$。

对于文本数据，使用一层通过 tanh 激活的全连接层输出哈希码，attended特征哈希码表示为 $$H_i^T = D^T(\breve{f}_i^T)$$，unattended特征哈希码表示为 $$\hat{H}_I^T =D^T(\hat{f}_i^T)$$。

### 目标函数

#### 跨模态检索损失

该损失的目标是保留图像和文本的相似性，同时应用模态间的排序损失和模态内的排序损失来达到目标，即，不同模态数据的哈希码和同一模态数据的哈希码都应该保留他们的语义相似度，因此，跨模态检索损失被定义为：

$$
\min \mathcal{F}_{T\rightarrow I} + \mathcal{F}_{I\rightarrow T} +\mathcal{F}_{I\rightarrow I} +\mathcal{F}_{T\rightarrow T}
$$

其中前两项保留了不同模态的语义信息，后两项保留了同一模态的语义信息，$$\mathcal{F}_{A\rightarrow B}$$ 表示 $$A$$ 模态数据作为查询，$$B$$ 模态数据作为数据库的损失，定义如下：

$$
\mathcal{F}_{A\rightarrow B} = \sum_{\langle i, j, k \rangle} \max\{0, \varepsilon + \|H_i^A - H_j^B\| - \|H_i^A-H_k^B\} \\
s.t. \quad \forall\langle i,j,k \rangle, S(i,j) > S(i,k)
$$

#### 对抗检索损失

本文基于生成对抗网络的思想，用 GAN 来**生成注意力的分布（即attention masks）**并学习哈希码。

就文本到图像来说，给定一个查询 $$H_i^T$$，哈希模块和注意力模块使用对抗的思想来训练：

* 哈希模块需要尽可能的保留查询和图像模态数据的unattended特征的语义相似性，即当 $$S(i,j) > S(i,k)$$ 时，$$H_i^T$$ 距离 $$\hat{H}_j^I$$ 应该比 $$\hat{H}_k^I$$ 更近。
* 注意力模块则尝试去寻找语义相似性没有被哈希模块成功保留的unattended区域，即此时 $$H_i^T$$ 距离 $$\hat{H}_k^I$$ 应该比 $$\hat{H}_j^I$$ 更近。

图像到文本与上述类似，损失函数定义如下：

$$
\begin{align}
\mathcal{F}_{T\rightarrow \hat{I}} + \mathcal{F}_{I\rightarrow \hat{T}} &= \sum_{\langle i,j,k \rangle} \max\{0, \varepsilon + \|H_i^T - \hat{H}_j^I\| - \|H_i^T - \hat{H}_k^I\|\} \\
&+ \sum_{\langle i,j,k \rangle} \max\{0, \varepsilon + \|H_i^I - \hat{H}_j^T\| - \|H_i^I - \hat{H}_k^T\|\}
\end{align}
$$

$$G^I,G^T$$ 尝试最大化上述损失而 $$D^I,D^T$$ 则是最小化上述损失：

$$
\min_{D^I,D^T} \max_{G^I,G^T}\mathcal{F}_{T\rightarrow \hat{I}} + \mathcal{F}_{I\rightarrow \hat{T}}
$$

#### 对此损失的理解

![image-20181011163019865](https://ws4.sinaimg.cn/large/006tNbRwly1fw4d7cd2ycj30ld0cmae8.jpg)

本文中的注意力模型相当与生成对抗网络的生成器，用来生成attention mask，然后将特征划分成两部分，这里注意力模块认为unattended的特征应该与attended特征的语义是不相似的，因此需要文本查询哈希码和与其相似的图像的unattended特征的哈希码尽可能远，而最终用于检索的哈希码只是attended特征得到的，所以哈希模块还需要保留attended特征与unattended特征的语义相似信息。

### 总的目标函数

$$
\begin{align}
&\mathcal{F}(E^I,E^T,G^I,G^T,D^I,D^T) = \mathcal{F}_{T\rightarrow \hat{I}} + \mathcal{F}_{I\rightarrow \hat{T}} \\
&+ \mathcal{F}_{T\rightarrow I} + \mathcal{F}_{I\rightarrow T} + \mathcal{F}_{I\rightarrow I}+ \mathcal{F}_{T\rightarrow T}
\end{align}
$$

交替地进行模型的训练，首先将 $$G^I,G^T$$ 的参数固定，其他参数通过下式训练：

$$
\min_{E^I,E^T,D^I,D^T} \mathcal{F}(E^I,E^T,G^I,G^T,D^I,D^T)
$$

然后将 $$E^I,E^T,D^I,D^T$$ 固定，注意力模型可以通过下式训练：

$$
\max_{G^I,G^T}\mathcal{F}_{T\rightarrow \hat{I}} + \mathcal{F}_{I\rightarrow \hat{T}}
$$

## 实验

具体见论文。