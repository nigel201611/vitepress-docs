// 10001 1 1001001

function main(arr) {
  if (!arr) {
    return 0
  }
  let len = arr.length
  if (len === 1) {
    return 1
  }
  let count = 0
  let i = 0
  while (i < len) {
    if (arr[i] === 0) {
      let left = i === 0 || arr[i - 1] === 0
      let right = i === len - 1 || arr[i + 1] === 0
      if (left && right) {
        count += 1
        arr[i] = 1
      }
    }
    i++
  }

  return count
}

console.log(main([1, 0, 0, 0, 1]))

console.log(main([1, 0, 0, 1, 0, 0, 1]))
