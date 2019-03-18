---
title: LeetCode Problem 48-Rotate Image
category: LeetCode
date: 2019-03-18
tag:
 - array
 - medium
---

**旋转图像**。给定一个 *n* × *n* 的二维矩阵表示一个图像，将图像顺时针旋转 90 度。

**说明：**

你必须在**原地**旋转图像，这意味着你需要直接修改输入的二维矩阵。**请不要**使用另一个矩阵来旋转图像。

**示例 1:**

```
给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

**示例 2:**

```
给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```

### 思路一

矩阵顺时针旋转90度，即首先将矩阵上下翻转，然后沿主对角线翻转，即可得到。如下所示：

```
[                [                [\               [
  [1,2,3],         [7,8,9],         [\7,8,9],        [7,4,1],
--[4-5-6]--  =>  --[4-5-6]--  =>    [4,\5,6],  =>    [8,5,2],
  [7,8,9]          [1,2,3]          [1,2,\3]         [9,6,3]
]                ]                ]       \        ]
```

```python
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        if len(matrix) == 0 or len(matrix[0]) == 0:
            return
        for i in range(len(matrix) // 2):
            for j in range(len(matrix[0])):
                matrix[i][j], matrix[len(matrix)-i-1][j] = matrix[len(matrix)-i-1][j], matrix[i][j]
        for i in range(1, len(matrix)):
            for j in range(i):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
```

