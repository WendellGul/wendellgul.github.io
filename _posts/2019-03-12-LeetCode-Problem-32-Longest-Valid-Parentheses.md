---
title: LeetCode Problem 32-Longest Valid Parentheses
category: LeetCode
date: 2019-03-12
tag:
 - string
 - dynamic programming
 - hard
---

最长有效括号。给定一个只包含 `'('` 和 `')'` 的字符串，找出最长的包含有效括号的子串的长度。

**示例 1:**

```
输入: "(()"
输出: 2
解释: 最长有效括号子串为 "()"
```

**示例 2:**

```
输入: ")()())"
输出: 4
解释: 最长有效括号子串为 "()()"
```

<!-- more -->

### 思路一

动态规划。令 `dp[i]` 表示截止到第 `i` 个字符为止的最长有效括号的长度，很显然，只有当子串以 `')'` 结尾时，才有可能构成有效的子串，因此，我们只在遇到 `')'` 的时候更新 `dp`。

* 当 `s[i] = ')'` 并且 `s[i - 1] = '('` 时，即出现 `"......()"` 的子串，`dp[i] = dp[i - 2] + 2`
* 当 `s[i] = ')'` 并且 `s[i - 1] = ')'` 时，即出现 `"......))"` 的子串，此时如果 `s[i - dp[i - 1] - 1] = '('`，则 `dp[i] = dp[i - 1] + 2 + dp[i - dp[i-1] - 2]`

时间复杂度 $O(n)$，空间复杂度 $O(n)$。

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        dp, rs = [0] * len(s), 0
        for i in range(1, len(s)):
            if s[i] == ')':
                if s[i - 1] == '(':
                    dp[i] = dp[i - 2] + 2 if i > 1 else 2
                elif i - dp[i - 1] > 0 and s[i - dp[i - 1] - 1] == '(':
                    if i - dp[i - 1] >= 2:
                        dp[i] = dp[i - 1] + 2 + dp[i - dp[i - 1] - 2]
                    else: 
                        dp[i] = dp[i - 1] + 2
                rs = max(rs, dp[i])
        return rs
```

### 思路二

使用堆栈，记录目前为止遇到的字符的下标，为了获取最大长度，首先将 `-1` 入栈。当遇到一个 `(` 时，即将其下标入栈，遇到一个 `)` 时，栈顶元素出栈，此时得到的有效括号的长度为当前 `)` 的下标减去栈顶元素的差，如果栈为空，则将当前 `)` 的下标入栈。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        stack, rs = [-1], 0
        for i, c in enumerate(s):
            if c is '(':
                stack.append(i)
            else:
                stack.pop()
                if len(stack) == 0:
                    stack.append(i)
                else:
                    rs = max(rs, i - stack[-1])
        return rs
```

### 思路三

使用两个指示符 `left` 和 `right`，指示遇到的括号的数目。首先从左往右遍历，如果遇到 `(`，则 `left + 1`，如果遇到 `)`，则 `right + 1`，当 `left` 与 `right` 相等时，则此时可以计算当前有效括号的长度，即为 `2 * right`，如果 `left > right`，则令 `left = right = 0`。

然后，再从右往左遍历，操作与之前类似。

为什么还要从右往左遍历一遍呢，比如出现这样的字符串 `()((())`，只从左往右遍历会忽略掉最大的有小括号。时间复杂度 $O(n)$，空间复杂度 $O(1)$。

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        left = right = rs = 0
        for i in range(len(s)):
            if s[i] == '(':
                left += 1
            else:
                right += 1
            if left == right:
                rs = max(rs, 2 * right)
            elif right > left:
                left = right = 0
        left = right = 0
        for i in range(len(s) - 1, -1, -1):
            if s[i] == '(':
                left += 1
            else:
                right += 1
            if left == right:
                rs = max(rs, 2 * left)
            elif left > right:
                left = right = 0
        return rs
```

### 相似问题

1. [Valid Parentheses](https://wendellgul.github.io/leetcode/2019/03/01/LeetCode-Problem-20-Valid-Parentheses/)