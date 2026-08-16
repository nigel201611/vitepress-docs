// 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
// 最高位数字存放在数组的首位，数组中每个元素只存储单个数字。你可以假设除了整数 0 之外，这个整数不会以零开头。

// 思路：模拟进位（从低位往高位）
// 从最后一位开始加 1：
// - 当前位 < 9：加一后直接返回（进位已停止）
// - 当前位 = 9：置 0，继续向前进位
// 如果所有位都是 9（如 999），循环结束后在前面补 1。

var plusOne = function (digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++
      return digits
    }
    digits[i] = 0
  }
  return [1, ...digits] // 全部是 9 的情况
}

console.log(plusOne([1, 2, 3])) // [1, 2, 4]
console.log(plusOne([4, 3, 2, 1])) // [4, 3, 2, 2]
console.log(plusOne([9])) // [1, 0]
console.log(plusOne([9, 9, 9])) // [1, 0, 0, 0]
