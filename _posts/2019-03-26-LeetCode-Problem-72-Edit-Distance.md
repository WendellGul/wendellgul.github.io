---
title: LeetCode Problem 72-Edit Distance
category: LeetCode
date: 2019-03-26
tag:
 - string
 - dynamic programming
 - hard
---

**编辑距离**。给定两个单词 *word1* 和 *word2*，计算出将 *word1* 转换成 *word2* 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

1. 插入一个字符
2. 删除一个字符
3. 替换一个字符

<!-- more -->

**示例 1:**

```
输入: word1 = "horse", word2 = "ros"
输出: 3
解释: 
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
```

**示例 2:**

```
输入: word1 = "intention", word2 = "execution"
输出: 5
解释: 
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
```

### 思路一

动态规划。`dp[i][j]` 表示 `word1[0:i+1]` 和 `word2[0:j+1]` 的编辑距离。时间复杂度 $$O(mn)$$。

```
   #  r  o  s
#  0  1  2  3
h  1  1  2  3
o  2  2  1  2
r  3  2  2  2
s  4  3  3  2
e  5  4  4 (3)
```

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        n1, n2 = len(word1), len(word2)
        dp = [[0] * (n2+1) for _ in range(n1+1)]
        for i in range(n1+1):
            dp[i][0] = i
        for j in range(n2+1):
            dp[0][j] = j
        for i in range(0, n1):
            for j in range(0, n2):
                if word1[i] == word2[j]:
                    dp[i+1][j+1] = dp[i][j]
                else:
                    dp[i+1][j+1] = min(dp[i][j], dp[i][j+1], dp[i+1][j]) + 1
        return dp[n1][n2]
```

### 相似问题

1. [One Edit Distance](https://leetcode.com/problems/one-edit-distance/)
2. [Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/)
3. [Minimum ASCII Delete Sum for Two Strings](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/)