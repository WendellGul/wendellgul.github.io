---
title: LeetCode Problem 40-Combination Sum II
category: LeetCode
date: 2019-03-14
tag:
 - array
 - backtracking
 - medium
---

组合总和 II。给定一个数组 `candidates` 和一个目标数 `target` ，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

`candidates` 中的每个数字在每个组合中只能使用一次。

**说明：**

- 所有数字（包括目标数）都是正整数。
- 解集不能包含重复的组合。 

**示例 1:**

```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
```

**示例 2:**

```
输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]
```

### 思路一

回溯法。首先进行排序，方便处理重复。

```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        def backtrack(result, tmp_list, nums, remain, start):
            if remain < 0:
                return
            if remain == 0:
                result.append(tmp_list)
                return
            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i - 1]:
                    continue
                # 下一个处理的是 i + 1
                backtrack(result, tmp_list+[nums[i]], nums, remain-nums[i], i+1)
        
        rs = []
        candidates.sort()  # 方便处理重复问题
        backtrack(rs, [], candidates, target, 0)
        return rs
```

### 相似问题

1. [Combination Sum](https://wendellgul.github.io/leetcode/2019/03/14/LeetCode-Problem-39-Combination-Sum/)