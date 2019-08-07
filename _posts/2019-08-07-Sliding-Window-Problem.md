---
title: Sliding Window Problem
category: Algorithm Analysis
date: 2019-08-07
---

使用滑动窗口的方法可以解决的一些问题的汇总。

<!-- more -->

### 问题1：最小覆盖子串

给你一个字符串 $S$、一个字符串 $T$，请在字符串 $S$ 里面找出：包含 $T$ 所有字母的最小子串。

示例：

```
输入: S = "ADOBECODEBANC", T = "ABC"
输出: "BANC"
```

说明：

- 如果 S 中不存这样的子串，则返回空字符串 ""。
- 如果 S 中存在这样的子串，我们保证它是唯一的答案。

>题目来源：力扣（LeetCode）
>链接：https://leetcode-cn.com/problems/minimum-window-substring
>著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

#### 解法

```python
def minWindow(s, t):
    dic = {}
    for c in t:
        dic[c] = dic[c] + 1 if c in dic else 1
    counter = len(t)
    begin = end = 0
    left, right = 0, len(s) + 1
    while end < len(s):
        if s[end] in dic:
            dic[s[end]] -= 1
            if dic[s[end]] >= 0:
                counter -= 1
        end += 1
        while counter == 0:
            if right - left > end - begin:
                left, right = begin, end
            if s[begin] in dic:
                dic[s[begin]] += 1
                if dic[s[begin]] > 0:
                    counter +=1
            begin += 1
    return '' if right == len(s) + 1 else s[left:right]
```

### 问题2：无重复字符的最长子串

给定一个字符串，请你找出其中不含有重复字符的 __最长子串__ 的长度。

示例 1:
```
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

示例 2:
```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

示例 3:
```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```


> 题目来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

#### 解法

```python
def lengthOfLongestSubstring(s):
    dic = {}
    counter = rs = 0
    end = begin = 0
    while end < len(s):
        dic[s[end]] = dic[s[end]] + 1 if s[end] in dic else 1
        if dic[s[end]] > 1:
            counter += 1
        end += 1

        while counter > 0:
            if s[begin] in dic:
                dic[s[begin]] -= 1
                if dic[s[begin]] >= 1:
                    counter -= 1
            begin += 1
        rs = max(rs, end - begin)
    return rs
```

### 问题3：串联所有单词的子串

给定一个字符串 $s$ 和一些长度相同的单词 words。找出 $s$ 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

示例 1：
```
输入：
  s = "barfoothefoobarman",
  words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoor" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
```

示例 2：
```
输入：
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
输出：[]
```

> 题目来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

#### 解法

```python
def findSubstring(s, words):
    if len(words) == 0:
        return []
    elif len(words[0]) == 0:
        return list(range(len(s) + 1))
    words_dict = {}
    for w in words:
        words_dict[w] = words_dict[w] + 1 if w in words_dict else 1

    d, rs = len(words[0]), []
    for i in range(d):
        begin = end = i
        count, tmp = 0, {}
        while end + d <= len(s):
            w, end = s[end: end+d], end + d
            if w in words_dict:
                tmp[w] = tmp[w] + 1 if w in tmp else 1
                count += 1
                while tmp[w] > words_dict[w]:
                    tmp[s[begin: begin+d]] -= 1
                    begin += d
                    count -= 1
                if count == len(words):
                    rs.append(begin)
            else:
                begin, tmp, count = end, {}, 0
    return rs
```

### 问题4：找到字符串中所有字母异位词

给定一个字符串 $s$ 和一个非空字符串 $p$，找到 $s$ 中所有是 $p$ 的字母异位词的子串，返回这些子串的起始索引。

字符串只包含小写英文字母，并且字符串 $s$ 和 $p$ 的长度都不超过 20100。

说明：

- 字母异位词指字母相同，但排列不同的字符串。
- 不考虑答案输出的顺序。

示例 1:
```
输入:
s: "cbaebabacd" p: "abc"

输出:
[0, 6]

解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
```

 示例 2:
```
输入:
s: "abab" p: "ab"

输出:
[0, 1, 2]

解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。
```
> 题目来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/find-all-anagrams-in-a-string
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法

```python
def findAnagrams(s, p):
    rs = []
    dic = {} 
    for c in p:
        dic[c] = dic[c] + 1 if c in dic else 1
    counter = len(p)
    begin = end = 0
    while end < len(s):
        if s[end] in dic:
            dic[s[end]] -= 1
            if dic[s[end]] >= 0:
                counter -= 1
        end += 1
        while counter == 0:
            if end - begin == len(p):
                rs.append(begin)
            if s[begin] in dic:
                dic[s[begin]] += 1
                if dic[s[begin]] >= 1:
                    counter += 1
            begin += 1
    return rs
```

