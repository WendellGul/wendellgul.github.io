---
title: LeetCode Problem 15-3Sum
category: LeetCode
date: 2019-02-25
tag:
 - array
 - two pointers
 - medium
---

三数之和。给定一个包含 *n* 个整数的数组 `nums`，判断 `nums` 中是否存在三个元素 *a，b，c ，*使得 *a + b + c =* 0 ？找出所有满足条件且不重复的三元组。

**注意：**答案中不可以包含重复的三元组。

```
例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

### 思路一

先将数组排序，然后依次选择一个数作为三元组的第一个数，然后使用2SUM在其后面的子数组中寻找剩下的两个数。期间通过判断前后两个数是否相等来过滤掉相同的结果。时间复杂度 $O(n^2)$。

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        rs = []
        for i in range(len(nums) - 2):
            if (i == 0 or (i > 0 and nums[i] != nums[i - 1])) and nums[i] <= 0:
                l, r = i + 1, len(nums) - 1
                while l < r:
                    if nums[l] + nums[r] > -nums[i]:
                        r -= 1
                    elif nums[l] + nums[r] < -nums[i]:
                        l += 1
                    else:
                        rs.append([nums[i], nums[l], nums[r]])
                        while l < r and nums[l] == nums[l + 1]:
                            l += 1
                        while l < r and nums[r] == nums[r - 1]:
                            r -= 1
                        l += 1
                        r -= 1
        return rs
```

### 相似问题

1. [Two Sum](https://wendellgul.github.io/leetcode/2019/01/29/Leetcode-Problem-1-Two-Sum/)
2. [3Sum Closest](https://leetcode.com/problems/3sum-closest/)
3. [4Sum](https://leetcode.com/problems/4sum/)
4. [3Sum Smaller](https://leetcode.com/problems/3sum-smaller/)