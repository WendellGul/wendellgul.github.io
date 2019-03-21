---
title: LeetCode Problem 41-First Missing Positive
category: LeetCode
date: 2019-03-14
tag:
 - array
 - hard
---

缺失的第一个正数。给定一个未排序的整数数组，找出其中没有出现的最小的正整数。

**示例 1:**

```
输入: [1,2,0]
输出: 3
```

**示例 2:**

```
输入: [3,4,-1,1]
输出: 2
```

<!-- more -->

**示例 3:**

```
输入: [7,8,9,11,12]
输出: 1
```

**说明:**

你的算法的时间复杂度应为O(*n*)，并且只能使用常数级别的空间。

### 思路一

交换法。假设数组中第 `i` 个位置正好存放正数 `i+1`，那么遍历一边数组，当第 `i` 个位置上不是 `i+1` 的时候，即缺少最小正数 `i+1`。所以先通过一遍循环，将符合要求的正数 `k` 放入第 `k-1` 个位置，不满足要求的数比如非正数或者大于数组长度的数可以直接跳过，然后在遍历一遍数组即可找到缺失的最小的正数。

值得注意的是，当数组中出现重复元素，比如 `[1, 1]` 时，要单独考虑。

时间复杂度 $O(n)$，空间复杂度 $O(1)$。

```python
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        i = 0
        while i < len(nums):
            # 需要注意两个位置的元素不能相等
            if 0 < nums[i] <= len(nums) and nums[i] != nums[nums[i] - 1]:
                tmp = nums[i]
                nums[i], nums[tmp - 1] = nums[tmp - 1], tmp
            else:
                i += 1
        
        for i in range(len(nums)):
            if nums[i] != i + 1:
                return i + 1
        return len(nums) + 1
```

### 思路二

标记法，假设我们现在可以有额外的空间，对于一个数组，例如 `nums = [3,4,-1,-1,8]`，我们创建一个等大的数组，初始化为 `[False, False, False, False, False]`，如果 `nums` 中有 `1`，就把第一个位置 `a[0] = True`，如果 `nums` 中有 `m`，就令 `a[m-1] = True`。最后遍历一遍数组，遇到不为 `True` 的下标 `k` 时，缺少的最小正数即为 `k + 1`。

然而此时我们没有额外的空间，这时，我们可以把原数组 `nums` 就当做标记数组，开始时数组中的值为 `False`，因此我们把正数当做 `False`，负数当做 `True`，这时当我们需要标记一个正数存在时，只需要取相反数即可，这样做在遍历数字的时候只需要取绝对值，就得到原来的数了。

但是上述方法带来的问题是，去绝对值得话，之前存在的负数会造成干扰，因此，我们需要把正数和负数分开，即将正数放在前面，将负数放在后面。

```python
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        def positiveNumber(nums):
            p = 0
            for i in range(len(nums)):
                if nums[i] > 0:
                    nums[i], nums[p] = nums[p], nums[i]
                    p += 1
            return p
        
        k = positiveNumber(nums)
        for i in range(k):
            idx = abs(nums[i]) - 1
            if idx < k and nums[idx] > 0:
                nums[idx] = -nums[idx]
        for i in range(k):
            if nums[i] > 0:
                return i + 1
        return k + 1
```

### 相似问题

1. [Missing Number](https://leetcode.com/problems/missing-number/)
2. [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)
3. [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/)
4. [Couples Holding Hands](https://leetcode.com/problems/couples-holding-hands/)