// 57. 环形字符串
// 输入：字符串 s（首尾相连成一个环形）
// 输出：环中 'l'、'o'、'x' 字符都恰好出现了偶数次的最长子字符串长度
function main(s) {
  const n = s.length
  const ss = s + s
  const pref = [0]
  for (let i = 0; i < ss.length; i++) {
    let mask = pref[i]
    const ch = ss[i]
    if (ch === 'l') mask ^= 4
    else if (ch === 'o') mask ^= 2
    else if (ch === 'x') mask ^= 1
    pref.push(mask)
  }
  // 对每个奇偶掩码，维护一个滑动窗口内的索引队列，找最长距离（不超过 n）的同掩码前缀对
  const queues = new Map()
  const heads = new Map()
  let ans = 0
  for (let j = 0; j < pref.length; j++) {
    const mask = pref[j]
    if (!queues.has(mask)) {
      queues.set(mask, [])
      heads.set(mask, 0)
    }
    const q = queues.get(mask)
    while (heads.get(mask) < q.length && j - q[heads.get(mask)] > n) {
      heads.set(mask, heads.get(mask) + 1)
    }
    if (heads.get(mask) < q.length) {
      ans = Math.max(ans, j - q[heads.get(mask)])
    }
    q.push(j)
  }
  return ans
}

console.log(main('alolobo'))
