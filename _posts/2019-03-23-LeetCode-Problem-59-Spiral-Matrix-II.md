---
title: LeetCode Problem 59-Spiral Matrix II
category: LeetCode
date: 2019-03-23
tag:
 - array
 - medium
---

**螺旋矩阵 II**。给定一个正整数 $$n$$，生成一个包含 1 到 $$n^2​$$ 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

**示例:**

```
输入: 3
输出:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
```

<!-- more -->

### 思路一

与 [Spiral Matrix](https://wendellgul.github.io/leetcode/2019/03/21/LeetCode-Problem-54-Spiral-Matrix/) 问题思路类似。

```python
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        dr = [0, 1, 0, -1]  # 行的方向
        dc = [1, 0, -1, 0]  # 列的方向
        rs = [[0] * n for _ in range(n)]
        r = c = di = 0
        for i in range(1, n ** 2 + 1):
            rs[r][c] = i
            cr, cc = r + dr[di], c + dc[di]
            if 0 <= cr < n and 0 <= cc < n and not rs[cr][cc]:
                r, c = cr, cc
            else:
                di = (di + 1) % 4
                r, c = r + dr[di], c + dc[di]
        return rs
```

### 相似问题

1. [Spiral Matrix](https://wendellgul.github.io/leetcode/2019/03/21/LeetCode-Problem-54-Spiral-Matrix/)