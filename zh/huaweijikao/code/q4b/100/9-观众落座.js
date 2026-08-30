// 9 观众落座：0空位/1已坐,间隔至少一个空位,最多还能坐下多少人

function main(arr) {
  let count = 0
  const len = arr.length
  for (let i = 0; i < len; i++) {
    if (arr[i] === 0) {
      const left = i === 0 || arr[i - 1] === 0
      const right = i === len - 1 || arr[i + 1] === 0
      if (left && right) {
        count++
        arr[i] = 1
      }
    }
  }
  return count
}

console.log(main([1, 0, 0, 0, 1]))
