---
title: Weakly Supervised Deep Image Hashing through Tag Embeddings
category: Research Note
date: 2019-03-11
tag:
 - weakly supervised
 - image retrieval
 - deep hashing
---

Weakly Supervised Deep Image Hashing through Tag Embeddings 论文阅读笔记。

![image-20190311112846816](https://ws1.sinaimg.cn/large/006tKfTcgy1g0yp2553r3j31gi0bc40p.jpg)

> CVPR 2019

本文提出了弱监督图像哈希的问题，由于图像的标签信息不容易获得，而从Web上得到的图像数据可能包含大量的 tag 信息，使用这些 tag 信息来学习图像的哈希码的问题即为弱监督图像哈希问题。本文提出了使用 word2vec 来编码 tag 信息并设计了三个损失函数的方法进行弱监督图像哈希的学习。

弱监督图像哈希和跨模态哈希的区别，前者使用 $(image, tags)$ 对进行学习，后者使用 $(image, tags, labels)$ 三元组进行学习，所以前者称为弱监督，而后者则是监督学习；而且，前者学习的目标是借助 tag 信息将图像映射到哈希空间，进行的还是图像之间的检索，后者则是 image 和 tags 相互影响，学习目标是将图像和文本一起映射到同一个哈希空间，进行的是图像到文本或者文本到图像的检索问题。

### 模型

![image-20190311114108871](https://ws3.sinaimg.cn/large/006tKfTcgy1g0ypeyvqduj31s20lwk0i.jpg)

* H1层为hash层，用来生成最后的hash码
* H1层用来生成图片的 tag embedding，与图片真实的 tag embedding 进行比较，产生损失

#### Tag 的处理

使用图片中出现的 tag 的平均，tf值或者 itf 值作为每个 tag 的权重，进行加权求和。

$$
\begin{array}{l}{mean: \boldsymbol{w}_{i}=\frac{1}{m} \sum_{j=1}^{m} \boldsymbol{v}_{i}^{j}} \\ {t f : \boldsymbol{w}_{i}=\frac{1}{m} \sum_{j=1}^{m} \frac{n\left(\tau_{i}^{j}\right)}{N} \boldsymbol{v}_{i}^{j}} \\ {i t f : \boldsymbol{w}_{i}=\frac{1}{m} \sum_{j=1}^{m} \log \frac{N}{n\left(\tau_{i}^{j}\right)} \boldsymbol{v}_{i}^{j}}\end{array}
$$

其中 $$\tau_i^j$$ 是第 $i$ 张图片的第 $j$ 个 tag，$$\boldsymbol{v}_i^j$$ 是第 $$i$$ 个图片的第 $$j$$ 个 tag 的 word2vec 向量，$$\boldsymbol{w}_i$$ 是第 $$i$$ 个图片 tags 的 embedding。

#### 损失函数

* 基于对的相似度损失

  使用余弦相似度度量两个图片 tags embedding 的相似度，来表示图片的相似度，损失如下：
  
  $$
  \begin{aligned} L_{1} &=\sum_{i=1}^{k} \sum_{j=1}^{k}\left[\frac{1}{b}\left(\boldsymbol{h}_{i}^{(1)}-\boldsymbol{h}_{j}^{(1)}\right)^{T} \cdot\left(\boldsymbol{h}_{i}^{(1)}-\boldsymbol{h}_{j}^{(1)}\right)\right.\\ &-\frac{1}{2}\left(1.0-\frac{\boldsymbol{w}_{i}^{T} \cdot \boldsymbol{w}_{j}}{\left\|\boldsymbol{w}_{i}\right\|\left\|\boldsymbol{w}_{j}\right\|}\right) \bigg]^{2} \end{aligned}
  $$

  其中 $$\boldsymbol{h}^{(1)}$$ 表示 H1 层的输出，$$k$$ 为 batch size，$$b$$ 为 hash 码长度。

* 基于 mini-batch 的铰链损失（Hinge loss）
  
  $$
  L_{2}=\sum_{n} \sum_{j \neq n} \max \left[0, \operatorname{margin}+\boldsymbol{w}_{j} \cdot \boldsymbol{h}_{n}^{(2)}-\boldsymbol{w}_{n} \cdot \boldsymbol{h}_{n}^{(2)}\right]
  $$
  
  其中 $$\boldsymbol{h}^{(2)}$$ 表示 H2 层的输出。该损失等于 0 时，必须满足第 $$n$$ 张图片在 H2 层的输出与其真实的 tag embedding 的距离要小于它与其他图片的 tag embedding 的距离加上 margin。

* 量化损失
  
  $$
  L_{3}=-\sum_{i=1}^{k} \frac{1}{b}\left(\boldsymbol{h}_{n}^{(1)}-0.5 \boldsymbol{I}\right)^{T} \cdot\left(\boldsymbol{h}_{n}^{(1)}-0.5 \boldsymbol{I}\right)
  $$

* 总的损失
  
  $$
  L = \lambda_1L_1 + \lambda_2L_2 + \lambda_3 L_3
  $$

#### 二值 tag-vector 模型

不使用 word2vec，当两张图片至少有一个 tag 相同，就视为相似，因为没有 word2vec 的应用，H2层被删除，新的损失函数为：

$$
\begin{align}
L_{4}= &\sum_{i=1}^{k} \sum_{j=1}^{k} S *(1-\beta) * D+ 
\\ & {(1-S) * \beta *(\max (0, \operatorname{margin}-D))^{2}} \\ 
 & {\text { where } \quad D=\frac{1}{b}\left(\boldsymbol{h}_{i}^{(1)}-\boldsymbol{h}_{j}^{(1)}\right)^{T} \cdot\left(\boldsymbol{h}_{i}^{(1)}-\boldsymbol{h}_{j}^{(1)}\right)}
\end{align}
$$

其中 $$S$$ 表示相似度矩阵，$$\beta$$ 表示 mini-batch 中相似对的比例。

此时总的损失为：

$$
L = \lambda_3L_3 + \lambda_4L_4
$$

### 实验

详见[论文](https://arxiv.org/abs/1806.05804)。