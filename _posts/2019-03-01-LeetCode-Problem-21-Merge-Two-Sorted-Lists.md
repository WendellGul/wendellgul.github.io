---
title: LeetCode Problem 21-Merge Two Sorted Lists
category: LeetCode
date: 2019-03-01
tag:
 - linked list
 - easy
---

合并两个有序链表。将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

**示例：**

```
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
```

### 思路一

直接遍历两个链表。时间复杂度 $O(m + n)$。

```python
class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        head = tail = ListNode(-1)
        while l1 and l2:
            if l1.val < l2.val:
                tail.next = l1
                l1 = l1.next
            else:
                tail.next = l2
                l2 = l2.next
            tail = tail.next
        if l1:
            tail.next = l1
        if l2:
            tail.next = l2
        return head.next
```

### 思路二

通过递归实现。时间复杂度 $O(m + n)$。

```python
class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        if l1 is None:
            return l2
        if l2 is None:
            return l1  
        if l1.val < l2.val:
            l1.next = self.mergeTwoLists(l1.next, l2)
            return l1
        else:
            l2.next = self.mergeTwoLists(l1, l2.next)
            return l2
```

### 相似问题

1. [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
2. [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
3. [Sort List](https://leetcode.com/problems/sort-list/)
4. [Shortest Word Distance II](https://leetcode.com/problems/shortest-word-distance-ii/)