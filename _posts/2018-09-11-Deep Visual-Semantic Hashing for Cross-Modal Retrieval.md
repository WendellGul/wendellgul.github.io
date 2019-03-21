---
title: Deep Visual-Semantic Hashing for Cross-Modal Retrieval
category: Research Note
tag:
 - deep hashing
 - cross-modal retrieval
---

Deep Visual-Semantic Hashing for Cross-Modal Retrieval（DVSH）论文阅读笔记。

![image-20180911095135825](https://ws3.sinaimg.cn/large/0069RVTdly1fv5d36rp66j317809mwgu.jpg)

> KDD 2016

本文提出了一个**深度图像语义哈希（DVSH）**模型，用来为图像和句子生成哈希码。模型将对图像操作的CNN、对句子操作的RNN和一个结构化的最大间隔目标函数结合起来，同时有效地实现了多模态特征抽取和跨模态哈希表示。

<!-- more -->

## 模型

![image-20180911101828745](https://ws1.sinaimg.cn/large/0069RVTdly1fv5dv6ggikj31kw0htqmi.jpg)

* $$N$$ 个样本 $$\{\mathbf{o}_i = (\mathbf{x}_i, \mathbf{y}_i)\}_{i=1}^N$$ 
* $$\mathbf{x}_i \in \mathbb{R}^{D_x}$$ 表示图像模态数据的 $$D_x$$ 维特征
* $$\mathbf{y}_i = \langle\mathbf{y}_{i1}, \mathbf{y}_{i2},\cdots, \mathbf{y}_{iT}\rangle \in \mathbb{R}^{D_y \times T}$$ 表示第 $$i$$ 个句子的词序列，其中 $$\mathbf{y}_{it} \in \mathbb{R}^{D_y}$$ 是序列 $$i$$ 中时刻 $$t$$ 的词的one-hot向量，词典大小 $$D_y$$
* 相似标签 $$s_{ij} = 1$$ 表示 $$\mathbf{o}_i$$ 和 $$\mathbf{o}_j$$ 相似，$$s_{ij} = -1$$ 表示不相似，相似矩阵 $$\mathcal{S} = \{s_{ij}\}$$ 一般从数据的语义标签或者点击查询的反馈中获得

本文提出的方法是学习**融合函数**，$$f(\mathbf{x},\mathbf{y}): (\mathbb{R}^{D_x}, \mathbb{R}^{D_y\times T}) \mapsto \{-1, 1\}^K$$，将图像和文本数据映射成 $$K$$ 维的Hamming距离空间 $$\mathcal{H}$$ 中，并且保留他们之间的相关关系；模型同时还学习两个具体模态的哈希函数 $$f_x(\mathbf{x}):\mathbb{R}^{D_x} \mapsto \{-1, 1\}^K$$ 和 $$f_y(\mathbf{y}):\mathbb{R}^{D_y \times T} \mapsto \{-1,1\}^K$$ ，将数据库中的每一个图像和句子数据都编码成二进制码 $$\mathbf{u} \in \{-1,1\}^K$$ 和 $$\mathbf{v} \in \{-1,1\}^K$$ 。

本文的模型中，CNN使用的是AlexNet，RNN使用的是LSTM，模型的输入 $$(\mathbf{o}_i,\mathbf{o}_j,s_{ij})$$ ，然后将其传入特征学习和哈希码生成的流水线中。

### 图像语义融合网络

如上图左边部分所示，网络将图片和文本的特征表示映射到一个共同的语义表达空间中，使得图像-文本对包含的语义关联度最大，即保留相似标签表示的数据的相似度。

将一张图片 $$\mathbf{x}_i$$ 作为输入传入 CNN 网络中，生成一个**固定长度的表示向量** $$\mathbf{h}_i^x$$ 。将AlexNet的 *fc8* 的分类层替换成一个特征映射层，将 *fc7* 特征映射成一个新的 $$K$$ 维特征。

LSTM 将在时间 $$t$$ 的输入 $$\mathbf{y}_{it}$$ 和前一个时间 $$t$$ 的隐含状态 $$\mathbf{h}_{i(t-1)}^y$$ 映射成一个输出 $$\mathbf{z}_{it}^y$$ 和新的隐含状态 $$\mathbf{h}_{it}^y$$。

为了将CNN和LSTM整合到起来，这里引入了第二层LSTM，即将 $$\mathbf{x}_i$$ 的表示 $$\mathbf{h}_i^x$$ **融合到LSTM每个状态的第二层**，融合层（绿色的LSTM）在状态 $$t$$ 的激活函数为：

$$
\mathbf{h}_{it} = f(\mathbf{h}_i^x + \mathbf{h}_{it}^y)
$$

为了使得 $$\mathbf{h}_{it}$$ 与最终的哈希码 $$\mathbf{u}_i, \mathbf{v}_i$$ 的差别更小，通过 tanh 函数将 $$\mathbf{h}_{it}$$ 变换到 $$[-1,1]$$ 之间。

上述过程中每个时间步 $$t$$ 都生成了一个联合特征 $$\mathbf{h}_{it}$$，但是对于一个图像-文本对，只需要一个联合特征，本文通过 **mean embeddings of distributions** 来生成每一对的融合特征：

$$
\mathbf{h}_i = \frac{\sum_{t=1}^T \pi_{it}\mathbf{h}_{it}}{\sum_{t=1}^T \pi_{it}} = \frac{\sum_{t=1}^T \pi_{it}f(\mathbf{h}_i^x+\mathbf{h}_{it}^y)}{\sum_{t=1}^T\pi_{it}}
$$

其中 $$\pi_{it}\in\{1,0\}$$ 是指示变量，当词 $$t$$ 在时间步 t 出现时，$$\pi_{it} = 1$$ ，否则 $$\pi_{it} = 0$$ 。这样处理的原因是每个句子的长度不一样。

值得注意的是，生成的联合语义特征 $$\mathbf{h}_i$$ 不仅需要“捕获”图像数据的空间依赖和文本数据的时序特征，还应该获取数据在Hamming空间的关系，保留数据对之间的相似信息。

#### 余弦最大间距损失（Cosine Max-Margin Loss）

当 $$s_{ij} = 1$$ 时，表示数据 $$\mathbf{o}_i$$ 和 $$\mathbf{o}_j$$ 相似，则他们的哈希码 $$\mathbf{u}_i$$ 和 $$\mathbf{v}_j$$ 也必须相似。这意味着他们联合语义表示 $$\mathbf{h}_i$$ 和 $$\mathbf{h}_j$$ 应该相似，反之，他们的联合语义表示应该不相似。

使用**余弦相似度** $$\cos(\mathbf{h}_i,\mathbf{h}_j) = \frac{\mathbf{h}_i \cdot \mathbf{h}_j}{\|\mathbf{h}_i\|\|\mathbf{h}_j\|}$$ 来度量两者的关联性。对于相似度保留学习，提出了下面的**余弦最大间距损失**：

$$
L = \sum_{s_{ij}\in\mathcal{S}}\max\Big(0, \mu_c - s_{ij}\cos(\mathbf{h}_i, \mathbf{h}_j) \Big)
$$

其中，$$\mu_c > 0$$ 是间距参数，固定为 $$\mu_c = 0.5$$。

#### 基于位的最大间距损失（Bitwise Max-Margin Loss）

对于每一个图像-文本对 $$\mathbf{o}_i = (\mathbf{x}_i, \mathbf{y}_i)$$ ，为了减小联合语义特征 $$\mathbf{h}_i$$ 和他们的模态相关的哈希码 $$\mathbf{u}_i, \mathbf{v}_i$$ 的差距，要求 $$\mathbf{h}_i$$ 与 $${\rm sgn}(\mathbf{h})\in \{-1,1\}^K$$ 尽可能接近，即使得 $$\parallel \mid\mathbf{h}_i\mid - \mathbf{1}\parallel^2$$ 最小化。

由于平方损失容易受离群点影响，因此提出了**基于位的最大间距损失**：

$$
Q = \sum_{i=1}^N \sum_{k=1}^K \max(0, \mu_b - |h_{ik}|)
$$

其中 $$\mu_b > 0 $$ 是间距参数，固定为 $$\mu_b = 0.5$$。该目标函数鼓励 $$\mathbf{h}_i$$ 的第 $$k$$ 位分散在 $$h_{ik} = 0$$ 两边。

### 特定模态的Hash网络

图像语义融合网络学习的特征是连接两个不同模态的桥梁，其存在两个问题：

* 不能扩展到样本外的数据
* 需要两个模态的数据作为输入，不能直接用于跨模态检索

因此还需要两个Hash网络，来直接学习每个模态的Hash函数。

#### 图像哈希网络

直接使用AlexNet的 *conv1-fc7* 层，然后将 *fc8* 层的softmax替换成一个Hash函数，将 $$\mathbf{x}_i$$ 的特征表示转换成哈希码 $$\mathbf{u}_i$$ 。为了保证生成的哈希码在联合语义空间中，要求 $$\mathbf{x}_i$$ 的哈希码 $$\mathbf{u}_i$$ 和联合特征 $$\mathbf{h}_i$$ 尽可能的接近：

$$
L^x = \frac 1{2N}\sum_{i=1}^N \Big(\mathbf{u}_i - \frac{\sum_{t=1}^T \pi_{it}\mathbf{h}_{it}}{\sum_{t=1}^T\pi_{it}} \Big)^2
$$

#### 文本哈希网络

将 LSTM 中的softmax层替换为Hash函数，将特征表示转换成哈希码，同样的，要求句子 $$\mathbf{y}_i$$ 的联合特征表示 $$\mathbf{h}_i$$ 和哈希码 $$\mathbf{v}_i$$ 的平方误差尽可能小：

$$
L^y = \frac1{2N}\sum_{i=1}^N \frac{\sum_{t=1}^T (\mathbf{v}_{it} - \mathbf{h}_{it})^2}{\sum_{t=1}^T\pi_{it}}
$$

### DVSH

整合上述的损失函数，有：

$$
\min_\Theta O = L + \lambda Q + \beta(L^x+ L^y)
$$

其中

* $$\Theta \triangleq \{\mathbf{W}_*^l, \mathbf{b}_*^l\}_{*\in\{x,y,u,v\}}$$ 表示网络参数
* $$\lambda, \beta$$ 为惩罚因子

训练完成后，使用 $${\rm sgn}(\mathbf{u})$$ 和 $${\rm sgn}(\mathbf{v})$$ 获得每个模态的哈希码。

### 学习算法

使用BP算法，通过SGD来学习网络的参数。

## 实验

详见论文。