---
title: LeetCode Problem 109-Convert Sorted List to Binary Search Tree
category: LeetCode
date: 2019-05-24
tag:
 - linked list
 - depth-first search
 - medium
---

**有序链表转换二叉搜索树**。给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树*每个节点* 的左右两个子树的高度差的绝对值不超过 1。

<!-- more -->

**示例:**

```
给定的有序链表： [-10, -3, 0, 5, 9],

一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
```

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
```

### 思路一

递归解决，首先找到链表的中间结点，通过两个指针，一个快指针一次走两个结点，一个慢指针一次走一个节点，当快指针走到链表尾结点时，慢指针正好在链表中间结点，然后生成树节点。时间复杂度 $$O(n \log n)$$。

```python
class Solution:
    def findMiddle(self, start):
        pre = None
        slow = fast = start
        while fast and fast.next:
            pre = slow
            slow = slow.next
            fast = fast.next.next
        if pre:  # 此操作会破坏链表结构
            pre.next = None
        return slow
        
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        if not head:
            return None
        mid = self.findMiddle(head)
        root = TreeNode(mid.val)
        if mid == head:
            return root
        root.left = self.sortedListToBST(head)
        root.right = self.sortedListToBST(mid.next)
        return root
```

### 思路二

与思路一类似，此方法不会破坏链表结构。时间复杂度 $$O(n \log n)$$。

```python
class Solution:
    def findMiddle(self, start, end):
        slow = fast = start
        while fast != end and fast.next != end:
            slow = slow.next
            fast = fast.next.next
        return slow
    
    def convert(self, start, end):
        if start == end:
            return None
        mid = self.findMiddle(start, end)
        root = TreeNode(mid.val)
        if mid == start:
            return root
        root.left = self.convert(start, mid)
        root.right = self.convert(mid.next, end)
        return root
        
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        return self.convert(head, None)
```

### 思路三

将链表转成数组，然后递归解决。时间复杂度 $$O(n)$$。

```python
class Solution:
    def listToArray(self, head):
        vals = []
        while head:
            vals.append(head.val)
            head = head.next
        return vals
        
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        vals = self.listToArray(head)
        def convert(nums):
            if not nums:
                return None
            idx = len(nums) // 2
            root = TreeNode(nums[idx])
            root.left = convert(nums[:idx])
            root.right = convert(nums[idx+1:])
            return root
        return convert(vals)
```

### 思路四

使用中序遍历。我们知道中序遍历最左边的元素就是链表的头指针指向的元素，同样的，中序遍历的下一个元素就是链表的第二个元素。代码如下：

```python
class Solution:
    def findSize(self, head):
        p, c = head, 0
        while p:
            p = p.next
            c += 1
        return c
        
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        size = self.findSize(head)
        def convert(l, r):
            nonlocal head
            if l > r:
                return None
            mid = (l + r) // 2
            # 中序遍历，先遍历左子树
            left = convert(l, mid - 1)
            # 当前树结点的值就是当前链表结点的值
            root = TreeNode(head.val)
            root.left = left
            head = head.next
            root.right = convert(mid + 1, r)
            return root
        return convert(0, size - 1)
```

时间复杂度 $$O(n)$$。

### 相似问题

1. [Convert Sorted Array to Binary Search Tree](https://wendellgul.github.io/leetcode/2019/05/22/LeetCode-Problem-108-Convert-Sorted-Array-to-Binary-Search-Tree/)