---
title: LeetCode Problem 95-Unique Binary Search Trees II
category: LeetCode
date: 2019-05-07
tag:
 - dynamic programming
 - tree
 - medium
---

**不同的二叉搜索树 II**。给定一个整数 *n*，生成所有由 1 ... *n* 为节点所组成的**二叉搜索树**。

**示例:**

```
输入: 3
输出:
[
  [1,null,3,2],
  [3,2,null,1],
  [3,1,null,null,2],
  [2,1,3],
  [1,null,2,null,3]
]
解释:
以上的输出对应以下 5 种不同结构的二叉搜索树：

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
```

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

通过分治法和回溯法解决，每个BST的中序遍历就是 1 到 $n$，如果选择 $$i$$ 作为根节点，左子树一定包含 1 到 $$i-1$$，右子树则包含 $$i+1$$ 到 $$n$$，通过分治和回溯得到每个根结点所有的左子树和右子树，然后再将根结点与各个左子树和右子树结合。

```python
class Solution:
    def generateTrees(self, n: int) -> List[TreeNode]:
        def backtrack(start, end):
            if start > end:
                return [None]
            rs = []
            for i in range(start, end+1):
                left = backtrack(start, i-1)
                right = backtrack(i+1, end)
                for lnode in left:
                    for rnode in right:
                        root = TreeNode(i)
                        root.left, root.right = lnode, rnode
                        rs.append(root)
            return rs
        
        if n == 0:
            return []
        return backtrack(1, n)
```

### 相似问题

1. [Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/)
2. [Different Ways to Add Parentheses](https://leetcode.com/problems/different-ways-to-add-parentheses/)