---
title: LeetCode Problem 105-Construct Binary Tree from Preorder and Inorder Traversal
category: LeetCode
date: 2019-05-22
tag:
 - array
 - tree
 - depth-first search
 - medium
---

**从前序与中序遍历序列构造二叉树**。根据一棵树的前序遍历与中序遍历构造二叉树。

<!-- more -->

**注意:**
你可以假设树中没有重复的元素。

例如，给出

```
前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
```

返回如下的二叉树：

```
    3
   / \
  9  20
    /  \
   15   7
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

深度优先遍历，递归解决。首先找到树的根结点在中序遍历序列中的位置，根结点左边即是左子树，右边即是右子树。

```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        if not preorder or not inorder:
            return None
        val = preorder[0]
        idx = inorder.index(val)  # 找到树的根结点在中序遍历序列中的位置
        root = TreeNode(val)
        root.left = self.buildTree(preorder[1:idx+1], inorder[0:idx])
        root.right = self.buildTree(preorder[idx+1:], inorder[idx+1:])
        return root
```

### 思路二

使用堆栈解决，时间复杂度 $$O(n)$$。

```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        if not preorder:
            return None
        root, stack = TreeNode(preorder[0]), []
        stack.append(root)
        pre, ino = 1, 0
        while pre < len(preorder):
            cur = TreeNode(preorder[pre])
            pre += 1
            tmp = None
            while stack and stack[-1].val == inorder[ino]:  # 判断左子树是否到底
                tmp = stack.pop()  # 回溯到当前节点的父节点
                ino += 1
            if tmp:
                tmp.right = cur
            else:
                stack[-1].left = cur
            stack.append(cur)
        return root
```

### 相似问题

1. [Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)