---
title: LeetCode Problem 17-Letter Combinations of a Phone Number
category: LeetCode
date: 2019-02-28
tag:
 - string
 - backtracking
 - medium
---

电话号码的字母组合。给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![img](http://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)

**示例:**

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

**说明:**
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

<!-- more -->

### 思路一

通过回溯法遍历所有的可能情况，深度优先遍历。时间复杂度 $$O(3^N\times 4^M)$$，空间复杂度 $O(3^N \times 4^M)$，其中 $N$ 是能够映射成3个字符的数字的数目，$M$ 是能够映射成4个字符的数字的数目。

```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        phone = {
            '2': ['a', 'b', 'c'],
            '3': ['d', 'e', 'f'],
            '4': ['g', 'h', 'i'],
            '5': ['j', 'k', 'l'],
            '6': ['m', 'n', 'o'],
            '7': ['p', 'q', 'r', 's'],
            '8': ['t', 'u', 'v'],
            '9': ['w', 'x', 'y', 'z']
        }
        
        def backtrack(rs, next_digits):
            if len(next_digits) == 0:
                result.append(rs)
            else:
                for letter in phone[next_digits[0]]:
                    backtrack(rs + letter, next_digits[1:])
                    
        result = []
        if digits:
            backtrack('', digits)
        return result
```

### 思路二

广度优先遍历，将答案保存成一个FIFO的队列。时间复杂度 $$O(3^N \times 4^M)$$，空间复杂度 $O(M + N)$。

```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        phone = {
            '2': ['a', 'b', 'c'],
            '3': ['d', 'e', 'f'],
            '4': ['g', 'h', 'i'],
            '5': ['j', 'k', 'l'],
            '6': ['m', 'n', 'o'],
            '7': ['p', 'q', 'r', 's'],
            '8': ['t', 'u', 'v'],
            '9': ['w', 'x', 'y', 'z']
        }
        if len(digits) == 0:
            return []
        result = ['']
        while len(result[0]) != len(digits):
            tmp = result.pop(0)
            for letter in phone[digits[len(tmp)]]:
                result.append(tmp + letter)
        return result
```

### 相似问题

1. [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)
2. [Combination Sum](https://leetcode.com/problems/combination-sum/)
3. [Binary Watch](https://leetcode.com/problems/binary-watch/)