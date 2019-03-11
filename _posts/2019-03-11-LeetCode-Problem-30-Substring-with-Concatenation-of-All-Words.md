---
title: LeetCode Problem 30-Substring with Concatenation of All Words
category: LeetCode
date: 2019-03-11
tag:
 - hash table
 - two pointers
 - string
 - hard
---

串联所有单词的子串。给定一个字符串 **s** 和一些长度相同的单词 **words。**找出 **s** 中恰好可以由 **words** 中所有单词串联形成的子串的起始位置。

注意子串要与 **words** 中的单词完全匹配，中间不能有其他字符，但不需要考虑 **words** 中单词串联的顺序。

**示例 1：**

```
输入：
  s = "barfoothefoobarman",
  words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoor" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
```

**示例 2：**

```
输入：
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
输出：[]
```

### 思路一

先将 `words` 中的词用 hash 表保存，hash 表的 value 为 `words` 中每个词出现的次数。然后统计 `s` 中长度满足 `words` 总长的子串中出现 `words` 中每个单词的数量，与真实数量作比较，即可得到结果。时间复杂度 $O(dn)$，其中 $d$ 为 `words` 中词的总数。

```python
class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        if len(words) == 0:
            return []
        elif len(words[0]) == 0:
            return list(range(len(s) + 1))
        words_dict = {}
        for w in words:
            if w in words_dict:
                words_dict[w] += 1
            else:
                words_dict[w] = 1
        i, d, rs = 0, len(words[0]), []
        while i <= len(s) - d * len(words):  # 注意循环终止条件
            tmp, j, is_result = {}, i, True
            while j < i + d * len(words) and s[j: j+d] in words_dict:  
                # 注意循环终止条件
                if s[j: j+d] in tmp:
                    tmp[s[j: j+d]] += 1
                else:
                    tmp[s[j: j+d]] = 1
                j += d
            for k in words_dict:
                if k not in tmp or tmp[k] != words_dict[k]:
                    is_result = False
                    break
            if is_result:
                rs.append(i)
            i += 1
        return rs
```

### 思路二

思路一的简化版，将 `words` 中的词用 hash 表保存之后，扫描子串的单词，如果当前扫描的单词在之前的 hash 表中，就把该单词存到新的 hash 表中，并判断新的 hash 表中该单词的 value 是不是大于之前的 HashMap 该单词的 value ，如果大了，就代表该子串不是我们要找的，接着判断下一个子串就可以了，通过记录出现的单词的数目来控制循环。时间复杂度 $O(dn)$。

```python
class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        if len(words) == 0:
            return []
        elif len(words[0]) == 0:
            return list(range(len(s) + 1))
        words_dict = {}
        for w in words:
            words_dict[w] = words_dict[w] + 1 if w in words_dict else 1
        
        d, rs = len(words[0]), []
        for i in range(0, len(s) - d * len(words) + 1):
            tmp, num = {}, 0
            while num < len(words):
                sub = s[i + num * d: i + (num + 1) * d]
                if sub in words_dict:
                    tmp[sub] = tmp[sub] + 1 if sub in tmp else 1
                    if tmp[sub] > words_dict[sub]:
                        break
                else:
                    break
                num += 1
            if num == len(words):
                rs.append(i)
        return rs
```

### 思路三

使用移动窗口的思想，每个单词的长度即为窗口的长度 $d$，这时对 `s` 串所有子串的生成就有 $d$ 中情况，即每次不是移动一个字符，而是移动 $d$ 个字符，详细情况参见[此处](https://leetcode.windliang.cc/leetCode-30-Substring-with-Concatenation-of-All-Words.html#%E8%A7%A3%E6%B3%95%E4%BA%8C)。时间复杂度 $O(n)$。

```python
class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        if len(words) == 0:
            return []
        elif len(words[0]) == 0:
            return list(range(len(s) + 1))
        words_dict = {}
        for w in words:
            words_dict[w] = words_dict[w] + 1 if w in words_dict else 1
        d, rs = len(words[0]), []
        for i in range(d):
            l = r = i
            num, tmp = 0, {}
            while r + d <= len(s):
                w, r = s[r: r+d], r + d
                if w in words_dict:
                    tmp[w] = tmp[w] + 1 if w in tmp else 1
                    num += 1
                    while tmp[w] > words_dict[w]:
                        tmp[s[l: l+d]] -= 1
                        l += d
                        num -= 1
                    if num == len(words):
                        rs.append(l)
                else:
                    l, tmp, num = r, {}, 0
        return rs
```

### 相似问题

1. [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)