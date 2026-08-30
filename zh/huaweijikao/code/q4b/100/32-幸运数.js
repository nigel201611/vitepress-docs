// 32 幸运数

function main(n, m, commands) {
  let pos = 0
  let max = 0
  for (const x of commands) {
    if (x === m) pos += x + 1
    else pos += x
    if (pos > max) max = pos
  }
  return max
}

console.log(main(2, 1, [-5, 1]))
