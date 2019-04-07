---
title: LeetCode Problem 84-Largest Rectangle in Histogram
category: LeetCode
date: 2019-04-07
tag:
 - array
 - stack
 - hard
---

**柱状图中最大的矩形**。给定 *n* 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

<!-- more -->

<center><img src="https://ws2.sinaimg.cn/large/006tKfTcly1g1jz4quhbhj305805odft.jpg" /></center>

以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 `[2,1,5,6,2,3]`。 

<center><img src="https://ws3.sinaimg.cn/large/006tKfTcly1g1jz3ot4jbj305805o0sv.jpg" /></center>

图中阴影部分为所能勾勒出的最大矩形面积，其面积为 `10` 个单位。

**示例:**

```
输入: [2,1,5,6,2,3]
输出: 10
```

### 思路一

使用堆栈，堆栈中存储柱子高度的下标。首先我们思考一个问题，假设使用遍历的方法，应该怎样计算当前柱子高度所对应的最大面积，如下所示：

```
         6
      5  6
      5  6
      5  6     3
2     5  6  2  3
2  1  5  6  2  3
----------------
0  1 (2) 3  4  5
```

假设现在需要知道第 2 个柱子对应的最大面积，则需要从此柱子向左遍历找到第一个高度比其小的柱子的下标，即 1，以及向右遍历找到第一个高度比其小的柱子的下标，即 4，则第 2 个柱子高度对应的最大面积就为 $$5 \times (4-1-1) = 10$$。即如果使用遍历的方法，需要找到每个柱子对应的左右界，然后更新最大面积。

如果能有方法自动保存每个柱子高度的左界，则只需要知道柱子的右界即可算出该柱子高度对应的最大面积，使用堆栈保存柱子的下标，当当前柱子的高度比栈顶柱子的高度大时，柱子下标入栈，相反，当当前柱子的高度比栈顶柱子高度小时，即此时已经找到栈顶柱子的右界，而栈顶柱子的左界即栈中第二个元素，此时就可以计算栈顶柱子高度对应的最大面积，如下所示：

```
      6 
   5  6
   5  6
   5  6     3
   5  6  2  3
1  5  6  2  3
----------------
1  2 (3) 4  5
===================
假设此时栈中元素为[1,2,3]，遇到第 right=4 个柱子，
因为第 right 个柱子高度比 heights[stack[-1]] 小，栈顶元素出栈，记为 idx，
出栈后的栈顶元素即为高度为 heights[idx] 的柱子的左界，
而第 right 个元素则为 heights[idx]的右界，
所以计算 heights[idx] 对应的面积为 heights[idx] * (right - stack[-1] - 1)
而此时的 right 还需要与新的栈顶元素进行比较，所以 right -= 1
====================
需要注意的是第一个元素和最后一个元素，
在栈中先存入-1方便第一个元素面积的计算，
遇到最后一个元素的时候也需要栈顶元素出栈。
```

代码如下：

```python
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        stack, right = [-1], 0
        rs = 0
        while right <= len(heights):
            # 当栈为空时或者满足高度条件时，入栈
            if stack[-1] == -1 or (right < len(heights) and heights[right] >= heights[stack[-1]]):
                stack.append(right)
            # 当遇到最后一个元素时或者不满足高度条件时，出栈
            elif right == len(heights) or heights[right] < heights[stack[-1]]:
                idx = stack.pop()
                left = stack[-1]
                rs = max(rs, heights[idx] * (right - left - 1))
                right -= 1  # 继续考虑当前元素
            right += 1
        return rs
```

时间复杂度 $$O(n)$$。

### 相似问题

1. [Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)