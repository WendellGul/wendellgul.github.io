---
title: LeetCode Problem 11-Container With Most Water
category: LeetCode
date: 2019-02-22
tag:
 - array
 - two pointers
 - medium
---

盛最多水的容器。给定 $n$ 个非负整数 $$a_1, a_2, \dots, a_n$$，每个数代表坐标中的一个点 $$(i, a_i)$$ 。在坐标内画 $n$ 条垂直线，垂直线 $i$ 的两个端点分别为 $$(i, a_i)$$ 和 $(i, 0)$。找出其中的两条线，使得它们与 $x$ 轴共同构成的容器可以容纳最多的水。

**说明：**你不能倾斜容器，且 $n$ 的值至少为 2。

![img](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg)

图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

**示例:**

```
输入: [1,8,6,2,5,4,8,3,7]
输出: 49
```

### 思路一

穷举法，双重循环遍历，时间复杂度 $O(n^2)$。

### 思路二

使用两个指针，分别指向数组开头和结尾，此时形成的容器宽度最大，而面积则取决于高度较小的边，此时考虑较小的边与剩下的边构成的容器，因为他们的宽度都要小于当前容器的宽度，所以这些容器的面积都会比当前的小，故可以忽略，使较小的边的指针向左或者向右移动。

```python
class Solution:
    def maxArea(self, height: 'List[int]') -> 'int':
        rs, i, j = 0, 0, len(height) - 1
        while i < j:
            rs = max(rs, (j - i) * min(height[i], height[j]))
            if height[i] < height[j]:
                i += 1
            else:
                j -= 1
        return rs
```

时间复杂度 $O(n)$。

### 相似问题

1. [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)