---
title: LeetCode Problem 107-Binary Tree Level Order Traversal II
category: LeetCode
date: 2019-05-22
tag:
 - tree
 - depth-first search
 - easy
---

**二叉树的层次遍历 II**。给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

<!-- more -->

例如：
给定二叉树 `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其自底向上的层次遍历为：

```
[
  [15,7],
  [9,20],
  [3]
]
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

广度优先遍历，队列解决。时间复杂度 $$O(n)$$。

```python
from collections import deque

class Solution:
    def levelOrderBottom(self, root: TreeNode) -> List[List[int]]:
        q, rs = deque(), []
        q.append(root)
        while q:
            level = len(q)
            tmp = []
            for _ in range(level):
                node = q.popleft()
                if node is None:
                    continue
                tmp.append(node.val)
                q.append(node.left)
                q.append(node.right)
            if tmp:
                rs.insert(0, tmp)
        return rs
```

### 思路二

广度优先遍历，递归解决。时间复杂度 $$O(n)$$。

```python
class Solution:
    def levelOrderBottom(self, root: TreeNode) -> List[List[int]]:
        def backtrack(node, level=0):
            if not node:
                return
            if level >= len(rs):
                rs.insert(0, [])
            backtrack(node.left, level+1)
            backtrack(node.right, level+1)
            rs[len(rs) - level - 1].append(node.val)
        rs = []
        backtrack(root)
        return rs
```

### 相似问题

1. [Binary Tree Level Order Traversal](https://wendellgul.github.io/leetcode/2019/05/18/LeetCode-Problem-102-Binary-Tree-Level-Order-Traversal/)
2. [Average of Levels in Binary Tree](https://leetcode.com/problems/average-of-levels-in-binary-tree/)