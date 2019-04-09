---
title: LeetCode Problem 85-Maximal Rectangle
category: LeetCode
date: 2019-04-09
tag:
 - array
 - hash table
 - dynamic programming
 - stack
 - hard
---

**最大矩形**。给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

**示例:**

```
输入:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
输出: 6
```

<!-- more -->

### 思路一

利用 [Largest Rectangle in Histogram](https://wendellgul.github.io/leetcode/2019/04/07/LeetCode-Problem-84-Largest-Rectangle-in-Histogram/) 问题的解法，将此问题转换成多个**柱状图中最大的矩形**问题（每一行就是一个），时间复杂度 $$O(n^2)$$。

```python
class Solution:
    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        if not matrix:
            return 0
        m, n = len(matrix), len(matrix[0])
        heights = [[0] * n for _ in range(m)]
        for i in range(m):
            for j in range(n):
                if matrix[i][j] == '1':
                    heights[i][j] = heights[i-1][j] + 1
        return max(self.largestRectangleArea(h) for h in heights)
    
    def largestRectangleArea(self, heights):
        heights.append(0)
        stack, rs = [-1], 0
        for i in range(len(heights)):
            while stack and heights[stack[-1]] > heights[i]:
                h = heights[stack.pop()]
                w = i - stack[-1] - 1
                rs = max(rs, h * w)
            stack.append(i)
        return rs
```

### 思路二

换一种写法。

```python
class Solution:
    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        if not matrix:
            return 0
        m, n = len(matrix), len(matrix[0])
        heights = [[0] * (n + 1) for _ in range(m)]
        rs = 0
        for i in range(m):
            for j in range(n):
                if matrix[i][j] == '1':
                    heights[i][j] = heights[i-1][j] + 1
            stack = [-1]
            for k in range(len(heights[i])):
                while stack and heights[i][stack[-1]] > heights[i][k]:
                    h = heights[i][stack.pop()]
                    w = k - stack[-1] - 1
                    rs = max(rs, h * w)
                stack.append(k)
        return rs
```

### 相似问题

1. [Largest Rectangle in Histogram](https://wendellgul.github.io/leetcode/2019/04/07/LeetCode-Problem-84-Largest-Rectangle-in-Histogram/)
2. [Maximal Square](https://leetcode.com/problems/maximal-square/)