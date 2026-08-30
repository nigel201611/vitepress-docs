// 招聘

function main(arr, m) {
  let len = arr.length
  if (!arr || len < 1) {
    return 0
  }
  if (len === 1) {
    return 1
  }

  arr.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0]
    } else {
      return a[1] - b[1]
    }
  })

  let queque = []
  queque.push({ endTime: arr[0][1], count: 1 })

  for (let i = 1; i < len; i++) {
    let flag = false
    let item = arr[i]
    for (let j = 0; j < queque.length; j++) {
      let { endTime, count } = queque[j]
      if (endTime <= arr[i][0] && count < m) {
        queque[j].endTime = arr[i][1]
        queque[j].count++
        flag = true
        break
      }
    }
    if (!flag) {
      queque.push({ endTime: arr[i][1], count: 1 })
    }
  }

  return queque.length
}

console.log(
  main(
    [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6]
    ],
    2
  )
)

console.log(
  main(
    [
      [8, 35],
      [5, 10],
      [1, 3]
    ],
    3
  )
)
