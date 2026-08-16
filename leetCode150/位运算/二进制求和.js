// 给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和。

// 思路：模拟竖式加法
// 从最低位开始逐位相加，维护进位 carry。
// 每位结果 = (a[i] + b[j] + carry) % 2，进位 = 相加大于等于 2 时为 1。
// 遍历完还有进位则在最前面补 1。

var addBinary = function (a, b) {
  let i = a.length - 1
  let j = b.length - 1
  let carry = 0
  let result = ''
  while (i >= 0 || j >= 0 || carry) {
    const sum = (i >= 0 ? Number(a[i]) : 0) + (j >= 0 ? Number(b[j]) : 0) + carry
    result = (sum % 2) + result
    carry = sum >= 2 ? 1 : 0
    i--
    j--
  }
  return result
}

console.log(addBinary('11', '1')) // "100"
console.log(addBinary('1010', '1011')) // "10101"
