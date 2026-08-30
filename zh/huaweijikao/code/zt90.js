function main(strs) {
  let count = 0
  for (let i = 0; i < strs.length; i++) {
    if (strs[i] === 'o') {
      count++
    }
  }

  return count % 2 === 0 ? strs.length : strs.length - 1
}

console.log(main('looxdolx'))
