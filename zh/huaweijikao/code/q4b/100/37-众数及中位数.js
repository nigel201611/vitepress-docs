// 37 众数及中位数
// 众数：出现次数最多的数（可能有多个）；把众数组成一个新数组，求新数组的中位数

function main(nums) {
  const freq = new Map()
  for (const x of nums) {
    freq.set(x, (freq.get(x) || 0) + 1)
  }
  let max = 0
  for (const c of freq.values()) {
    if (c > max) max = c
  }
  const modes = []
  for (const [x, c] of freq) {
    if (c === max) modes.push(x)
  }
  modes.sort((a, b) => a - b)
  const mid = modes.length >> 1
  if (modes.length % 2 === 1) {
    return modes[mid]
  }
  return (modes[mid - 1] + modes[mid]) / 2
}

console.log(main([10, 11, 21, 19, 21, 17, 21, 16, 21, 18, 15]))
