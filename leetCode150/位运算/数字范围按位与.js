// 给你两个整数 left 和 right ，表示区间 [left, right] ，返回此区间内所有数字 按位与 的结果（包含 left 、right 端点）。

// 思路：找公共前缀
// 区间内所有数字按位与的结果 = left 和 right 的「公共前缀部分」后面补 0。
// 因为一旦某一位在 left 和 right 之间发生过翻转（0 变 1），那么该位往后的低位
// 在区间内必然既出现过 0 也出现过 1，按位与后全为 0。
// 做法：同时把 left、right 右移直到相等，记录移了多少位 shift，再把 left 左移回来。

var rangeBitwiseAnd = function (left, right) {
  let shift = 0
  while (left < right) {
    left >>= 1
    right >>= 1
    shift++
  }
  return left << shift
}

console.log(rangeBitwiseAnd(5, 7)) // 4（101 & 110 & 111 = 100）
console.log(rangeBitwiseAnd(0, 0)) // 0
console.log(rangeBitwiseAnd(1, 2147483647)) // 0
