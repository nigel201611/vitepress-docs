function main(arr, h) {
  let len = arr.length

  function check(arr, x) {
    let count = 0
    let l = 0,
      r = len - 1
    while (l < r) {
      if (arr[l] + arr[r] <= x) {
        l++
        r--
      } else {
        r--
      }
      count += 1
    }
    return count <= h
  }
  arr.sort((a, b) => a - b)
  let left = arr[len - 1],
    right = 10 ** 9
  while (left < right) {
    if (check(left)) {
      return left
    }
    left++
  }
  return left
}

console.log(main([2, 3, 4, 5], 3))
