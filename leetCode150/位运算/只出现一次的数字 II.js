// 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。

// 思路：按位统计（模 3）
// 对每个二进制位，统计该位为 1 的个数。出现三次的数字在该位上贡献的次数是 3 的倍数，
// 所以 count % 3 的结果就是「只出现一次的数字」在该位的值。
// 注意 JavaScript 位运算按 32 位有符号处理，第 31 位（符号位）为 1 时结果会是负数，但答案本身正确。

var singleNumber = function (nums) {
  let answer = 0
  for (let i = 0; i < 32; i++) {
    let count = 0
    for (const num of nums) {
      count += (num >> i) & 1
    }
    if (count % 3 !== 0) {
      answer |= 1 << i
    }
  }
  return answer
}

console.log(singleNumber([2, 2, 3, 2])) // 3
console.log(singleNumber([0, 1, 0, 1, 0, 1, 99])) // 99
