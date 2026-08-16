// 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
// 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

// 思路：反转一半数字
// 负数一定不是回文；末位为 0 且非 0 的数（如 10、100）一定不是回文。
// 每次取出 x 的末位拼到 reverted 上，直到 reverted >= x：
//   - 偶数位（如 1221）：结束时 x === reverted
//   - 奇数位（如 12321）：结束时 reverted 比 x 多一位，比较 x === reverted / 10

var isPalindrome = function (x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false
  let reverted = 0
  while (x > reverted) {
    reverted = reverted * 10 + (x % 10)
    x = Math.floor(x / 10)
  }
  return x === reverted || x === Math.floor(reverted / 10)
}

console.log(isPalindrome(121)) // true
console.log(isPalindrome(-121)) // false
console.log(isPalindrome(10)) // false
console.log(isPalindrome(1221)) // true
