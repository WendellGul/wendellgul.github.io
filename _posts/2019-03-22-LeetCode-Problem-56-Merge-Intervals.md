---
title: LeetCode Problem 56-Merge Intervals
category: LeetCode
date: 2019-03-22
tag:
 - array
 - sort
 - medium
---

**合并区间**。给出一个区间的集合，请合并所有重叠的区间。

**示例 1:**

```
输入: [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```

**示例 2:**

```
输入: [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

<!-- more -->

```python
# class Interval:
#     def __init__(self, s=0, e=0):
#         self.start = s
#         self.end = e
```

### 思路一

将 `intervals` 按照 `start` 升序排列，从左向右遍历，使用`tmp` 记录当前合并的区间，如果当前 `interval` 的 `start` 小于等于当前合并区间的 `end`，则可以加入到当前合并的区间 `tmp` 中，`tmp` 的 `start` 不变，`end` 变为 `tmp.end` 和当前 `interval[i].end` 的较大值；如果当前 `interval` 的 `start` 大于当前合并区间的 `end`，则当前合并区间可以被添加到结果中，并将当前的 `interval` 置为新的合并区间。

时间复杂度 $$O(n \log n)$$。

```python
class Solution:
    def merge(self, intervals: List[Interval]) -> List[Interval]:
        if not intervals:
            return []
        rs = []
        intervals.sort(key=lambda x: x.start)
        tmp = Interval(intervals[0].start, intervals[0].end)
        for i in range(1, len(intervals)):
            # 注意此时比较的不是上一个interval，而是上一个合并的区间
            if intervals[i].start <= tmp.end:  
                tmp.end = max(tmp.end, intervals[i].end)
            else:
                rs.append(Interval(tmp.start, tmp.end))
                tmp.start = intervals[i].start
                tmp.end = intervals[i].end
        rs.append(tmp)
        return rs
```

### 相似问题

1. [Insert Interval](https://leetcode.com/problems/insert-interval/)
2. [Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)
3. [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
4. [Teemo Attacking](https://leetcode.com/problems/teemo-attacking/)
5. [Add Bold Tag in String](https://leetcode.com/problems/add-bold-tag-in-string/)
6. [Range Module](https://leetcode.com/problems/range-module/)
7. [Employee Free Time](https://leetcode.com/problems/employee-free-time/)
8. [Partition Labels](https://leetcode.com/problems/partition-labels/)
9. [Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/)