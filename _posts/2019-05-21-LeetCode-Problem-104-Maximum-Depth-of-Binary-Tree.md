---
title: LeetCode Problem 104-Maximum Depth of Binary Tree
category: LeetCode
date: 2019-05-21
tag:
 - tree
 - depth-first search
 - easy
---

**二叉树的最大深度**。给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

<!-- more -->

**说明:** 叶子节点是指没有子节点的节点。

**示例：**
给定二叉树 `[3,9,20,null,null,15,7]`，

```
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
```

### 思路一

深度优先遍历。树的最大深度是树的左子树的最大深度和右子树的最大深度中的较大值加1。时间复杂度 $$O(n)$$。

```python
class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        def max_depth(node):
            if not node:
                return 0
            return 1 + max(max_depth(node.left), max_depth(node.right))
        return max_depth(root)
```

### 相似问题

1. [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)
2. [Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/)
3. [Maximum Depth of N-ary Tree](https://leetcode.com/problems/maximum-depth-of-n-ary-tree/)