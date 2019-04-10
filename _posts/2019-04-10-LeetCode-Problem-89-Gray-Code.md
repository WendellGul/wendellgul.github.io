---
title: LeetCode Problem 89-Gray Code
category: LeetCode
date: 2019-04-10
tag:
 - backtracking
 - medium
---

**格雷编码**。格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。

给定一个代表编码总位数的非负整数 *n*，打印其格雷编码序列。格雷编码序列必须以 0 开头。

<!-- more -->

**示例 1:**

```
输入: 2
输出: [0,1,3,2]
解释:
00 - 0
01 - 1
11 - 3
10 - 2

对于给定的 n，其格雷编码序列并不唯一。
例如，[0,2,3,1] 也是一个有效的格雷编码序列。

00 - 0
10 - 2
11 - 3
01 - 1
```

**示例 2:**

```
输入: 0
输出: [0]
解释: 我们定义格雷编码序列必须以 0 开头。
     给定编码总位数为 n 的格雷编码序列，其长度为 2^n。当 n = 0 时，长度为 2^0 = 1。
     因此，当 n = 0 时，其格雷编码序列为 [0]。
```

### 思路一

```python
class Solution:
    def grayCode(self, n: int) -> List[int]:
        '''
        from up to down, then left to right

        0   1   11  110
                10  111
                    101
                    100

        start:      [0]
        i = 0:      [0, 1]
        i = 1:      [0, 1, 3, 2]
        i = 2:      [0, 1, 3, 2, 6, 7, 5, 4]
        '''
        results = [0]
        for i in range(n):
            results += [x + (1<<i) for x in reversed(results)]
        return results
```

### 思路二

通过公式计算 $$G(i) = i \oplus (i/2)$$。

```python
class Solution:
    def grayCode(self, n: int) -> List[int]:
        rs = []
        for i in range(2**n):
            rs.append(i ^ (i>>1))
        return rs
```

### 相似问题

1. [1-bit and 2-bit Characters](https://leetcode.com/problems/1-bit-and-2-bit-characters/)