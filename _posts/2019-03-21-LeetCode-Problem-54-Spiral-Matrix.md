---
title: LeetCode Problem 54-Spiral Matrix
category: LeetCode
date: 2019-03-21
tag:
 - array
 - medium
---

**螺旋矩阵**。给定一个包含 *m* x *n* 个元素的矩阵（*m* 行, *n* 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

**示例 1:**

```
输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
```

**示例 2:**

```
输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]
```

### 思路一

按照四个方向遍历，右、下、左、上。向右遍历之后增加 `rowBegin`，向下遍历之后减少 `colEnd`，向左遍历之后减少 `rowEnd`，向上遍历之后增加 `colBegin`。需要注意的是，当向左和向上遍历时，需要判断是否还有多的 `row` 和多的 `col`。时间复杂度 $O(N)$，空间复杂度 $O(1)$。

```python
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        if len(matrix) == 0 or len(matrix[0]) == 0:
            return []
        rowBegin, rowEnd = 0, len(matrix) - 1
        colBegin, colEnd = 0, len(matrix[0]) - 1
        rs = []
        while rowBegin <= rowEnd and colBegin <= colEnd:
            # 向右遍历
            for j in range(colBegin, colEnd+1):
                rs.append(matrix[rowBegin][j])
            rowBegin += 1
            
            # 向下遍历
            for i in range(rowBegin, rowEnd+1):
                rs.append(matrix[i][colEnd])
            colEnd -= 1
            
            # 向左遍历
            if rowBegin <= rowEnd:
                for j in range(colEnd, colBegin-1, -1):
                    rs.append(matrix[rowEnd][j])
            rowEnd -= 1
            
            # 向上遍历
            if colBegin <= colEnd:
                for i in range(rowEnd, rowBegin-1, -1):
                    rs.append(matrix[i][colBegin])
            colBegin += 1
        
        return rs
```

### 思路二

相当于遍历一遍数组，我们可以先确定下一次需要移动的方向，然后在进行输出，令 `seen[r][c]` 表示已经遍历过得元素，当前的位置为 `(r,c)`，下一次移动的方向为 `di`，则下一个位置候选是 `(cr, cc)`，当碰到边界或者 `seen[cr][cc]` 为 `True` 时，则需要变换方向。时间复杂度 $O(N)$，空间复杂度 $O(N)$。

```python
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        if len(matrix) == 0 or len(matrix[0]) == 0:
            return []
        m, n = len(matrix), len(matrix[0])
        seen = [[False] * n for _ in range(m)]
        rs = []
        dr = [0, 1, 0, -1]  # row的方向
        dc = [1, 0, -1, 0]  # col的方向
        r = c = di = 0
        for _ in range(m * n):
            rs.append(matrix[r][c])
            seen[r][c] = True
            cr, cc = r + dr[di], c + dc[di]
            if 0 <= cr < m and 0 <= cc < n and not seen[cr][cc]:
                r, c = cr, cc
            else:
                di = (di + 1) % 4
                r, c = r + dr[di], c + dc[di]
        return rs
```

### 相似问题

1. [Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/)