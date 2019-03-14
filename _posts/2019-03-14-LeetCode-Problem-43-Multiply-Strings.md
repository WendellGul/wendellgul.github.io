---
title: LeetCode Problem 43-Multiply Strings
category: LeetCode
date: 2019-03-14
tag:
 - math
 - string
 - medium
---

**字符串相乘**。给定两个以字符串形式表示的非负整数 `num1` 和 `num2`，返回 `num1` 和 `num2` 的乘积，它们的乘积也表示为字符串形式。

**示例 1:**

```
输入: num1 = "2", num2 = "3"
输出: "6"
```

**示例 2:**

```
输入: num1 = "123", num2 = "456"
输出: "56088"
```

**说明：**

1. `num1` 和 `num2` 的长度小于110。
2. `num1` 和 `num2` 只包含数字 `0-9`。
3. `num1` 和 `num2` 均不以零开头，除非是数字 0 本身。
4. **不能使用任何标准库的大数类型（比如 BigInteger）**或**直接将输入转换为整数来处理**。

### 思路一

按每一位相乘，需要注意的是每次的乘积在结果中的位置。

```python 
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        rs = [0] * (len(num1) + len(num2))
        pos = len(rs) - 1
        for i in range(len(num1) - 1, -1, -1):
            tmp_pos = pos
            for j in range(len(num2) - 1, -1, -1):
                rs[tmp_pos] += int(num1[i]) * int(num2[j])
                rs[tmp_pos - 1] += rs[tmp_pos] // 10
                rs[tmp_pos] %= 10
                tmp_pos -= 1
            pos -= 1
        
        p = 0  # 找到第一个非 0 的位置
        while p < len(rs) - 1 and rs[p] == 0:
            p += 1
        return ''.join(map(str, rs[p:]))
```

### 相似问题

1. [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)
2. [Plus One](https://leetcode.com/problems/plus-one/)
3. [Add Binary](https://leetcode.com/problems/add-binary/)
4. [Add Strings](https://leetcode.com/problems/add-strings/)