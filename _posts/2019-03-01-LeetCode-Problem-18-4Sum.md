---
title: LeetCode Problem 18-4Sum
category: LeetCode
date: 2019-03-01
tag:
 - array
 - hash table
 - two pointers
 - medium
---

四数之和。给定一个包含 *n* 个整数的数组 `nums` 和一个目标值 `target`，判断 `nums` 中是否存在四个元素 *a*，*b*，*c* 和 *d* ，使得 *a* + *b* + *c* + *d* 的值与 `target` 相等？找出所有满足条件且不重复的四元组。

**注意：**

答案中不可以包含重复的四元组。

**示例：**

```
给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```

### 思路一

与3SUM思路类似，将数组排序后，依次选择一个数作为四元组的第一个数，然后使用3SUM方法在其后面的子数组中寻找剩下的3个数，期间通过判断前后两个数是否相等来过滤相同的结果。时间复杂度 $O(n^3)$。

```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        if len(nums) < 4 or nums[0] * 4 > target or nums[-1] * 4 < target:
            return []
        rs = []
        for i in range(len(nums) - 3):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            for j in range(i + 1, len(nums) - 2):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue
                l, r = j + 1, len(nums) - 1
                while l < r:
                    if nums[i] + nums[j] + nums[l] + nums[r] == target:
                        rs.append([nums[i], nums[j], nums[l], nums[r]])
                        while l < r and nums[l] == nums[l + 1]:
                            l += 1
                        while l < r and nums[r] == nums[r - 1]:
                            r -= 1
                        l += 1
                        r -= 1
                    elif nums[i] + nums[j] + nums[l] + nums[r] < target:
                        l += 1
                    else:
                        r -= 1
        return rs
```

### 相似问题

1. [Two Sum](https://wendellgul.github.io/leetcode/2019/01/29/Leetcode-Problem-1-Two-Sum/)
2. [3Sum](https://wendellgul.github.io/leetcode/2019/02/25/LeetCode-Problem-15-3Sum/)
3. [4Sum II](https://leetcode.com/problems/4sum-ii/)