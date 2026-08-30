function main(arr) {
  let len = arr.length
  let left = 0,
    right = 0
  let res = 0
  while (left < len) {
    if (arr[left] === 0) {
      left += 1
      continue
    }
    right = left
    while (right < len && arr[right] === 1) {
      right++
    }
    let num = right - left
    for (let i = 3; i >= 1; i--) {
      res += Math.floor(num / i)
      num = num % i
    }
    left = right
  }
  return res
}

console.log(main([1, 1, 1, 1, 1, 1, 0, 1]))
