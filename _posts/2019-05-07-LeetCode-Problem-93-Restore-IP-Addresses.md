---
title: LeetCode Problem 93-Restore IP Addresses
category: LeetCode
date: 2019-05-07
tag:
 - string
 - backtracking
 - medium
---

**复原IP地址**。给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

**示例:**

```
输入: "25525511135"
输出: ["255.255.11.135", "255.255.111.35"]
```

<!-- more -->

### 思路一

递归解决。

```python
class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        def backtrack(s, tmp, k):  # k 表示剩下还需要的字段数
            if len(s) > 3 * k:  # 当长度大于剩下所有字段数的最大长度时直接返回
                return
            if len(s) == 0 and k == 0:  # 满足要求存储结果
                rs.append('.'.join(tmp))
            for i in range(1, 4):  # 遍历当前字段所有可能的组合
                if len(s) >= i and isValid(s[:i]):
                    backtrack(s[i:], tmp + [s[:i]], k-1)  # 当前字段有效时递归寻找下一个有效字段
                    
        def isValid(s):
            if int(s) > 255 or (s[0] == '0' and len(s) > 1):
                return False
            else:
                return True
        rs = []
        backtrack(s, [], 4)
        return rs
```

### 相似问题

1. [IP to CIDR](https://leetcode.com/problems/ip-to-cidr/)