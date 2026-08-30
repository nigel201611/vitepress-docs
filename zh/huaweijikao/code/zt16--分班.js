// 分班
function main(input) {
  let classmatesArr = input.split(' ')
  let classOne = []
  let classTwo = []
  let preCla = 1
  for (let i = 0; i < classmatesArr.length; i++) {
    let classmate = classmatesArr[i].split('/')
    if (i === 0) {
      classOne.push(classmate[0])
      preCla = 1
      continue
    }
    if (preCla === 1) {
      if (classmate[1] === 'Y') {
        classOne.push(classmate[0])
      } else {
        classTwo.push(classmate[0])
        preCla = 2
      }
    } else {
      if (classmate[1] === 'Y') {
        classTwo.push(classmate[0])
      } else {
        classOne.push(classmate[0])
        preCla = 1
      }
    }
  }

  classOne.sort()
  classTwo.sort()

  return classOne.join() + '\n' + classTwo.join()
}

console.log(main('1/N 2/Y 3/N 4/Y'))
