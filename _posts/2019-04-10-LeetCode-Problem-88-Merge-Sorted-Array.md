---
title: LeetCode Problem 88-Merge Sorted Array
category: LeetCode
date: 2019-04-10
tag:
 - array
 - two pointers
 - easy
---

**合并两个有序数组**。给定两个有序整数数组 *nums1* 和 *nums2*，将 *nums2* 合并到 *nums1* 中*，*使得 *num1* 成为一个有序数组。

**说明:**

- 初始化 *nums1* 和 *nums2* 的元素数量分别为 *m* 和 *n*。
- 你可以假设 *nums1* 有足够的空间（空间大小大于或等于 *m + n*）来保存 *nums2* 中的元素。

<!-- more -->

**示例:**

```
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
```

### 思路一

从数组后面向前填充。时间复杂度 $$O(n)$$。

```python
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        i = m + n - 1
        while m >= 1 and n >= 1:
            if nums1[m-1] > nums2[n-1]:
                nums1[i] = nums1[m-1]
                i, m = i-1, m-1
            else:
                nums1[i] = nums2[n-1]
                i, n = i-1, n-1
        while m >= 1:
            nums1[i] = nums1[m-1]
            i, m = i-1, m-1
        while n >= 1:
            nums1[i] = nums2[n-1]
            i, n = i-1, n-1
```

### 思路二

简单写法。

```python
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        while m > 0 and n > 0:
            if nums1[m-1] > nums2[n-1]:
                nums1[m+n-1] = nums1[m-1]
                m -= 1
            else:
                nums1[m+n-1] = nums2[n-1]
                n -= 1
        if n > 0:
            nums1[:n] = nums2[:n]
```

### 相似问题

1. [Merge Two Sorted Lists](https://wendellgul.github.io/leetcode/2019/03/01/LeetCode-Problem-21-Merge-Two-Sorted-Lists/)
2. [Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/)
3. [Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/)