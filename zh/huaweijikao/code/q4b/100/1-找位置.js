// 1 找位置：已排成队列的学号(升序) + 小明学号 -> 队列位置(从1开始)

function main(queue, xm) {
  const arr = queue.split(/[,，\s]+/).filter(Boolean).map(Number)
  let lo = 0
  let hi = arr.length
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (arr[mid] < xm) {
      lo = mid + 1
    } else {
      hi = mid
    }
  }
  return lo + 1
}

console.log(main('93 95 97 100 102 123 155', 110))
