---
title: LeetCode Problem 98-Validate Binary Search Tree
category: LeetCode
date: 2019-05-14
tag:
 - tree
 - depth-first search
 - medium
---

**验证二叉搜索树**。给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

- 节点的左子树只包含**小于**当前节点的数。
- 节点的右子树只包含**大于**当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

<!-- more -->

**示例 1:**

```
输入:
    2
   / \
  1   3
输出: true
```

**示例 2:**

```
输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。
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

使用递归的思想。单纯的在每个结点判断 `node.left.val < node.val` 和 `node.right.val < node.val` 可以验证一些树，但是还存在如下的情况：

```
 (5)
 / \
1   6     
   / \    该树每个结点都满足 node.left.val < node.val 和 node.right.val < node.val，但是该树
 (4)  7   却不是有效的搜索树，因为 (4) < (5)
```

因此需要同时满足上下界。代码如下：

```python
class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        def isValid(node, lower=float('-inf'), upper=float('inf')):
            if not node:
                return True
            val = node.val
            if val <= lower or val >= upper:
                return False
            if not isValid(node.left, lower, val):
                return False
            if not isValid(node.right, val, upper):
                return False
            return True
        
        return isValid(root)
```

时间复杂度 $$O(n)$$。

### 思路二

使用中序遍历，采用堆栈解决。搜索树中序遍历之后，所有元素一定是升序排列的。

```python
class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        stack, cur = [], float('-inf')
        while stack or root:
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop()
            if root.val <= cur:
                return False
            cur = root.val
            root = root.right
        return True
```

时间复杂度 $$O(n)$$。

### 相似问题

1. [Binary Tree Inorder Traversal](https://wendellgul.github.io/leetcode/2019/05/07/LeetCode-Problem-94-Binary-Tree-Inorder-Traversal/)
2. [Find Mode in Binary Search Tree](https://leetcode.com/problems/find-mode-in-binary-search-tree/)