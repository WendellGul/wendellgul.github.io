---
title: LeetCode Problem 37-Sudoku Solver
category: LeetCode
date: 2019-03-13
tag:
 - hash table
 - backtracking
 - hard
---

解数独。编写一个程序，通过已填充的空格来解决数独问题。

一个数独的解法需**遵循如下规则**：

1. 数字 `1-9` 在每一行只能出现一次。
2. 数字 `1-9` 在每一列只能出现一次。
3. 数字 `1-9` 在每一个以粗实线分隔的 `3x3` 宫内只能出现一次。

空白格用 `'.'` 表示。

![img](http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

一个数独。

![img](http://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png)

答案被标成红色。

**Note:**

- 给定的数独序列只包含数字 `1-9` 和字符 `'.'` 。
- 你可以假设给定的数独只有唯一解。
- 给定数独永远是 `9x9` 形式的。

### 思路一

回溯法，每次从头开始遍历。

```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        if board is None or len(board) == 0:
            return
        self.solve(board)
        
    def solve(self, board):
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    for c in '123456789':
                        if self.isValid(board, i, j, c):
                            board[i][j] = c
                            if self.solve(board):
                                return True
                            else:
                                board[i][j] = '.'
                    return False
        return True
        
    def isValid(self, board, row, col, c):
        for i in range(9):
            if board[i][col] == c or board[row][i] == c or \
               board[3*(row//3) + i//3][3*(col//3) + i % 3] == c:
                return False
        return True
```

### 思路二

思路一中的回溯法每次都从头遍历，可以优化成每次从下一个有效的位置遍历。

```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        if board is None or len(board) == 0:
            return
        self.solve(board, 0, 0)
        
    def solve(self, board, row, col):
        for i in range(row, 9):
            for j in range(col, 9):
                if board[i][j] == '.':
                    for c in '123456789':
                        if self.isValid(board, i, j, c):
                            board[i][j] = c
                            if self.solve(board, i, j + 1):
                                return True
                            else:
                                board[i][j] = '.'
                    return False
            col = 0
        return True
        
    def isValid(self, board, row, col, c):
        for i in range(9):
            if board[i][col] == c or board[row][i] == c or \
               board[3*(row//3) + i//3][3*(col//3) + i % 3] == c:
                return False
        return True
```

### 思路三

另一种回溯写法，每次从下一个有效的位置遍历。

```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        if board is None or len(board) == 0:
            return
        self.solve(board, 0, 0)
        
    def solve(self, board, row, col):
        if row == 9 and col == 0: 
            return True
        new_row, new_col = row, col + 1
        if col + 1 == 9:
            new_row, new_col = row + 1, 0
        if board[row][col] != '.':
            return self.solve(board, new_row, new_col)
        for c in '123456789':
            if self.isValid(board, row, col, c):
                board[row][col] = c
                if self.solve(board, new_row, new_col):
                    return True
                board[row][col] = '.'
        return False
        
    def isValid(self, board, row, col, c):
        for i in range(9):
            if board[i][col] == c or board[row][i] == c or \
               board[3*(row//3) + i//3][3*(col//3) + i % 3] == c:
                return False
        return True
```

### 相似问题

1. [Valid Sudoku](https://wendellgul.github.io/leetcode/2019/03/12/LeetCode-Problem-36-Valid-Sudoku/)
2. [Unique Paths III](https://leetcode.com/problems/unique-paths-iii/)