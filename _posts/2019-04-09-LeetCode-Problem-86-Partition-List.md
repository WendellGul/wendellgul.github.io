---
title: LeetCode Problem 86-Partition List
category: LeetCode
date: 2019-04-09
tag:
 - linked list
 - two pointers
 - medium
---

**分隔链表**。给定一个链表和一个特定值 *x*，对链表进行分隔，使得所有小于 *x* 的节点都在大于或等于 *x* 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

**示例:**

```
输入: head = 1->4->3->2->5->2, x = 3
输出: 1->2->2->4->3->5
```

<!-- more -->

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
```

### 思路一

使用两个指针，分别标记左边链表和右边链表，然后遍历一遍原链表，小于 `x` 加入左边链表，否则加入右边链表，时间复杂度 $$O(n)$$，空间复杂度 $$O(1)$$。

```python
class Solution:
    def partition(self, head: ListNode, x: int) -> ListNode:
        left = left_head = ListNode(-1)
        right = right_head = ListNode(-1)
        while head:
            if head.val < x:
                left.next = head
                left = left.next
            else:
                right.next = head
                right = right.next
            head = head.next
        right.next = None
        left.next = right_head.next
        return left_head.next
```