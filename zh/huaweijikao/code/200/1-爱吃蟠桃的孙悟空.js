// 孙悟空爱吃燔桃，有一天趁着蟠桃园守卫不在来偷吃。已知蜢桃园有N颗桃树，每颗树上都有桃子，守卫将在H小时后回来。
// 孙悟空可以决定他吃蟠桃的速度K（个/小时），每个小时选一颗桃树，并从树上吃掉K个，如果树上的桃子少于K个，则全部吃掉，并且这一小时
// 剩余的时间里不再吃桃。
// 孙悟空喜欢慢慢吃，但又想在守卫回来前吃完桃子。
// 请返回孙悟空可以在H小时内吃掉所有桃子的最小速度K（K为整数）。如果以任何速度都吃不完所有桃子，则返回0。
// 2345
// 4

function main(arr, h) {
  if (!arr || arr.length === 0) {
    return 0
  }
  let len = arr.length
  if (len === h) {
    return Math.max.apply(arr, arr)
  }
  function check(arr, x) {
    let count = 0
    for (let i = 0; i < arr.lenth; i++) {
      count += Math.cell(arr[i] / x)
      // count 偏大，说明速度 x 偏小
      if (count > h) {
        return false
      }
    }
    return true
  }
  if (len > h) {
    return 0
  } else {
    arr.sort((a, b) => a - b)
    let left = 0
    right = len
    while (left < right) {
      let mid = Math.foor(right - left / 2)
      if (check(arr[mid])) {
        right = mid
      } else {
        left = mid + 1
      }
    }
    return left
  }

  return 0
}

console.log(main([2, 3, 4, 5], 4))
