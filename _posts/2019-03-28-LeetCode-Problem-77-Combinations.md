---
title: LeetCode Problem 77-Combinations
category: LeetCode
date: 2019-03-28
tag:
 - backtracking
 - medium
---

**组合**。给定两个整数 *n* 和 *k*，返回 1 ... *n* 中所有可能的 *k* 个数的组合。

<!-- more -->

**示例:**

```
输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

### 思路一

回溯法。与排列问题对比。

```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        def backtrack(first=1, tmp=[]):
            if len(tmp) == k:
                rs.append(tmp)
                return
            for i in range(first, n + 1):
                backtrack(i + 1, tmp + [i])
        rs = []
        backtrack()
        return rs
```

### 相似问题

1. [Combination Sum](https://wendellgul.github.io/leetcode/2019/03/14/LeetCode-Problem-39-Combination-Sum/)
2. [Permutations](https://wendellgul.github.io/leetcode/2019/03/18/LeetCode-Problem-46-Permutations/)