---
title: LeetCode Problem 101-Symmetric Tree
category: LeetCode
date: 2019-05-15
tag:
 - tree
 - depth-first search
 - breadth-first search
 - easy
---

**对称二叉树**。给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 `[1,2,2,3,4,4,3]` 是对称的。

<!-- more -->

```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个 `[1,2,2,null,3,null,3]` 则不是镜像对称的:

```
    1
   / \
  2   2
   \   \
   3    3
```

**说明:**

如果你可以运用递归和迭代两种方法解决这个问题，会很加分。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
```

### 思路一

深度优先遍历，使用递归解决。当一个树的左子树和右子树是相互镜像的话，那么这个树就是对称二叉树。两个树如果相互镜像，则需要满足两个条件：

1. 他们的根结点必须相同。
2. 一个树的左右子树与另一个树的右左子树相互镜像。

如下图所示：

<center><img src="https://leetcode.com/media/original_images/101_Symmetric_Mirror.png" width=50%/></center>

代码如下：

```python
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        def isMirror(n1, n2):
            if not n1 and not n2:
                return True
            if not n1 or not n2:
                return False
            return n1.val == n2.val and \
                   isMirror(n1.left, n2.right) and \
                   isMirror(n1.right, n2.left)
        return isMirror(root, root)
```

时间复杂度 $$O(n)$$。

### 思路二

广度优先遍历，使用队列解决。每次出队两个结点，两个结点的值必须相同，入队时将镜像入队。

```python
from collections import deque

class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        q = deque()
        q.append(root)
        q.append(root)
        while q:
            n1, n2 = q.popleft(), q.popleft()
            if not n1 and not n2:
                continue
            if not n1 or not n2:
                return False
            if n1.val != n2.val:
                return False
            q.append(n1.left)
            q.append(n2.right)
            q.append(n1.right)
            q.append(n2.left)
        return True
```

时间复杂度 $$O(n)$$。