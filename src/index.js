import beati from '@/images/beauti.png'
import _ from 'lodash'
import '@/styles/index.scss'

const heading = document.createElement('h1')
heading.innerHTML = '웹팩 5 셋팅에 대하여...'

const img = document.createElement('img')
img.src = beati
img.width = 300

const content = document.createElement('div')
content.innerHTML = _.join(['웹팩 5 버전의 설정', '연습해 봅니다'], ' ')
content.className = 'title'

const app = document.querySelector('#root')

app.appendChild(img)
app.appendChild(heading)
app.appendChild(content)
