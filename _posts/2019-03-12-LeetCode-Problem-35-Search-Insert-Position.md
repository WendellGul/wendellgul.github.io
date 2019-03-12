---
title: LeetCode Problem 35-Search Insert Position
category: LeetCode
date: 2019-03-12
tag:
 - array
 - binary search
 - easy
---

搜索插入位置。给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

**示例 1:**

```
输入: [1,3,5,6], 5
输出: 2
```

**示例 2:**

```
输入: [1,3,5,6], 2
输出: 1
```

**示例 3:**

```
输入: [1,3,5,6], 7
输出: 4
```

**示例 4:**

```
输入: [1,3,5,6], 0
输出: 0
```

### 思路一

通过二分查找，如果没有找到，当 `target > nums[l]` 时，则返回 `l + 1`，否则返回 `l`。时间复杂度 $O(\log n)$，空间复杂度 $O(1)$。

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            mid = (l + r) // 2
            if nums[mid] < target:
                l = mid + 1
            elif nums[mid] > target:
                r = mid - 1
            else:
                return mid
        return l + 1 if nums[l] < target else l
```

### 相似问题

1. [First Bad Version](https://leetcode.com/problems/first-bad-version/)