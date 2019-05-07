---
title: LeetCode Problem 92-Reverse Linked List II
category: LeetCode
date: 2019-05-07
tag:
 - linked list
 - medium
---

**反转链表 II**。反转从位置 *m* 到 *n* 的链表。请使用一趟扫描完成反转。

**说明:**
1 ≤ *m* ≤ *n* ≤ 链表长度。

**示例:**

```
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
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

首先定位第 $$m$$ 和 $$n$$ 个节点，然后完成下面的操作即可：

```
Step 1: 1->2->3->4->5
           p     q
Step 2: 1->3->4->2->5  将结点p移动到结点q后面
           p  q
Step 3: 1->4->3->2->5  将结点p移动到结点q后面
```

时间复杂度 $$O(n)​$$。

```python
class Solution:
    def reverseBetween(self, head: ListNode, m: int, n: int) -> ListNode:
        dummy = ListNode(-1)
        dummy.next = head
        p = dummy
        for i in range(m - 1):
            p = p.next
        tail = head = p.next
        for i in range(n - m):
            tail = tail.next
        for i in range(n - m):
            q = head.next
            head.next = tail.next
            tail.next = head
            head = q
        p.next = head
        return dummy.next
```

### 思路二

首先定位第 $$m$$ 和 $$m-1$$ 个节点，然后完成下面的操作即可：

```
Step 1: 1->2->3->4->5
        p  c  q
Step 2: 1->3->2->4->5  将结点q移动到结点p后面
        p     c  q
Step 3: 1->4->3->2->5  将结点q插入到结点p后面
```

这里与思路一的区别是不用找到第 $$n$$ 个结点，省去了一次循环，时间复杂度 $$O(n)$$。

```python
class Solution:
    def reverseBetween(self, head: ListNode, m: int, n: int) -> ListNode:
        dummy = ListNode(-1)
        dummy.next = head
        pre = dummy
        for i in range(m - 1):
            pre = pre.next
        cur = pre.next
        after = cur.next
        for i in range(n - m):
            cur.next = after.next
            after.next = pre.next
            pre.next = after
            after = cur.next
        return dummy.next
```

### 相似问题

1. [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)