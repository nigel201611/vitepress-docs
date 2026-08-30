// 12 密码退格：'<'退格清前一个字符,输出最终密码串及是否满足安全要求(长度>=8,大写,小写,数字,特殊字符)

function main(input) {
  const stack = []
  for (const ch of input) {
    if (ch === '<') {
      stack.pop()
    } else {
      stack.push(ch)
    }
  }
  const pwd = stack.join('')
  const ok =
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /[0-9]/.test(pwd) &&
    /[^A-Za-z0-9\s]/.test(pwd)
  return pwd + ',' + ok
}

console.log(main('ABC<c89%000<'))
