---
title: LeetCode Problem 102-Binary Tree Level Order Traversal
category: LeetCode
date: 2019-05-18
tag:
 - tree
 - breadth-first search
 - medium
---

**二叉树的层次遍历**。给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。

例如:
给定二叉树: `[3,9,20,null,null,15,7]`,

<!-- more -->

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

```
[
  [3],
  [9,20],
  [15,7]
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

广度优先遍历，使用队列解决。时间复杂度 $$O(n)$$。

```python
from collections import deque

class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
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
                rs.append(tmp)
        return rs
```

### 思路二

使用递归解决。时间复杂度 $$O(n)$$。

```python
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        def backtrack(node, level):
            if not node:
                return
            if level >= len(rs):
                rs.append([])
            rs[level].append(node.val)
            backtrack(node.left, level+1)
            backtrack(node.right, level+1)
        rs = []
        backtrack(root, 0)
        return rs
```

### 相似问题

1. [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
2. [Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/)
3. [Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/)
4. [Binary Tree Vertical Order Traversal](https://leetcode.com/problems/binary-tree-vertical-order-traversal/)
5. [Average of Levels in Binary Tree](https://leetcode.com/problems/average-of-levels-in-binary-tree/)
6. [N-ary Tree Level Order Traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)
7. [Cousins in Binary Tree](https://leetcode.com/problems/cousins-in-binary-tree/)