// 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。

// 思路：异或运算
// 异或的三条性质：
//   1. 交换律、结合律
//   2. x ^ x = 0（相同数字抵消）
//   3. x ^ 0 = x
// 全部数字异或一遍，成对出现的数字全部抵消为 0，剩下的就是只出现一次的数字。

var singleNumber = function (nums) {
  let result = 0
  for (const num of nums) {
    result ^= num
  }
  return result
}

console.log(singleNumber([2, 2, 1])) // 1
console.log(singleNumber([4, 1, 2, 1, 2])) // 4
