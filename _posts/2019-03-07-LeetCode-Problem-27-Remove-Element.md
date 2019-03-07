---
title: LeetCode Problem 27-Remove Element
category: LeetCode
date: 2019-03-07
tag:
 - array
 - two pointers
 - easy
---

移除元素。给定一个数组 *nums* 和一个值 *val*，你需要**原地**移除所有数值等于 *val* 的元素，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在**原地修改输入数组**并在使用 O(1) 额外空间的条件下完成。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

**示例 1:**

```
给定 nums = [3,2,2,3], val = 3,

函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。

你不需要考虑数组中超出新长度后面的元素。
```

**示例 2:**

```
给定 nums = [0,1,2,2,3,0,4,2], val = 2,

函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。

注意这五个元素可为任意顺序。

你不需要考虑数组中超出新长度后面的元素。
```

**说明:**

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以**“引用”**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```java
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

### 思路一

与[Remove Duplicates from Sorted Array](https://wendellgul.github.io/leetcode/2019/03/07/LeetCode-Problem-26-Remove-Duplicates-from-Sorted-Array/) 方法类似，`count` 记录当前不同元素的个数（即下标），遍历一遍数组，当元素不等于 `val` 时，进行替换操作，`count` 增加。时间复杂度 $O(n)$。

```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        count = 0
        for i in range(len(nums)):
            if nums[i] != val:
                nums[count] = nums[i]
                count += 1
        return count   
```

### 思路二

用两个指针，`i`指向开头，`j`指向结尾，如果 `i` 指向的元素等于 `val`并且 `j` 指向的元素不等于 `val`，则将 `nums[j]` 赋值给 `nums[i]`，同时，`i += 1, j -= 1`，其他情况见代码。时间复杂度 $O(n)$。

需要注意的是，循环条件设置为 `i <= j`，是因为长度为 `1` 的 `nums` 的出现，在循环外面判断 `j < 0` 是因为 `[2], val=2 以及 [2, 2, 2], val=2` 这种例子的出现。

```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        if len(nums) == 0:
            return 0
        i, j = 0, len(nums) - 1
        while i <= j:
            if nums[i] == val and nums[j] != val:
                nums[i] = nums[j]
                i += 1
                j -= 1
            elif nums[i] != val and nums[j] != val:
                i += 1
            else:
                j -= 1
        if j < 0:
            return 0
        return i
```

### 思路三

思路二的简化版。时间复杂度 $O(n)$。

```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        i, j = 0, len(nums)
        while i < j:
            if nums[i] == val:
                nums[i] = nums[j - 1]
                j -= 1
            else:
                i += 1
        return i
```

### 相似问题

1. [Remove Duplicates from Sorted Array](https://wendellgul.github.io/leetcode/2019/03/07/LeetCode-Problem-26-Remove-Duplicates-from-Sorted-Array/)
2. [Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/)
3. [Move Zeroes](https://leetcode.com/problems/move-zeroes/)

