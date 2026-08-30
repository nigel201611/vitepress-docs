// 53. 模拟目录管理
// 输入：N 行字符串，每一行是一条命令（mkdir dir / cd dir / cd .. / pwd）
// 输出：最后一条命令的运行结果
function main(commands) {
  // created 记录当前已存在目录的完整路径（形如 /a/b/）
  const created = new Set()
  const stack = []
  let lastResult = ''
  for (const line of commands) {
    const cmd = line.trim()
    if (!cmd) continue
    const parts = cmd.split(/\s+/)
    const op = parts[0]
    if (op === 'mkdir') {
      if (parts.length !== 2 || !/^[a-z]+$/.test(parts[1])) continue
      const path = '/' + stack.join('/') + (stack.length ? '/' : '') + parts[1] + '/'
      if (!created.has(path)) created.add(path)
    } else if (op === 'cd') {
      if (parts.length !== 2) continue
      if (parts[1] === '..') {
        if (stack.length > 0) stack.pop()
      } else if (/^[a-z]+$/.test(parts[1])) {
        const path = '/' + stack.join('/') + (stack.length ? '/' : '') + parts[1] + '/'
        if (created.has(path)) stack.push(parts[1])
      }
    } else if (op === 'pwd') {
      if (parts.length !== 1) continue
      lastResult = '/' + stack.join('/') + '/'
    }
  }
  return lastResult
}

console.log(main(['mkdir abc', 'cd abc', 'pwd']))
