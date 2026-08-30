// 喊7的次数重排
function main(nums) {
  let total = 0
  for (let i = 0; i < nums.length; i++) {
    total += nums[i]
  }
  let temp = 0
  let arr = Array.from(nums).fill(0)
  let len = nums.length
  for (let i = 1; i < 200; i++) {
    if (checkSeven(i)) {
      let index = i % len
      arr[index - 1]++
      temp++
    }
    if (temp >= total) {
      break
    }
  }
  return arr
}

function checkSeven(num) {
  //1、是不是7的倍数
  if (num % 7 == 0) {
    return true
  }
  //2、是不是数字包含7 -> 拆解所有位
  while (num > 0) {
    let wi = num % 10
    if (wi == 7) {
      return true
    }
    num /= 10
  }
  return false
}

console.log(main([0, 0, 0, 2, 1]))
console.log(main([0, 1, 0]))
