---
title: LeetCode Problem 114-Flatten Binary Tree to Linked List
category: LeetCode
date: 2019-07-02
tag:
 - tree
 - depth-first search
 - medium
---

**二叉树展开为链表**。给定一个二叉树，[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95/8010757)将它展开为链表。

<!-- more -->

例如，给定二叉树

```
    1
   / \
  2   5
 / \   \
3   4   6
```

将其展开为：

```
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
```

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
```

### 思路一

展开的链表是原树的先序遍历的结果，即当前节点的右结点指向的元素是该结点前序遍历的下一个结点，采用自底向上的方法，从尾结点开始生成，即采用逆序的后根遍历 `(right, left, root)`来实现。

时间复杂度 $$O(n)$$，空间复杂度 $$O(n)$$。

```python
class Solution:
    def __init__(self):
        self.pre = None
        
    def flatten(self, root: TreeNode) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        if not root:
            return
        self.flatten(root.right)
        self.flatten(root.left)
        root.right = self.pre
        root.left = None
        self.pre = root
```

### 思路二

通过堆栈解决。时间复杂度 $$O(n)$$，空间复杂度 $$O(n)$$。

```python
class Solution:
    def flatten(self, root: TreeNode) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        if not root:
            return
        stack = []
        stack.append(root)
        while stack:
            node = stack.pop()
            if node.right:
                stack.append(node.right)
            if node.left:
                stack.append(node.left)
            if stack:
                node.right = stack[-1]
            node.left = None
```

### 思路三

因为展开的链表是先序遍历的结果，所以首先找到当前结点的右子树根结点的前一个结点，这样就可以直接将当前结点的右子树作为该结点的右子树，之后再将当前结点点的左子树变为当前结点点的右子树，往后遍历。

```python
class Solution:
    def flatten(self, root: TreeNode) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        now = root
        while now:
            if now.left:
                # 找到当前结点的右子树根结点的前一个结点，即当前结点左子树的最右叶子结点
                pre = now.left
                while pre.right:
                    pre = pre.right
                # 将当前结点的右子树作为该结点的右子树
                pre.right = now.right
                # 将当前结点的左子树变为当前节点的右子树
                now.right = now.left
                now.left = None
            # 由于当前结点的左子树变为了右子树，所以之间遍历右子树
            now = now.right
```

时间复杂度 $$O(n)$$，空间复杂度 $$O(1)$$。

### 相似问题

1. [Flatten a Multilevel Doubly Linked List](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/)