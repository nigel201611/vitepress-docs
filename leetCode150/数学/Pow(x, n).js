// 实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，x^n）。

// 思路：快速幂（二分幂）
// 把指数拆成二进制：x^n = 按 n 的二进制位累乘 x^(2^k)。
// 例如 x^13 = x^8 × x^4 × x^1（13 = 1101₂）。
// 每轮把底数平方（x -> x² -> x⁴...），指数右移一位，二进制位为 1 时乘入结果。
// 时间复杂度 O(log n)。注意 n 为负数时取倒数，用 n = -n 并转成 64 位安全处理。

var myPow = function (x, n) {
  let result = 1
  let exp = n < 0 ? -n : n // 负数指数先转正，最后取倒数
  let base = n < 0 ? 1 / x : x
  while (exp > 0) {
    if (exp % 2 === 1) result *= base
    base *= base // 底数平方
    exp = Math.floor(exp / 2)
  }
  return result
}

console.log(myPow(2.0, 10)) // 1024
console.log(myPow(2.1, 3)) // 9.261
console.log(myPow(2.0, -2)) // 0.25
