module.exports = (content) => {
  console.log(`사용자 정의 로더...`)
  return content.replace('console.log(', 'alert(')
}
