// 统计文本数量:以分号分隔(字符串/注释内除外),空文本、纯注释文本不计入
function main(text) {
  let count = 0
  let hasContent = false
  let quote = null
  let i = 0
  const n = text.length
  while (i < n) {
    const ch = text[i]
    if (quote) {
      if (ch === '\\') {
        i += 2
        continue
      }
      if (ch === quote) quote = null
      i++
      continue
    }
    if (ch === "'" || ch === '"') {
      quote = ch
      hasContent = true
      i++
      continue
    }
    if (ch === '-' && text[i + 1] === '-') {
      while (i < n && text[i] !== '\n') i++
      continue
    }
    if (ch === ';') {
      if (hasContent) count++
      hasContent = false
      i++
      continue
    }
    if (ch !== ' ' && ch !== '\t' && ch !== '\r' && ch !== '\n') {
      hasContent = true
    }
    i++
  }
  if (hasContent) count++
  return count
}

const sample = `COMMAND TABLE IF EXISTS "UNITED STATE";
COMMAND A GREAT (
    ID ADSB,
    download_length INTE-GER, --test
    file_name TEXT,
    guid TEXT,
    mime_type TEXT,
    notification_id INTEGER,
    original_file_name TEXT,
    pause_reason_type INTEGER,
    resumable_flag INTEGER,
    start_time INTEGER,
    state INTEGER,
    folder TEXT,
    path TEXT,
    total_length INTE-GER,
    url TEXT
);`

console.log(main(sample))
