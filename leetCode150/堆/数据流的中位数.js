// 中位数是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。
// 例如 arr = [2,3,4] 的中位数是 3；arr = [2,3] 的中位数是 (2 + 3) / 2 = 2.5。
// 实现 MedianFinder 类：addNum 添加一个整数，findMedian 返回所有元素的中位数。

// 思路：双堆维护中位数
// 用两个堆把数据分成两半：
//   lower：最大堆，存较小的一半，堆顶是左半最大值
//   upper：最小堆，存较大的一半，堆顶是右半最小值
// 保证 lower 比 upper 多 0 或 1 个元素：
//   1. 新元素先推入 lower
//   2. 平衡：lower 堆顶移到 upper，保证堆顶都是「正确的一半」
//   3. 若 upper 比 lower 多，再移回来，保证 lower.size >= upper.size
// 中位数：lower.size > upper.size 时是 lower 堆顶，否则是两堆顶的平均值。

class Heap {
  // compare(a, b) < 0 时 a 优先，传 (a, b) => a - b 为最小堆，(a, b) => b - a 为最大堆
  constructor(compare) {
    this.arr = []
    this.compare = compare
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
      if (this.compare(this.arr[p], this.arr[i]) <= 0) break
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
        let best = i
        if (l < this.arr.length && this.compare(this.arr[l], this.arr[best]) < 0) best = l
        if (r < this.arr.length && this.compare(this.arr[r], this.arr[best]) < 0) best = r
        if (best === i) break
        ;[this.arr[i], this.arr[best]] = [this.arr[best], this.arr[i]]
        i = best
      }
    }
    return top
  }
}

var MedianFinder = function () {
  this.lower = new Heap((a, b) => b - a) // 最大堆，存较小的一半
  this.upper = new Heap((a, b) => a - b) // 最小堆，存较大的一半
}

MedianFinder.prototype.addNum = function (num) {
  this.lower.push(num)
  this.upper.push(this.lower.pop()) // 把 lower 的最大值送给 upper，保证分区正确
  if (this.upper.size() > this.lower.size()) {
    this.lower.push(this.upper.pop()) // 保持 lower 比 upper 多 0 或 1 个
  }
}

MedianFinder.prototype.findMedian = function () {
  if (this.lower.size() > this.upper.size()) {
    return this.lower.peek()
  }
  return (this.lower.peek() + this.upper.peek()) / 2
}

const mf = new MedianFinder()
mf.addNum(1)
mf.addNum(2)
console.log(mf.findMedian()) // 1.5
mf.addNum(3)
console.log(mf.findMedian()) // 2
