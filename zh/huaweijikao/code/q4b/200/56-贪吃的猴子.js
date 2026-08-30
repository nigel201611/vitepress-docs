// 56. 贪吃的猴子
// 输入：数组长度、香蕉数组 numbers、获取次数 N
// 每次只能从行的开头或者末尾获取一串香蕉，求最多能获取多少根香蕉
function main(len, numbers, N) {
  let sum = 0
  for (let i = 0; i < N; i++) sum += numbers[i]
  let ans = sum
  // 从左取 k 个、从右取 N-k 个
  for (let i = 0; i < N; i++) {
    sum -= numbers[N - 1 - i]
    sum += numbers[len - 1 - i]
    if (sum > ans) ans = sum
  }
  return ans
}

console.log(main(7, [1, 2, 2, 7, 3, 6, 1], 3))
