---
title: LeetCode Problem 91-Decode Ways
category: LeetCode
date: 2019-04-11
tag:
 - string
 - dynaminc programming
 - medium
---

**解码方法**。一条包含字母 `A-Z` 的消息通过以下方式进行了编码：

```
'A' -> 1
'B' -> 2
...
'Z' -> 26
```

给定一个只包含数字的**非空**字符串，请计算解码方法的总数。

<!-- more -->

**示例 1:**

```
输入: "12"
输出: 2
解释: 它可以解码为 "AB"（1 2）或者 "L"（12）。
```

**示例 2:**

```
输入: "226"
输出: 3
解释: 它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
```

### 思路一

动态规划。`dp[i]` 表示`s[0:i]` 编码方法的数目，则当只有`s[i-1:i]` 或`s[i]` 能组成合法编码时，`dp[i] = dp[i-2]` 或 `dp[i] = dp[i-1]`，当 `s[i-1:i]` 和 `s[i]` 都能组成合法编码时，`dp[i] = dp[i-2] + dp[i-1]`。时间复杂度 $$O(n)$$。

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        if len(s) == 0 or s[0] == '0':
            return 0
        dp = [0] * len(s)
        dp[0] = 1
        for i in range(1, len(s)):
            if s[i] == '0' and (s[i-1] == '0' or s[i-1] > '2'):
                return 0
            if s[i] == '0':
                dp[i] = dp[i-2] if i > 1 else 1
            elif s[i-1] == '1' or s[i-1] == '2' and s[i] <= '6':
                dp[i] = dp[i-1] + dp[i-2] if i > 1 else dp[i-1] + 1
            else:
                dp[i] = dp[i-1]
        return dp[-1]
```

### 思路二

动态规划，但是不申请额外的空间，类似斐波那契数列。

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        if len(s) == 0 or s[0] == '0':
            return 0
        # r2: decode ways of s[i-2] , r1: decode ways of s[i-1] 
        r1 = r2 = 1
        for i in range(1, len(s)):
            # zero voids ways of the last because zero cannot be used separately
            if s[i] == '0':
                r1 = 0
            # possible two-digit letter, so new r1 is sum of both while new r2 is the old r1
            if s[i-1] == '1' or s[i-1] == '2' and s[i] <= '6':
                r1 = r1 + r2
                r2 = r1 - r2
            # one-digit letter, no new way added
            else:
                r2 = r1
        return r1
```

### 相似问题

1. [Decode Ways II](https://leetcode.com/problems/decode-ways-ii/)