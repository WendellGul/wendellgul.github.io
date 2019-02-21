---
title: LeetCode Problem 3-Longest Substring Without Repeating Characters
category: LeetCode
date: 2019-02-19
tag:
 - hash table
 - two pointers
 - string
---

给定一个字符串，请你找出其中不含有重复字符的 **最长子串** 的长度。

**示例 1:**

```
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**示例 2:**

```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

**示例 3:**

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

### 思路一

使用双重循环和一个hash表来实现，双重循环遍历所有的子串，hash表记录是否出现重复，时间复杂度 $O(n^2)$。

需要注意的是长度为0和1的串以及子串的最后一个字符的判断。

```python
class Solution:
    def lengthOfLongestSubstring(self, s: 'str') -> 'int':
        # 注意空串和长度为1的串
        rs = len(s) if len(s) <= 1 else 0
        for i in range(len(s) - 1):
            repeat = {}
            repeat[s[i]] = 1
            for j in range(i + 1, len(s)):
                if s[j] not in repeat:
                    repeat[s[j]] = 1
                    # 注意最后一个字符的判断
                    if j == len(s) - 1:
                        rs = max(j - i + 1, rs)
                else:
                    rs = max(j - i, rs)
                    break
        return rs if rs > 0 else len(s)
```

### 思路二

使用hash表存放每个字符在串中的位置。

使用两个指针，一个指向子串的开头，另一个后移并判断指向的字符是否出现过，如果出现过，如果此时子串的开头指针位置在已出现的字符位置之前，则表示出现重复，则子串开头指针后移，否则计算子串的长度。

时间复杂度 $O(n)$。

```python
class Solution:
    def lengthOfLongestSubstring(self, s: 'str') -> 'int':
        rs = start = 0
        appear = {}
        for i, c in enumerate(s):
            if c in appear and start <= appear[c]:
                start = appear[c] + 1
            else:
                rs = max(rs, i - start + 1)    
            appear[c] = i
        return rs
```

### 思路三

使用动态规划的思想，令 $l[i] = s[m\dots i]$ 表示串 $s$ 在 $s[i]$ 处结尾的没有重复字符的最长子串，同时我们使用一个hash表存放已出现字符的位置。当处理 $s[i+1]$ 时：

1. 如果 $s[i+1]$ 没有在hash表中 出现，我们可以直接将 $s[i+1]$ 添加到hash表，并且 $l[i+1] = s[m\dots i+1]$；
2. 如果 $s[i+1]$ 在hash表中出现，并且hash值（即已出现字符的下标）为 $k$，则令 $m = \max(m, k)$，$l[i+1] = s[m\dots i+1]$，同时更新hash表中 $s[i+1]$ 的值为最新的出现位置。

时间复杂度 $O(n)$。

```python
class Solution:
    def lengthOfLongestSubstring(self, s: 'str') -> 'int':
        rs = m = 0
        appear = {}
        for i, c in enumerate(s):
            if c in appear:
                m = max(m, appear[c] + 1)
            rs = max(rs, i - m + 1)
            appear[c] = i
        return rs
```

### 相似问题

1. [Longest Substring with At Most Two Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/)

