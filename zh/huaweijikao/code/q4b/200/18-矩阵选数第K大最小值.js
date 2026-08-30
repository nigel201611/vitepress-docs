// 第 18 题:从矩阵中取数的第K大最小值
// 从 N*M 矩阵中选 N 个数(任意两个不能同行同列),求所选 N 个数中第 K 大的最小值。
// 二分答案 x:判断"能否用值 <= x 的格子构成大小 >= K 的行列匹配"。
// 该断定单调:若"值<=x"的二分图匹配数 >= K,则存在选法使至少 K 个数 <= x(其余任意补齐),
// 即降序第 K 个数(第 K 大)<= x。用匈牙利算法求最大匹配。
function main(n, m, k, matrix) {
  // 每行格子按值排序(列号保留),便于二分 x 时只取值 <= x 的列
  const rows = []
  for (let i = 0; i < n; i++) {
    const cols = []
    for (let j = 0; j < m; j++) cols.push({ v: matrix[i][j], j })
    cols.sort((a, b) => a.v - b.v)
    rows.push(cols)
  }
  // check:值 <= x 的格子能否匹配出 >= k 的匹配数
  function check(x) {
    const matchCol = new Array(m).fill(-1)
    function dfs(r, seen) {
      const cols = rows[r]
      for (let p = 0; p < cols.length; p++) {
        if (cols[p].v > x) break
        const c = cols[p].j
        if (seen[c]) continue
        seen[c] = 1
        if (matchCol[c] === -1 || dfs(matchCol[c], seen)) {
          matchCol[c] = r
          return true
        }
      }
      return false
    }
    let cnt = 0
    for (let r = 0; r < n; r++) {
      const seen = new Array(m).fill(0)
      if (dfs(r, seen)) cnt++
    }
    return cnt >= k
  }
  let lo = 0,
    hi = 1e9
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (check(mid)) hi = mid
    else lo = mid + 1
  }
  return lo
}

console.log(
  main(3, 4, 2, [
    [1, 5, 6, 6],
    [8, 3, 4, 3],
    [6, 8, 6, 3],
  ])
)
