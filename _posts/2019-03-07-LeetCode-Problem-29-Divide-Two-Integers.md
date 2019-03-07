---
title: LeetCode Problem 29-Divide Two Integers
category: LeetCode
date: 2019-03-07
tag:
 - math
 - binary search
 - medium
---

两数相除。给定两个整数，被除数 `dividend` 和除数 `divisor`。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 `dividend` 除以除数 `divisor` 得到的商。

**示例 1:**

```
输入: dividend = 10, divisor = 3
输出: 3
```

**示例 2:**

```
输入: dividend = 7, divisor = -3
输出: -2
```

**说明:**

- 被除数和除数均为 32 位有符号整数。
- 除数不为 0。
- 假设我们的环境只能存储 32 位有符号整数，其数值范围是 $$[−2^{31},  2^{31} − 1]$$。本题中，如果除法结果溢出，则返回 $$2^{31} − 1$$。

### 思路一

通过移位操作，缩短做减法的次数。时间复杂度 $O(\log n)$。

```python
class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        if dividend == -2147483648 and divisor == -1:
            return 2147483647
        positive = (dividend < 0) is (divisor < 0)   # brilliant
        dividend, divisor = abs(dividend), abs(divisor)
        quotient = 0
        while dividend >= divisor:
            tmp, i = divisor, 1
            while dividend >= tmp:
                dividend -= tmp
                quotient += i
                i <<= 1
                tmp <<= 1
        return quotient if positive else -quotient
```