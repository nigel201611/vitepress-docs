// 第 19 题:包含所有整数的子矩阵最小宽度
// 给定 N*M 整数矩阵与 K 个整数(可能重复),求连续的"行区间 + 列区间"子矩阵
// 的最小宽度(列跨度);若不存在则输出 -1。
// 思路:枚举行区间 [r1,r2],将各行在列方向上聚合(每列一个值->计数 Map),
// 问题转化为"在 M 列序列中找最短连续列区间,使各目标数字出现次数满足需求",
// 用双指针(滑动窗口)在线性时间内求解。总复杂度 O(N^2 * M)。
function main(n, m, matrix, k, arr) {
  const need = new Map()
  for (const v of arr) need.set(v, (need.get(v) || 0) + 1)
  const needV = (v) => need.get(v) || 0
  const types = need.size
  let ans = Infinity

  for (let r1 = 0; r1 < n; r1++) {
    const colCount = Array.from({ length: m }, () => new Map())
    for (let r2 = r1; r2 < n; r2++) {
      // 增量地把第 r2 行的目标数字并入各列统计
      for (let c = 0; c < m; c++) {
        const v = matrix[r2][c]
        if (need.has(v)) colCount[c].set(v, (colCount[c].get(v) || 0) + 1)
      }
      // 列滑动窗口:找最短列区间覆盖所有目标数字
      const win = new Map()
      let sat = 0
      let l = 0
      for (let r = 0; r < m; r++) {
        for (const [v, c] of colCount[r]) {
          const old = win.get(v) || 0
          const nw = old + c
          win.set(v, nw)
          if (old < needV(v) && nw >= needV(v)) sat++
        }
        while (sat === types) {
          if (r - l + 1 < ans) {
            ans = r - l + 1
            if (ans === 1) return 1
          }
          for (const [v, c] of colCount[l]) {
            const old = win.get(v)
            const nw = old - c
            win.set(v, nw)
            if (old >= needV(v) && nw < needV(v)) sat--
          }
          l++
        }
      }
    }
  }
  return ans === Infinity ? -1 : ans
}

console.log(
  main(
    2,
    5,
    [
      [1, 2, 2, 3, 1],
      [2, 3, 2, 3, 2],
    ],
    3,
    [1, 2, 3]
  )
)
