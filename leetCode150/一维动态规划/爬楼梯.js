// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

// 思路：动态规划
// 要到达第 n 阶，最后一步只能是从第 n-1 阶爬 1 步，或从第 n-2 阶爬 2 步，
// 所以方法数 = 到达第 n-1 阶的方法数 + 到达第 n-2 阶的方法数：
// dp[n] = dp[n-1] + dp[n-2]
// 这就是斐波那契数列，dp[1] = 1，dp[2] = 2。
// 由于 dp[n] 只依赖前两个状态，用两个变量滚动即可，空间 O(1)。

var climbStairs = function (n) {
  if (n <= 2) return n
  let prev = 1 // dp[1]
  let cur = 2 // dp[2]
  for (let i = 3; i <= n; i++) {
    const next = prev + cur
    prev = cur
    cur = next
  }
  return cur
}

console.log(climbStairs(2)) // 2: 1+1, 2
console.log(climbStairs(3)) // 3: 1+1+1, 1+2, 2+1
