---
title: LeetCode Problem 10-Regular Expression Matching
category: LeetCode
date: 2019-02-22
tag:
 - string
 - dynamic programming
 - backtracking
 - hard
---

正则表达式匹配。给定一个字符串 (`s`) 和一个字符模式 (`p`)。实现支持 `'.'` 和 `'*'` 的正则表达式匹配。

```
'.' 匹配任意单个字符。
'*' 匹配零个或多个前面的元素。
```

匹配应该覆盖**整个**字符串 (`s`) ，而不是部分字符串。

**说明:**

- `s` 可能为空，且只包含从 `a-z` 的小写字母。
- `p` 可能为空，且只包含从 `a-z` 的小写字母，以及字符 `.` 和 `*`。

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
p = "a*"
输出: true
解释: '*' 代表可匹配零个或多个前面的元素, 即可以匹配 'a' 。因此, 重复 'a' 一次, 字符串可变为 "aa"。
```

**示例 3:**

```
输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个('*')任意字符('.')。
```

**示例 4:**

```
输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 'c' 可以不被重复, 'a' 可以被重复一次。因此可以匹配字符串 "aab"。
```

**示例 5:**

```
输入:
s = "mississippi"
p = "mis*is*p*."
输出: false
```

### 思路一

采用递归解决，假设不存在 `*` 通配符，则一次遍历即可完成比较，即每次比较`s`和`p`的第一个字符是否匹配即可：`first_match = bool(s) and p[0] in {s[0], '.'}`；当存在`*`通配符时，假设`p`的输入是合法的，下面两种情况只要其中一种匹配即可：

1. `s` 和 `p[2:]`匹配；
2. 第一个字符匹配即`first_match`同时`s[1:]` 和 `p` 匹配。

```python
class Solution:
    def isMatch(self, s: 'str', p: 'str') -> 'bool':
        if not p:
            return not s
        first_match = bool(s) and p[0] in {s[0], '.'}
        if len(p) >= 2 and p[1] == '*':
            return self.isMatch(s, p[2:]) or (first_match and self.isMatch(s[1:], p))
        else:
            return first_match and self.isMatch(s[1:], p[1:])
```

假设 `s` 和 `p` 的长度分别为 $S$ 和 $P$，则时间复杂度为 $$O(2^{S+\frac P 2})$$。

### 思路二

使用动态规划解决，假设`dp[i][j]`表示`s[i:]`和`p[j:]`是否匹配，通过自底向上进行遍历。

```python
class Solution:
    def isMatch(self, s: 'str', p: 'str') -> 'bool':
        dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]
        dp[-1][-1] = True
        for i in range(len(s), -1, -1):
            for j in range(len(p) - 1, -1, -1):
                first_match = i < len(s) and p[j] in {s[i], '.'}
                if j + 1 < len(p) and p[j + 1] == '*':
                    dp[i][j] = dp[i][j + 2] or (first_match and dp[i + 1][j])
                else:
                    dp[i][j] = first_match and dp[i + 1][j + 1]
        return dp[0][0]
```

时间复杂度 $O(SP)$。

### 相似问题

1. [Wildcard Matching]()

