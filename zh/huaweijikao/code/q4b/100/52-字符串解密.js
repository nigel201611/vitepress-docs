// 52 字符串解密: 密文按映射规则 (a~i) -> "1"~"9", (j~z) -> "10"~"26" 解密
// 输入: 密文字符串, 如 "20*19*20*"

function main(cipher) {
  const parts = cipher.split('*')
  let plain = ''
  for (const p of parts) {
    if (p === '') continue
    const num = parseInt(p, 10)
    if (num >= 1 && num <= 26) {
      plain += String.fromCharCode(96 + num)
    }
  }
  return plain
}

console.log(main('20*19*20*'))
