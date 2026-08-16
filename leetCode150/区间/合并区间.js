// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
// 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。示例 1：

// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例 2：

// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

var merge = function (intervals) {
	if (intervals.length == 0) {
		return []
	}
	intervals.sort((interval1, interval2) => {
		return interval1[0] - interval2[0]
	})
	let merged = []
	for (let i = 0; i < intervals.length; ++i) {
		let L = intervals[i][0],
			R = intervals[i][1]
		if (merged.length === 0 || merged[merged.length - 1][1] < L) {
			merged.push([L, R])
		} else {
			merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], R)
		}
	}
	return merged
}
