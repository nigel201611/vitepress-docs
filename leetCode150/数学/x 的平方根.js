// 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
// 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被舍去。

// 思路：二分查找
// 在 [0, x] 中二分查找最大的 mid 使得 mid² <= x。
// mid 用 (left + right + 1) >> 1 取上中位数，避免死循环。
// mid * mid 用除法判断（mid <= x / mid），防止大数溢出。

var mySqrt = function (x) {
  let left = 0
  let right = x
  while (left < right) {
    const mid = (left + right + 1) >> 1 // 上中位数
    if (mid <= x / mid) {
      left = mid // mid 可行，尝试更大的
    } else {
      right = mid - 1
    }
  }
  return left
}

console.log(mySqrt(4)) // 2
console.log(mySqrt(8)) // 2（2.828... 取整）
console.log(mySqrt(0)) // 0
