// 假设 力扣（LeetCode）即将开始 IPO 。为了以更高的价格将股票卖给风险投资公司，力扣希望在 IPO 之前开展一些项目以增加其资本。
// 由于资源有限，它只能在 IPO 之前完成最多 k 个不同的项目。
// 给你 n 个项目，对于每个项目 i ，它都有一个纯利润 profits[i] ，和启动该项目需要的最小资本 capital[i] 。
// 最初，你的资本为 w 。当你完成一个项目时，你将获得纯利润，且利润将被添加到你的总资本中。
// 总而言之，从给定项目中选择 最多 k 个不同项目的列表，以最大化最终资本，并输出最终可获得的最多资本。

// 思路：贪心 + 最大堆
// 每轮只能做「资本足够」的项目，且应该选其中利润最大的。
// 1. 项目按启动资本从小到大排序
// 2. 每轮把所有 capital <= 当前资本 w 的项目利润推进最大堆
// 3. 从堆顶取最大利润的项目做（w += profit），最多做 k 轮
// 用最大堆保证每轮都取最优。

class MaxHeap {
  constructor() {
    this.arr = []
  }
  size() {
    return this.arr.length
  }
  peek() {
    return this.arr[0]
  }
  push(v) {
    this.arr.push(v)
    let i = this.arr.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (this.arr[p] >= this.arr[i]) break
      ;[this.arr[p], this.arr[i]] = [this.arr[i], this.arr[p]]
      i = p
    }
  }
  pop() {
    const top = this.arr[0]
    const last = this.arr.pop()
    if (this.arr.length) {
      this.arr[0] = last
      let i = 0
      while (true) {
        const l = i * 2 + 1
        const r = i * 2 + 2
        let largest = i
        if (l < this.arr.length && this.arr[l] > this.arr[largest]) largest = l
        if (r < this.arr.length && this.arr[r] > this.arr[largest]) largest = r
        if (largest === i) break
        ;[this.arr[i], this.arr[largest]] = [this.arr[largest], this.arr[i]]
        i = largest
      }
    }
    return top
  }
}

var findMaximizedCapital = function (k, w, profits, capital) {
  const n = profits.length
  const projects = capital.map((c, i) => [c, profits[i]]).sort((a, b) => a[0] - b[0])
  const maxHeap = new MaxHeap()
  let i = 0

  for (let round = 0; round < k; round++) {
    while (i < n && projects[i][0] <= w) {
      maxHeap.push(projects[i][1]) // 资本足够的项目入堆
      i++
    }
    if (maxHeap.size() === 0) break // 没有能做的项目了
    w += maxHeap.pop() // 做利润最大的项目
  }
  return w
}

console.log(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1])) // 4
console.log(findMaximizedCapital(3, 0, [1, 2, 3], [0, 1, 2])) // 6
