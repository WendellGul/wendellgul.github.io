---
title: LeetCode Problem 106-Construct Binary Tree from Inorder and Postorder Traversal
category: LeetCode
date: 2019-05-22
tag:
 - array
 - tree
 - depth-first search
 - medium
---

**从中序与后序遍历序列构造二叉树**。根据一棵树的中序遍历与后序遍历构造二叉树。

<!-- more -->

**注意:**
你可以假设树中没有重复的元素。

例如，给出

```
中序遍历 inorder = [9,3,15,20,7]
后序遍历 postorder = [9,15,7,20,3]
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

深度优先遍历，递归解决。

```python
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        if not postorder:
            return None
        val = postorder[-1]
        idx = inorder.index(val)
        root = TreeNode(val)
        root.left = self.buildTree(inorder[:idx], postorder[:idx])
        root.right = self.buildTree(inorder[idx+1:], postorder[idx:-1])
        return root
```

### 思路二

使用堆栈解决。时间复杂度 $$O(n)$$。

```python
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        if not postorder:
            return None
        root, stack = TreeNode(postorder[-1]), []
        stack.append(root)
        ino, post = len(inorder)-1, len(postorder)-2
        while post >= 0:
            cur = TreeNode(postorder[post])
            post -= 1
            tmp = None
            while stack and stack[-1].val == inorder[ino]:  # 找到右子树底部
                tmp = stack.pop()  # 回溯到父节点
                ino -= 1
            # 先生成右子树，再生成左子树
            if tmp:
                tmp.left = cur
            else:
                stack[-1].right = cur
            stack.append(cur)
        return root
```

### 相似问题

1. [Construct Binary Tree from Preorder and Inorder Traversal](https://wendellgul.github.io/leetcode/2019/05/22/LeetCode-Problem-105-Construct-Binary-Tree-from-Preorder-and-Inorder-Traversal/)