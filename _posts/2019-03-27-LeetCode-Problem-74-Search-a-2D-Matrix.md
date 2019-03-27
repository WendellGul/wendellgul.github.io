---
title: LeetCode Problem 74-Search a 2D Matrix
category: LeetCode
date: 2019-03-27
tag:
 - array
 - binary search
 - medium
---

**搜索二维矩阵**。编写一个高效的算法来判断 *m* x *n* 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

- 每行中的整数从左到右按升序排列。
- 每行的第一个整数大于前一行的最后一个整数。

<!-- more -->

**示例 1:**

```
输入:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 3
输出: true
```

**示例 2:**

```
输入:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 13
输出: false
```

### 思路一

先通过二分查找找到哪一行，在通过二分查找在这一行中寻找 `target`。时间复杂度 $$O(\log mn)$$。

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0] or target < matrix[0][0] or target > matrix[-1][-1]:
            return False
        row, row_start, row_end = 0, 0, len(matrix) - 1
        while row_start <= row_end:
            row_mid = (row_start + row_end) // 2
            if matrix[row_mid][0] <= target <= matrix[row_mid][-1]:
                row = row_mid
                break
            elif target < matrix[row_mid][0]:
                row_end = row_mid - 1
            else:
                row_start = row_mid + 1
        col_start, col_end = 0, len(matrix[0]) - 1
        while col_start <= col_end:
            col_mid = (col_start + col_end) // 2
            if target == matrix[row][col_mid]:
                return True
            elif target < matrix[row][col_mid]:
                col_end = col_mid - 1
            else:
                col_start = col_mid + 1
        return False
```

### 思路二

将二维矩阵看成排序数组，数组的第 `i` 个数即矩阵的第 `(i // n, i % n)`，通过二分查找，时间复杂度 $$O(\log mn)$$。

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0] or target < matrix[0][0] or target > matrix[-1][-1]:
            return False
        m, n = len(matrix), len(matrix[0])
        l, r = 0, m * n - 1
        while l <= r:
            mid = (l + r) // 2
            if matrix[mid // n][mid % n] == target:
                return True
            elif matrix[mid // n][mid % n] > target:
                r = mid - 1
            else:
                l = mid + 1
        return False
```

### 相似问题

1. [Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/)