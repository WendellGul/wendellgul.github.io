---
title: LeetCode Problem 61-Rotate List
category: LeetCode
date: 2019-03-25
tag:
 - linked list
 - two pointers
 - medium
---

**旋转链表**。给定一个链表，旋转链表，将链表每个节点向右移动 *k* 个位置，其中 *k* 是非负数。

**示例 1:**

```
输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
```

**示例 2:**

```
输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL
解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL
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

找到第 $$n-k$$ 个节点，假设 $$k < n$$，$$n$$ 为链表的长度，然后直接将后 $$k$$ 的节点移到前面。时间复杂度 $$O(n)$$。

```python
class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if head is None or head.next is None:
            return head
        dummy, count = ListNode(-1), 0
        dummy.next = head
        p = tail = dummy
        while tail.next:  # 统计长度
            count += 1
            tail = tail.next
        for _ in range(count - k % count):  # 找到第 n-k 个节点
            p = p.next
        tail.next = dummy.next
        dummy.next = p.next
        p.next = None
        return dummy.next
```

### 相似问题

1. [Rotate Array](https://leetcode.com/problems/rotate-array/)
2. [Split Linked List in Parts](https://leetcode.com/problems/split-linked-list-in-parts/)