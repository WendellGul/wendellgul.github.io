---
title: LeetCode Problem 28-Implement strStr()
category: LeetCode
date: 2019-03-07
tag:
 - two pointers
 - string
 - easy
---

实现 [strStr()](https://baike.baidu.com/item/strstr/811469) 函数。

给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  **-1**。

**示例 1:**

```
输入: haystack = "hello", needle = "ll"
输出: 2
```

**示例 2:**

```
输入: haystack = "aaaaa", needle = "bba"
输出: -1
```

**说明:**

当 `needle` 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当 `needle` 是空字符串时我们应当返回 0 。这与C语言的 [strstr()](https://baike.baidu.com/item/strstr/811469) 以及 Java的 [indexOf()](https://docs.oracle.com/javase/7/docs/api/java/lang/String.html#indexOf(java.lang.String)) 定义相符。

### 思路一

判断两个字符串的长度，然后在循环中进行比较（循环次数是两个字符串长度的差值）。时间复杂度 $O(mn)$，$m,n$ 分别是两个字符串的长度。

```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        m, n = len(haystack), len(needle)
        if m < n:
            return -1
        if n == 0:
            return 0
        for i in range(m - n + 1):   # 注意+1，两个串长度相同的情况
            j = 0
            while j < n:
                if haystack[i + j] != needle[j]:
                    break
                else:
                    j += 1
            if j == n:
                return i
        return -1
```

### 相似问题

1. [Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/)
2. [Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/)

