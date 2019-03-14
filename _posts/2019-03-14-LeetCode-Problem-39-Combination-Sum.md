---
title: LeetCode Problem 39-Combination Sum
category: LeetCode
date: 2019-03-14
tag:
 - array
 - backtracking
 - medium
---

组合总和。给定一个**无重复元素**的数组 `candidates` 和一个目标数 `target` ，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

`candidates` 中的数字可以无限制重复被选取。

**说明：**

- 所有数字（包括 `target`）都是正整数。
- 解集不能包含重复的组合。 

**示例 1:**

```
输入: candidates = [2,3,6,7], target = 7,
所求解集为:
[
  [7],
  [2,2,3]
]
```

**示例 2:**

```
输入: candidates = [2,3,5], target = 8,
所求解集为:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

### 思路一

回溯法。

```python
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        def backtrack(result, tmp_list, nums, remain, start):
            if remain < 0:
                return
            if remain == 0:
                result.append(tmp_list)
                return
            for i in range(start, len(nums)):
                # 下一次 start 参数为 i 因为可以重复
                backtrack(result, tmp_list + [nums[i]], nums, remain - nums[i], i)
        
        rs = []
        backtrack(rs, [], candidates, target, 0)
        return rs
```

### 相似问题

1. [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)
2. [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)
3. [Combinations](https://leetcode.com/problems/combinations/)
4. [Combination Sum III](https://leetcode.com/problems/combination-sum-iii/)
5. [Factor Combinations](https://leetcode.com/problems/factor-combinations/)
6. [Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/)