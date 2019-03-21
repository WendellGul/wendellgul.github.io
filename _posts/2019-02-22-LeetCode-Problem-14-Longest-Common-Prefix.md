---
title: LeetCode Problem 14-Longest Common Prefix
category: LeetCode
date: 2019-02-22
tag:
 - string
 - easy
---

最长公共前缀。编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。

**示例 1:**

```
输入: ["flower","flow","flight"]
输出: "fl"
```

**示例 2:**

```
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

**说明:**

所有输入只包含小写字母 `a-z` 。

<!-- more -->

### 思路一

以某个字符串为基准，对剩下的字符串一个字符一个字符的遍历，找寻最长公共前缀。时间复杂度$O(n)​$，$n​$ 为所有字符串的字符数之和。

```python
class Solution:
    def longestCommonPrefix(self, strs: 'List[str]') -> 'str':
        if len(strs) == 0:
            return ''
        if len(strs) == 1:
            return strs[0]
        rs = ''
        for i, c in enumerate(strs[0]):
            count = 1
            for s in strs[1:]:
                if i >= len(s) or s[i] != c: 
                    break;
                count += 1
            if count != len(strs):
                break;
            rs += c
        return rs
```

### 思路二

假设某个字符串就是当前最长的公共前缀，然后遍历剩下的字符串，如果字符串中不包含当前的前缀，则当前前缀的长度减一。时间复杂度$O(n)$，$n$为所有字符串的字符数之和。

```python
class Solution:
    def longestCommonPrefix(self, strs: 'List[str]') -> 'str':
        if len(strs) == 0:
            return ''
        rs = strs[0]
        for i, s in enumerate(strs[1:]):
            while not s.startswith(rs):
                rs = rs[:-1]
                if not rs:
                    return ''
        return rs
```

### 思路三

分治法。假设$LCP(strs)$表示$strs$的最长公共前缀，则有$$LCP(strs) = LCP(LCP(strs[:k]), LCP(strs[k+1:]))$$。所以可以将求$LCP(strs)$的问题分为求$$LCP(strs[:mid])$$和$$LCP(strs[mid+1:])$$两个子问题的过程。时间复杂度 $O(n)$，$n​$ 为所有字符串的字符数之和。

```python
class Solution:
    def longestCommonPrefix(self, strs: 'List[str]') -> 'str':
        def commonPrefix(left, right):
            m = min(len(left), len(right))
            for i in range(m):
                if left[i] != right[i]:
                    return left[:i]
            return left[: m]
        
        def longestPrefix(s, l, r):
            if l == r:
                return s[l]
            else:
                mid = (l + r) // 2
                lcp_left = longestPrefix(s, l, mid)
                lcp_right = longestPrefix(s, mid + 1, r)
                return commonPrefix(lcp_left, lcp_right)
        
        if len(strs) == 0:
            return ''
        return longestPrefix(strs, 0, len(strs) - 1)
```

