---
title: LeetCode Problem 96-Unique Binary Search Trees
category: LeetCode
date: 2019-05-08
tag:
 - dynamic programming
 - tree
 - medium
---

**不同的二叉搜索树**。给定一个整数 *n*，求以 1 ... *n* 为节点组成的二叉搜索树有多少种？

**示例:**

```
输入: 3
输出: 5
解释:
给定 n = 3, 一共有 5 种不同结构的二叉搜索树:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
```

<!-- more -->

### 思路一

动态规划解决，假设 $$G(n)$$ 表示长度为 $$n$$ 的序列的BST的数目，$$F(i, n)$$ 表示以第 $$i$$ 个结点为根结点的BST的数目，则可以发现：
$$
G(n) = F(1,n)+F(2,n)+\cdots + F(n,n)
$$
特殊的，有 $$G(0) = G(1) = 1$$。

并且，给定一个序列 1 到 $$n$$，选择 $$i$$ 作为根结点的BST的数目 $$F(i,n)$$ 就是其左子树的数目与右子树的数目的乘积，举例来说，$$F(3,7):$$ 以 3 为根结点的BST的数目，为了构建以 3 为根结点，序列为 $$[1,2,3,4,5,6,7]$$ 的BST，需要构建左边序列 $$[1, 2]$$ 的BST，以及右边序列 $$[4,5,6,7]$$ 的BST，然后再将两者结合（即两者的笛卡尔积），**值得注意的是**，左边的BST的数目可以记作 $$G(2)$$，而右边的BST的数目则可以记作 $$G(4)$$，即 $$F(3,7) = G(2)\times G(4)$$。

因此，有
$$
F(i, n) = G(i-1) \times G(n-i),\quad 1 \le i \le n
$$
结合上述两个公式，有
$$
G(n) = G(0) \times G(n-1) + G(1) \times G(n-2) + \cdots + G(n-1)\times G(0)
$$
故可以通过动态规划计算 $$G(n)$$，代码如下：

```python
class Solution:
    def numTrees(self, n: int) -> int:
        dp = [0] * (n+1)
        dp[0] = dp[1] = 1
        for i in range(2, n+1):
            for j in range(1, i+1):
                dp[i] += dp[j-1] * dp[i-j]
        return dp[n]
```

### 相似问题

1. [Unique Binary Search Trees II](https://leetcode.com/problems/unique-binary-search-trees-ii/)