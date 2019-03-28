---
title: LeetCode Problem 80-Remove Duplicates from Sorted Array II
category: LeetCode
date: 2019-03-28
tag:
 - array
 - two pointers
 - medium
---

**删除排序数组中的重复项 II**。给定一个排序数组，你需要在**原地**删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在**原地修改输入数组**并在使用 O(1) 额外空间的条件下完成。

<!-- more -->

**示例 1:**

```
给定 nums = [1,1,1,2,2,3],

函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3 。

你不需要考虑数组中超出新长度后面的元素。
```

**示例 2:**

```
给定 nums = [0,0,1,1,1,1,2,3,3],

函数应返回新长度 length = 7, 并且原数组的前五个元素被修改为 0, 0, 1, 1, 2, 3, 3 。

你不需要考虑数组中超出新长度后面的元素。
```

### 思路一

使用两个指针，`i` 表示不超过两个的元素的个数，`j` 遍历所有元素，`count` 统计当前元素的个数。时间复杂度 $$O(n)$$。

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if len(nums) < 2:
            return len(nums)
        count = i = 1
        for j in range(1, len(nums)):
            if nums[j] == nums[j-1]:
                if count < 2:  # 控制重复的数目小于2个
                    count += 1
                    nums[i] = nums[j]
                    i += 1
            else:
                count = 1  # 重置count
                nums[i] = nums[j]
                i += 1
        return i
```

### 相似问题

1. [Remove Duplicates from Sorted Array](https://wendellgul.github.io/leetcode/2019/03/07/LeetCode-Problem-26-Remove-Duplicates-from-Sorted-Array/)