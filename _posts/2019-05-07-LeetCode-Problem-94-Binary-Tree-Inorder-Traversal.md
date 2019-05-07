---
title: LeetCode Problem 94-Binary Tree Inorder Traversal
category: LeetCode
date: 2019-05-07
tag:
 - hash table
 - stack
 - tree
 - medium
---

**二叉树的中序遍历**。给定一个二叉树，返回它的*中序* 遍历。

**示例:**

```
输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,3,2]
```

**进阶:** 递归算法很简单，你可以通过迭代算法完成吗？

<!-- more -->

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
```

### 思路一

递归解决。时间复杂度 $$O(n)$$。

```python
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        def backtrack(p):
            if p is None:
                return
            backtrack(p.left)
            rs.append(p.val)
            backtrack(p.right)
        rs = []
        backtrack(root)
        return rs
```

### 思路二

栈解决。时间复杂度 $$O(n)$$。

```python
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        rs, stack, cur = [], [], root
        while cur or stack:
            while cur:
                stack.append(cur)
                cur = cur.left
            cur = stack.pop()
            rs.append(cur.val)
            cur = cur.right
        return rs
```

### 思路三

Morris Traversal 遍历。时间复杂度 $$O(n)$$，额外空间复杂度 $$O(1)$$。该方法需要找到当前结点的前驱结点。步骤如下

1. 如果当前节点的左孩子为空，则输出当前节点并将其右孩子作为当前节点。
2. 如果当前节点的左孩子不为空，在当前节点的左子树中找到当前节点在中序遍历下的前驱节点。
   1. 如果前驱节点的右孩子为空，将它的右孩子设置为当前节点。当前节点更新为当前节点的左孩子。
   2. 如果前驱节点的右孩子为当前节点，将它的右孩子重新设为空（恢复树的形状）。输出当前节点。当前节点更新为当前节点的右孩子。
3. 重复以上1、2直到当前节点为空。

如下图所示：

<center><img src="https://wendell-1251760226.cos.ap-beijing.myqcloud.com/2019-05-07-090610.jpg" /></center>

代码如下：

```python
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        rs, cur, pre = [], root, None
        while cur:
            if cur.left is None:
                rs.append(cur.val)
                cur = cur.right
            else:
                # 寻找当前结点的前驱结点
                pre = cur.left
                while pre.right and pre.right != cur:
                    pre = pre.right
                if pre.right is None:
                    pre.right = cur
                    cur = cur.left
                else:
                    pre.right = None  # 恢复树的形状
                    rs.append(cur.val)
                    cur = cur.right
        return rs
```

### 相似问题

1. [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
2. [Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)
3. [Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)
4. [Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/)
5. [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
6. [Closest Binary Search Tree Value II](https://leetcode.com/problems/closest-binary-search-tree-value-ii/)
7. [Inorder Successor in BST](https://leetcode.com/problems/inorder-successor-in-bst/)
8. [Convert Binary Search Tree to Sorted Doubly Linked List](https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/)
9. [Minimum Distance Between BST Nodes](https://leetcode.com/problems/minimum-distance-between-bst-nodes/)