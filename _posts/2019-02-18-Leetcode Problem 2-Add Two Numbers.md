---
title: LeetCode Problem 2-Add Two Numbers
category: LeetCode
date: 2019-02-18
tag:
 - linked list
 - math
 - medium
---

给出两个 **非空** 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 **逆序** 的方式存储的，并且它们的每个节点只能存储 **一位** 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例：**

```python
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
```

<!-- more -->

### 思路一

直接一位一位相加，新产生的结果节点暂时存放进位，注意两个链表的长度可能不一样，所以需要再单独判断每个链表是否到结尾。注意结果尾结点值不能为0。

```python
class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        rs = tail = ListNode(0)
        while l1 and l2:
            tmp = l1.val + l2.val + tail.val
            carry = tmp // 10
            tail.val = tmp % 10
            l1 = l1.next
            l2 = l2.next
            if l1 or l2 or carry > 0:
                tail.next = tail = ListNode(carry)
        while l1:
            tmp = l1.val + tail.val
            carry = tmp // 10
            tail.val = tmp % 10
            l1 = l1.next
            if l1 or carry > 0:
                tail.next = tail = ListNode(carry)
        while l2:
            tmp = l2.val + tail.val
            carry = tmp // 10
            tail.val = tmp % 10
            l2 = l2.next
            if l2 or carry > 0:
                tail.next = tail = ListNode(carry)
        return rs
```

### 思路二

在一个循环里完成思路一里的操作，使用空的头指针方便操作。

```python
class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        p = rs = ListNode(0)
        carry = 0
        while l1 or l2 or carry:
            tmp = carry
            if l1:
                tmp += l1.val
                l1 = l1.next
            if l2:
                tmp += l2.val
                l2 = l2.next
            carry = tmp // 10
            p.next = ListNode(tmp % 10)
            p = p.next
        return rs.next
```

### 思路三

先将两个链表分别转换成整数，然后相加，再将结果转换成链表。使用迭代的思想实现。

```python
class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        def toint(l):
            return l.val + 10 * toint(l.next) if l else 0
        
        def tolist(i):
            node = ListNode(i % 10)
            if i > 9:
                node.next = tolist(i // 10)
            return node
        
        return tolist(toint(l1) + toint(l2))
```

使用循环实现`tolist`

```python
class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        def toint(l):
            return l.val + 10 * toint(l.next) if l else 0
        
        n = toint(l1) + toint(l2)
        tail = rs = ListNode(n % 10)
        while n > 9:
            n = n // 10
            tail.next = tail = ListNode(n % 10)
        return rs
```

### Note

1. Python 中`a=b=c`语句的执行顺序：`a=c, b=a`，以此类推；
2. 链表空头指针的应用；
3. 注意链表结点为空的边界条件判断。

### 相似问题

1. [Multiply Strings](https://leetcode.com/problems/multiply-strings/)
2. [Add Binary](https://leetcode.com/problems/add-binary/)
3. [Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)
4. [Add Strings](https://leetcode.com/problems/add-strings/)
5. [Add Two Numbers II](https://leetcode.com/problems/add-two-numbers-ii/)

