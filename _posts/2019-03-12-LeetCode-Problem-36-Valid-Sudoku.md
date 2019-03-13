---
title: LeetCode Problem 36-Valid Sudoku
category: LeetCode
date: 2019-03-12
tag:
 - hash table
 - medium
---

有效的数独。判断一个 9x9 的数独是否有效。只需要**根据以下规则**，验证已经填入的数字是否有效即可。

1. 数字 `1-9` 在每一行只能出现一次。
2. 数字 `1-9` 在每一列只能出现一次。
3. 数字 `1-9` 在每一个以粗实线分隔的 `3x3` 宫内只能出现一次。

![img](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

上图是一个部分填充的有效的数独。

数独部分空格内已填入了数字，空白格用 `'.'` 表示。

**示例 1:**

```
输入:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: true
```

**示例 2:**

```
输入:
[
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: false
解释: 除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。
     但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
```

**说明:**

- 一个有效的数独（部分已被填充）不一定是可解的。
- 只需要根据以上规则，验证已经填入的数字是否有效即可。
- 给定数独序列只包含数字 `1-9` 和字符 `'.'` 。
- 给定数独永远是 `9x9` 形式的。

### 思路一

数独有9行9列9个块，每行每列每个块定义一个 hash 表，通过 hash 表来判断是否有重复出现的数字。

```python
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        row, column, cube = set(), set(), set()
        for i in range(9):  # 这里的9是指9个组
            row.clear(), column.clear(), cube.clear()
            for j in range(9):
                # 判断第 i 行
                if board[i][j] != '.' and board[i][j] in row:
                    return False
                else:
                    row.add(board[i][j])
                # 判断第 i 列
                if board[j][i] != '.' and board[j][i] in column:
                    return False
                else:
                    column.add(board[j][i])
                # 判断第 [3 * (i // 3), 3 * (i % 3)] 个块
                row_idx, col_idx = 3 * (i // 3), 3 * (i % 3)
                if board[row_idx + j // 3][col_idx + j % 3] != '.' and 
                   board[row_idx + j // 3][col_idx + j % 3] in cube:
                    print(2, i, j)
                    return False
                else:
                    cube.add(board[row_idx + j // 3][col_idx + j % 3])
        return True
```

### 思路二

通过一个 hash 表同时判断三种情况，将数字属于某个组编码成字符串，在 hash 表中存入字符串。

```java
class Solution {
    public boolean isValidSudoku(char[][] board) {
        Set seen = new HashSet();
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char number = board[i][j];
                if (number != '.') {
                    if (!seen.add(number + " in row " + i) ||
                        !seen.add(number + " in column" + j) || 
                        !seen.add(number + " in cube " + i / 3 + "-" + j / 3))
                        return false;
                }
            }
        }
        return true;
    }
}
```

### 相似问题

1. [Sudoku Solver](https://wendellgul.github.io/leetcode/2019/03/13/LeetCode-Problem-37-Sudoku-Solver/)