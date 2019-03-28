---
title: LeetCode Problem 79-Word Search
category: LeetCode
date: 2019-03-28
tag:
 - array
 - backtracking
 - medium
---

**单词搜索**。给定一个二维网格和一个单词，找出该单词是否存在于网格中。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

<!-- more -->

**示例:**

```
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

给定 word = "ABCCED", 返回 true.
给定 word = "SEE", 返回 true.
给定 word = "ABCB", 返回 false.
```

### 思路一

回溯法。

```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        def backtrack(r, c, start):
            if start == len(word):
                return True
            if r < 0 or c < 0 or r == len(board) or c == len(board[0]):
                return False
            if board[r][c] != word[start]:
                return False
            tmp = board[r][c]
            board[r][c] = '#'  # 此处标记放置重复使用
            exist = backtrack(r+1, c, start+1) or backtrack(r, c+1, start+1) or \
                    backtrack(r-1, c, start+1) or backtrack(r, c-1, start+1)
            board[r][c] = tmp  # 回溯完后还原
            return exist

        for i in range(len(board)):
            for j in range(len(board[0])):
                if backtrack(i, j, 0):
                    return True
        return False
```

### 相似问题

1. [Word Search II](https://leetcode.com/problems/word-search-ii/)