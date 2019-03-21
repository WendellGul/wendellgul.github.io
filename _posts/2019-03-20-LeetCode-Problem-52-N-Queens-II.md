---
title: LeetCode Problem 52-N-Queens II
category: LeetCode
date: 2019-03-20
tag:
 - backtracking
 - hard
---

**N皇后 II**。*n* 皇后问题研究的是如何将 *n* 个皇后放置在 *n*×*n* 的棋盘上，并且使皇后彼此之间不能相互攻击。

<center><img src="https://ws2.sinaimg.cn/large/006tKfTcly1g19kh62txcj307607ojrx.jpg" /></center>

上图为 8 皇后问题的一种解法。

给定一个整数 *n*，返回 *n* 皇后不同的解决方案的数量。

**示例:**

```
输入: 4
输出: 2
解释: 4 皇后问题存在如下两个不同的解法。
[
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
```

<!-- more -->

### 思路一

和 N 皇后问题类似。

```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        self.count = 0
        def backtrack(queen, _45, _135):
            row = len(queen)
            if row == n:
                self.count += 1
                return 
            for col in range(n):
                if col not in queen and row + col not in _45 and row - col not in _135:
                    backtrack(queen+[col], _45+[row+col], _135+[row-col])
        
        backtrack([], [], [])
        return self.count
```

### 相似问题

1. [N-Queens](https://wendellgul.github.io/leetcode/2019/03/20/LeetCode-Problem-51-N-Queens/)