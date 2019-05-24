---
title: LeetCode Problem 113-Path Sum II
category: LeetCode
date: 2019-05-24
tag:
 - tree
 - depth-first search
 - medium
---

**路径总和 II**。给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

<!-- more -->

**说明:** 叶子节点是指没有子节点的节点。

**示例:**
给定如下二叉树，以及目标和 `sum = 22`，

```
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
```

返回:

```
[
   [5,4,11,2],
   [5,8,4,5]
]
```

### 思路一

深度优先遍历。时间复杂度 $$O(n)$$。

```python
class Solution:
    def pathSum(self, root: TreeNode, sum: int) -> List[List[int]]:
        def findPath(node, s, tmp=[]):
            if not node:
                return
            if not node.left and not node.right and s - node.val == 0:
                rs.append(tmp + [node.val])
            else:
                findPath(node.left, s - node.val, tmp + [node.val])
                findPath(node.right, s - node.val, tmp + [node.val])
        rs = []
        findPath(root, sum)
        return rs
```

### 相似问题

1. [Path Sum](https://wendellgul.github.io/leetcode/2019/05/24/LeetCode-Problem-112-Path-Sum/)
2. [Binary Tree Paths](https://leetcode.com/problems/binary-tree-paths/)
3. [Path Sum III](https://leetcode.com/problems/path-sum-iii/)
4. [Path Sum IV](https://leetcode.com/problems/path-sum-iv/)