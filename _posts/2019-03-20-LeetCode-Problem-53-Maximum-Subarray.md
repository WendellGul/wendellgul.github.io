---
title: LeetCode Problem 53-Maximum Subarray
category: LeetCode
date: 2019-03-20
tag:
 - array
 - divide and conquer
 - dynamic programming
 - easy
---

**最大子序和**。给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**示例:**

```
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

**进阶:**

如果你已经实现复杂度为 O(*n*) 的解法，尝试使用更为精妙的分治法求解。

<!-- more -->

### 思路一

动态规划，`dp[i]` 表示`[0:i]` 中最大子序和，并且必须包含 `nums[i]`。则当 `dp[i-1] > 0` 时， `dp[i] = dp[i-1] + nums[i]`，否则 `dp[i] = nums[i]`，然后 `dp` 中的最大值。时间复杂度 $O(n)$。

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        dp, rs = nums.copy(), nums[0]
        for i in range(1, len(nums)):
            dp[i] = nums[i] + dp[i-1] if dp[i-1] > 0 else nums[i]
            rs = max(rs, dp[i])
        return rs
```

### 相似问题

1. [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
2. [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)
3. [Degree of an Array](https://leetcode.com/problems/degree-of-an-array/)
4. [Longest Turbulent Subarray](https://leetcode.com/problems/longest-turbulent-subarray/)