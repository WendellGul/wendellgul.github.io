---
title: LeetCode Problem 78-Subsets
category: LeetCode
date: 2019-03-28
tag:
 - array
 - backtracking
 - bit manipulation
 - medium
---

**子集**。给定一组**不含重复元素**的整数数组 *nums*，返回该数组所有可能的子集（幂集）。

**说明：**解集不能包含重复的子集。

<!-- more -->

**示例:**

```
输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

### 思路一

回溯法。

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        def backtrack(tmp=[], start=0):
            rs.append(tmp)
            for i in range(start, len(nums)):
                backtrack(tmp + [nums[i]], i+1)
        rs = []
        backtrack()
        return rs
```

### 思路二

通过位操作，遍历 $$2^n$$ 个二进制表示的数，值为 1 的位置所对应的元素添加进子集中。

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        rs = []
        for i in range(2 ** len(nums)):
            tmp, k = [], 0
            while i >> k:
                if i & 1 << k:
                    tmp.append(nums[k])
                k += 1
            rs.append(tmp)
        return rs
```

### 相似问题

1. [Subsets II](https://leetcode.com/problems/subsets-ii/)
2. [Generalized Abbreviation](https://leetcode.com/problems/generalized-abbreviation/)
3. [Letter Case Permutation](https://leetcode.com/problems/letter-case-permutation/)