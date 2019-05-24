---
title: LeetCode Problem 110-Balanced Binary Tree
category: LeetCode
date: 2019-05-24
tag:
 - tree
 - depth-first search
 - easy
---

**平衡二叉树**。给定一个二叉树，判断它是否是高度平衡的二叉树。

<!-- more -->

本题中，一棵高度平衡二叉树定义为：

> 一个二叉树*每个节点* 的左右两个子树的高度差的绝对值不超过1。

**示例 1:**

给定二叉树 `[3,9,20,null,null,15,7]`

```
    3
   / \
  9  20
    /  \
   15   7
```

返回 `true` 。

**示例 2:**

给定二叉树 `[1,2,2,3,3,null,null,4,4]`

```
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```

返回 `false` 。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
```

### 思路一

自底向上计算结点高度的同时进行判断。时间复杂度 $$O(n)$$。

```python
class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        def check(node):
            if not node:
                return 0
            left = check(node.left)
            right = check(node.right)
            if left == -1 or right == -1 or abs(left - right) > 1:
                return -1  # 不是平衡的
            return max(left, right) + 1
        return check(root) != -1
```

### 相似问题

1. [Maximum Depth of Binary Tree](https://wendellgul.github.io/leetcode/2019/05/21/LeetCode-Problem-104-Maximum-Depth-of-Binary-Tree/)