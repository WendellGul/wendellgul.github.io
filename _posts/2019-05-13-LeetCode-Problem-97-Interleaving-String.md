---
title: LeetCode Problem 97-Interleaving String
category: LeetCode
date: 2019-05-13
tag:
 - string
 - dynamic programming
 - hard
---

**交错字符串**。给定三个字符串 *s1*, *s2*, *s3*, 验证 *s3* 是否是由 *s1* 和 *s2* 交错组成的。

**示例 1:**

```
输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
输出: true
```

**示例 2:**

```
输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
输出: false
```

<!-- more -->

### 思路一

穷举法，使用递归的思路，遍历`s1` 和 `s2` 组成的所有可能的交错字符串，判断是否与 `s3` 相同，交错字符串的组成方式如下所示：

```
     0
    / \
   /   \
  a     d     左支从 s1 选择，右支从 s2 选择
 / \   / \
aa ad da db   左支从 s1 选择，右支从 s2 选择
    ...
```

代码如下：

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        def is_interleave(i, j, res):
            if res == s3 and i == len(s1) and j == len(s2):
                return True
            ans = False
            if i < len(s1):
                ans |= is_interleave(i+1, j, res+s1[i])
            if j < len(s2):
                ans |= is_interleave(i, j+1, res+s2[j])
            return ans
        
        return is_interleave(0, 0, '')
```

时间复杂度 $$O(2^{m+n})$$，$$m$$ 和 $$n$$ 分别是 `s1` 和 `s2` 的长度。

### 思路二

穷举法，但是进行剪枝处理。步骤如下：

1. 从下标 `0, 0, 0` 开始，比较 `s1[i] == s3[k]` 或者 `s2[j] == s3[k]`
2. `valid = True` 当且仅当 `i` 或 `j` 与 `k` 匹配并且剩下的串也是 `valid`
3. 只需要保存 `invalid[i][j]`，因为大多数 `s1[0:i]` 和 `s2[0:j]` 都不能组成 `s3[0:k]`，保存 `valid[i][j]` 效果也是一样 

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        def is_interleave(i, j, k, invalid):
            if i == len(s1):
                return s2[j:] == s3[k:]
            if j == len(s2):
                return s1[i:] == s3[k:]
            if invalid[i][j]:
                return False
            valid = s3[k] == s1[i] and is_interleave(i+1, j, k+1, invalid) or \
                    s3[k] == s2[j] and is_interleave(i, j+1, k+1, invalid)
            if not valid:
                invalid[i][j] = True
            return valid
        
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        invalid = [[False] * n for _ in range(m)]
        return is_interleave(0, 0, 0, invalid)
```

时间复杂度 $$O(2^{m+n})$$，但是要小于思路一的时间复杂度。

### 思路三

动态规划。`dp[i][j]` 表示 `s1[:i]` 和  `s2[:j]` 组成的交错字符串是否与 `s3[0:i+j]` 相匹配。类似编辑距离。详见[链接](https://leetcode.com/articles/interleaving-strings/#approach-3-using-2d-dynamic-programming)。

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        dp = [[True] * (n+1) for _ in range(m+1)]
        for i in range(m+1):
            for j in range(n+1):
                if i == 0 and j == 0:
                    dp[i][j] == True
                elif i == 0:
                    dp[i][j] = dp[i][j-1] and s2[j-1] == s3[i+j-1]
                elif j == 0:
                    dp[i][j] = dp[i-1][j] and s1[i-1] == s3[i+j-1]
                else:
                    dp[i][j] = dp[i-1][j] and s1[i-1] == s3[i+j-1] or \
                               dp[i][j-1] and s2[j-1] == s3[i+j-1]
        return dp[m][n]
```

时间复杂度 $$O(mn)$$。

### 思路四

动态规划，可以使用一维数组保存思路三中的 `dp`。

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        dp = [True] * (n+1)
        for i in range(m+1):
            for j in range(n+1):
                if i == 0 and j == 0:
                    dp[j] == True
                elif i == 0:
                    dp[j] = dp[j-1] and s2[j-1] == s3[i+j-1]
                elif j == 0:
                    dp[j] = dp[j] and s1[i-1] == s3[i+j-1]
                else:
                    dp[j] = dp[j] and s1[i-1] == s3[i+j-1] or \
                            dp[j-1] and s2[j-1] == s3[i+j-1]
        return dp[n]
```

时间复杂度 $$O(mn)$$。