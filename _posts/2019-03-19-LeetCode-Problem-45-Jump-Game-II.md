---
title: LeetCode Problem 45-Jump Game II
category: LeetCode
date: 2019-03-19
tag:
 - array
 - greedy
 - hard
---

**跳跃游戏 II**。给定一个非负整数数组，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

你的目标是使用最少的跳跃次数到达数组的最后一个位置。

**示例:**

```
输入: [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
```

**说明:**

假设你总是可以到达数组的最后一个位置。

### 思路一

使用贪心法，用 `curFarthest` 记录目前为止可以到达的最远距离，每当到达了最远距离时，在进行下一次跳跃，使用 `curEnd` 记录每一次的最远点。时间复杂度为 $O(n)$。

```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        jumps = curEnd = curFarthest = 0
        for i in range(len(nums)-1):
            curFarthest = max(curFarthest, i + nums[i])
            if i == curEnd:
                curEnd = curFarthest
                jumps += 1
        return jumps
```

### 相似问题

1. [Jump Game](https://leetcode.com/problems/jump-game/)