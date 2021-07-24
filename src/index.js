import beati from '@/images/beauti.png'
import _ from 'lodash'
import '@/styles/index.scss'
class Game {
  name = 'Violin Charades'
}
const myGame = new Game()
const p = document.createElement('p')
p.textContent = `I like ${myGame}.`

const heading = document.createElement('h1')
heading.innerHTML = '웹팩 5 셋팅에 대하여...'

const img = document.createElement('img')
img.src = beati
img.width = 400

const content = document.createElement('div')
content.className = 'title'
content.innerHTML = _.join(['웹팩 5 버전의 설정', '연습해 봅니다'], '')

const app = document.querySelector('#root')
app.append(img, heading, content)
