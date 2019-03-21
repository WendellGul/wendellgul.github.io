---
title: LeetCode Problem 9-Palindrome Number
category: LeetCode
date: 2019-02-21
tag:
 - math
 - easy
---

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

**示例 1:**

```
输入: 121
输出: true
```

**示例 2:**

```
输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```

**示例 3:**

```
输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
```

<!-- more -->

### 思路一

将整数反转，然后比较反转之后的数与原数是否相等。

需要注意反转时是否溢出。

```python
class Solution:
    def isPalindrome(self, x: 'int') -> 'bool':
        if x < 0 or (x != 0 and x % 10 == 0):
            return False
        r, t = 0, x
        while t:
            r = r * 10 + t % 10
            t = t // 10
        return x == r
```

### 思路二

将整数反转一半，比较两半是否相等。此方法不会溢出。

```python
class Solution:
    def isPalindrome(self, x: 'int') -> 'bool':
        if x < 0 or (x != 0 and x % 10 == 0):
            return False
        r = 0
        while x > r:
            r = r * 10 + x % 10
            x = x // 10
        return x == r or x == r // 10
```

### 相似问题

1. [Palindrome Linked List]()