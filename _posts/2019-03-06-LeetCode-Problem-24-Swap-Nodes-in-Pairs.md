---
title: LeetCode Problem 24-Swap Nodes in Pairs
category: LeetCode
date: 2019-03-06
tag:
 - linked list
 - medium
---

两两交换链表中的节点。给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

**你不能只是单纯的改变节点内部的值**，而是需要实际的进行节点交换。

**示例:**

```
给定 1->2->3->4, 你应该返回 2->1->4->3.
```

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
```

### 思路一

定义一个空指针头，使用两个指针分别指向当前指针和当前指针的前一个指针，交换当前指针与当前指针的后一个指针，然后指针后移。时间复杂度 $O(n)$。

```
step 0: 0---->1---->2---->3---->4---->None
        ↑     ↑     ↑
       pre   cur   aft
##########################################		
        +-----------+
        |           ↓
step 1: 0--X->1---->2---->3---->4---->None
        ↑     ↑     ↑
       pre   cur   aft
##########################################		       
        +-----------+
        |    cur    |
        |     ↓     ↓
step 2: 0     1--X->2---->3---->4---->None
        ↑     |     ↑     ↑
       pre    |    aft    |
              +-----------+
##########################################					  
        +-----------+
        |    cur    |
        |     ↓     ↓
step 3: 0     1--X->2---->3---->4---->None
        ↑     |     ↑     ↑
       pre    |    aft    |
              +-----------+
##########################################					  
        +-----------+
        |    cur    |
        |     ↓     ↓
step 4: 0     1<----2--X->3---->4---->None
        ↑     |     ↑     ↑
       pre    |    aft    |
              +-----------+
##########################################					  
        +-----------+
        |    pre    |    cur
        |     ↓     ↓     ↓
step 5: 0     1<----2     3---->4---->None
              |           ↑     ↑
              +-----------+    aft
```

```python
class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        new_head = ListNode(-1)
        new_head.next = head
        pre, cur = new_head, head
        while cur and cur.next:
            aft = cur.next
            pre.next = aft
            cur.next = aft.next
            aft.next = cur
            pre = cur
            cur = cur.next
        return new_head.next
```

### 思路二

递归实现。时间复杂度 $O(n)$。

```python
class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        if head is None or head.next is None:
            return head
        tmp = head.next
        head.next = self.swapPairs(head.next.next)
        tmp.next = head
        return tmp
```

### 相似问题

1. [Reverse Nodes in k-Group](https://wendellgul.github.io/leetcode/2019/03/07/LeetCode-Problem-25-Reverse-Nodes-in-k-Group/)