// 幼儿园里有一个放倒的园桶，它是一个线性结构，允许在桶的右边将篮球放入，可以在桶的左边和右边将篮球取出。每个篮球有单独的编号，老师可以连续放入一个或多个篮球，小朋友可以在桶左边或右边将篮球取出，当桶里只有一个篮球的情况下，必须从左边取出。
// 如老师按/顺序放入1、2、3、4、5共5个编号的篮球，那么小朋友可以依次取出的编号为1,2,3,4,5”或者3,1,2,4,5”编号的篮球，无法取出
// 5.1.3.2.4”编号的節球
// 其中"3,1,2,4,5的取出场景为：连续放入1,2,3号-＞从右边取出3号-＞从左边取出1号-＞从左边取出2号-＞放入4号-》从左边取出4号-放入5号
// ＞从左边取出5号，简单起见，我们以L表示左，R表示右，此时的篮球的依次取出序列为"RLLLL”

function main(arr1, arr2) {
  if (!arr1 || !arr2) {
    return 'NO'
  }
  if (arr1.length !== arr2.length) {
    return 'NO'
  }
  let result = []
  let arr1Cp = [...arr1]
  for (let i = 0; i < arr2.length; i++) {
    let temp = arr2[i]
    let index = arr1Cp.indexOf(temp)
    if (index > 0) {
      arr1Cp.splice(index, 1)
      result.push('R')
    } else if (index === 0) {
      arr1Cp.splice(index, 1)
      result.push('L')
    } else {
      return 'NO'
    }
  }
  return result
}

console.log(main([4, 5, 6, 7, 0, 1, 2], [6, 4, 0, 1, 2, 5, 7]))
