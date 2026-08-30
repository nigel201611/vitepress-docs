//火星文计算
// x#y=2*x+3*y+4
// x$y=3x+y+2

function main(input) {
  while (input.indexOf('$') >= 0 || input.indexOf('#') >= 0) {
    if (input.indexOf('$') > 0) {
      //字符串左取右不取 7#6$5#12
      let idx = input.lastIndexOf('$')
      let leftStart = changeInput(input, idx, -1)
      let op1 = parseInt(input.substring(leftStart, idx))
      let rightEnd = changeInput(input, idx, +1)
      let op2 = parseInt(input.substring(idx + 1, rightEnd))
      let res = calcStar('$', op1, op2)
      input = input.substring(0, leftStart) + res + input.substring(rightEnd)
    } else {
      if (input.indexOf('#') > 0) {
        let idx = input.indexOf('#', 0)
        let leftStart = changeInput(input, idx, -1)
        let op1 = parseInt(input.substring(leftStart, idx))
        let rightEnd = changeInput(input, idx, +1)
        let op2 = parseInt(input.substring(idx + 1, rightEnd))
        let res = calcStar('#', op1, op2)
        input = input.substring(0, leftStart) + res + input.substring(rightEnd)
      }
    }
  }
  return input
}

//opt -1 表示左边的整数 1 表示右边的整数 7#6$5#12 leftStart  rightEnd
function changeInput(input, idx, opt) {
  let ch = input.charAt(idx + opt)
  while (ch >= '0' && ch <= '9') {
    if (opt > 0) {
      opt++
    } else {
      opt--
    }
    if (idx + opt >= 0 && idx + opt < input.length) {
      ch = input.charAt(idx + opt)
    } else {
      break
    }
  }
  if (opt < 0) {
    return opt + idx + 1
  } else {
    return opt + idx
  }
}

function calcStar(ch, op1, op2) {
  if (ch == '#') {
    return op1 * 2 + op2 * 3 + 4
  } else {
    return 3 * op1 + op2 + 2
  }
}

console.log(main('7#6$5#12'))
