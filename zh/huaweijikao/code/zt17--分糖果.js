// 分糖果
function main(num) {
  let res = 0

  if (num === 1) {
    return 0
  }

  if (num % 2 !== 0) {
    if ((num + 1) % 2 === 0) {
      res++
      let temp = num + 1
      while (temp % 2 === 0) {
        res++
        temp = temp / 2
      }
    } else if ((num - 1) % 2 === 0) {
      res++
      let temp = num - 1
      while (temp % 2 === 0) {
        res++
        temp = temp / 2
      }
    }
  } else {
    let temp = num
    while (temp % 2 === 0) {
      res++
      temp = temp / 2
    }
  }

  return res
}

console.log(main(16))
