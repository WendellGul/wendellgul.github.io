---
title: LeetCode Problem 64-Minimum Path Sum
category: LeetCode
date: 2019-03-26
tag:
 - array
 - dynamic programming
 - medium
---

**最小路径和**。给定一个包含非负整数的 *m* x *n* 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明：**每次只能向下或者向右移动一步。

**示例:**

```
输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。
```

<!-- more -->

### 思路一

动态规划，走到第 $$(i,j)$$ 的位置，只能从上边 $$(i-1,j)$$ 或左边 $$(i, j-1)$$ 两个方向过来，选择路径和较小的方向即可。时间复杂度 $$O(mn)$$。

```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        if len(grid) == 0:
            return 0
        m, n = len(grid), len(grid[0])
        dp = [[0] * n for _ in range(m)]
        for i in range(0, m):
            for j in range(0, n):
                if i == j == 0:
                    dp[i][j] = grid[0][0]
                elif i == 0:
                    dp[i][j] = dp[i][j-1] + grid[i][j]
                elif j == 0:
                    dp[i][j] = dp[i-1][j] + grid[i][j]
                else:
                    dp[i][j] = min(dp[i][j-1], dp[i-1][j]) + grid[i][j]
        return dp[m-1][n-1]
```

### 相似问题

1. [Unique Paths](https://wendellgul.github.io/leetcode/2019/03/25/LeetCode-Problem-62-Unique-Paths/)
2. [Dungeon Game](https://leetcode.com/problems/dungeon-game/)
3. [Cherry Pickup](https://leetcode.com/problems/cherry-pickup/)