---
title: LeetCode Problem 58-Length of Last Word
category: LeetCode
date: 2019-03-23
tag:
 - string
 - easy
---

**最后一个单词的长度**。给定一个仅包含大小写字母和空格 `' '` 的字符串，返回其最后一个单词的长度。

如果不存在最后一个单词，请返回 0 。

**说明：**一个单词是指由字母组成，但不包含任何空格的字符串。

**示例:**

```
输入: "Hello World"
输出: 5
```

<!-- more -->

### 思路一

需要注意的是过滤掉末尾的空格。

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        count = 0
        for i in range(len(s) - 1, -1, -1):
            if i == len(s) - 1 and s[i] == ' ' or i < len(s) - 1 and s[i] == s[i+1] == ' ':
                continue
            elif s[i] != ' ':
                count += 1
            else:
                break
        return count
```

