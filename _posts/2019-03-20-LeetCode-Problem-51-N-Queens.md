---
title: LeetCode Problem 51-N-Queens
category: LeetCode
date: 2019-03-20
tag:
 - backtracking
 - hard
---

**N皇后**。*n* 皇后问题研究的是如何将 *n* 个皇后放置在 *n*×*n* 的棋盘上，并且使皇后彼此之间不能相互攻击。

![img](https://ws3.sinaimg.cn/large/006tKfTcgy1g18fd54buoj307607ojrx.jpg)

上图为 8 皇后问题的一种解法。

给定一个整数 *n*，返回所有不同的 *n* 皇后问题的解决方案。

每一种解法包含一个明确的 *n* 皇后问题的棋子放置方案，该方案中 `'Q'` 和 `'.'` 分别代表了皇后和空位。

**示例:**

```
输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
```

<!-- more -->

### 思路一

`queen` 存储每行第几列放置一个皇后，当 `queen` 的行数等于 `n` 时，迭代结束。接下来就是判断皇后是否合法，首先每行只放一个皇后保证的行合法；当新的列 `col` 不存在 `queen` 中时，列合法；遍历之前放置的皇后的位置`i（行）, j（列）`，如果新的行 `row` 和 `col`，满足 `row + col != i + j`，则 45° 对角线合法；满足 `row - col != i - j`，则 135° 对角线合法。

```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        def backtrack(queen):
            row = len(queen)
            if row == n:
                result.append(queen)
                return 
            for col in range(n):
                if isValid(queen, row, col):
                    backtrack(queen+[col])
        
        def isValid(queen, row, col):
            if col in queen:   #  保证列合法
                return False
            for i, j in enumerate(queen):
                if row + col == i + j or row - col == i - j:
                    return False
            return True
        
        result = []
        backtrack([])
        return [['.' * i + 'Q' + '.' * (n - i - 1) for i in queen] for queen in result]
```

### 思路二

在思路一中判断新的皇后放置是否合法时，需要遍历之前已经放置的皇后的位置，实际上可以用两个数组保存之前皇后放置时的 45° 对角线的位置和 135° 对角线的位置，这样就不用每次都遍历了。

```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        def backtrack(queen, _45, _135):
            row = len(queen)
            if row == n:
                result.append(queen)
                return 
            for col in range(n):
                if col not in queen and row + col not in _45 and row - col not in _135:
                    backtrack(queen+[col], _45+[row+col], _135+[row-col])
        
        result = []
        backtrack([], [], [])
        return [['.' * i + 'Q' + '.' * (n - i - 1) for i in queen] for queen in result]
```

### 相似问题

1. [N-Queens II](https://wendellgul.github.io/leetcode/2019/03/20/LeetCode-Problem-52-N-Queens-II/)
2. [Grid Illumination](https://leetcode.com/problems/grid-illumination/)