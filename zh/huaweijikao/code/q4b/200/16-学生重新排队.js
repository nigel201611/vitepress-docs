// 学生重新排队:求使同组成员彼此相连的最少调整次数
// 每次可把任意一名学生移动到队伍任意位置,小组之间、组内均无顺序要求
//
// 思路:
//   1. 由第二行分组序列建立 "学生编号 -> 组号(第几组)" 的映射,
//      把第一行当前队列转换成组号序列,问题变为:每个组号出现恰好 3 次,
//      求最少移动次数使同组号连成 3 个一组。
//   2. 移动任意元素到任意位置,等价于尽量保留原相对顺序:
//      最少移动 = n - 最多可保留的学生数。
//      最终合法排列(每个组号连续 3 个的一段)中,被保留的元素必须能分成若干块:
//      每块是同组号的 1~3 个元素(按原位置递增),块之间位置递增、互不交错,
//      且某个组号最多只能出现一个块(该组在最终排列中只占据连续的一段)。
//   3. 从左到右扫描组号序列,DP 状态为:
//      mask(哪些组号已作为块使用过) + 当前块组号 g(-1 表示未在块中) + 当前块已选数 k,
//      值为当前已保留的最大人数。逐元素转移:跳过 / 并入当前块 / 新建一个未用组号的块。
//      状态中的 mask 保证同组号不会被拆成两个块,块间的"不交错"由扫描顺序天然保证。

function main(lines) {
  const queue = lines[0].trim().split(/\s+/).map(Number)
  const groups = lines[1].trim().split(/\s+/).map(Number)
  const n = queue.length
  const m = n / 3

  // 学生编号 -> 组号
  const gid = new Map()
  for (let i = 0; i < n; i++) gid.set(groups[i], Math.floor(i / 3))
  // 当前队列对应的组号序列(组号 0..m-1)
  const seq = queue.map((x) => gid.get(x))

  // DP 状态用 BigInt 编码:key = mask * (m+1) * 4 + (g+1) * 4 + k
  // g = -1(未在块中)映射为 0,k 为当前块已选人数(0..3)
  const W = (m + 1) * 4
  const mk = (mask, g, k) => mask * BigInt(W) + BigInt((g + 1) * 4 + k)
  let states = new Map([[mk(0n, -1, 0), 0]])

  for (const c of seq) {
    const next = new Map()
    const upd = (key, v) => {
      if (v > (next.get(key) ?? -1)) next.set(key, v)
    }
    for (const [key, v] of states) {
      const tail = Number(key % BigInt(W)) // (g+1)*4 + k
      const k = tail % 4
      const g = Math.floor(tail / 4) - 1
      const mask = key / BigInt(W)
      // 1) 不保留当前位置的学生
      upd(key, v)
      // 2) 把当前位置的学生并入当前块(块内组号相同,最多 3 人)
      if (g === c && k < 3) upd(mk(mask, c, k + 1), v + 1)
      // 3) 以当前位置的学生新开一个块(该组号此前未被使用过)
      if (g !== c && ((mask >> BigInt(c + 1)) & 1n) === 0n) {
        upd(mk(mask | (1n << BigInt(c + 1)), c, 1), v + 1)
      }
    }
    states = next
  }

  let maxKeep = 0
  for (const v of states.values()) maxKeep = Math.max(maxKeep, v)
  return String(n - maxKeep)
}

console.log(main(['7 9 8 5 6 4 2 1 3', '7 8 9 4 2 1 3 5 6']))
