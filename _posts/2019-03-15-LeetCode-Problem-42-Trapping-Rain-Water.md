---
title: LeetCode Problem 42-Trapping Rain Water
category: LeetCode
date: 2019-03-15
tag:
 - array
 - two pointers
 - stack
 - hard
---

接雨水。给定 *n* 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

![rainwatertrap](https://ws4.sinaimg.cn/large/006tKfTcgy1g13jameadnj30bg04hmx3.jpg)

> 上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 **感谢 Marcos**贡献此图。

**示例:**

```
输入: [0,1,0,2,1,0,1,3,2,1,2,1]
输出: 6
```

### 思路一

穷举法。穷举的时候计算下图中每个区域装水的数量。

![006tKfTcgy1g13jameadnj30bg04hmx3](https://ws3.sinaimg.cn/large/006tKfTcly1g13lt4layyj30bg04hdfu.jpg)

* 初始化 `ans = 0`
* 从左到右循环数组 `i`
  * 初始化 `max_left = max_right = 0`

  * 从当前位置向左遍历数组，找到左边最大的高度
    `max_left = max(max_left, height[j])`

  * 从当前位置向右遍历数组，找到右边最大的高度

    `max_right = max(max_right, height[j])`

  * 当前位置 `i` 所能装的水的数量就为 `min(max_left, max_right) - height[i]`

时间复杂度 $O(n^2)$，空间复杂度 $O(1)$。

```python
class Solution:
    def trap(self, height):
        """
        :type height: List[int]
        :rtype: int
        """
        ans = 0
        for i in range(1, len(height)):
            max_left = max_right = 0
            for j in range(i, -1, -1):
                max_left = max(max_left, height[j])
            for j in range(i, len(height)):
                max_right = max(max_right, height[j])
            ans += min(max_left, max_right) - height[i]
        return ans
```

### 思路二

动态规划，每次计算的水量如思路一的图所示。令 `left_max[i]` 表示第 `i` 个位置左边最大的高度，`right_max[i]` 表示第 `i` 个位置右边最大的高度，则 `left_max[i] = max(left_max[i-1], height[i])` ，`right_max[i] = max(right[i+1], height[i])`，每个位置可以装的水的数量为 `min(max_left[i], max_right[i]) - height[i]`。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。

```python
class Solution:
    def trap(self, height):
        """
        :type height: List[int]
        :rtype: int
        """
        if len(height) == 0:
            return 0
        ans, left_max, right_max = 0, [0] * len(height), [0] * len(height)
        left_max[0], right_max[-1] = height[0], height[-1]
        for i in range(1, len(height)):
            left_max[i] = max(left_max[i - 1], height[i])
        for i in range(len(height) - 2, -1, -1):
            right_max[i] = max(right_max[i + 1], height[i])
        for i in range(1, len(height) - 1):
            ans += min(left_max[i], right_max[i]) - height[i]
        return ans
```

### 思路三

使用两个指针，分别指向左右两端，同时左右当前最大的高度，每次计算的水量如思路一所示。当左边的指针指向的高度小于右边的高度时，如果当前位置的高度小于左边最大高度，则一定可以存下 `max_left - height[left]` 的水量，反之亦然。

时间复杂度 $O(n)$，空间复杂度 $O(1)$。

```python
class Solution:
    def trap(self, height):
        """
        :type height: List[int]
        :rtype: int
        """
        left, right = 0, len(height) - 1
        ans = max_left = max_right = 0
        while left < right:
            if height[left] < height[right]:
                if height[left] > max_left:
                    max_left = height[left]
                else:
                    ans += max_left - height[left]
                left += 1
            else:
                if height[right] > max_right:
                    max_right = height[right]
                else:
                    ans += max_right - height[right]
                right -= 1
        return ans
```

### 思路四

使用堆栈，每次计算如下图所示区域装水的数量。

![rainwatertrap copy 2](https://ws1.sinaimg.cn/large/006tKfTcgy1g13jgqblduj30bg04hdfv.jpg)

* 栈中存放高度的索引(位置)
* 当当前的高度小于栈顶位置的高度时，该位置索引直接入栈，否则：
  * 栈顶元素出栈`top = stack.pop()`，该位置的高度即为此时池底的高度 ( 可以理解为海拔 )
  * 计算由现在的栈顶元素 `stack[-1]` 和当前位置 `current` 代表高度组成的墙以及池底自身高度 `height[top]` 的池子能装的水量，如上图中宽的红色区域标记的那样
* 将当前的位置入栈

时间复杂度 $O(n)$，空间复杂度 $O(n)$。

```python
class Solution:
    def trap(self, height):
        """
        :type height: List[int]
        :rtype: int
        """
        ans, stack = 0, []
        for current in range(len(height)):
            while len(stack) != 0 and height[current] > height[stack[-1]]:
                top = stack.pop()
                if len(stack) == 0:
                    break
                width = current - stack[-1] - 1
                bounded_height = min(height[current], height[stack[-1]]) - height[top]
                ans += width * bounded_height
            stack.append(current)
        return ans
```

### 相似问题

1. [Container With Most Water](https://wendellgul.github.io/leetcode/2019/02/22/LeetCode-Problem-11-Container-With-Most-Water/)
2. [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
3. [Trapping Rain Water II](https://leetcode.com/problems/trapping-rain-water-ii/)
4. [Pour Water](https://leetcode.com/problems/pour-water/)