// 62. 会议室座位安排
// 输入：会议室座位总数 seatNum；进出顺序数组 seatOrLeave（1=进场，负数=-座位号离场）
// 规则：进场时坐到离左右最近员工落座距离最大的座位（影响因素相同则坐索引最小的座位）
// 输出：最后进来员工坐的座位号；如果座位已满输出 -1
function main(seatNum, seq) {
  const occupied = [] // 升序的已占用座位
  let lastSeat = -1
  let hasArrival = false
  for (const x of seq) {
    if (x > 0) {
      hasArrival = true
      if (occupied.length >= seatNum) {
        lastSeat = -1
        continue
      }
      let bestSeat = -1
      let bestInfluence = -1
      // 最左侧座位 0
      if (occupied[0] !== 0) {
        bestSeat = 0
        bestInfluence = occupied[0] // 到最近已占用座的距离
      }
      // 最右侧座位 seatNum-1
      const last = occupied[occupied.length - 1]
      if (last !== undefined && last !== seatNum - 1) {
        const inf = seatNum - 1 - last
        if (inf > bestInfluence) {
          bestInfluence = inf
          bestSeat = seatNum - 1
        }
      }
      // 内部空隙
      for (let i = 0; i + 1 < occupied.length; i++) {
        const l = occupied[i]
        const r = occupied[i + 1]
        const d = Math.floor((r - l) / 2)
        if (d < 1) continue
        const cand = l + d // 影响相近时取索引较小者
        if (d > bestInfluence) {
          bestInfluence = d
          bestSeat = cand
        }
      }
      // 插入有序列表
      let pos = 0
      while (pos < occupied.length && occupied[pos] < bestSeat) pos++
      occupied.splice(pos, 0, bestSeat)
      lastSeat = bestSeat
    } else {
      const idx = occupied.indexOf(-x)
      if (idx !== -1) occupied.splice(idx, 1)
    }
  }
  return hasArrival ? lastSeat : -1
}

console.log(main(10, [1, 1, 1, 1, -4, 1]))
