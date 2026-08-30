// 55 幸存数之和: 从索引0起跳, 中间跳过 jump 个数字, 命中下一个并敲出, 直到幸存 left 个数
// 输入: nums(正整数数组), jump(跳数), left(幸存数量)

function main(nums, jump, left) {
  const n = nums.length
  if (left >= n) {
    let sum = 0
    for (const v of nums) sum += v
    return sum
  }
  const next = new Array(n)
  for (let i = 0; i < n; i++) next[i] = (i + 1) % n
  const alive = new Array(n).fill(true)
  let remain = n
  let cursor = 0
  while (remain > left) {
    let node = cursor
    for (let s = 0; s < jump; s++) node = next[node]
    const hit = next[node]
    alive[hit] = false
    next[node] = next[hit]
    cursor = hit
    remain--
  }
  let sum = 0
  for (let i = 0; i < n; i++) {
    if (alive[i]) sum += nums[i]
  }
  return sum
}

console.log(main([1, 2, 3, 4, 5, 6, 7, 8, 9], 4, 3))
