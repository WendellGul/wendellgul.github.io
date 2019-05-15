---
title: LeetCode Problem 99-Recover Binary Search Tree
category: LeetCode
date: 2019-05-15
tag:
 - tree
 - depth-first search
 - hard
---

**恢复二叉搜索树**。二叉搜索树中的两个节点被错误地交换。

请在不改变其结构的情况下，恢复这棵树。

<!-- more -->

**示例 1:**

```
输入: [1,3,null,null,2]

   1
  /
 3
  \
   2

输出: [3,1,null,null,2]

   3
  /
 1
  \
   2
```

**示例 2:**

```
输入: [3,1,4,null,null,2]

  3
 / \
1   4
   /
  2

输出: [2,1,4,null,null,3]

  2
 / \
1   4
   /
  3
```

**进阶:**

- 使用 O(*n*) 空间复杂度的解法很容易实现。
- 你能想出一个只使用常数空间的解决方案吗？

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
```

###思路一

通过中序遍历解决。中序遍历的一般形式如下：

```python
def traverse(node):
    if node is None:
        return
    traverse(node.left)
    # Do some business
    traverse(node.right)
```

如果要打印输出二叉树，直接替换注释部分为打印输出即可。这里我们需要找到两个交换的结点，假设下面的例子是中序输出的结果：

```
6, 3, 4, 5, 2
```

比较每一个结点和它后面的结点，可以发现 6 是第一个需要交换的结点，因为 6 > 3，并且 2 是第二个需要交换的结点，因为 2 < 5。实际上我们比较的是当前结点与前一个结点值的大小。

因此，使用 `pre` 保存前一个结点，找到 `first_node` 和 `second_node`，然后将他们交换。

```python
class Solution:
    def recoverTree(self, root: TreeNode) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        self.first_node, self.second_node = None, None
        self.pre = TreeNode(float('-inf'))
        def traverse(node):
            if node is None:
                return
            traverse(node.left)
            if self.first_node is None and self.pre.val >= node.val:
                self.first_node = self.pre
            if self.first_node and self.pre.val >= node.val:
                self.second_node = node
            self.pre = node
            traverse(node.right)
            
        traverse(root)
        self.first_node.val, self.second_node.val = self.second_node.val, self.first_node.val
```

时间复杂度 $$O(n)$$，空间复杂度 $$O(n)$$。

### 思路二

对思路一，通过循环实现。

```python
class Solution:
    def recoverTree(self, root: TreeNode) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        first_node, second_node = None, None
        pre, cur, stack = TreeNode(float('-inf')), root, []
        while cur or stack:
            while cur:
                stack.append(cur)
                cur = cur.left
            cur = stack.pop()
            if first_node is None and pre.val >= cur.val:
                first_node = pre
            if first_node and pre.val >= cur.val:
                second_node = cur
            pre = cur
            cur = cur.right
        first_node.val, second_node.val = second_node.val, first_node.val
```

时间复杂度 $$O(n)$$，空间复杂度 $$O(n)$$。

### 思路三

Morris 遍历法。即将中序遍历时代码中输出打印的部分改为寻找两个结点，代码如下：

```python
class Solution:
    def recoverTree(self, root: TreeNode) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        first_node, second_node, tmp = None, None, None
        pre, cur, stack = TreeNode(float('-inf')), root, []
        while cur:
            if cur.left is None:
                # Start doing business
                if first_node is None and pre.val >= cur.val:
                    first_node = pre
                if first_node and pre.val >= cur.val:
                    second_node = cur
                pre = cur
                # End doing business
                cur = cur.right
            else:
                tmp = cur.left
                while tmp.right and tmp.right != cur:
                    tmp = tmp.right
                if tmp.right is None:
                    tmp.right = cur
                    cur = cur.left
                else:
                    tmp.right = None  # 恢复树的形状
                    # Start doing business
                    if first_node is None and pre.val >= cur.val:
                        first_node = pre
                    if first_node and pre.val >= cur.val:
                        second_node = cur
                    pre = cur
                    # End doing business
                    cur = cur.right
        first_node.val, second_node.val = second_node.val, first_node.val
```

时间复杂度 $$O(n)$$，空间复杂度 $$O(1)$$。