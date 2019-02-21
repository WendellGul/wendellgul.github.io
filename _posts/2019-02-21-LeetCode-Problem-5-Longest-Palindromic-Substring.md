---
title: LeetCode Problem 5-Longest Palindromic Substring
date: 2019-02-21
category: LeetCode
tag:
 - string
 - dynamic programming
 - medium
---

最长回文子串。

给定一个字符串 `s`，找到 `s` 中最长的回文子串。你可以假设 `s` 的最大长度为 1000。

**示例 1：**

```
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
```

**示例 2：**

```
输入: "cbbd"
输出: "bb"
```

### 思路一

动态规划。令`dp[i][j]`表示从`i`到`j`的子串是否为回文串，当 `dp[i+1][j-1] == 1`时，如果 `s[i] == s[j]`，则`dp[i][j] = 1`，可以以此来判断子串是否回文。时间复杂度为 $O(n^2)$。

值得注意的是，在遍历时，需要从字符串的最后向前遍历，这样才能使用已有的结果来判断新的子串是否回文。

```python
class Solution:
    def longestPalindrome(self, s: 'str') -> 'str':
        dp = [[0] * len(s) for i in range(len(s))]
        result = ''
        for i in range(len(s) - 1, -1, -1):
            for j in range(i, len(s)):
                if (j - i < 3 or dp[i+1][j-1]) and s[i] == s[j]:
                    dp[i][j] = 1
                if dp[i][j] and len(result) < j - i + 1:
                    result = s[i:j+1]
        return result
```

### 思路二

遍历一遍字符串，以每个字符为中心向两边扩散判断是否存在回文串，注意既需要判断奇数长度的回文串，也需要判断偶数长度的回文串。时间复杂度 $O(n^2)$。

```python
class Solution:
    def longestPalindrome(self, s: 'str') -> 'str':
        def palindrome(a, l, r):
            while l >= 0 and r < len(a) and a[l] == a[r]:
                l, r = l - 1, r + 1
            return a[l+1:r]
        res = ''
        for i in range(len(s)):
            # odd case, like "aba"
            tmp = palindrome(s, i, i)
            if len(res) < len(tmp):
                res = tmp
            # even case, like "abba"
            tmp = palindrome(s, i, i+1)
            if len(res) < len(tmp):
                res = tmp
        return res
```

### 思路三

令`max_len`表示串`s[0:i-1]`的最长回文串的长度，则对于串`s[0:i]`来说，新增加一个字符 `s[i]`，如果`s[i]`是`s[0:i]`最长回文串的字符，则新的最长回文串的长度可能增加2，即新的最长回文串为`s[i-max_len-1, i]`，也可能增加1，即新的最长回文串为`s[i-max_len, i]`。时间复杂度为 $O(n^2)$，实际时间小于思路一和思路二的时间。

```python
class Solution:
    def longestPalindrome(self, s: 'str') -> 'str':
        def isPalindrome(a, l, r):
            while l < r:
                if a[l] != a[r]: return False
                l, r = l+1, r-1
            return True
        max_len = rs = re = 0
        for i in range(0, len(s)):
            if i - max_len - 1 >= 0 and isPalindrome(s, i - max_len - 1, i):
                rs, re = i - max_len - 1, i
                max_len += 2
            elif isPalindrome(s, i - max_len, i):
                rs, re = i - max_len, i
                max_len += 1
        return s[rs: re+1]
```

### 相似问题

1. [Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/)
2. [Palindrome Permutation](https://leetcode.com/problems/palindrome-permutation/)
3. [Palindrome Pairs](https://leetcode.com/problems/palindrome-pairs/)
4. [Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)
5. [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

