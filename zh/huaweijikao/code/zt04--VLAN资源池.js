// VLAN资源池
function ZT04() {
  function main(input, search) {
    let strArr = input.split(',')
    let list = []
    for (let i = 0; i < strArr.length; i++) {
      if (strArr[i].includes('-')) {
        let num = strArr[i].split('-')
        let start = parseInt(num[0])
        let end = parseInt(num[1])
        for (let j = start; j < end + 1; j++) {
          if (j == search) {
            continue
          }
          list.push(j)
        }
      } else {
        if (strArr[i] != search) {
          list.push(parseInt(strArr[i]))
        }
      }
    }

    list = list.sort((a, b) => a - b)
    console.log(list)
    //输出
    let idx = 0
    let start = 0 //1 3 4 5
    let tem = 1
    let sb = ''
    while (idx < list.length) {
      if (start == 0) {
        start = list[idx]
      }
      //   if (idx + 1 == list.length) {
      //     //保证下一位一定存在
      //     sb += start
      //     break
      //   }
      if (list[idx + 1] == start + tem) {
        //继续后推,连续增加
        idx++
        tem++
        continue
      } else if (start == list[idx]) {
        //输出当前值加,
        sb += idx < list.length - 1 ? start + ',' : start
        start = 0
        tem = 1
      } else {
        sb += start + '-' + list[idx]
        start = 0
        tem = 1
        if (idx + 1 < list.length) {
          //当前不是最后一个数据
          sb += ','
        }
      }
      idx++
    }
    return sb
  }
  console.log(main('1,3-5', '4'))
}
ZT04()
