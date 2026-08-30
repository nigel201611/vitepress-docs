function parseLines(str) {
  // 解析 [位置,类型,值] 形式的条目列表,值内可能嵌套 Compose 条目
  const parseEntry = (i) => {
    let j = i + 1
    const skip = () => {
      while (j < str.length && str[j] === ' ') j++
    }
    const readUntil = (chars) => {
      let s = ''
      skip()
      while (j < str.length && !chars.includes(str[j])) s += str[j++]
      return s
    }
    const pos = readUntil([','])
    j++ // ','
    const type = readUntil([','])
    j++ // ','
    skip()
    if (str[j] === '[') {
      const subs = []
      while (j < str.length && str[j] === '[') {
        const r = parseEntry(j)
        subs.push(r.entry)
        j = r.i
        while (j < str.length && (str[j] === ',' || str[j] === ' ')) j++
      }
      j++ // 消费 Compose 的右括号
      return { entry: [Number(pos), type, subs], i: j }
    }
    let v = ''
    while (j < str.length && str[j] !== ',' && str[j] !== ']') v += str[j++]
    j++ // ']'
    return { entry: [Number(pos), type, v], i: j }
  }
  const entries = []
  let i = 0
  while (i < str.length) {
    while (i < str.length && str[i] !== '[') i++
    if (i >= str.length) break
    const r = parseEntry(i)
    entries.push(r.entry)
    i = r.i
  }
  return entries
}

let depth = 0
function encodeEntries(entries) {
  const parts = []
  for (const e of entries) {
    if (depth > 10) return null
    const [pos, type, value] = e
    if (!Number.isInteger(pos) || pos < 0) return null
    let code
    let data = ''
    if (type === 'String') {
      code = 1
      data = String(value)
    } else if (type === 'Integer') {
      code = 0
      data = String(value)
    } else if (type === 'Compose') {
      code = 2
      depth++
      const inner = encodeEntries(value)
      depth--
      if (inner === null) return null
      data = inner
    } else {
      continue // 不支持的类型,自动过滤
    }
    parts.push(pos + '#' + code + '#' + data.length + '#' + data)
  }
  return parts.join('')
}

function decodeEntries(buf, i, out) {
  // 解析连续编码的数据区: 位置#类型#长度#数据
  const readNum = () => {
    let s = ''
    while (i < buf.length && buf[i] !== '#') s += buf[i++]
    if (buf[i] !== '#') return null
    i++
    const v = Number(s)
    return Number.isInteger(v) ? v : null
  }
  while (i < buf.length) {
    const pos = readNum()
    const code = readNum()
    const len = readNum()
    if (pos === null || code === null || len === null) return null
    if (i + len > buf.length) return null
    const data = buf.slice(i, i + len)
    i += len
    let type
    let value
    if (code === 0) {
      type = 'Integer'
      value = data
    } else if (code === 1) {
      type = 'String'
      value = data
    } else if (code === 2) {
      type = 'Compose'
      const subs = []
      const sub = decodeEntries(data, 0, subs)
      if (sub === null) return null
      value = subs
    } else {
      type = null
    }
    if (type !== null) out.push([pos, type, value])
  }
  return out
}

function formatEntries(entries) {
  const parts = []
  for (const [pos, type, value] of entries) {
    if (type === 'Compose') {
      parts.push('[' + pos + ',' + type + ',' + formatEntries(value) + ']')
    } else {
      parts.push('[' + pos + ',' + type + ',' + value + ']')
    }
  }
  return parts.join(',')
}

function main(lines) {
  const cmd = lines[0].trim()
  const input = lines[1].trim()
  if (input.length > 1000) return cmd === '1' ? 'ENCODE_ERROR' : 'DECODE_ERROR'
  if (cmd === '1') {
    const entries = parseLines(input)
    depth = 0
    const enc = encodeEntries(entries)
    if (enc === null || enc.length > 1000) return 'ENCODE_ERROR'
    return enc
  }
  // 解码
  const out = []
  const res = decodeEntries(input, 0, out)
  if (res === null) return 'DECODE_ERROR'
  return formatEntries(out)
}

console.log(main(['1', '[1,String,1 am Mary],[2,Integer,23],[3,Long,1000000],[4,Compose,[1,String,1 am Kitty],[2,Integer,44]]']))
