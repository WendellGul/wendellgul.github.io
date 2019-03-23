---
title: LeetCode Problem 57-Insert Interval
category: LeetCode
date: 2019-03-22
tag:
 - array
 - sort
 - hard
---

**插入区间**。给出一个*无重叠的 ，*按照区间起始端点排序的区间列表。

在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

**示例 1:**

```
输入: intervals = [[1,3],[6,9]], newInterval = [2,5]
输出: [[1,5],[6,9]]
```

**示例 2:**

```
输入: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出: [[1,2],[3,10],[12,16]]
解释: 这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
```

<!-- more -->

```python
# Definition for an interval.
# class Interval:
#     def __init__(self, s=0, e=0):
#         self.start = s
#         self.end = e
```

### 思路一

`tmp` 表示 `newInterval` 落入的区间，初始化为 `newInterval`，然后遍历`intervals`，分以下几种情况考虑：

**情况一**

```
intervals:   |--i--|   |-----|   |----|
newInterval:        |-----
```

此时 `newInterval.start > intervals[i].start`，直接将 `intervals[i]` 放入 `result` 中；

**情况二**

```
intervals:   |----i----|   |-----|   |----|
newInterval:     |----|
==========================================
intervals:   |--i--|   |-----|   |----|
newInterval:     |---|
```

此时 `intervals[i].start <= newInterval.start <= intervals[i].end`，可以更新 `tmp` 的开始和结束的位置，`tmp.start = intervals[i].start, tmp.end = max(intervals[i].end, tmp.end)`。

**情况三**

```
intervals:   |----|   |----i----|   |----|
newInterval:        |------|
==========================================
intervals:   |----|   |----i----|   |----|
newInterval:            |----|
```

此时 `intervals[i].start <= newInterval.end <= intervals[i].end`，可以更新 `tmp` 的结束和开始位置，`tmp.end = intervals[end], tmp.start = min(intervals[i].start, tmp.start)`

**情况四**

```
intervals:   |----|   |------|   |--i--|
newInterval:              -----|
```

此时 `intervals[i].start > tmp.end`，说明 `tmp` 更新完成，将 `tmp` 添加到 `result` 中，并且将剩下的 `intervals[i:]` 添加到 `result` 中。

需要注意的是 `tmp` 不更新的情况，循环结束后需要单独考虑。

时间复杂度 $$O(n)$$。

```python
class Solution:
    def insert(self, intervals: List[Interval], newInterval: Interval) -> List[Interval]:
        if not intervals:
            return [newInterval]
        rs, tmp = [], Interval(newInterval.start, newInterval.end)
        i = 0
        while i < len(intervals):
            if newInterval.start > intervals[i].end:
                rs.append(intervals[i])
            if intervals[i].start <= newInterval.start <= intervals[i].end:
                tmp.start = intervals[i].start
                tmp.end = max(intervals[i].end, tmp.end)
            elif intervals[i].start <= newInterval.end <= intervals[i].end:
                tmp.end = intervals[i].end
                tmp.start = min(intervals[i].start, tmp.start)
            if intervals[i].start > tmp.end:
                rs.append(Interval(tmp.start, tmp.end))
                break
            i += 1
        if i < len(intervals):
            rs.extend(intervals[i:])
        else:
            rs.append(tmp)
        return rs
```

### 思路二

寻找需要插入的 `interval` 左边部分和后边部分，并不断更新需要插入的 `interval` 的开始和结束。时间复杂度 $$O(n)$$。

```python
class Solution:
    def insert(self, intervals: List[Interval], newInterval: Interval) -> List[Interval]:
        s, e = newInterval.start, newInterval.end
        left, right = [], []
        for i in intervals:
            if i.end < s:
                left.append(i)
            elif i.start > e:
                right.append(i)
            else:
                s = min(s, i.start)
                e = max(e, i.end)
        return left + [Interval(s, e)] + right
```

### 相似问题

1. [Merge Intervals](https://wendellgul.github.io/leetcode/2019/03/22/LeetCode-Problem-56-Merge-Intervals/)
2. [Range Module](https://leetcode.com/problems/range-module/)