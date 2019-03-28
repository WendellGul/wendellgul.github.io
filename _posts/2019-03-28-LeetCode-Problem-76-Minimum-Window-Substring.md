---
title: LeetCode Problem 76-Minimum Window Substring
category: LeetCode
date: 2019-03-28
tag:
 - hash table
 - two pointers
 - string
 - sliding window
 - hard
---

**最小覆盖子串**。给定一个字符串 S 和一个字符串 T，请在 S 中找出包含 T 所有字母的最小子串。

**示例：**

```
输入: S = "ADOBECODEBANC", T = "ABC"
输出: "BANC"
```

**说明：**

- 如果 S 中不存这样的子串，则返回空字符串 `""`。
- 如果 S 中存在这样的子串，我们保证它是唯一的答案。

<!-- more -->

### 思路一

首先统计目标串中每个字符的数目，以及整个目标串的长度，通过两个指针 `i,j` 指示包含目标串的字符串窗口的左右，将 `j` 向右移动，寻找满足条件的窗口，然后再向右移动 `i`，查看更小的窗口：

```
S = "ADOBECODEBANC", T = "ABC"
S =    "ADOBECODEBANC"
Step 1: i    j          j移到此时满足条件，然后i右移
     2:  i   j          此时窗口 i，j 不满足条件，j 右移
     3:  i        j     j移到此时满足题意，i 右移
     ...
```

时间复杂度 $$O(n)$$。

```python
import collections

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        # missing 来标记还缺少的字符的数目
        need, missing = collections.Counter(t), len(t)
        left = right = i = 0
        for j, c in enumerate(s, 1):  # j 从 1 开始
            if need[c] > 0:
                missing -= 1
            need[c] -= 1
            while not missing:
                if not right or j - i < right - left:
                    left, right = i, j
                if need[s[i]] == 0:
                    missing += 1
                need[s[i]] += 1
                i += 1
        return s[left: right]
```

### 相似问题

1. [Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)
2. [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)
3. [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)
4. [Permutation in String](https://leetcode.com/problems/permutation-in-string/)
5. [Smallest Range](https://leetcode.com/problems/smallest-range/)
6. [Minimum Window Subsequence](https://leetcode.com/problems/minimum-window-subsequence/)