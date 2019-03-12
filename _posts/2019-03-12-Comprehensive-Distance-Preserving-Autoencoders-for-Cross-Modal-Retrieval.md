---
title: Comprehensive Distance-Preserving Autoencoders for Cross-Modal Retrieval
category: Research Note
date: 2019-03-12
tag:
 - cross-modal retrieval
 - unsupervised
 - autoencoder
 - similarity measurement
---

Comprehensive Distance-Preserving Autoencoders for Cross-Modal Retrieval 论文阅读笔记。

![image-20190312104219219](https://ws1.sinaimg.cn/large/006tKfTcgy1g0ztc2i3s1j31po0kmq8s.jpg)

> ACM MM 2018

### 研究动机

1. 如何减少提取的图片或者文本特征中冗余噪声的负面影响

   ![image-20190312104654586](https://ws2.sinaimg.cn/large/006tKfTcly1g0ztgu4uzaj30ro0pe7wh.jpg)

   上图中背景信息的特征即是冗余的特征。

2. 如何直接使用不同对象的表示来度量它们之间的关系

   ![image-20190312105002376](https://ws2.sinaimg.cn/large/006tKfTcgy1g0ztk3e0zpj30f00a2go6.jpg)

   在之前的无监督跨模态检索方法中，只考虑了上图中实线之间的关系，没有考虑虚线之间的关系。

### 主要贡献

* 使用降噪自编码机来减少特征中噪声的影响，并且提出了一个综合距离保持的公共子空间，来探索不同模态之间的关系；
* 提出了一个无监督的相似度度量策略，通过边缘概率来计算两个表示之间的相似度；
* 整合降噪自编码机，综合距离保持子空间以及无监督相似度度量策略，提出了 **CDPAE** 方法。

### 模型

![image-20190312105951415](https://ws1.sinaimg.cn/large/006tKfTcgy1g0ztub47rfj31i40nghdt.jpg)

模型包含四个部分：去燥自编码机，综合距离保持空间，联合损失函数和无监督相似度测量。

#### 去燥自编码机

值得注意的是，模型的每次输入都是两对数据，因此存在四个降噪自编码机，每个模态都有两个自编码机，同一模态的自编码机共享参数。

在将特征输入到自编码机之前，会随机地将固定数量的输入分量设置为 0，其余的保持不变，该方法模拟了从输入端去除冗余噪声的过程。而且，归零操作可以看做是对数据的扩充。

去燥自编码机的重构损失定义为：

$$
\begin{aligned} L_{\text {recon}}=& L_{r}\left(v_{i} ; \alpha_{V}, \omega_{V}, \theta_{V}\right)+L_{r}\left(v_{j} ; \alpha_{V}, \omega_{V}, \theta_{V}\right) \\ &+L_{r}\left(t_{i} ; \alpha_{T}, \omega_{T}, \theta_{T}\right)+L_{r}\left(t_{j} ; \alpha_{T}, \omega_{T}, \theta_{T}\right) \end{aligned}
$$

其中

$$
L_{r}(x ; \alpha, \omega, \theta)=\|x-G(F(Z(x, \alpha), \omega), \theta)\|_{2}
$$

上式中，$$Z(\cdot)$$ 是随机置零过程，$$F(\cdot)$$ 是编码过程，$$G(\cdot)$$ 是解码过程，$$\alpha$$ 是置零占比概率，$$\omega,\theta$$ 是自编码器的参数，$$v_i$$ 表示第 $$i$$ 个图像特征，$$t_i$$ 表示第 $$i$$ 个文本特征。

#### 综合距离保持空间

首先通过余弦距离来度量两个特征的相似性：

$$
C(X, Y)=\frac{1-X \cdot Y}{\|X\|\|Y\|}=1-\sum_{k=1}^{n} x_{k} y_{k} / \sqrt{\sum_{k=1}^{n} x_{k}^{2}} \sqrt{\sum_{k=1}^{n} y_{k}^{2}}
$$

所以两个输入特征的距离可以表示为：

$$
D\left(x_{1}, x_{2}\right)=C\left(F\left(Z\left(x_{1}, \alpha_{1}\right), \omega_{1}\right), F\left(Z\left(x_{2}, \alpha_{2}\right), \omega_{2}\right)\right)
$$

综合距离保持，就是保持无监督跨模态问题中的三种距离：**成对距离**，**异构距离**和**同构距离**。

* 成对距离损失

  $$
  L_{\text {pair}}=D\left(v_{i}, t_{i}\right)+D\left(v_{j}, t_{j}\right)
  $$

  这个损失的作用是：使得公共空间的描述相同对象的不同模态的表示相互接近。

* 异构距离损失

  $$
  L_{\text {heter}}=\left|D\left(v_{i}, t_{j}\right)-d\right|+\left|D\left(v_{j}, t_{i}\right)-d\right|
  $$

  其中

  $$
  d=\sqrt{C\left(v_{i}, v_{j}\right) C\left(t_{i}, t_{j}\right)}
  $$

  该损失反映了只有当不同对象在原图像空间和原文本空间的表示的距离很近时，他们在新空间的不同模态的表示的距离才会更近。

* 同构距离损失

  $$
  L_{h o m o}=\left|D\left(v_{i}, v_{j}\right)-d\right|+\left|D\left(t_{i}, t_{j}\right)-d\right|
  $$

  该损失反映了只有当不同对象在原图像空间和原文本空间的表示的距离很近时，他们在新空间的相同模态的表示的距离才会更近。

所以综合距离保持空间的相关损失如下：

$$
L_{\text {corr}}=L_{\text {pair}}+\lambda_{1}\left(L_{\text {heter}}+L_{\text {homo}}\right)
$$

#### 联合损失函数

$$
L=L_{\text {pair}}+\lambda_{1}\left(L_{\text {heter}}+L_{\text {homo}}\right)+\lambda_{2} L_{\text {recon}}
$$

#### 无监督相似度度量策略

本文在检索时提出了新的相似度度量测量，基于对训练样本中每个模态的表示进行分类的 KNN 分类器的边缘概率，定义两个表示的相似度：

$$
\operatorname{sim}(v, t)=\sum_{i=1}^{k} \sum_{j=1}^{k} P\left(l_{p_{i}}=l_{q_{j}}\right) \cdot P\left(l_{v}=l_{p_{i}} | v, p_{i}\right) \cdot P\left(l_{t}=l_{q_{j}} | t, q_{j}\right)
$$

其中，$$p_i$$ 和 $$q_i$$ 分别是图像模态和文本模态的 top-k 近邻样本，如果是成对的数据样本的话，则对中的两个样本相似对就为 1，否则：

$$
P\left(l_{p_{i}}=l_{q_{j}}\right)=1-D\left(p_{i}, q_{j}\right) / 2
$$

定义一个测试样本的表示与其 $$k$$ 个最邻近的训练数据属于同一类别的条件概率如下：

$$
\begin{aligned} P\left(l_{v}=l_{p_{i}} | v, p_{i}\right) &=\frac{1-D\left(v, p_{i}\right) / 2}{\sum_{i=1}^{k}\left(1-D\left(v, p_{i}\right) / 2\right)} \\ P\left(l_{t}=l_{q_{j}} | t, q_{j}\right) &=\frac{1-D\left(t, q_{j}\right) / 2}{\sum_{j=1}^{k}\left(1-D\left(t, q_{j}\right) / 2\right)} \end{aligned}
$$

### 实验

详见[论文](http://delivery.acm.org/10.1145/3250000/3240607/p1137-zhan.pdf?ip=52.175.64.54&id=3240607&acc=OPENTOC&key=4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E921B4A8BE463EE8F&__acm__=1552362097_7157878d17c348ec5e37e3993bf47ac7)。