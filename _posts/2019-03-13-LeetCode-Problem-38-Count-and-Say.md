---
title: LeetCode Problem 38-Count and Say
category: LeetCode
date: 2019-03-13
tag:
 - string
 - easy
---

报数。报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

```
1.     1
2.     11
3.     21
4.     1211
5.     111221
```

初始值第一行是 1。
第二行读第一行，1 个 1，去掉个字，所以第二行就是 11。
第三行读第二行，2 个 1，去掉个字，所以第三行就是 21。
第四行读第三行，1 个 2，1 个 1，去掉所有个字，所以第四行就是 1211。
第五行读第四行，1 个 1，1 个 2，2 个 1，去掉所有个字，所以第五航就是 111221。
第六行读第五行，3 个 1，2 个 2，1 个 1，去掉所以个字，所以第六行就是 312211。

给定一个正整数 *n*（1 ≤ *n* ≤ 30），输出报数序列的第 *n* 项。

注意：整数顺序将表示为一个字符串。

**示例 1:**

```
输入: 1
输出: "1"
```

**示例 2:**

```
输入: 4
输出: "1211"
```

### 思路一

```python
class Solution:
    def countAndSay(self, n: int) -> str:
        cur = '1'
        for i in range(1, n):
            pre, cur = cur, ''
            count, say = 1, pre[0]
            for j in range(1, len(pre)):
                if pre[j] != say:
                    cur = cur + str(count) + say
                    count, say = 1, pre[j]
                else:
                    count += 1
            cur = cur + str(count) + say
        return cur
```

### 相似问题

1. [Encode and Decode Strings](https://leetcode.com/problems/encode-and-decode-strings/)
2. [String Compression](https://leetcode.com/problems/string-compression/)