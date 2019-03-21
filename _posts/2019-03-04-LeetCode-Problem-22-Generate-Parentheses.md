---
title: LeetCode Problem 22-Generate Parentheses
category: LeetCode
date: 2019-03-04
tag:
 - string
 - backtracking
 - medium
---

括号生成。给出 *n* 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且**有效的**括号组合。

例如，给出 *n* = 3，生成结果为：

```
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

<!-- more -->

### 思路一

穷举法，遍历 $2^{2n}$ 个可能的组合，判断有效的组合。时间复杂度 $O(n2^{2n})$。

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        def generate(s, l):
            if l == 0:
                if valid(s):
                    rs.append(s)
            else:
                generate(s + '(', l - 1)
                generate(s + ')', l - 1)
        
        def valid(s):
            count = 0
            for c in s:
                if c == '(':
                    count += 1
                else:
                    count -= 1
                if count < 0:
                    return False
            if count > 0:
                return False
            return True
        
        rs = []
        generate('', 2 * n)
        return rs
```

可以进行剪枝，提前终止。

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        def generate(s, length, count):
            if count < 0 or (length == 0 and count > 0):
                return
            elif length == 0 and count == 0:
                rs.append(s)
            else:
                generate(s + '(', length - 1, count + 1)
                generate(s + ')', length - 1, count - 1)
        
        rs = []
        generate('', 2 * n, 0)
        return rs
```

### 思路二

回溯法，通过记录 `(` 和 `)` 放置的数量，与思路一每次都放一个 `(` 或 `)` 不同的是，这里当 `(` 的数目小于总数目时，就可以放置一个 `(`；当 `)` 的数目小于 `(` 的数目时，就可以放置一个 `)`。

时间复杂度取决于最终正确的结果中的括号的数目，计算得 $$\frac{1}{n+1} \binom{2n}{n}$$，其上界约为 $\frac{4^n}{n\sqrt{n}}$。故时间复杂度为 $O(\frac{4^n}{\sqrt{n}})$，空间复杂度 $O(n)$。

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        def generate(s='', left=0, right=0):
            if left == right == n:
                rs.append(s)
            else:
                if left < n:
                    generate(s + '(', left + 1, right)
                if right < left:
                    generate(s + ')', left, right + 1)
        
        rs = []
        generate()
        return rs
```

### 相似问题

1. [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)
2. [Valid Parentheses](https://wendellgul.github.io/leetcode/2019/03/01/LeetCode-Problem-20-Valid-Parentheses/)