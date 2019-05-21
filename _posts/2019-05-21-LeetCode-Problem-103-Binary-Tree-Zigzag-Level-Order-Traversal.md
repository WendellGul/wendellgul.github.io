---
title: LeetCode Problem 103-Binary Tree Zigzag Level Order Traversal
category: LeetCode
date: 2019-05-21
tag:
 - stack
 - tree
 - breadth-first search
 - medium
---

**二叉树的锯齿形层次遍历**。给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

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

返回锯齿形层次遍历如下：

```
[
  [3],
  [20,9],
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

广度优先遍历，使用队列实现。时间复杂度 $$O(n)$$。

```python
from collections import deque

class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        q, rs = deque(), []
        q.append(root)
        level = 0
        while q:
            tmp = []
            count = len(q)
            for _ in range(count):
                node = q.popleft()
                if not node:
                    continue
                if level % 2 == 0:  # 判断是否逆序
                    tmp.append(node.val)   
                else:
                    tmp.insert(0, node.val)
                q.append(node.left)
                q.append(node.right)
            if tmp:
                rs.append(tmp)
                level += 1
        return rs
```

### 思路二

广度优先遍历，使用递归实现。时间复杂度 $$O(n)$$。

```python
class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        def backtrack(node, level):
            if not node:
                return
            if level >= len(rs):
                rs.append([])
            if level % 2 == 0:
                rs[level].append(node.val)
            else:
                rs[level].insert(0, node.val)
            backtrack(node.left, level+1)
            backtrack(node.right, level+1)
        rs = []
        backtrack(root, 0)
        return rs
```

### 相似问题

1. [Binary Tree Level Order Traversal](https://wendellgul.github.io/leetcode/2019/05/18/LeetCode-Problem-102-Binary-Tree-Level-Order-Traversal/)