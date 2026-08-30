// 猴子爬山
function monkeyClimbing(num) {
  if (num < 3) return 1

  return monkeyClimbing(num - 1) + monkeyClimbing(num - 3)
}

console.log(monkeyClimbing(50))

function monkeyClimbing2(num) {
  let step1 = 1,
    step2 = 1,
    step3 = 2
  let step4 = n == 1 || n == 2 ? 1 : 2
  for (let i = 4; i <= num; i++) {
    step4 = step3 + step1
    step1 = step2
    step2 = step3
    step3 = step4
  }
  return step4
}
