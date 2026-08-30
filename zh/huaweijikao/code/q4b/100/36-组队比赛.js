// 36 组队比赛
// 每个团队由1人或2人组成，团队能力值为成员能力之和（1人即自身能力），
// 需不低于最低能力值cap，1人只能参加1个团队，求最多能派出的团队数
// 贪心：能力>=cap的人单独组队最省人；剩下的人都<cap，只能两人组队，
// 用双指针（最弱+最强）求出最多配对数量

function main(arr, cap) {
  const a = [...arr].sort((x, y) => x - y)
  let count = 0
  // 能力不小于cap的单独组队
  const idx = a.findIndex(x => x >= cap)
  if (idx >= 0) {
    count += a.length - idx
    a.length = idx
  }
  // 剩余能力都小于cap，两两配对
  let i = 0
  let j = a.length - 1
  while (i < j) {
    if (a[i] + a[j] >= cap) {
      count++
      i++
      j--
    } else {
      i++ // 最弱者与谁都凑不齐，弃用
    }
  }
  return count
}

console.log(main([3, 1, 5, 7, 9], 8))
