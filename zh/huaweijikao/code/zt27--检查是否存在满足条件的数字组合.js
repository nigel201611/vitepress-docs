// 检查是否存在满足条件的数字组合
// A = B + 2C
function main(nums) {
  let arr = [...nums]
  let len = arr.length
  arr.sort((a, b) => a - b)
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      let res = checkAdd(arr, i, j)
      if (res) {
        return res
      }
    }
  }
  return 0
}

function checkAdd(arr, idx1, idx2) {
  //a
  let sub1 = 2 * arr[idx1] + arr[idx2]
  let sub2 = arr[idx1] + 2 * arr[idx2]
  for (let i = idx2 + 1; i < arr.length; i++) {
    if (arr[i] == sub1 && i > idx1 && i > idx2) {
      return sub1 + ' ' + arr[idx2] + ' ' + arr[idx1]
    }
    if (i > idx1 && i > idx2 && arr[i] == sub2) {
      return sub2 + ' ' + arr[idx2] + ' ' + arr[idx1]
    }
  }
  return false
}

console.log(main([2, 7, 3, 0]))
