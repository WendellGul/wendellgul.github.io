---
title: LeetCode Problem 121-Best Time to Buy and Sell Stock
category: LeetCode
date: 2019-03-25
tag:
 - array
 - dynamic programming
 - easy
---

**买卖股票的最佳时机**。给定一个数组，它的第 *i* 个元素是一支给定股票第 *i* 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。

注意你不能在买入股票前卖出股票。

**示例 1:**

```
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
```

<!-- more -->

**示例 2:**

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

### 思路一

动态规划，记录到当前位置为止的最小价格，则可以计算当前位置卖出股票得到的收益，遍历一边数组，得到最大收益。时间复杂度 $$O(n)$$。

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        rs, minPrice = 0, float('inf')
        for i in range(len(prices)):
            minPrice = min(minPrice, prices[i])
            rs = max(rs, prices[i] - minPrice)
        return rs
```

### 相似问题

1. [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)
2. [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)
3. [Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)
4. [Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)
5. [Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)