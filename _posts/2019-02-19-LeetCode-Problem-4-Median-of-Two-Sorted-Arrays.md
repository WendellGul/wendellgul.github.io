---
title: LeetCode Problem 4-Median of Two Sorted Arrays
category: LeetCode
date: 2019-02-19
tag:
 - array
 - binary search
 - divide and conquer
---

寻找两个有序数组的中位数。

给定两个大小为 m 和 n 的有序数组 `nums1` 和 `nums2`。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 `nums1` 和 `nums2` 不会同时为空。

**示例 1:**

```
nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0
```

**示例 2:**

```
nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5
```

### 思路一

找两个有序数组的中位数，实际上就是找到两个数组中第 $\frac{m + n}{2}$ 大的数。找到两个有序数组 $a, b$ 中第 $k$（从0计起） 大的数的流程如下：

1. 当 $a$ 或 $b$ 为空时，直接返回 $b[k]$ 或 $a[k]$；
2. 分别取 $a$ 和 $b$ 的中位数 $m_a$ 和 $m_b$，以及对应下标 $l_a$ 和 $l_b$；
3. 当 $l_a + l_b < k$ 时，说明 $a$ 和 $b$ 中其中一个数组的左边一半不含第 $k$ 个数，如果$m_a < m_b$，说明 $a$ 的左边一半（包含$a[l_a]$）不含第 $k$ 个数，即可以剔除 $l_a + 1$ 个数，然后在有序数组 $a[l_a+1:]$ 和 $b$ 中寻找第 $k-l_a-1$ 大的数；如果 $m_a \ge m_b$，说明 $b$ 的左边一半（包含$b[l_b]$）不含第 $k$ 个数，即可以剔除 $l_b + 1$ 个数，然后在有序数组 $a$ 和 $b[l_b+1:]$ 中寻找第 $k-l_b-1$ 大的数；
4. 当 $l_a + l_b \ge k$ 时，说明 $a$ 和 $b$ 中其中一个数组的右边一半不含第 $k$ 个数，如果$m_a < m_b$，说明 $b$ 的右边一半不含第 $k$ 个数，即可以剔除 $l_b$ 个数，然后在有序数组 $a$ 和 $b[:l_b]$ 中寻找第 $k$ 大的数；如果 $m_a \ge m_b$，说明 $a$ 的右边一半不含第 $k$ 个数，即可以剔除 $l_a$ 个数，然后在有序数组 $a[:l_a]$ 和 $b$ 中寻找第 $k$ 大的数。

```python
class Solution:
    def findMedianSortedArrays(self, nums1: 'List[int]', nums2: 'List[int]') -> 'float':
        def findk(a, b, k):
            if not a:
                return b[k]
            if not b:
                return a[k]
            l1, l2 = len(a) // 2, len(b) // 2
            m1, m2 = a[l1], b[l2]
            if l1 + l2 < k:
                if m1 < m2:
                    return findk(a[l1 + 1:], b, k - l1 - 1)
                else:
                    return findk(a, b[l2 + 1:], k - l2 - 1)
            else:
                if m1 < m2:
                    return findk(a, b[:l2], k)
                else:
                    return findk(a[:l1], b, k)
        
        n = len(nums1) + len(nums2)
        if n % 2:
            return findk(nums1, nums2, n // 2)
        else:
            return (findk(nums1, nums2, n // 2 - 1) + findk(nums1, nums2, n // 2)) / 2
```

### 思路二

