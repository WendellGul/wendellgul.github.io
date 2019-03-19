---
title: LeetCode Problem 44-Wildcard Matching
category: LeetCode
date: 2019-03-19
tag:
 - string
 - dynamic programming
 - backtracking
 - greedy
 - hard
---

**通配符匹配**。给定一个字符串 (`s`) 和一个字符模式 (`p`) ，实现一个支持 `'?'` 和 `'*'` 的通配符匹配。

```
'?' 可以匹配任何单个字符。
'*' 可以匹配任意字符串（包括空字符串）。
```

两个字符串**完全匹配**才算匹配成功。

**说明:**

- `s` 可能为空，且只包含从 `a-z` 的小写字母。
- `p` 可能为空，且只包含从 `a-z` 的小写字母，以及字符 `?` 和 `*`。

<!--more-->

**示例 1:**

```
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
```

**示例 2:**

```
输入:
s = "aa"
p = "*"
输出: true
解释: '*' 可以匹配任意字符串。
```

**示例 3:**

```
输入:
s = "cb"
p = "?a"
输出: false
解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
```

**示例 4:**

```
输入:
s = "adceb"
p = "*a*b"
输出: true
解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".
```

**示例 5:**

```
输入:
s = "acdcb"
p = "a*c?b"
输入: false
```

### 思路一

使用动态规划解决，假设`dp[i][j]`表示`s[i:]`和`p[j:]`是否匹配，通过自底向上进行遍历。每次比较 `s[i:]` 和 `p[j:]` 的第一个字符是否匹配：`first_match = bool(s[i:]) and p[j] in {s[i], '?', '*'}`，则 `dp[i][j]` 的值存在以下两种情况：

1. 当 `p[j] = '*'` 时，`*` 可能不匹配，则 `dp[i][j] = dp[i][j+1]`，或者 `*` 匹配，则 `dp[i][j] = first_match && dp[i+1][j]`；
2. 当 `p[j] != '*'` 时，则 `dp[i][j] = first_match && dp[i+1][j+1]`。

时间复杂度 $O(SP)$。

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]
        dp[-1][-1] = True
        for i in range(len(s), -1, -1):
            for j in range(len(p) - 1, -1, -1):
                first_match = i < len(s) and p[j] in {s[i], '?', '*'}
                if j < len(p) and p[j] == '*':
                    dp[i][j] = dp[i][j+1] or (first_match and dp[i+1][j])
                else:
                    dp[i][j] = first_match and dp[i+1][j+1]
        return dp[0][0]
```

### 思路二

使用两个指针分别指向 `s` 和 `p`，在遍历的过程中进行匹配。时间复杂度 $O(SP)$，空间复杂度 $O(1)$。

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        i = j = match = 0  # match 记录当前 s 串匹配到的位置
        star_idx = -1  # 记录 * 的位置
        while i < len(s):
            # 一对一匹配，两指针同时后移。
            if j < len(p) and p[j] in {s[i], '?'}:
                i, j = i+1, j+1
            # 碰到 *，假设它匹配空串，并且用 startIdx 记录 * 的位置，
            # 记录当前字符串的位置（以便回溯），j 后移
            elif j < len(p) and p[j] is '*':
                star_idx = j
                match = i
                j += 1
            # 当前字符不匹配，并且也没有 *，回退
            # 回退意味着用 * 匹配这个字符
            # 所以 match += 1
            # j 回到 * 号的下一个位置，以便继续匹配
            elif star_idx != -1:
                match += 1
                j = star_idx + 1
                i = match
            # 字符不匹配，也没有 *，返回 false
            else:
                return False
        # 将末尾多余的 * 直接匹配空串 例如 text = ab, pattern = a*******
        while j < len(p) and p[j] is '*':
            j += 1
        return j == len(p)
```

### 相似问题

1. [Regular Expression Matching](https://wendellgul.github.io/leetcode/2019/02/22/LeetCode-Problem-10-Regular-Expression-Matching/)