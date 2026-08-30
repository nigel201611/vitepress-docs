// 10 悄悄话：二叉树层序数组(-1空),节点值为父到该节点的耗时,求全员收到的时间

function main(arr) {
  if (!arr.length || arr[0] === -1) return 0
  const travel = new Array(arr.length).fill(0)
  let ans = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === -1) continue
    if (i === 0) {
      travel[i] = arr[i]
    } else {
      travel[i] = travel[(i - 1) >> 1] + arr[i]
    }
    if (travel[i] > ans) ans = travel[i]
  }
  return ans
}

console.log(main([0, 9, 20, -1, -1, 15, 7, -1, -1, -1, -1, 3, 2]))
