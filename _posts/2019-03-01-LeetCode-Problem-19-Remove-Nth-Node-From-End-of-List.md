---
title: LeetCode Problem 19-Remove Nth Node From End of List
category: LeetCode
date: 2019-03-01
tag:
 - linked list
 - two pointers
 - medium
---

删除链表的倒数第N个节点。给定一个链表，删除链表的倒数第 *n* 个节点，并且返回链表的头结点。

**示例：**

```
给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```

**说明：**

给定的 *n* 保证是有效的。

**进阶：**

你能尝试使用一趟扫描实现吗？

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
```

### 思路一

先遍历一遍得到链表总长度，然后正向定位到需要删除的结点的前一个结点，进行删除。时间复杂度 $O(n)$。需要注意的是，**删除头结点时的判断**。

```python
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        p, count = head, 0
        while p:
            p = p.next
            count += 1
        if count == n:
            return head.next
        p = head
        for i in range(count - n - 1):
            p = p.next
        p.next = p.next.next
        return head
```

### 思路二

使用两个指针，一个指针在另一个指针前方 $n$ 个位置的地方，然后两个指针同时前进，到链表尾部时，较慢的指针所指的结点即为需要移除的结点。时间复杂度 $O(n)$。

```python
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        p = q = head
        i = 0
        while q and i < n:
            q = q.next
            i += 1
        if q is None:
            return head.next
        while q.next:
            p = p.next
            q = q.next
        p.next = p.next.next
        return head
```

