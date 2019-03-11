---
title: LeetCode Problem 31-Next Permutation
category: LeetCode
date: 2019-03-11
tag:
 - array
 - medium
---

下一个排列。实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须**原地**修改，只允许使用额外常数空间。

以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
`1,2,3` → `1,3,2`
`3,2,1` → `1,2,3`
`1,1,5` → `1,5,1`

### 思路一

首先我们观察到如果给定的序列已经是完全降序的话，则没有下一个更大的排列了，因此，我们需要找到从右边开始找到两个连续的数 `a[i]` 和 `a[i - 1]`，现在，所有在 `a[i - 1]` 右边的数都是降序排列，不可能在其右边找到更大的排列了，所以我们需要重新组合包括 `a[i - 1]` 在内的其右边的所有元素。

那么，怎么样重新组合呢，我们需要找到一个刚好比这一个排列大一点点的排列，因此，我们需要在 `a[i - 1]` 右边找到只比其大一点点的元素 `a[j]`，交换这两个元素，然后将 `a[i - 1]` 右边的元素逆序即可。

![image-20190311202756353](https://ws4.sinaimg.cn/large/006tKfTcgy1g0z4n4ptbdj30q60hegn9.jpg)

详细的动画可见下图：

<img src="https://leetcode.com/media/original_images/31_Next_Permutation.gif" />
时间复杂度为 $O(n)$。

```python
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """ 
        i = len(nums) - 2
        while i >= 0 and nums[i + 1] <= nums[i]:
            i -= 1
        if i >= 0:
            j = len(nums) - 1
            while j >= i and nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        nums[i+1:] = nums[i+1:][::-1]
```

### 相似问题

1. [Permutations](https://leetcode.com/problems/permutations/)
2. [Permutations II](https://leetcode.com/problems/permutations-ii/)
3. [Permutation Sequence](https://leetcode.com/problems/permutation-sequence/)
4. [Palindrome Permutation II](https://leetcode.com/problems/palindrome-permutation-ii/)