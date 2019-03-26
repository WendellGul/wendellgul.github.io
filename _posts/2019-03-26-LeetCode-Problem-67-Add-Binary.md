---
title: LeetCode Problem 67-Add Binary
category: LeetCode
date: 2019-03-26
tag:
 - math
 - string
 - easy
---

**二进制求和**。给定两个二进制字符串，返回他们的和（用二进制表示）。

输入为**非空**字符串且只包含数字 `1` 和 `0`。

**示例 1:**

```
输入: a = "11", b = "1"
输出: "100"
```

**示例 2:**

```
输入: a = "1010", b = "1011"
输出: "10101"
```

<!-- more -->

### 思路一

与 [Add Two Numbers](https://wendellgul.github.io/leetcode/2019/02/18/Leetcode-Problem-2-Add-Two-Numbers/) 思路类似。

```python
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        rs, carry = '', 0
        i, j = len(a) - 1, len(b) - 1
        while i >= 0 or j >= 0 or carry:
            s = carry
            if i >= 0:
                s += ord(a[i]) - ord('0')
                i -= 1
            if j >= 0:
                s += ord(b[j]) - ord('0')
                j -= 1
            carry, s = s // 2, s % 2
            rs += chr(ord('0') + s)
        return rs[::-1]
```

### 相似问题

1. [Add Two Numbers](https://wendellgul.github.io/leetcode/2019/02/18/Leetcode-Problem-2-Add-Two-Numbers/)
2. [Multiply Strings](https://leetcode.com/problems/multiply-strings/)
3. [Plus One](https://wendellgul.github.io/leetcode/2019/03/26/LeetCode-Problem-66-Plus-One/)
4. [Add to Array-Form of Integer](https://leetcode.com/problems/add-to-array-form-of-integer/)