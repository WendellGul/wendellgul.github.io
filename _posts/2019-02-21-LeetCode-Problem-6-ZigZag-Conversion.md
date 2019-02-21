---
title: LeetCode Problem 6-ZigZag Conversion
categoty: LeetCode
date: 2019-02-21
tag:
 - string
 - medium
---

Z 字形变换。

将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 `"LEETCODEISHIRING"` 行数为 3 时，排列如下：

```
L   C   I   R
E T O E S I I G
E   D   H   N
```

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如：`"LCIRETOESIIGEDHN"`。

请你实现这个将字符串进行指定行数变换的函数：

```
string convert(string s, int numRows);
```

**示例 1:**

```
输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"
```

**示例 2:**

```
输入: s = "LEETCODEISHIRING", numRows = 4
输出: "LDREOEIIECIHNTSG"
解释:

L     D     R
E   O E   I I
E C   I H   N
T     S     G
```

### 思路一

使用`numRows`个数组来保存每一行的字符，`idx`用来指示该字符应该存入哪一个数组，`step`表示下一个字符对应的`idx`的变化。时间复杂度 $O(n)$。

需要注意的是`numRows = 1`和`numRows >= len(s)`的情况。

```python
class Solution:
    def convert(self, s: 'str', numRows: 'int') -> 'str':
        if numRows == 1 or numRows >= len(s):
            return s
        rs = [''] * numRows
        idx, step = 0, 1
        for c in s:
            rs[idx] += c
            if idx == 0:
                step = 1
            elif idx == numRows - 1:
                step = -1
            idx += step
        return ''.join(rs)
```

### 思路二

找出 Z 字型变换的模式。`Δ`为每一行中两个数的间隔。

```
/*n=numRows
Δ=2n-2,0  1                           2n-1                         4n-3
Δ=2n-4,2  2                     2n-2  2n                    4n-4   4n-2
Δ=2n-6,4  3               2n-3        2n+1              4n-5       .
Δ=.       .           .               .               .            .
Δ=.       .       n+2                 .           3n               .
Δ=2,2n-4  n-1 n+1                     3n-3    3n-1                 5n-5
Δ=0,2n-2  n                           3n-2                         5n-4
*/
```

```python
class Solution:
    def convert(self, s: 'str', numRows: 'int') -> 'str':
        if numRows == 1 or numRows >= len(s):
            return s
        rs = ''
        for i in range(numRows):
            step1 = 2 * (numRows - i - 1)
            step2 = 2 * i
            idx = i
            if idx < len(s): 
                rs += s[idx]
            while True:
                idx += step1
                if idx >= len(s): break
                if step1:
                    rs += s[idx]
                idx += step2
                if idx >= len(s): break
                if step2:
                    rs += s[idx]
        return rs
```



