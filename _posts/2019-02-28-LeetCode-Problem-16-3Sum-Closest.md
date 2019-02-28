---
title: LeetCode Problem 16-3Sum Closest
category: LeetCode
date: 2019-02-28
tag:
 - array
 - two pointers
 - medium
---

最接近的三数之和。给定一个包括 *n* 个整数的数组 `nums` 和 一个目标值 `target`。找出 `nums` 中的三个整数，使得它们的和与 `target` 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

```
例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
```

### 思路一

先将数组排序，然后把数组中的随机3个元素的和赋值给结果，与3SUM问题类似，依次选择每一个元素作为三元组的第一个元素，然后在该元素之后的子数组中寻找和最接近target的剩下两个元素。时间复杂度 $O(n^2)$。

```python
class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        nums.sort()
        rs = nums[0] + nums[1] + nums[2]
        for i in range(len(nums) - 1):
            l, r = i + 1, len(nums) - 1
            while l < r:
                tmp = nums[i] + nums[l] + nums[r]
                if tmp < target:
                    l += 1
                elif tmp > target:
                    r -= 1
                else:
                    return tmp
                if abs(tmp - target) < abs(rs - target):
                    rs = tmp
        return rs
```

### 相似问题

1. [3Sum](https://wendellgul.github.io/leetcode/2019/02/25/LeetCode-Problem-15-3Sum/)
2. [3Sum Smaller](https://leetcode.com/problems/3sum-smaller/)