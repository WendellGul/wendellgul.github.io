---
title: LeetCode Problem 111-Minimum Depth of Binary Tree
category: LeetCode
date: 2019-05-24
tag:
 - tree
 - depth-first search
 - breadth-first search
 - easy
---

**二叉树的最小深度**。给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

<!-- more -->

**说明:** 叶子节点是指没有子节点的节点。

**示例:**

给定二叉树 `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最小深度  2.

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
```

### 思路一

深度优先遍历，需要注意的是结点的某个子树为空的情况。时间复杂度 $$O(n)$$。

```python
class Solution:
    def minDepth(self, root: TreeNode) -> int:
        if not root:
            return 0
        left = self.minDepth(root.left)
        right = self.minDepth(root.right)
        if not left:
            return right + 1
        if not right:
            return left + 1
        return min(left, right) + 1
```

### 思路二

广度优先遍历，当遇到叶子结点即返回。时间复杂度 $$O(n)$$。

```python
from collections import deque

class Solution:
    def minDepth(self, root: TreeNode) -> int:
        if not root:
            return 0
        q, depth = deque(), 1
        q.append((root, depth))
        while q:
            node, depth = q.popleft()
            if not node:
                continue
            if not node.left and not node.right:
                break
            q.append((node.left, depth+1))
            q.append((node.right, depth+1))
        return depth
```

### 相似问题

1. [Binary Tree Level Order Traversal](https://wendellgul.github.io/leetcode/2019/05/18/LeetCode-Problem-102-Binary-Tree-Level-Order-Traversal/)
2. [Maximum Depth of Binary Tree](https://wendellgul.github.io/leetcode/2019/05/21/LeetCode-Problem-104-Maximum-Depth-of-Binary-Tree/)