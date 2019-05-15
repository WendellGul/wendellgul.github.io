---
title: LeetCode Problem 100-Same Tree
category: LeetCode
date: 2019-05-15
tag:
 - tree
 - depth-first search
 - easy
---

**相同的树**。给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

<!-- more -->

**示例 1:**

```
输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
```

**示例 2:**

```
输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
```

**示例 3:**

```
输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false
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

使用递归解决，两个树的每个结点的值相同，并且该结点的左子树和右子树都要相同。

```python
class Solution:
    def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
        def isSame(n1, n2):
            if not n1 and not n2:
                return True
            if not n1 or not n2:
                return False
            if n1.val != n2.val:
                return False
            return isSame(n1.left, n2.left) and isSame(n1.right, n2.right)
        return isSame(p, q)
```

时间复杂度 $$O(n)$$。