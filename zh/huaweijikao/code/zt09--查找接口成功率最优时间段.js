// 查找接口成功率最优时间段
function main(num, input) {
  let arr = input.split(' ')
  let left = 0
  let right = 0
  let sb = ''
  while (right < arr.length) {
    if (left == right) {
      right++
    }
    if (checkAvMin(arr, left, right, num)) {
      //需要查找到最大的数组？
      while (right < arr.length && checkAvMin(arr, left, right, num)) {
        right++
      }
      right--
      sb += left + '-' + right + ' '
      right++
    } else {
      left++
    }
  }
  return sb
}

//给出数组，求平均值是否小于等于某个期望值
function checkAvMin(arr, start, end, target) {
  let total = 0
  for (let i = start; i < end + 1; i++) {
    total += parseInt(arr[i])
  }
  let res = total / (end - start + 1)
  return res <= target
}

console.log(main('2', '0 0 100 2 2 99 0 2'))
