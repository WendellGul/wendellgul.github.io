---
title: LeetCode Problem 47-Permutations II
category: LeetCode
date: 2019-03-18
tag:
 - backtracking
 - medium
---

**全排列 II**。给定一个可包含重复数字的序列，返回所有不重复的全排列。

**示例:**

```
输入: [1,1,2]
输出:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```

<!-- more -->

### 思路一

回溯法。

```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        def backtrack(result, tmp, nums, used):
            if len(tmp) == len(nums):
                result.append(tmp)
                return
            for i in range(len(nums)):
                if used[i]:
                    continue
                if i > 0 and nums[i] == nums[i-1] and used[i-1]:
                    return
                used[i] = True
                backtrack(result, tmp+[nums[i]], nums, used)
                used[i] = False
        result = []
        nums.sort()
        backtrack(result, [], nums, [False] * len(nums))
        return result
```

### 相似问题

1. [Next Permutation](https://leetcode.com/problems/next-permutation/)
2. [Permutations](https://wendellgul.github.io/leetcode/2019/03/18/LeetCode-Problem-46-Permutations/)
3. [Palindrome Permutation II](https://leetcode.com/problems/palindrome-permutation-ii/)
4. [Number of Squareful Arrays](https://leetcode.com/problems/number-of-squareful-arrays/)