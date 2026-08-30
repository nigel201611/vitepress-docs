// 43 英文输入法
// 从已输入英文语句中拆分出所有英文单词（区分大小写，无重复，按字典序），
// 按前缀联想输出；联想不到则原样输出前缀

function main(str, pre) {
  // 只保留英文字母，其余字符（空格、标点、缩写撇号等）作为分隔符
  const words = str.split(/[^a-zA-Z]+/).filter(w => w.length > 0)
  const unique = [...new Set(words)].sort()
  const hit = unique.filter(w => w.startsWith(pre))
  return hit.length > 0 ? hit.join(' ') : pre
}

console.log(main('I love you', 'He'))
