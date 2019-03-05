---
title: LeetCode Problem 23-Merge k Sorted Lists
category: LeetCode
date: 2019-03-04
tag:
 - linked list
 - divide and conquer
 - heap
 - hard
---

合并K个排序链表。合并 *k* 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

**示例:**

```
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6
```

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
```

### 思路一

分治法，每次合并两个链表，最终全部合并。时间复杂度 $O(n\log k)$。

```python
class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        def mergeTwoLists(a, b):
            head = tail = ListNode(-1)
            while a and b:
                if a.val < b.val:
                    tail.next = a
                    a = a.next
                else:
                    tail.next = b
                    b = b.next
                tail = tail.next
            if a:
                tail.next = a
            if b:
                tail.next = b
            return head.next
            
        def merge(l1, l2):
            mid1, mid2 = len(l1) // 2, len(l2) // 2
            if len(l1) == 0:
                return l2[0]
            if len(l2) == 0:
                return l1[0]
            if len(l1) == len(l2) == 1:
                return mergeTwoLists(l1[0], l2[0])
            left = merge(l1[:mid1], l1[mid1:])
            right = merge(l2[:mid2], l2[mid2:])
            return mergeTwoLists(left, right)
        
        if len(lists) == 0:
            return None
        mid = len(lists) // 2
        return merge(lists[:mid], lists[mid:])
```

### 思路二

每次比较 $k$ 个结点，取最小的结点，需要 $k$ 个指针记录每个链表当前结点位置。时间复杂度 $O(kn)$。

```python
class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        if len(lists) == 0:
            return None
        head = tail = ListNode(-1)
        not_empty = list(range(len()))
        while True:
            count, idx, val = 0, -1, 100000
            for i in range(0, len(lists)):
                if lists[i] is None:
                    count += 1
                elif val > lists[i].val:
                    idx, val = i, lists[i].val
            if count == len(lists):
                break
            tail.next = tail = ListNode(val)
            lists[idx] = lists[idx].next
        return head.next
```

### 思路三

使用**优先队列**优化思路二。优先队列，每一个入队的元素有一个优先级，优先级高的最先出队，使用堆实现。时间复杂度 $O(n\log k)$。

```python
from Queue import PriorityQueue

class Solution(object):
    def mergeKLists(self, lists):
        """
        :type lists: List[ListNode]
        :rtype: ListNode
        """
        head = tail = ListNode(-1)
        q = PriorityQueue()
        for l in lists:
            if l:
                q.put((l.val, l))  # val 越小，优先级越高
        while not q.empty():
            val, node = q.get()
            tail.next = tail = ListNode(val)
            node = node.next
            if node:
                q.put((node.val, node))
        return head.next
```

### 相似问题

1. [Merge Two Sorted Lists](https://wendellgul.github.io/leetcode/2019/03/01/LeetCode-Problem-21-Merge-Two-Sorted-Lists/)
2. [Ugly Number II](https://leetcode.com/problems/ugly-number-ii/)