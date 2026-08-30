// 21 吃披萨

function main(n, sizes) {
  const a = sizes
  let ans = 0
  for (let i = 0; i < n; i++) {
    // 吃货先取第 i 块,剩余按顺时针排成一条线 B
    const B = []
    for (let k = 1; k < n; k++) B.push(a[(i + k) % n])
    const m = B.length
    const memo = Array.from({ length: m }, () => new Array(m).fill(null))

    // 轮到吃货从区间 [l, r] 的两端取,返回吃货能拿到的最大总和
    function best(l, r) {
      if (l > r) return 0
      if (memo[l][r] !== null) return memo[l][r]
      const takeLeft = B[l] + afterGreedy(l + 1, r)
      const takeRight = B[r] + afterGreedy(l, r - 1)
      memo[l][r] = Math.max(takeLeft, takeRight)
      return memo[l][r]
    }

    // 馋嘴(贪心)先取,再轮到吃货
    function afterGreedy(l, r) {
      if (l > r) return 0
      if (B[l] >= B[r]) {
        return best(l + 1, r)
      }
      return best(l, r - 1)
    }

    ans = Math.max(ans, a[i] + afterGreedy(0, m - 1))
  }
  return ans
}

console.log(main(5, [8, 2, 10, 5, 7]))
