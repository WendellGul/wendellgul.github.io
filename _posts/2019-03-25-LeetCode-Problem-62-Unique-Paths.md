---
title: LeetCode Problem 62-Unique Paths
category: LeetCode
date: 2019-03-25
tag:
 - array
 - dynamic programming
 - medium
---

**不同路径**。一个机器人位于一个 *m x n* 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？

<center><img src="https://ws1.sinaimg.cn/large/006tKfTcly1g1f6h70pr7j30b4053q32.jpg" /></center>

例如，上图是一个7 x 3 的网格。有多少可能的路径？

**说明：** *m* 和 *n* 的值均不超过 100。

<!-- more -->

**示例 1:**

```
输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右
```

**示例 2:**

```
输入: m = 7, n = 3
输出: 28
```

### 思路一

动态规划。`dp[i][j]` 表示在 `i * j` 的网络上的路径的条数，则到达位置 $$(i,j)$$，或者从 $$(i,j)$$ 左边过来，或者从 $$(i,j)$$ 上边过来，即 `dp[i][j] = dp[i][j-1] + dp[i-1][j]`。时间复杂度 $$O(mn)$$。

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[1] * n for _ in range(m)]
        for i in range(1, m):
            for j in range(1, n):
                dp[i][j]=dp[i][j-1]+dp[i-1][j]
        return dp[m-1][n-1]
```

### 思路二

从 $$(0, 0)$$ 走到 $$(m,n)$$，一共需要走 $$m + n - 2$$ 步，其中 $$m-1$$ 步向下，$$n-1$$ 步向右，所以这是一个组合问题，只需计算 $$C_{m+n-2}^{m-1}$$ 或 $$C_{m+n-2}^{n-1}$$ 即可。时间复杂度 $$O(m)$$ 或 $$O(n)$$。

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        N = m + n - 2
        k = m - 1
        rs = 1
        for i in range(1, k + 1):
            rs = rs * (N - k + i) / i
        return int(rs)
```

### 相似问题

1. [Unique Paths II](https://leetcode.com/problems/unique-paths-ii/)
2. [Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)
3. [Dungeon Game](https://leetcode.com/problems/dungeon-game/)