---
title: LeetCode Problem 68-Text Justification
category: LeetCode
date: 2019-03-26
tag:
 - string
 - hard
---

**文本左右对齐**。给定一个单词数组和一个长度 *maxWidth*，重新排版单词，使其成为每行恰好有 *maxWidth* 个字符，且左右两端对齐的文本。

你应该使用“贪心算法”来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 `' '` 填充，使得每行恰好有 *maxWidth* 个字符。

要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，则左侧放置的空格数要多于右侧的空格数。

文本的最后一行应为左对齐，且单词之间不插入**额外的**空格。

**说明:**

- 单词是指由非空格字符组成的字符序列。
- 每个单词的长度大于 0，小于等于 *maxWidth*。
- 输入单词数组 `words` 至少包含一个单词。

<!-- more -->

**示例:**

```
输入:
words = ["This", "is", "an", "example", "of", "text", "justification."]
maxWidth = 16
输出:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
```

**示例 2:**

```
输入:
words = ["What","must","be","acknowledgment","shall","be"]
maxWidth = 16
输出:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
解释: 注意最后一行的格式应为 "shall be    " 而不是 "shall     be",
     因为最后一行应为左对齐，而不是左右两端对齐。       
     第二行同样为左对齐，这是因为这行只包含一个单词。
```

**示例 3:**

```
输入:
words = ["Science","is","what","we","understand","well","enough","to","explain",
         "to","a","computer.","Art","is","everything","else","we","do"]
maxWidth = 20
输出:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]
```

### 思路一

```python
class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        rs, tmp = [], []  # tmp用来保存当前这一行的words
        i = s = 0  # s 记录当前行的所有words的长度
        while i < len(words):
            s += len(words[i])
            if s + len(tmp) <= maxWidth:  # len(tmp) 表示需要的最少的空格数目
                tmp.append(words[i])
            else:  # 第i个word太长，放入下一行，保存这一行的结果
                s -= len(words[i])
                i -= 1  # 重新考虑第i个word
                extraBlank = maxWidth - s - len(tmp) + 1  # 计算需要添加的空格数
                count = len(tmp) - 1  # 添加的空格在tmp的前len(tmp) - 1个words中
                if count == 0:  # tmp中只有一个word
                    tmp[0] += ' ' * extraBlank
                else:  # tmp中有多个word
                    # extra表示每个word需要加的空格
                    # first表示前first个word需要多加一个空格
                    extra, first = extraBlank // count, extraBlank % count
                    for j in range(len(tmp) - 1):
                        tmp[j] += ' ' * extra
                        if first:
                            tmp[j] += ' '
                            first -= 1
                rs.append(' '.join(tmp))  # 保存当前行的结果
                tmp = []  # 重置 tmp 和 s
                s = 0
            i += 1
        extra = maxWidth - s - len(tmp) + 1  # 计算最后一行多余的空格
        rs.append(' '.join(tmp) + ' ' * extra)  # 保存最后一行的结果
        return rs
```

### 思路二

另一种简单的写法。

```python
class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        rs, tmp, s = [], [], 0
        for w in words:
            if s + len(w) + len(tmp) > maxWidth:
                for i in range(maxWidth - s):
                    tmp[i % (len(tmp) - 1 or 1)] += ' '
                rs.append(''.join(tmp))
                tmp, s = [], 0
            s += len(w)
            tmp.append(w)
        extra = maxWidth - s - len(tmp) + 1
        rs.append(' '.join(tmp) + ' ' * extra)
        return rs
```

