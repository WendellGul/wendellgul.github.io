---
title: LeetCode Problem 49-Group Anagrams
category: LeetCode
date: 2019-03-18
tag:
 - hash yable
 - string
 - medium
---

**字母异位词分组**。给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

**示例:**

```
输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

**说明：**

- 所有输入均为小写字母。
- 不考虑答案输出的顺序。

### 思路一

使用哈希表，因为同组的字母异位词排序后都是一样的，所以将排序之后的 `tuple` 作为哈希表的 `key`， `value` 为字母异位词的 `list`。

时间复杂度为 $O(N K\log K)​$，$$N​$$ 为 `strs` 的长度，$$K​$$ 为 `strs` 中的字符串的最大长度。

```python
import collections

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        result = collections.defaultdict(list)
        for s in strs:
            result[tuple(sorted(s))].append(s)
        return list(result.values())
```

### 思路二

两个字符串是字母异位词，当且仅当他们中出现的字符的数目都相同。将每个字符串各个字符出现的次数作为哈希表的 `key`，这里设置为长度为 26 的 `tuple`，`value` 为字母异位词的 `list`。

时间复杂度 $O(NK)$，$$N$$ 为 `strs` 的长度，$$K$$ 为 `strs` 中的字符串的最大长度。

```python
import collections

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        result = collections.defaultdict(list)
        for s in strs:
            count = [0] * 26
            for c in s:
                count[ord(c) - ord('a')] += 1
            result[tuple(count)].append(s)
        return list(result.values())
```

### 相似问题

1. [Valid Anagram](https://leetcode.com/problems/valid-anagram/)
2. [Group Shifted Strings](https://leetcode.com/problems/group-shifted-strings/)