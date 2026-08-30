// 14 学生成绩排名：指定科目排名,科目不存在则按总分;成绩相同按姓名按字典序

function main(subjects, students, rankSubject) {
  const idx = subjects.indexOf(rankSubject)
  const list = students.map((s) => ({
    name: s.name,
    score: idx >= 0 ? s.scores[idx] : s.scores.reduce((a, b) => a + b, 0),
  }))
  list.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  })
  return list.map((s) => s.name).join(' ')
}

console.log(main(['yuwen', 'shuxue'], [
  { name: 'fangfang', scores: [95, 90] },
  { name: 'xiaohua', scores: [88, 95] },
  { name: 'minmin', scores: [100, 82] }
], 'shuxue'))
