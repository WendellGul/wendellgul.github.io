---
title: LeetCode Problem 1-Two Sum
category: LeetCode
date: 2019-01-29
tag:
 - array
 - hash table
 - easy
---

给定一个整型数组和一个目标整数，返回数组中和等于目标的两个元素的下标。

Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.

You may assume that each input would have **exactly** one solution, and you may not use the *same* element twice.

**Example:**

```python
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```

### 思路一

双重循环来判断，时间复杂度 $O(n^2)$，空间复杂度 $O(1)$。

Python 3 实现如下：

```python
class Solution:
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[j] == target - nums[i]:
                    return [i, j]
```

### 思路二

1. 首先进行排序，复杂度 $O(n\log n)$；
2. 然后有序数组找到两个数`a,b`，使得$a + b == target$，复杂度 $O(n)$；
3. 最后在原数组中找到 $a, b$ 下标，复杂度 $O(n)$。

总的时间复杂度 $O(n \log n)​$。

Python 3 实现如下：

```python
class Solution:
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        s_nums = sorted(nums)
        i, j = 0, len(s_nums) - 1
        while i < j:
            tmp = s_nums[i] + s_nums[j]
            if tmp == target:
                break
            elif tmp < target:
                i += 1
            else:
                j -= 1
                
        p1 = p2 = 0
        for k, n in enumerate(nums):
            if n == s_nums[i]:
                p1 = k
                break
        for m, n in enumerate(nums):
            if n == s_nums[j] and m is not p1:
                p2 = m
                break
        
        return [p1, p2]
```

### 思路三

用hash table实现，遍历一遍数组，时间复杂度 $O(n)$，空间复杂度 $O(n)$。

0. hash table中key为当前元素，value为当前元素对应的下标；

1. 每次判断目标与当前元素的差是否在hash table内，如果是则返回hash table中该差的value值（即原元素的下标）；
2. 将当前目标存入hash table

Python 3实现如下：

```python
class Solution:
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        dic = {}
        for i, n in enumerate(nums):
            tmp = target - n
            if tmp in dic:
                return [i, dic[tmp]]
            dic[n] = i
```

### Note

1. 使用Python 3 时，用`enumerate(nums)`方法比`range(len(nums))`遍历数组会更快。

### 相似问题

1. [3Sum](https://leetcode.com/problems/3sum/)
2. [4Sum](https://leetcode.com/problems/4sum/)
3. [Two Sum II - Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
4. [Two Sum III - Data structure design](https://leetcode.com/problems/two-sum-iii-data-structure-design/)
5. [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
6. [Two Sum IV - Input is a BST](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/)

