---
title: LeetCode Problem 82-Remove Duplicates from Sorted List II
category: LeetCode
date: 2019-03-29
tag:
 - linked list
 - medium
---

**删除排序链表中的重复元素 II**。给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 *没有重复出现* 的数字。

<!-- more -->

**示例 1:**

```
输入: 1->2->3->3->4->4->5
输出: 1->2->5
```

**示例 2:**

```
输入: 1->1->1->2->3
输出: 2->3
```

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
```

### 思路一

`tail` 指针标记当前没有重复的元素的位置，`count` 统计元素重复次数，`p` 指针遍历链表。时间复杂度 $$O(n)$$。

```python
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        if not head:
            return head
        dummy = ListNode(0)
        dummy.next = head
        tail, p = dummy, dummy.next  # tail 标记结果链表的尾指针
        while p:
            count = 1  # 标记重复的次数
            while p.next and p.next.val == p.val:
                count += 1
                p = p.next
            if count == 1:  # 不是重复元素
                tail.next = p
                tail = tail.next
            p = p.next
        tail.next = None
        return dummy.next
```

### 相似问题

1. [Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)