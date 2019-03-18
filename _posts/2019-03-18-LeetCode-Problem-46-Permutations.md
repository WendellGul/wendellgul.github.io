---
title: LeetCode Problem 46-Permutations
category: LeetCode
date: 2019-03-18
tag:
 - backtracking
 - medium
---

**全排列**。给定一个**没有重复**数字的序列，返回其所有可能的全排列。

**示例:**

```
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

### 思路一

回溯法。

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        def backtrack(result, tmp, nums):
            if len(tmp) == len(nums):
                result.append(tmp)
                return
            for i in range(0, len(nums)):
                if nums[i] in tmp:
                    continue
                backtrack(result, tmp+[nums[i]], nums)
        result = []
        backtrack(result, [], nums)
        return result
```

### 思路二

回溯法的另一种写法，省去了判断元素是否存在的过程。

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        def backtrack(result, tmp, nums):
            if len(nums) == 0:
                result.append(tmp)
                return
            for i in range(0, len(nums)):
                backtrack(result, tmp+[nums[i]], nums[:i]+nums[i+1:])
        result = []
        backtrack(result, [], nums)
        return result
```

### 相似问题

1. [Next Permutation](https://leetcode.com/problems/next-permutation/)
2. [Permutations II](https://wendellgul.github.io/leetcode/2019/03/18/LeetCode-Problem-47-Permutations-II/)
3. [Permutation Sequence](https://leetcode.com/problems/permutation-sequence/)
4. [Combinations](https://leetcode.com/problems/combinations/)