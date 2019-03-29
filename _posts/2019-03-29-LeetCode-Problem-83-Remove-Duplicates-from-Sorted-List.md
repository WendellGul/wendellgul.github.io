---
title: LeetCode Problem 83-Remove Duplicates from Sorted List
category: LeetCode
date: 2019-03-29
tag:
 - linked list
 - easy
---

**删除排序链表中的重复元素**。给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

<!-- more -->

**示例 1:**

```
输入: 1->1->2
输出: 1->2
```

**示例 2:**

```
输入: 1->1->2->3->3
输出: 1->2->3
```

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
```

### 思路一

```python
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        dummy = tail = ListNode(0)
        dummy.next = p = head
        while p:
            while p.next and p.next.val == p.val:
                p = p.next
            tail.next = p
            tail = tail.next
            p = p.next
        return dummy.next
```

### 相似问题

1. [Remove Duplicates from Sorted List II](https://wendellgul.github.io/leetcode/2019/03/29/LeetCode-Problem-82-Remove-Duplicates-from-Sorted-List-II/)