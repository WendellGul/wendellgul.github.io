---
title: LeetCode Problem 73-Set Matrix Zeroes
category: LeetCode
date: 2019-03-27
tag:
 - array
 - medium
---

**矩阵置零**。给定一个 *m* x *n* 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用**原地**算法**。**

<!-- more -->

**示例 1:**

```
输入: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
输出: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
```

**示例 2:**

```
输入: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
输出: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
```

### 思路一

首先遍历一遍记录需要置零的行和列，用额外的集合保存，然后再遍历一遍，将行或列在集合中的元素置零。时间复杂度 $$O(mn)$$，空间复杂度 $$O(m+n)$$。

```python
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        rowSet, colSet = set(), set()
        for i in range(len(matrix)):
            for j in range(len(matrix[0])):
                if matrix[i][j] == 0:
                    rowSet.add(i)
                    colSet.add(j)
        for i in range(len(matrix)):
            for j in range(len(matrix[0])):
                if i in rowSet or j in colSet:
                    matrix[i][j] = 0
```

### 思路二

我们可以用每行和每列的第一个元素作为该行或该列是否置零的标识，即如果某个元素 `matrix[i][j] = 0`，则令 `matrix[i][0] = matrix[0][j] = 0`。值得注意的是，需要单独考虑第一行第一列的情况。

时间复杂度 $$O(mn)$$，空间复杂度 $$O(1)$$。

```python
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        isCol = False
        for i in range(len(matrix)):
            # 因为第一个元素 matrix[0][0] 既可以标识第一行，也可以标识第一列
            # 我们需要使用额外的变量来标识第一行或第一列
            # 这里，我们使用 matrix[0][0] 来标识第一行，额外的变量标识第一列
            if matrix[i][0] == 0:
                isCol = True
            for j in range(1, len(matrix[0])):
                if matrix[i][j] == 0:
                    matrix[i][0] = matrix[0][j] = 0
        for i in range(1, len(matrix)):
            for j in range(1, len(matrix[0])):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0
        # 第一行
        if matrix[0][0] == 0:
            for j in range(len(matrix[0])):
                matrix[0][j] = 0
        # 第一列
        if isCol:
            for i in range(len(matrix)):
                matrix[i][0] = 0
```

### 相似问题

1. [Game of Life](https://leetcode.com/problems/game-of-life/)