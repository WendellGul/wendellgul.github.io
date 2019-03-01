---
title: LeetCode Problem 20-Valid Parentheses
category: LeetCode
date: 2019-03-01
tag:
 - string
 - stack
 - easy
---

有效的括号。给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

注意空字符串可被认为是有效字符串。

**示例 1:**

```
输入: "()"
输出: true
```

**示例 2:**

```
输入: "()[]{}"
输出: true
```

**示例 3:**

```
输入: "(]"
输出: false
```

**示例 4:**

```
输入: "([)]"
输出: false
```

**示例 5:**

```
输入: "{[]}"
输出: true
```

### 思路一

使用堆栈解决。时间复杂度 $O(n)$。

```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        match = {
            '(': ')',
            '{': '}',
            '[': ']'
        }
        for c in s:
            if len(stack) == 0 or stack[-1] not in match or c != match[stack[-1]]:
                stack.append(c)
            else:
                stack.pop()
        return len(stack) == 0
```

### 相似问题

1. [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)
2. [Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/)
3. [Remove Invalid Parentheses](https://leetcode.com/problems/remove-invalid-parentheses/)