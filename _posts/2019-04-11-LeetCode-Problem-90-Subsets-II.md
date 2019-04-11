---
title: LeetCode Problem 90-Subsets II
category: LeetCode
date: 2019-04-11
tag:
 - array
 - backtracking
 - medium
---

**子集 II**。给定一个可能包含重复元素的整数数组 ***nums***，返回该数组所有可能的子集（幂集）。

**说明：**解集不能包含重复的子集。

<!-- more -->

**示例:**

```
输入: [1,2,2]
输出:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
```

### 思路一

类似问题 [Subsets](https://wendellgul.github.io/leetcode/2019/03/28/LeetCode-Problem-78-Subsets/)，使用回溯法。

```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        def backtrack(tmp=[], start=0):
            rs.append(tmp)
            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i-1]:  # 去除重复
                    continue
                backtrack(tmp+[nums[i]], i+1)
        rs = []
        nums.sort()
        backtrack()
        return rs
```

### 相似问题

1. [Subsets](https://wendellgul.github.io/leetcode/2019/03/28/LeetCode-Problem-78-Subsets/)