---
title: Pairwise Relationship Guided Deep Hashing for Cross-Modal Retrieval
category: Research Note
tag: 
 - cross-modal retrieval
 - pairwise learning
---

Pairwise Relationship Guided Deep Hashing for Cross-Modal Retrieval（PRDH）论文阅读笔记。

![image-20180913110303751](https://ws2.sinaimg.cn/large/006tNbRwly1fv7qebns74j31g40d4q7b.jpg)

> AAAI 2017

本文提出了**基于数据对关系的深度哈希方法**，能同时学习每个模态的特征以及哈希码，并且将其整合到一个端到端的框架之中，还加入了**模态间**和**模态内**的基于关系对的约束，此外，本文还引入了**去关联约束（decorrelation constraints）**，来提高每个哈希**bit**的辨别能力。

<!-- more -->

## 模型

![image-20180913111606622](https://ws4.sinaimg.cn/large/006tNbRwly1fv7qrr0xgnj31kw0qi7uf.jpg)

* 训练集：$$\mathcal{O} = \{o_i\}_{i=1}^N$$，$$\mathbf{X}$$ 和 $$\mathbf{Y}$$ 分别表示图像和文本数据
* 相似矩阵：$$\mathbf{S}_{N\times N}$$，$$S_{ij}=1$$ 表示 $$o_i$$ 和 $$o_j$$ 相似，$$S_{ij}=0$$ 表示不相似
* 为两个模态数据分别学习一个哈希函数 $$h^x(\cdot)$$ 和 $$h^y(\cdot)$$，生成长度为 $$c$$ 的哈希码

### 深度框架

对于图像模态，本文使用 VGG-F 网络，并将其 *fc8* 层用一个有 $$c$$ 个结点的 *fch* 哈希层代替。

对于文本模态，使用由 3 个全连接层构成的多层感知机，并将最后一层做与图像模态一样的处理。

### 哈希码学习

为了更好地保留训练样本的语义相似度，本文的目标函数包含 **4 个部分**：

* 不同模态间基于对的损失
* 相同模态内基于对的损失
* 去相关损失
* 正则项损失

基于对的损失使得相似对的相似关联更强，而不相似对的关联更弱，本文使用负对数似然来度量这样的联系。

假设图像网络的输出的哈希码为 $$\mathbf{U}^x = \{U_i^x\}_{i=1}^N$$，文本网络的哈希码输出为 
$$\mathbf{U}^y = \{U_i^y\}_{i=1}^N$$，相似标签 $$\mathbf{S} = \{S_{ij}\}$$，似然函数定义如下：

$$
p(S_{ij}|{\mathbf{U}_{*i}^x}^T\mathbf{U}_{*j}^y) = \begin{cases}
\sigma(\Omega_{ij}^{xy}) & S_{ij} = 1\\
1 - \sigma(\Omega_{ij}^{xy}) & S_{ij} = 0
\end{cases}
$$

其中 $$\Omega_{ij}^{xy} = \frac12 {\mathbf{U}_{*i}^x}^T\mathbf{U}_{*j}^y$$，$$\sigma(\Omega_{ij}^{xy}) = \frac{1}{1 + e^{-\Omega_{ij}^{xy}}}$$。$$\mathbf{U}_{*i}^x = f^x(x_i, \theta_x)$$，$$\mathbf{U}_{*j}^y= f^y(y_j,\theta_y)$$。因此，**不同模态间基于对的损失**定义如下：

$$
\begin{align}
\mathcal{J}_1 &= -\log p(\mathbf{S}|\mathbf{U}^{xy}) = -\sum_{S_{ij}\in \mathbf{S}} \log p(S_{ij}|\mathbf{U}^{xy}) \\
& = -\sum_{S_{ij}\in\mathbf{S}}(S_{ij}\Omega_{ij}^{xy} - \log(1 + e^{\Omega_{ij}^{xy}}))
\end{align}
$$

很容易看出，优化上述的损失函数，可以使得两个相似的实例之间的Hamming距离减小，不相似的实例之间的距离增大，所以，这样可以很好的保留不同模态数据的语义相似度。

此外，还需要每种数据在自己的模态中有很好的判别能力，来保留模态内的语义信息，所以，有必要给每个模态加一个模态内基于对的损失。

**图像模态内基于对的损失**如下：

$$
\begin{align}
\mathcal{J}_2 &= -\log p(\mathbf{S}|\mathbf{U}^x) = -\sum_{S_{ij}\in \mathbf{S}} \log p(S_{ij}|\mathbf{U}^x) \\
&= -\sum_{S_{ij}\in\mathbf{S}} (S_{ij}\Omega_{ij}^x- \log (1 + e^{\Omega_{ij}^x}))
\end{align}
$$

其中 $$\Omega_{ij}^x = \frac12 {\mathbf{U}_{*i}^x}^T\mathbf{U}_{*j}^y$$。

同样的，**文本模态内基于对的损失**如下：

$$
\mathcal{J}_3 = -\sum_{S_{ij}\in\mathbf{S}}(S_{ij}\Omega_{ij}^y - \log(1+e^{\Omega_{ij}^y}))
$$

其中 $$\Omega_{ij}^y = \frac12 {\mathbf{U}_{*i}^y}^T\mathbf{U}_{*j}^y$$。

值得注意的是，如果哈希码中一些不同的位（**bit**）有着很高的关联度，举例来说，$$\mathbf{U}_{i*}^x$$ 和 $$\mathbf{U}_{j*}^x$$ 在所有实例上同时变化，则这些位就有着重复的信息。为了让哈希码的每一位提供的信息最大，本文为每个模态的不同哈希位之间都加入了**去关联约束：**

$$
\begin{align}
\mathcal{J}_4 &= \frac 12(\|\mathbf{C}^x\|_F^2 - \|diag(\mathbf{C}^x)\|_F^2) \\
&+ \frac 12 (\|\mathbf{C}^y\|_F^2-\|\mathbf{C}^y\|_F^2)
\end{align}
$$

其中 

* $$\mathbf{C}^x = \frac 1T \sum_{n=1}^T(U_{in}^x - \mu_i)(U_{jn}^x - \mu_j)$$ 是位 $$i$$ 和 位 $$j$$ 在图像数据的 batch 上的协方差矩阵，$$i,j\in\lbrace 1, 2,\cdots,c \rbrace$$
* $$\mu_i = \frac1T\sum_{n=1}^T U_{in}^x$$ 是 batch 上实例的第 $$i$$ 个特征（位）的均值
* $$T$$ 是 batch size
* $$\mathbf{C}^y$$ 的定义类似

为了能够在网络上进行梯度下降，将两个模态的 $$\mathbf{U}^x$$ 和 $$\mathbf{U}^y$$ 放松到实值。

为了更好地理解去关联约束，考虑图像模态下对一个样本 $$m$$ 的一个特定的哈希位 $$a$$ 的梯度：

$$
\begin{align}
\frac{\partial \mathcal{J}_4}{\partial U_{am}^x} = &\frac 1T \sum_{j\neq a}[\frac1T\sum_{n=1}^T (U_{an}^x - \mu_a)(U_{jn}^x - \mu_j)] \\
& \cdot (U_{jm}^x - \mu_j)
\end{align}
$$

将上式右边的项记为 $$I^x(j,m) = (U_{jm}^x - \mu_j)$$，当第 $$j$$ 位对样本 $$m$$ 有着很高的判别性时，该项值（绝对值）就会较大，否则就会接近 $$\mu_j$$，所以 $$I$$ 可以看做是“重要度”因子。左边的项就是哈希位 a 和哈希位 $$j$$ 的协方差，上述梯度可以重写为：

$$
\frac{\partial \mathcal{J}_4}{\partial U_{am}^x} = \frac 1T \sum_{j\neq a}(C_{aj}^x\cdot I^x(j,m))
$$

当 $$j$$ 对样本 $$m$$ 很重要并且与 $$a$$ 关联度高时，上述梯度的值就会变大，哈希位 $$a$$ 的激活就会受到抑制。

文本还加入了**正则项约束**，能够减少量化损失，保持哈希码的平衡：

$$
\begin{align}
R = &\|\mathbf{B} - \mathbf{U}^x\|_F^2 + \|\mathbf{B} - \mathbf{U}^y\|_F^2 \\
&+ \|\mathbf{U}^x\cdot \mathbf{1}\|_F^2 + \|\mathbf{U}^y\cdot \mathbf{1}\|_F^2
\end{align}
$$

其中 $$\mathbf{B}$$ 是两个模态的联合哈希码。

总的目标函数如下：

$$
\mathcal{J} = (\mathcal{J}_1 + \mathcal{J}_2 + \mathcal{J}_3) + \lambda \mathcal{J}_4 + \gamma R \\
s.t. \quad \mathbf{B} \in \{-1,+1\}^{c\times N}
$$

## 优化算法

### 固定 $\theta_x$ 和 $\theta_y$ 优化 $\mathbf{B}$

当 $$\theta_x$$ 和 $$\theta_y$$ 固定时，目标函数可以写为：

$$
\max_\mathbf{B}{\rm tr}(\mathbf{B}^T(\gamma(\mathbf{U}^x+\mathbf{U}^y))) = {\rm tr}(\mathbf{B}^T\mathbf{V}) = \sum_{ij}B_{ij}V_{ij}\\
s.t. \quad \mathbf{B} \in \{-1, +1\}^{c\times N}
$$

其中 $$\mathbf{V} = \gamma(\mathbf{U}^x + \mathbf{U}^y)$$ ，可以得到上式的最优解为：

$$
\mathbf{B} = {\rm sign}(\mathbf{V}) = {\rm sign}(\gamma(\mathbf{U}^x + \mathbf{U}^y))
$$

### 优化 $\theta_x$ 和 $\theta_y$

固定其他参数的情况下，分别使用SGD，通过BP算法优化。

在训练数据对的采样中，传统的方法是在一个 batch 中采样数据对，这样一个迭代得到的数据对最多有 $$\frac{T(T-1)}{2}$$，文本中训练集数据的选择保存在一个矩阵中，每次选择的数据是 batch 和整个数据集的结合，每个迭代可以得到 $$(TN - \frac{T(T+1)}{2})$$ 个数据对。由于 $$N \gg T$$，相同的 batch size，更多的数据对被用来训练，所以可以更有效地进行优化，使得模型对噪声和离群点更加鲁棒。

最终的算法如下：

![image-20180913155711683](https://ws3.sinaimg.cn/large/006tNbRwly1fv7yw7j4wgj310q1967eo.jpg)

## 实验

详见论文。



