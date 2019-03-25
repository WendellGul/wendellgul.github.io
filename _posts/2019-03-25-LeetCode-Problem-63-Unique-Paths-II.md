---
title: LeetCode Problem 63-Unique Paths II
category: LeetCode
date: 2019-03-25
tag:
 - array
 - dynamic programming
 - medium
---

**不同路径 II**。一个机器人位于一个 *m x n* 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

**现在考虑网格中有障碍物**。那么从左上角到右下角将会有多少条不同的路径？

<center><img src="https://ws1.sinaimg.cn/large/006tKfTcly1g1f6h70pr7j30b4053q32.jpg" /></center>

网格中的障碍物和空位置分别用 `1` 和 `0` 来表示。

**说明：** *m* 和 *n* 的值均不超过 100。

<!-- more -->

**示例 1:**

```
输入:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
输出: 2
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
```

### 思路一

动态规划，和 [Unique Paths](https://wendellgul.github.io/leetcode/2019/03/25/LeetCode-Problem-62-Unique-Paths/) 问题类似。

```python
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        if len(obstacleGrid) == 0:
            return 0
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        dp = [[1] * n for _ in range(m)]
        for i in range(0, m):
            for j in range(0, n):
                if obstacleGrid[i][j]:
                    dp[i][j] = 0
                elif i > 0 and j > 0:
                    dp[i][j] = dp[i-1][j] + dp[i][j-1]
                elif i == 0 and j > 0:
                    dp[i][j] = dp[i][j-1]
                elif j == 0 and i > 0:
                    dp[i][j] = dp[i-1][j]
        return dp[m-1][n-1]
```

### 相似问题

1. [Unique Paths](https://wendellgul.github.io/leetcode/2019/03/25/LeetCode-Problem-62-Unique-Paths/)
2. [Unique Paths III](https://leetcode.com/problems/unique-paths-iii/)