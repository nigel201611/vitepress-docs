// 双十一众多商品进行打折销售，小明想购买一些自己心仪的商品，
// 但由于受购买资金限制，所以他决定从众多心意商品中购买3件，
// 而且想尽可能的花完资金，
// 现在请你设计一个程序帮助小明计算尽可能花费的最大资金额。
// 23, 26, 36, 27
// 78
function main(arr, target) {
  let len = arr.length
  arr.sort((a, b) => a - b)
  if (arr.length < 3 || arr[0] + arr[1] + arr[2] > target) {
    return -1
  }
  let maxRes = -1
  for (let i = 0; i <= len - 3; i++) {
    let temp = 0
    let j = i
    while (j < i + 3) {
      temp += arr[j++]
    }
    if (temp > target) {
      break
    }
    if (temp > maxRes) {
      maxRes = temp
    }
  }

  return maxRes
}

console.log(main([23, 26, 36, 27], 78)) // 78

console.log(main([23, 30, 40], 26))
