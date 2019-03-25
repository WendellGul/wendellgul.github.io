---
title: LeetCode Problem 60-Permutation Sequence
category: LeetCode
date: 2019-03-25
tag:
 - math
 - backtracking
 - medium
---

**第k个排列**。给出集合 `[1,2,3,…,n]`，其所有元素共有 *n*! 种排列。

按大小顺序列出所有排列情况，并一一标记，当 *n* = 3 时, 所有排列如下：

1. `"123"`
2. `"132"`
3. `"213"`
4. `"231"`
5. `"312"`
6. `"321"`

给定 *n* 和 *k*，返回第 *k* 个排列。

<!-- more -->

**说明：**

- 给定 *n* 的范围是 [1, 9]。
- 给定 *k* 的范围是[1,  *n*!]。

**示例 1:**

```
输入: n = 3, k = 3
输出: "213"
```

**示例 2:**

```
输入: n = 4, k = 9
输出: "2314"
```

### 思路一

对于 $$n!$$ 来说，前 $$(n-1)!$$ 个数以 1 开头，接下来的 $$(n-1)!$$ 个数以2开头，以此类推，并且在每一个 $$(n-1)!$$ 里，开头的 $$(n-2)!$$ 以剩下的最小的数开头，等等。

```python
class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        nums = list(map(str, range(1, n+1)))
        # calculate (n-1)!
        factorial, rs = 1, ''
        for i in range(1, n):
            factorial *= i
        k = k - 1  # 因为 k 的范围是[1,n!]
        for i in range(n):
            idx = k // factorial
            k = k % factorial
            factorial = factorial // (n-i-1) if n-i-1 else 1
            rs += nums.pop(idx)
        return rs
```

### 相似问题

1. [Next Permutation](https://wendellgul.github.io/leetcode/2019/03/11/LeetCode-Problem-31-Next-Permutation/)
2. [Permutations](https://wendellgul.github.io/leetcode/2019/03/18/LeetCode-Problem-46-Permutations/)