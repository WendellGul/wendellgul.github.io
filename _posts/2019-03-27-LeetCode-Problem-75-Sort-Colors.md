---
title: LeetCode Problem 75-Sort Colors
category: LeetCode
date: 2019-03-27
tag:
 - array
 - two pointers
 - sort
 - medium
---

**颜色分类**。给定一个包含红色、白色和蓝色，一共 *n* 个元素的数组，**原地**对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

<!-- more -->

**注意:**
不能使用代码库中的排序函数来解决这道题。

**示例:**

```
输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
```

**进阶：**

- 一个直观的解决方案是使用计数排序的两趟扫描算法。
  首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
- 你能想出一个仅使用常数空间的一趟扫描算法吗？

### 思路一

通过计数排序解决，需要两次遍历。时间复杂度 $$O(n)$$，空间复杂度 $$O(1)$$。

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        count = [0] * 3
        for n in nums:
            count[n] += 1
        nums.clear()
        for i in range(3):
            nums += [i] * count[i]
```

### 思路二

一次遍历，通过两个指针分别标记 `0` 的位置和 `2` 的位置。时间复杂度 $$O(n)$$，空间复杂度 $$O(1)$$。

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        pos0, pos2 = 0, len(nums) - 1
        i = 0
        while i <= pos2:
            if nums[i] == 0:
                nums[i], nums[pos0] = nums[pos0], nums[i]
                pos0 += 1
            elif nums[i] == 2:
                nums[i], nums[pos2] = nums[pos2], nums[i]
                i, pos2 = i - 1, pos2 - 1  # 重新判断第 i 个数
            i += 1
```

### 相似问题

1. [Sort List](https://leetcode.com/problems/sort-list/)
2. [Wiggle Sort](https://leetcode.com/problems/wiggle-sort/)
3. [Wiggle Sort II](https://leetcode.com/problems/wiggle-sort-ii/)