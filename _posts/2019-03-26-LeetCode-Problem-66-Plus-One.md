---
title: LeetCode Problem 66-Plus One
category: LeetCode
date: 2019-03-26
tag:
 - array
 - easy
---

**加一**。给定一个由**整数**组成的**非空**数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储一个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

**示例 1:**

```
输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
```

**示例 2:**

```
输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
```

<!-- more -->

### 思路一

```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in range(len(digits) - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits  # 直接返回
            digits[i] = 0
        rs = [0] * (len(digits) + 1)
        rs[0] = 1
        return rs
```

### 相似问题

1. [Multiply Strings](https://leetcode.com/problems/multiply-strings/)
2. [Add Binary](https://leetcode.com/problems/add-binary/)
3. [Plus One Linked List](https://leetcode.com/problems/plus-one-linked-list/)
4. [Add to Array-Form of Integer](https://leetcode.com/problems/add-to-array-form-of-integer/)