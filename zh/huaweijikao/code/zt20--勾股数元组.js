// 勾股数元组
function main(start, end) {
  if (start > end) {
    return 'NA'
  }

  let res = []
  let i = start
  while (i < end - 2) {
    let first = i * i
    for (let j = i + 1; j < end - 1; j++) {
      let second = j * j
      if (checkFlag(i, j, end)) {
        res.push([i, j, Math.sqrt(i * i + j * j)])
      }
      //   for (let k = j + 1; k < end; k++) {
      //     if (first + second == k * k) {
      //       res.push([i, j, k])
      //     }
      //   }
    }
    i++
  }
  res = res.filter((item) => {
    return !checkYue(...item)
  })
  return res
}

function checkFlag(a1, a2, max) {
  let mul = a1 * a1 + a2 * a2
  let res = Math.sqrt(mul)
  let sub = Math.floor(res)
  return res * res === sub * sub && sub <= max && sub > a2
}

function checkYue(a1, a2, a3) {
  for (let i = 2; i < a3; i++) {
    if (a1 % i == 0 && a2 % i == 0) {
      return true
    } else if (a1 % i == 0 && a3 % i == 0) {
      return true
    } else if (a2 % i == 0 && a3 % i == 0) {
      return true
    }
  }
  return false
}

console.log(main(1, 20))
