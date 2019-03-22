---
title: Deep Binaries: Encoding Semantic-Rich Cues for Efficient Textual-Visual Cross Retrieval
category: Research Note
date: 2019-03-22
tag:
 - cross-modal retrieval
 - deep hashing
---

Deep Binaries: Encoding Semantic-Rich Cues for Efficient Textual-Visual Cross Retrieval 论文阅读笔记。

![image-20190322141406109](https://ws4.sinaimg.cn/large/006tKfTcgy1g1bjnkuuc8j31s80j0jw7.jpg)

> ICCV 2017

本文针对图片和句子文本描述之间的跨模态检索问题，提出了能够有效编码大信息量图片和长描述性句子文本中的细节语义的模型 **Textual-Visual Deep Binaries（TVDB）**，通过一个基于区域的卷积网络和LSTM网络来提取图片中的区域信息，通过卷积神经网络来提取句子的语义段。

<!-- more -->

### 研究动机

1. 现有的跨模态哈希方法中，缺少对图片中细节区域的编码，这样得到的图片的表示不是最优的；
2. 大部分的跨模态哈希方法是在粗粒度的文本（比如标签等）上进行的编码，对长句子文本的建模不适用。

<center><img src="../Library/Application Support/typora-user-images/image-20190322144453383.png" style="zoom:50%"/></center>

上图是传统跨模态哈希和本文提出的方法的区别。

### 模型

![image-20190322145018773](../Library/Application Support/typora-user-images/image-20190322145018773.png)

图像哈希网络 $$f(\cdot)$$ 由RPN，CNN和LSTM组成，有主到次的编码图片的各个区域；文本哈希网络 $$g(\cdot)$$ 由 text-CNN 组成。

#### 图像哈希网络

1. **显著语义特征选择**。如上图所示，TVDB 基于 RPN 首先检测出可能携带语义信息的图像区域，然后通过启发式的规则选择得分较高的前 $$K$$ 的语义区域。
2. **区域表示与特征增强**。上一步选择的图像区域经过 AlexNet 得到 4096 维的特征，为了利用图像区域的结构信息，将图像区域的高、宽和中心坐标经过归一化之后作为特征的增强信息，得到 5000 维的特征表示。
3. **循环网络编码**。将 $$K$$ 个语义区域表示和整张图片的表示，一共 $$K + 1$$ 个表示输入到一个双向 LSTM 中，所有 LSTM 的输出经过平均和 ReLU 函数的激活之后，经过两层全连接层得到 $$M$$ 位的哈希码。

#### 文本哈希网络

TVDB 先通过预处理，将每个描述句子的长度限制在 12 （实验数据集文本长度的均值），再通过线性映射将文本中的每个字符编码为 128 位的实值表示，因为要得到文本的某些词的之间的关联，所以将文本表示分为三段（可重复，如上图所示 10，9，8），送入三个 CNN 网络中，随后通过两个全连接层得到 $$M$$ 位的哈希码。

### 损失函数

设 $$\mathbf{X}_b$$ 和 $$\mathbf{Y}_b$$ 表示一个 mini-batch 的图像数据和文本数据，$$\mathbf{B}_b$$ 和 $$\mathbf{H}_b$$ 是学要学习的两个模态的哈希码， $$\mathbf{S}_b$$ 是相似度矩阵，目标函数如下：

$$
\mathcal{L}\left(\mathbf{B}_{b}, \mathbf{H}_{b}, \mathbf{S}_{b}\right)=-\operatorname{trace}\left(\mathbf{B}_{b} \mathbf{S}_{b} \mathbf{H}_{b}^{\top}\right)
$$

跨模态哈希学习即是解决下面的问题：

$$
\begin{align}
& \min_{\mathbf{B}_{b}, \mathbf{H}_{b}, \Theta,\Phi} \mathcal{L}\left(\mathbf{B}_{b}, \mathbf{H}_{b}, \mathbf{S}_{b}\right) \\ 
\text { s.t. } \ \mathbf{B}_{b}= &\ \operatorname{sign}\left(f\left(\mathbf{X}_{b} ; \Theta\right)\right),\ \mathbf{H}_{b}= \operatorname{sign}\left(g\left(\mathbf{Y}_{b} ; \Phi\right)\right)
\end{align}
$$

由于直接优化二值码不能反向传播，将 $$\mathbf{B}_b$$ 和 $$\mathbf{H}_b$$ 作为辅助变量，重新定义损失函数如下：

$$
\begin{align}\min _{\mathbf{B}_{b}, \mathbf{H}_{b}, \Theta, \Phi} &\mathcal{L}\left(\mathbf{B}_{b}, \mathbf{H}_{b}, \mathbf{S}_{b}\right)+\eta\left(\left\|\mathbf{B}_{b}-f\left(\mathbf{X}_{b} ; \Theta\right)\right\|_{\mathbf{F}}^{2}\right. \\ 
&+\left\|\mathbf{H}_{b}-g\left(\mathbf{Y}_{b} ; \Phi\right)\right\|_{\mathbf{F}}^{2} \\ 
\text { s.t. } & \mathbf{B}_{b} \in\{-1,1\}^{M \times N_{b}}, \mathbf{H}_{b} \in\{-1,1\}^{M \times N_{b}}\end{align}
$$

### 优化和实验

见[论文](http://openaccess.thecvf.com/content_ICCV_2017/papers/Shen_Deep_Binaries_Encoding_ICCV_2017_paper.pdf)。




