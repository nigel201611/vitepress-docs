// 61. 数组调序最大胜出
// 输入：两行数字，分别为数组 a 和数组 b（大小不超过 10，内部数字各不相同）
// 调整数组 a 的顺序，使得尽可能多的 a[i] > b[i]
// 输出：所有可以达到最优结果的 a 数组数量
function main(a, b) {
  const n = a.length
  let best = -1
  let count = 0
  const perm = []
  const used = new Array(n).fill(false)
  function dfs() {
    if (perm.length === n) {
      let wins = 0
      for (let i = 0; i < n; i++) {
        if (perm[i] > b[i]) wins++
      }
      if (wins > best) {
        best = wins
        count = 1
      } else if (wins === best) {
        count++
      }
      return
    }
    for (let i = 0; i < n; i++) {
      if (used[i]) continue
      used[i] = true
      perm.push(a[i])
      dfs()
      perm.pop()
      used[i] = false
    }
  }
  dfs()
  return count
}

console.log(main([11, 8, 20], [10, 13, 7]))
