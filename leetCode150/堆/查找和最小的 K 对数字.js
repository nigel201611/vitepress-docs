// 给定两个以 非递减顺序排列 的整数数组 nums1 和 nums2 ，以及一个整数 k 。
// 定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。
// 请找到和最小的 k 个数对 (u1,v1), (u2,v2) ... (uk,vk) 。

// 思路：最小堆 + 指针扩展（不会重复）
// 两个数组都有序，所以 (i, j+1) 的和 >= (i, j) 的和，可以用堆维护「当前最小候选」。
// 1. 先把 nums1 的前 k 个元素分别与 nums2[0] 配对入堆（和越小越优先）
// 2. 每次弹出和最小的 (i, j)，记入结果，然后把 (i, j+1) 推入堆
// 这样每个数对只会被枚举一次，保证不重复不遗漏。

class MinHeap {
  constructor(compare) {
    this.arr = []
    this.compare = compare
  }
  size() {
    return this.arr.length
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
        let smallest = i
        if (l < this.arr.length && this.compare(this.arr[l], this.arr[smallest]) < 0) smallest = l
        if (r < this.arr.length && this.compare(this.arr[r], this.arr[smallest]) < 0) smallest = r
        if (smallest === i) break
        ;[this.arr[i], this.arr[smallest]] = [this.arr[smallest], this.arr[i]]
        i = smallest
      }
    }
    return top
  }
}

var kSmallestPairs = function (nums1, nums2, k) {
  const minHeap = new MinHeap((a, b) => nums1[a[0]] + nums2[a[1]] - (nums1[b[0]] + nums2[b[1]]))
  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    minHeap.push([i, 0])
  }

  const result = []
  while (result.length < k && minHeap.size() > 0) {
    const [i, j] = minHeap.pop()
    result.push([nums1[i], nums2[j]])
    if (j + 1 < nums2.length) {
      minHeap.push([i, j + 1])
    }
  }
  return result
}

console.log(kSmallestPairs([1, 7, 11], [2, 4, 6], 3)) // [[1,2],[1,4],[1,6]]
console.log(kSmallestPairs([1, 1, 2], [1, 2, 3], 2)) // [[1,1],[1,1]]
