// 第 22 题:英文标点字符串的精确分词
// 给定一个连续不包含空格的字符串(仅含英文小写字母及标点 , ; .)和词库,求精确分词结果。
// 规则:
//   1) 精确分词:结果不重叠;
//   2) 标点符号不成词,仅用于断句(按 ,  ;  . 切分得到若干段);
//   3) 分词原则:分词顺序优先且最长匹配——每段内从左到右,在当前位置取词库中
//      为剩余字符串前缀的最长词典词;若当前位置无任何词典词匹配,则输出单个字符。
// 把每个词入 Set,逐段贪心匹配即可(字符串长度 < 256)。
function main(sentence, dictLine) {
  const dict = new Set(dictLine.split(','))
  const seg = (part) => {
    const out = []
    let i = 0
    while (i < part.length) {
      let best = 0
      for (let j = i + 1; j <= part.length; j++) {
        if (dict.has(part.slice(i, j))) best = j - i
      }
      if (best > 0) {
        out.push(part.slice(i, i + best))
        i += best
      } else {
        out.push(part[i])
        i++
      }
    }
    return out
  }
  const result = []
  let cur = ''
  for (const ch of sentence) {
    if (ch === ',' || ch === ';' || ch === '.') {
      result.push(...seg(cur))
      cur = ''
    } else {
      cur += ch
    }
  }
  result.push(...seg(cur))
  return result.join(',')
}

console.log(main('ilovechina', 'i,love,china,ch,na,ve,lo,this,is,the,word'))
