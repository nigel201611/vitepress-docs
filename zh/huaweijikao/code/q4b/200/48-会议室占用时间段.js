// 会议室占用时间段:合并重叠会议时间段
function main(intervals) {
  const arr = intervals.slice().sort((a, b) => a[0] - b[0])
  const res = [arr[0].slice()]
  for (let i = 1; i < arr.length; i++) {
    const last = res[res.length - 1]
    if (arr[i][0] <= last[1]) {
      last[1] = Math.max(last[1], arr[i][1])
    } else {
      res.push(arr[i].slice())
    }
  }
  return JSON.stringify(res)
}

console.log(main([[1, 4], [2, 5], [7, 9], [14, 18]]))
