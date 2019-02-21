---
title: LeetCode Problem 7-Reverse Integer
category: LeetCode
date: 2019-02-21
tag:
 - math
 - easy
---

整数反转。

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

**示例 1:**

```
输入: 123
输出: 321
```

 **示例 2:**

```
输入: -123
输出: -321
```

**示例 3:**

```
输入: 120
输出: 21
```

**注意:**

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 $[−2^{31},  2^{31 − 1}]​$。请根据这个假设，如果反转后整数溢出那么就返回 0。

### 思路一

由于Python的整型不会溢出，所以直接通过比较可以判断溢出。

```python
class Solution:
    def reverse(self, x: 'int') -> 'int':
        rs, sign = 0, 1
        if x < 0:
            sign, x = -1, -x
        while x:
            r, x = x % 10, x // 10
            rs = rs * 10 + r
        rs *= sign
        if rs < -2 ** 31 or rs > 2 ** 31 -1:
            return 0
        return rs
```

在可以定义32位整型的语言中，可以使用下面的方式判断溢出：

```java
int newResult = rs * 10 + r;
if ((newResult - r) / 10 != rs) { 
	return 0;
}
```

### 思路二

先将整数转换成字符串，反转后再转换成整型。

```python
class Solution:
    def reverse(self, x: 'int') -> 'int':
        sign = 1
        if x < 0:
            sign, x = -1, -x
        rs = int(str(x)[::-1])
        return (rs < 2 ** 31) * sign * rs
```

### 相似问题

1. [String to Integer (atoi)]()
2. [Reverse Bits]()