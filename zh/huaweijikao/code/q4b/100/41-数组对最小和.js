// 41 数组对最小和
// 从array1、array2中各取一个元素构成一对（以下标区分的不同对），
// 取k对，求这k对元素和的最小值
// 数组规模<=100，直接枚举所有组合后取最小的k个求和

function main(arr1, arr2, k) {
  const sums = []
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      sums.push(arr1[i] + arr2[j])
    }
  }
  sums.sort((a, b) => a - b)
  let total = 0
  for (let i = 0; i < k; i++) {
    total += sums[i]
  }
  return total
}

console.log(main([1, 1, 2], [1, 2, 3], 2))
