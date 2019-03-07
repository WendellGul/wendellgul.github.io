---
title: LeetCode Problem 25-Reverse Nodes in k-Group
category: LeetCode
date: 2019-03-07
tag:
 - linked list
 - hard
---

k个一组翻转链表。给出一个链表，每 *k* 个节点一组进行翻转，并返回翻转后的链表。

*k* 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 *k* 的整数倍，那么将最后剩余节点保持原有顺序。

**示例 :**

给定这个链表：`1->2->3->4->5`

当 *k* = 2 时，应当返回: `2->1->4->3->5`

当 *k* = 3 时，应当返回: `3->2->1->4->5`

**说明 :**

- 你的算法只能使用常数的额外空间。
- **你不能只是单纯的改变节点内部的值**，而是需要实际的进行节点交换。

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
```

### 思路一

递归实现，先找到第 $k+1$ 节点，然后反转以第 $k+1$ 个节点为头结点的子链表，再翻转前 $k$ 个节点。时间复杂度 $O(n)$。

翻转前 $k$ 个节点的过程如下（此时 $k = 3$，`p` 指向第 `k+1` 个节点）：

``` 
step 0: 1---->2---->3---->4---->5---->None
        ↑     ↑           ↑
       head  tmp          p
###########################################
        +-----------------+
        |                 ↓
step 1: 1--X->2---->3---->4---->5---->None
        ↑     ↑           ↑
       head  tmp          p
###########################################
        +-----------------+
        |                 ↓
step 2: 1     2---->3---->4---->5---->None
        ↑     ↑     ↑
        p   head   tmp
...
```

```python
class Solution:
    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
        p, count = head, 0
        while p and count < k:
            p = p.next
            count += 1
        if count == k:
            p = self.reverseKGroup(p, k)
            for _ in range(count):  # 翻转前 k 个节点
                tmp = head.next
                head.next = p
                p = head
                head = tmp
            head = p
        return head
```

### 思路二

非递归实现。给链表加一个空的头结点，首先找到链表的第 $k$ 的节点，然后按照下面的步骤将节点进行移动（`k = 3`，`tail` 指向第 `k` 个节点）：

```
step 0: 0---->1---->2---->3---->4---->5
        ↑     ↑           ↑
      start  tmp         tail
        p
  说明：start 为下一个循环开始的节点
       p 在每次循环中位置固定
       tmp = p.next 为每次需要移动的节点
       将 tmp 移动到 tail 之后，得到：
step 1: 0---->2---->3---->1---->4---->5
        ↑     ↑     ↑     ↑
        p    tmp   tail start
以此类推
```

时间复杂度 $O(n)$。

```python
class Solution:
    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
        dummy = start = ListNode(0)
        dummy.next = head
        while True:
            p = tail = start
            start, count = p.next, 0
            while tail and count < k:
                tail = tail.next
                count += 1
            if tail is None:
                break
            
            for _ in range(count - 1):
                tmp = p.next
                p.next = tmp.next
                tmp.next = tail.next
                tail.next = tmp
                
        return dummy.next
```

### 相似问题

1. [Swap Nodes in Pairs](https://wendellgul.github.io/leetcode/2019/03/06/LeetCode-Problem-24-Swap-Nodes-in-Pairs/)