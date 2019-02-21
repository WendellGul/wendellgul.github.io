---
title: LeetCode Problem 4-Median of Two Sorted Arrays
category: LeetCode
date: 2019-02-20
tag:
 - array
 - binary search
 - divide and conquer
 - hard
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

假设 $m < n$，我们可以将两个有序数组`A`和`B`都划分成两个部分，如下所示：

```python
      left_part          |        right_part
A[0], A[1], ..., A[i-1]  |  A[i], A[i+1], ..., A[m-1]
B[0], B[1], ..., B[j-1]  |  B[j], B[j+1], ..., B[n-1]
```

如果我们可以保证：

```python
1) len(left_part) == len(right_part)
2) max(left_part) <= min(right_part)
```

那么我们就可以得到中位数 $median = \frac{\max(left\_part) + \min(right\_part)}{2}$。

为了满足上述两个条件，我们必须保证：

```python
(1) i + j == m - i + n - j (or: m - i + n - j + 1)
    if n >= m, 我们只需令: i = 0 ~ m, j = (m + n + 1) / 2 - 1
(2) B[j - 1] <= A[i] and A[i - 1] <= B[j]
```

然后使用二分搜索在 `[0, m]` 中寻找合适的`i`：

```python
<1> 令 i_min = 0, i_max = m, 在 [i_min, i_max] 中进行搜索;
<2> 令 i = (i_min + i_max) / 2, j = (m + n + 1) / 2 - i;
<3> 当 B[j - 1] <= A[i] and A[i - 1] <= B[j] 时,
    说明 i 被找到，停止搜索;
    当 B[j - 1] > A[i] 时，
    说明 A[i] 太小，i 需要增加，即还需要在 [i+1, i_max] 中搜索;
    当 A[i - 1] > B[j] 时，
    说明 A[i - 1] 太大，i 需要减小，即还需要在 [i_min, i-1] 中搜索;
<4> 当 i 被找到后，如果 m + n 是奇数，则 median = max(A[i-1], B[j-1]);
	如果 m + n 是偶数，则 median = (max(A[i-1], B[j-1]) + min(A[i], B[j])) / 2;
<5> 注意边界的判断.
```

代码如下：

```python
class Solution:
    def findMedianSortedArrays(self, nums1: 'List[int]', nums2: 'List[int]') -> 'float':
        m, n = len(nums1), len(nums2)
        if m > n:
            nums1, nums2, m, n = nums2, nums1, n, m
        i_min, i_max, half = 0, m, (m + n + 1) // 2
        while i_min <= i_max:
            i = (i_min + i_max) // 2
            j = half - i
            if i < m and nums2[j - 1] > nums1[i]:
                i_min += 1
            elif i > 0 and nums1[i - 1] > nums2[j]:
                i_max -= 1
            else:
                if i == 0: max_of_left = nums2[j - 1]
                elif j == 0: max_of_left = nums1[i - 1]
                else: max_of_left = max(nums1[i - 1], nums2[j - 1])

                if (m + n) % 2 == 1:
                    return max_of_left

                if i == m: min_of_right = nums2[j]
                elif j == n: min_of_right = nums1[i]
                else: min_of_right = min(nums1[i], nums2[j])

                return (max_of_left + min_of_right) / 2.0
```

