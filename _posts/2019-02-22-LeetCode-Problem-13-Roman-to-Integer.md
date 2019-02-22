---
title: LeetCode Problem 13-Roman to Integer
category: LeetCode
date: 2019-02-22
tag:
 - math
 - string
 - easy
---

罗马数字转整数。罗马数字包含以下七种字符: `I`， `V`， `X`， `L`，`C`，`D` 和 `M`。

```
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

例如， 罗马数字 2 写做 `II` ，即为两个并列的 1。12 写做 `XII` ，即为 `X` + `II` 。 27 写做  `XXVII`, 即为 `XX` + `V` + `II` 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 `IX`。这个特殊的规则只适用于以下六种情况：

- `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
- `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。 
- `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

**示例 1:**

```
输入: "III"
输出: 3
```

**示例 2:**

```
输入: "IV"
输出: 4
```

**示例 3:**

```
输入: "IX"
输出: 9
```

**示例 4:**

```
输入: "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.
```

**示例 5:**

```
输入: "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```

### 思路一

```python
class Solution:
    def romanToInt(self, s: 'str') -> 'int':
        r2i = {
            'I': 1,
            'IV': 4,
            'V': 5,
            'IX': 9,
            'X': 10,
            'XL': 40,
            'L': 50,
            'XC': 90,
            'C': 100,
            'CD': 400,
            'D': 500,
            'CM': 900,
            'M': 1000
        }
        i = rs = 0
        while i < len(s):
            if i < len(s) - 1 and \
                (s[i] is 'I' and (s[i+1] is 'V' or s[i+1] is 'X') or \
                s[i] is 'X' and (s[i+1] is 'L' or s[i+1] is 'C') or \
                s[i] is 'C' and (s[i+1] is 'D' or s[i+1] is 'M')):
                rs += r2i[s[i:i+2]]
                i += 2
            else:
                rs += r2i[s[i]]
                i += 1
        return rs
```

### 思路二

通过比较比较大小而不是比较罗马字符来判断特例。

```python
class Solution:
    def romanToInt(self, s: 'str') -> 'int':
        r2i = {
            'I': 1,
            'V': 5,
            'X': 10,
            'L': 50,
            'C': 100,
            'D': 500,
            'M': 1000
        }
        i, rs = 0, r2i[s[-1]]
        for i in range(len(s) - 1):
            if r2i[s[i]] < r2i[s[i+1]]:
                rs -= r2i[s[i]]
            else:
                rs += r2i[s[i]]
        return rs
```

### 相似问题

1. [Integer to Roman](https://wendellgul.github.io/leetcode/2019/02/22/LeetCode-Problem-12-Integer-to-Roman/)