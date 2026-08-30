function main(n, score, k) {
  const dp = new Array(n).fill(0)
  dp[0] = score[0]
  // 单调递减队列,头指针维护滑动窗口 [i-k, i-1] 内 dp 最大值
  const q = [0]
  let head = 0
  for (let i = 1; i < n; i++) {
    while (head < q.length && q[head] < i - k) head++
    dp[i] = score[i] + dp[q[head]]
    while (q.length - head > 0 && dp[q[q.length - 1]] <= dp[i]) q.pop()
    q.push(i)
  }
  return dp[n - 1]
}

console.log(main(6, [1, -1, -6, 7, -17, 7], 2))
