// TLV编码是按TagLengthValue格式进行编码的。
// 一段码流中的信元用tag标识，tag在码流中唯一不重复，
// length表示信元value的长度，value表示信元的值，
// 码流以某信元的tag开头，tag固定占一个字节，length固定占两个字节，字节序为小端序。
// 现给定tlv格式编码的码流以及需要解码的信元tag，请输出该信元的value。
// 输入码流的十六进制字符中，不包括小写字母；
// 且要求输出的十六进制字符串中也不要包含小写字母；
// 码流字符串的最大长度不超过50000个字节。
// eg1:
// 31
// 32 01 00 AE 90 02 00 01 02 30 03 00 AB 32 31 31 02 00 32 33 33 01 00 CC
// 需要解析的信源的tag是31；
// 从码流的起始处开始匹配，tag为32的信元长度为1(01 00,小端序表示为1)；
// 第二个信元的tag为90 其长度为2；
// 第三个信元的tag为30 其长度为3；
// 第四个信元的tag为31 其长度为2(02 00)；
// 所以返回长度后面的两个字节即可，为 32 33。
function main(str, tag) {
  let map = new Map()
  //分割所有码流数据，塞到map中
  let strArr = str.split(' ')
  let idx = 0
  while (idx < strArr.length) {
    let tagTemp = strArr[idx]
    let lengthStr = strArr[idx + 2] + strArr[idx + 1]
    idx += 3
    //计算内容的长度
    let length = parseInt(lengthStr, 16)
    let content = []
    for (let i = idx; i < idx + length; i++) {
      content.push(strArr[i])
    }
    map.set(tagTemp, {
      length,
      content
    })
    idx += length
  }

  let inner = map.get(tag)
  return inner.content.join(' ')
}

console.log(main('32 01 00 AE 90 02 00 01 02 30 03 00 AB 32 31 31 02 00 32 33 33 01 00 CC', '32'))
