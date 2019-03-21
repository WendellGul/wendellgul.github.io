---
title: LeetCode Problem 34-Find First and Last Position of Element in Sorted Array
category: LeetCode
date: 2019-03-12
tag:
 - array
 - binary search
 - medium
---

在排序数组中查找元素的第一个和最后一个位置。给定一个按照升序排列的整数数组 `nums`，和一个目标值 `target`。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 *O*(log *n*) 级别。

如果数组中不存在目标值，返回 `[-1, -1]`。

**示例 1:**

```
输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
```

**示例 2:**

```
输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]
```

<!-- more -->

### 思路一

首先通过二分查找找到起始位置：

1. 如果 `nums[mid] < target`，则表示起始位置在 `mid` 的右边 `l = mid + 1`；
2. 如果 `nums[mid] > target`，则表示起始位置在 `mid` 的左边 `h = mid - 1`；
3. 如果 `nums[mid] = target`，则表示起始位置就在 `mid (h = mid)` 或者在 `mid` 的左边

故 2 和 3 可以合并，即当 `nums[mid] >= target` 时，`h = mid`。

然后通过二分查找找到终止位置，方法与上述类似。

时间复杂度 $O(\log n)$，空间复杂度 $O(1)$。

```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        if len(nums) == 0:
            return [-1, -1]
        rs, l, h = [-1, -1], 0, len(nums) - 1
        while l < h:
            mid = (l + h) // 2
            if nums[mid] < target:
                l = mid + 1
            else:
                h = mid
        if nums[l] != target:
            return rs
        rs[0] = l
        h = len(nums) - 1  # 不用设置 l = 0
        while l < h:
            mid = (l + h) // 2 + 1   # 此处加1防止死循环
            if nums[mid] > target:
                h = mid - 1
            else:
                l = mid
        rs[1] = h
        return rs
```

### 相似问题

1. [First Bad Version](https://leetcode.com/problems/first-bad-version/)