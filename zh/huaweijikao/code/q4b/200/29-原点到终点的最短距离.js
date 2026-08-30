// 第 29 题:原点到终点的最短距离
// 给定字符串A(行表头,宽度n)与字符串B(列表头,高度m),构成 m*n 的网格,
// 定义左上角为原点(0,0),右下角为终点(m,n)。
// 水平边、垂直边距离均为1;当两个字符串"同一位置"的字符相同时,
// 可以走一条斜边(距离仍为1)。求(0,0)到(m,n)的最短距离。
// 经典 DP:dp[i][j] = 到点(i,j)的最短距离,可由上方(dp[i-1][j]+1)、
// 左方(dp[i][j-1]+1)进入;若 B[i-1] == A[j-1],还可用斜边 dp[i-1][j-1]+1。
// 只保留上一行滚动数组,复杂度 O(n*m)。
function main(line) {
  const parts = line.trim().split(/\s+/)
  const A = parts[0]
  const B = parts[1]
  const m = B.length // 行数(纵)
  const n = A.length // 列数(横)
  let prev = new Array(n + 1)
  for (let j = 0; j <= n; j++) prev[j] = j // 第0行
  for (let i = 1; i <= m; i++) {
    const cur = new Array(n + 1)
    cur[0] = i // 第0列
    for (let j = 1; j <= n; j++) {
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1)
      if (B[i - 1] === A[j - 1]) v = Math.min(v, prev[j - 1] + 1)
      cur[j] = v
    }
    prev = cur
  }
  return prev[n]
}

console.log(main('ABC ABC'))
console.log(main('ABCABBA CBABAC'))
