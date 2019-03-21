---
title: LeetCode Problem 33-Search in Rotated Sorted Array
category: LeetCode
date: 2019-03-12
tag:
 - array
 - binary search
 - medium
---

搜索旋转排序数组。假设按照升序排序的数组在预先未知的某个点上进行了旋转。( 例如，数组 `[0,1,2,4,5,6,7]` 可能变为 `[4,5,6,7,0,1,2]` )。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 `-1` 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 *O*(log *n*) 级别。

**示例 1:**

```
输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
```

**示例 2:**

```
输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1
```

<!-- more -->

### 思路一

如果 `nums[mid]` 和 `target` 与 `nums[0]` 在同一边，可以直接进行二分法，否则，需要判断 `target` 的具体方向。时间复杂度 $$O(\log n)$$。

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, h = 0, len(nums)
        while l < h:
            m = (l + h) // 2
            if target == nums[m]:
                return m
            elif target < nums[0] < nums[m]:  # target本应在nums[m]的左边，却出现在右边
                l = m + 1
            elif target >= nums[0] > nums[m]:  # target本应在nums[m]的右边，却出现在左边
                h = m
            elif target > nums[m]:
                l = m + 1
            else:
                h = m
        return -1
```

### 相似问题

1. [Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/)
2. [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)