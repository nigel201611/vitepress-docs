// 计算最大乘积

function main(arr) {
  let maxLen = 0
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (haveSameChar(arr[i], arr[j])) {
        continue
      }
      maxLen = Math.max(maxLen, arr[i].length * arr[j].length)
    }
  }
  return maxLen
}

function haveSameChar(leftStr, rightStr) {
  let i = 0,
    j = 0
  //   while (i < leftStr.length && j < rightStr.length) {
  //     if (leftStr[i] === rightStr[j]) {
  //       return true
  //     }
  //     i++
  //     j++
  //   }
  let flag = false
  for (let i = 0; i < leftStr.length; i++) {
    for (let j = 0; j < rightStr.length; j++) {
      if (leftStr[i] === rightStr[j]) {
        flag = true
        break
      }
    }
    if (flag) {
      break
    }
  }
  return flag
}

console.log(main(['iwdvpbn', 'hk', 'iuop', 'iikd', 'kadgpf']))
