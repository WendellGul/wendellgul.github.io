---
title: Unsupervised Generative Adversarial Cross-modal Hashing
category: Research Note
tag: 
 - cross-modal
 - unsupervised
 - GAN
 - hash
---

UGACH论文阅读笔记


![1533782404956](/assets/images/Unsupervised Generative Adversarial Cross-modal Hashing/1533782404956.png)

> AAAI 2018

## 模型

![1533786687037](/assets/images/Unsupervised Generative Adversarial Cross-modal Hashing/1533786687037.png)

### 生成式模型

两层全连接层学习不同模态的表示：

* Common Representation Layer

  $$
  \phi_c(x) = \tanh(W_cx+b_c)
  $$

  $x$为图像或者文本。

* Hashing Layer

  $$
  h(x) = sigmoid(W_h\phi_c(x) + b_h)
  $$

  然后通过阈值函数获取二进制码

  $$
  b(x) = sgn(h_k(x) - 0.5), \quad k = 1,2,...,l
  $$

  $l$为哈希码长度。由于直接对二进制码进行优化比较困难，所以在训练过程中对$h(x)$进行优化。

#### 生成概率

生成模型的任务是给定一个模态的数据$q$，选择与真实相关分布一致的另一个模态的数据$x^U$，来通过判别模型的判别，其生成概率为

$$
p_\theta(x^U|q) = \frac{\exp(-\|h(q) - h(x^U)\|^2)}{\sum_{x^U} \exp(-\|h(q)-h(x^U)\|^2)}
$$

### 判别式模型

#### 相关图（Correlation Graph）

生成两个无向图$Grpah_i = (V, W_i)$和$Graph_t = (V, W_t)$分别表示文本和图像，其中$V$表示节点，$W$为相似矩阵，定义如下：

$$
w(p,q) = \begin{cases}
1 & x_p \in NN_k(x_q) \\
0 & otherwise
\end{cases}
$$

$NN_k(x_q)$是$x_q$的$k$临近邻居的集合。从真实数据分布中采样数据，完善图的建立。

#### 判别概率

判别模型的输入是生成模型生成的图像-文本对和真实相关的图像-文本对，其任务是分别出两种图像-文本对，定义查询$q$和实例$x^G$的相关分数如下：

$$
f_\phi(x^G,q) = \max(0, m+\|h(q) - h(x^M)\|^2 - \|h(q) - h(x^G)\|^2)
$$

* $x^M$为相关图中真实相关的图像-文本对
* $x^G$为生成模型选择的实例
* $m$为margin值，实验中设置为1
* 上式的目标是使得真实相关对$(q,x^M)$的距离比生成对$(q,x^G)$的距离小$m$，以此可以清晰的判别两种图像-文本对

给定$q$，实例$x$的预测概率定义如下：

$$
D(x|q) = sigmoid(f_\phi(x,q)) = \frac{\exp(f_\phi(x,q))}{1+\exp(f_\phi(x,q))}
$$

当$q$与$x$的相关得分越高时，$D(x\|q)$越大，故判别式模型的目标是让$D(x^M\|q)$更大，$D(x^G\|q)$更小。

最终使用判别式模型生成的二进制码为检索所用。

### 对抗学习

$$
\begin{align}
\mathcal{V}(G,D) = & \min_\theta \max_\phi \sum_{j=1}^n (E_{x\sim p_{true}(x^M|q^j)}[\log(D(x^M|q^j))] \\
& + E_{x\sim p_\theta(x^G|q^j)}[\log(1-D(x^G|q^j))])
\end{align}
$$

判别式模型的目标是使上式最大化，而生成式模型的目标是使上式最小化。当判别式模型固定的时候，生成式模型可由以下方法学习：

$$
\begin{align}
\theta^* =\ & \mathop{\arg \min}_\theta \sum_{j=1}^n (E_{x\sim p_{true}(x^M|q^j)}[\log(sigmoid(f_{\phi^*}(x^M,q^j)))] \\
& +E_{x\sim p_\theta(x^G|q^j)}[\log(1-sigmoid(f_{\phi^*}(x^G,q^j)))])
\end{align}
$$

$f_{\phi^*}$表示上一轮迭代中的判别式模型相关得分函数，本模型从未打标签的数据中选择生成图片-文本对，由于选择策略是离散的，因此不同使用传统的SGD优化方法，故使用强化学习方法来学习生成模型的参数。

## 实验

### 数据集

* NUS-WIDE
  * 共269,498图片-文本对，81个分类
  * 选择10大类，186,557图片-文本对
  * 全部数据的1%作为查询集合，剩下的为检索数据
  * 每个图片表示为4096维向量，从19-leyer VGGNet提取
  * 每个文本表示为1000维BoW向量
* [MIRFlickr](http://press.liacs.nl/mirflickr)
  * 25,000图片-文本对，24个分类
  * 全部数据的5%作为查询集合，剩下的为检索数据